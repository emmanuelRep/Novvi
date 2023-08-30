import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { toPng } from 'html-to-image'
import Bubble from './Bubble'

const BubbleMarker = ({price}) => {
    const [iconUrl, setIconUrl] = useState(null)
    console.log(iconUrl)
    useEffect(() => {
        const generateIcon = async () => {
            try {
                const bubbleComponent = <Bubble price={price}/>
                const bubbleHTML = ReactDOMServer.renderToStaticMarkup(bubbleComponent)
                const dataURL = await toPng(bubbleHTML)
                setIconUrl(dataURL)
            }catch (error) {
                console.error('Error gen img', error)
                setIconUrl(null)
            }
        }
        generateIcon()
    }, [price])
  return (
    <img src={iconUrl} alt="location marker" />
  )
}

export default BubbleMarker
