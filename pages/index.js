import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from "../styles/Home.module.css";

const DrawingCanvas = dynamic(() => import('../components/Draw'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Color the drawing</title>
        <meta name="description" content="Color the drawing" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
      </Head>
      <DrawingCanvas />
    </div>
  )
}
