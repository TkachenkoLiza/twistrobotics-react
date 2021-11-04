import React, { useEffect } from "react";
import { useCanvas } from "./canvasContext";

export function Canvas({ canvas_width, canvas_height }) {
    console.log('useCanvas')
  const {
    canvasRef,
    coordinates,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
    drawLine,
  } = useCanvas();

  useEffect(() => {
    console.log('prepareCanvas');
    prepareCanvas();
    console.log('prepareCanvas done');
    const widthRatio = canvasRef.current.width / 640;
    const heightRatio = canvasRef.current.height / 300;
    coordinates.map(line => 
      drawLine({
        x: line.x*widthRatio,
        y: line.y*heightRatio,
        x1: line.x1*widthRatio,
        y1: line.y1*heightRatio,
      })
    );
  }, [canvas_width, canvas_height]);

  console.log('rerender canvas');
  return (
    <canvas
      width={canvas_width}
      height={canvas_height}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}