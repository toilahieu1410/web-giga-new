import React, { useState } from "react";


const ProgressBar = ({ startValue, endValue }) => {
  const [start, setStart] = useState(startValue);
  const [end, setEnd] = useState(endValue);
  const [isDraggingStart, setIsDraggingStart] = useState(false)
  const [isDraggingEnd, setIsDraggingEnd] = useState(false)

  const handleMouseDownStart = () => {
    setIsDraggingStart(true)
  };

  const handleMouseDownEnd = () => {
    setIsDraggingEnd(true)
  };

  const handleMouseUp = () => {
    setIsDraggingStart(false)
    setIsDraggingEnd(false)
  };

  const handleMouseMove = (event) => {
    if (isDraggingStart || isDraggingEnd) {
      const progressBar = event.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const offsetX = event.clientX - rect.left
      const totalWidth = progressBar.clientWidth
      const newProgress = Math.min(100, Math.max(0, (offsetX / totalWidth) * 100))

      if (isDraggingStart) {
        setStart(Math.min(Math.round(newProgress), end))
      }

      if (isDraggingEnd) {
        setEnd(Math.max(Math.round(newProgress), start))
      }
    }
  }

  return (
    <div
      className="progress-bar"
      onMouseDown={handleMouseDownStart}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="progress"
        style={{ width: `${end - start}%`, left: `${start}%` }}
      >
        <div
          className="progress-handle progress-start-handle"
          onMouseDown={handleMouseDownStart}
        />
        <div
          className="progress-handle progress-end-handle"
          onMouseDown={handleMouseDownEnd}
        />
      </div>
      <div className="progress-label">
        Price Range: {start}% - {end}%
      </div>
    </div>
  )
};

export default ProgressBar;