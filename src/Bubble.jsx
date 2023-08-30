import React, { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Bubble = (props) => {
  //Handle bubble click
  const bubbleClicked = () => {
    window.open(`/details/${props.id}`, '_blank')
  }

  const bubbleStyle = {
    display: 'flex',
    border: '1px solid #264068',
    borderRadius: '12px',
    backgroundColor: '#264068',
    color: 'white',
    width: 'fit-content',
    height: '30px',
    padding: '4px',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div>
      <div className="bubble" onClick={bubbleClicked}>
        <p>{props.price}</p>
      </div>
    </div>
  )
}



export default Bubble
