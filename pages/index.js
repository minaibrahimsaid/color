import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { useState } from 'react'

const DrawingCanvas = dynamic(() => import('../components/Draw'), {
  ssr: false,
})

const IMAGES = [
  '/img/santa.png',
  '/img/cat.png',
  '/img/egg.png',
  '/img/flower.png',
  '/img/test.png',
  '/img/rabbit.png',
  '/img/show.png',
  '/img/wow.png',
]

export default function Home() {
  const [selectedImage , setSelectedImage ] = useState(IMAGES[0])
  return (
    <div>
      <div className={styles.allImages}>
        {IMAGES.map((image) => (
          <div key={image} className={styles.oneImage} onClick={()=> setSelectedImage(image)}>
            <Image src={image} layout="responsive" width="100%" height="100%" />
          </div>
        ))}
      </div>
      <Head>
        <title>Color the drawing</title>
        <meta name="description" content="Color the drawing" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https:////code.createjs.com/createjs-2013.02.12.min.js" async />
      </Head>
      <DrawingCanvas url={selectedImage} />
    </div>
  )
}
