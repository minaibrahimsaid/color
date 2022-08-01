import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

var color = "#3A16EC";
export default function Draw() {
  let oldPt, oldMidPt;
  const [selectedColor, setSelectedColor] = useState("#3A16EC");

  const createCanvas = () => {
    const handleMouseDown = (event) => {
      if (!event.primary) return;

      oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
      oldMidPt = oldPt.clone();
      stage.addEventListener("stagemousemove", handleMouseMove);
    };

    const handleMouseUp = (event) => {
      if (!event.primary) return;
      stage.removeEventListener("stagemousemove", handleMouseMove);
    };

    // move the mouse
    const handleMouseMove = (event) => {
      if (!event.primary) return;

      const midPt = new createjs.Point(
        (oldPt.x + stage.mouseX) >> 1,
        (oldPt.y + stage.mouseY) >> 1
      );

      drawingCanvas.graphics
        .clear()
        .setStrokeStyle(10, "round", "round")
        .beginStroke(color)
        .moveTo(midPt.x, midPt.y)
        .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

      oldPt.x = stage.mouseX;
      oldPt.y = stage.mouseY;

      oldMidPt.x = midPt.x;
      oldMidPt.y = midPt.y;

      stage.update();
    };

    // access the canvas and necessary elements for drawing
    const canvas = document.getElementById("drawing");
    const drawingCanvas = new createjs.Shape();
    const stage = new createjs.Stage(canvas);
    // render the image
    const context = canvas.getContext("2d");
    const image = new Image(canvas.width, canvas.height);
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    image.src = "http://www.lunapic.com/editor/premade/transparent.gif";
    image.onload = () => context.drawImage(image, 0, 0);

    stage.autoClear = false;
    stage.enableDOMEvents(true);

    createjs.Touch.enable(stage);
    createjs.Ticker.framerate = 24;

    stage.addChild(drawingCanvas);
    stage.update();
    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);
  };

  useEffect(() => {
    createCanvas();
  }, []);

  return (
    <>
      <SketchPicker
        color={selectedColor}
        onChange={({ hex: c }) => {
          color = c;
          setSelectedColor(c);
        }}
      />
      <canvas id="drawing" width="500" height="300" />
    </>
  );
}
