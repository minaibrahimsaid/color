import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { Radio } from "antd";
import styles from "../../styles/Home.module.css";

const CONFIG = {
  default_color: "#3A16EC",
  canvas_id: "canvas",
  canvas_width: 800,
  canvas_height: 800,
  stork: 10,
  stork_style: "round", // One of  butt, round, or square
  backgroundColor: "#FFFFFF",
  mode: "draw",
};

var color = CONFIG.default_color;
export default function Draw({url}) {
  const [selectedColor, setSelectedColor] = useState(CONFIG.default_color);
  const [mode, setMode] = useState("draw");

  const createCanvas = () => {
    const canvas = document.getElementById(CONFIG.canvas_id);
    const stage = new createjs.Stage(canvas);
    const wrapper = new createjs.Container();
    const image = new Image(CONFIG.canvas_width, CONFIG.canvas_height);
    const bitmap = new createjs.Bitmap(image);
    const drawing = new createjs.Shape();
    const lastPoint = new createjs.Point();
    const graphic = new createjs.Graphics()
      .f("#000")
      .dr(0, 0, CONFIG.canvas_width, CONFIG.canvas_height);
    // add the image
    canvas.style.backgroundColor = CONFIG.backgroundColor;

    image.src = url;
    image.width = CONFIG.canvas_width
    image.height = CONFIG.canvas_height
    stage.addChild(bitmap);
    stage.update();
    // add drawing area above the image
    wrapper.addChild(drawing);
    stage.addChild(wrapper);

    wrapper.hitArea = new createjs.Shape(graphic);
    wrapper.cache(0, 0, CONFIG.canvas_width, CONFIG.canvas_height); // Cache it.

    wrapper.addEventListener("mousedown", function (event) {
      // Store the position. We have to do this because we clear the graphics later.
      lastPoint.x = event.stageX;
      lastPoint.y = event.stageY;

      // Listen for mousemove
      event.addEventListener("mousemove", function (event) {
        // Draw a round line from the last position to the current one.
        drawing.graphics.ss(CONFIG.stork, CONFIG.stork_style).s(color);
        drawing.graphics.mt(lastPoint.x, lastPoint.y);
        drawing.graphics.lt(event.stageX, event.stageY);

        // Update the last position for next move.
        lastPoint.x = event.stageX;
        lastPoint.y = event.stageY;
        wrapper.updateCache(
          CONFIG.mode === "erase" ? "destination-out" : "source-over"
        );
        drawing.graphics.clear();
      });
    });

    createjs.Ticker.addEventListener("tick", stage);
  };

  useEffect(() => {
    createCanvas();
  }, [url]);

  const changeConfig = (key, value) => {
    CONFIG[key] = value;
  };
  return (
    <div className={styles.drawContainer}>
      <div>
        <Radio.Group
          value={mode}
          onChange={(e) => {
            changeConfig("mode", e.target.value);
            setMode(e.target.value);
          }}
          className={styles.modeControl}
        >
          <Radio.Button style={{ width: "50%" }} value="draw">
            Draw
          </Radio.Button>
          <Radio.Button style={{ width: "50%" }} value="erase">
            Erase
          </Radio.Button>
        </Radio.Group>
        <SketchPicker
          color={selectedColor}
          onChange={({ hex: c }) => {
            color = c;
            setSelectedColor(c);
          }}
          disableAlpha
        />
      </div>
      <div className={styles.drawArea}>
        <canvas
          id={CONFIG.canvas_id}
          width={CONFIG.canvas_width}
          height={CONFIG.canvas_height}
        />
      </div>
    </div>
  );
}
