import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [line, setLine] = useState({});
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    console.log(canvas);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    // contextRef.current.beginPath();
    // contextRef.current.moveTo(offsetX, offsetY);
    // contextRef.current.arc(offsetX, offsetY, 5, 0, 2 * Math.PI);
    setIsDrawing(true);
    setLine({...line, x: offsetX, y: offsetY});
  };

  const finishDrawing = ({ nativeEvent }) => {
    console.log(`finishDrawing: ${nativeEvent.offsetX} / ${nativeEvent.offsetY}`)
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.closePath();
    setIsDrawing(false);
    // add to coord array
    setCoordinates([...coordinates, line]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    console.log(`lineTo: x-${offsetX} / y-${offsetY}`);
    setLine({...line, x1: offsetX, y1: offsetY});
    const { x, y } = line;
    contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
    contextRef.current.beginPath();
    contextRef.current.arc(x, y, 5, 0, 2 * Math.PI);
    contextRef.current.moveTo(x, y);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.arc(offsetX, offsetY, 5, 0, 2 * Math.PI);
    contextRef.current.stroke();

    coordinates.map(line => drawLine(line));
  };

  const drawLine = (line, style = {}) => {
    const { x, y, x1, y1 } = line;
    const { color = "black", width = 5 } = style;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    contextRef.current.lineTo(x1, y1);
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = width;
    contextRef.current.stroke();

    contextRef.current.fillStyle = color;
    contextRef.current.beginPath();
    contextRef.current.arc(x, y, 5, 0, 2 * Math.PI);
    contextRef.current.fill();

    contextRef.current.fillStyle = color;
    contextRef.current.beginPath();
    contextRef.current.arc(x1, y1, 5, 0, 2 * Math.PI);
    contextRef.current.fill();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }
console.log(111);
  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        coordinates,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        drawLine
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);