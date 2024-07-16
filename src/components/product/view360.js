import React from "react"
import ThreeSixty from 'react-360-view'

const View360 = (props) => {

  const { images360, images360Name } = props

  return (
    <div className="w-100">
      <ThreeSixty
        amount={36}
        imagePath={`${process.env.REACT_APP_IMAGE}/image-360`}
        fileName={images360Name}
        loop={2}
    />
    </div>
  )
}

export default View360