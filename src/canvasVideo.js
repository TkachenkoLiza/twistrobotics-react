import React, { useRef, useEffect } from "react";

function CanvasVideo({ canvas_width, canvas_height }) {
  const canvas = useRef();
  let ctx = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    console.log("render");
    console.log({canvas_width: canvasEle.clientWidth, canvas_height: canvasEle.clientHeight});

    // get context of the canvas
    ctx = canvasEle.getContext("2d");

    const widthRatio = canvasEle.width / 640;
    const heightRatio = canvasEle.height / 300;
    drawLine({ x: 50*widthRatio, y: 50*heightRatio, x1: 200*widthRatio, y1: 50*heightRatio }, { color: "red", width: 4 });
    drawLine({ x: 300*widthRatio, y: 250*heightRatio, x1: 260*widthRatio, y1: 40*heightRatio }, { color: "green", width: 4 });
    drawLine({ x: 500*widthRatio, y: 200*heightRatio, x1: 160*widthRatio, y1: 120*heightRatio }, { color: "blue", width: 4 });
  }, [canvas_width, canvas_height]);

  // draw a line
  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = "brown", width = 3 } = style;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
    ctx.fill();
  };

  return (
    <div>
      <canvas ref={canvas} width={canvas_width} height={canvas_height}></canvas>
    </div>
  );
}

export default CanvasVideo;
