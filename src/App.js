import React, { useRef, useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
import { Button, Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
// import ReactPlayer from 'react-player';
import videojs from "video.js";
import "video.js/dist/video-js.css";
//import CanvasVideo from './canvasVideo';
import { Canvas } from './components/canvasDrawing';
import './App.css';

const App = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [countOk, setCountOK] = useState(0);
  const [countNo, setCountNo] = useState(0);
  const [canvasProps, setCanvasProps] = useState({width: 640, height: 300});

  useEffect(() => {
    const config = {
      autoplay: false,
      controls: true,
      width: 640,
      height: 300,
      sources: [
        {
          src: "https://s3.eu-central-1.amazonaws.com/video.twistrobotics.com/Canada.mp4",
        },
      ],
    };

    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      const player = playerRef.current = videojs(videoElement, config, () => {
        console.log("player is ready");
      });
    } else {
      

    }

    // check full screen mode
    document.onfullscreenchange = function(event) {
      const player = videoRef.current;
      console.log({width: player.clientWidth, height: window.outerHeight});
      // if (window.outerWidth === window.screen.width && window.outerHeight === window.screen.height) {
      //   console.log('full-screen');
      // } else {
      //   console.log('not full-screen');
      // }
      if (player.clientWidth === window.screen.width) {
        console.log('full-screen');
        console.log({player_width: player.clientWidth, player_height: player.clientHeight});
        console.log({player_clientWidth: player.clientWidth, window_outerHeight: window.outerHeight});
        setCanvasProps({width: player.clientWidth, height: window.outerHeight});
      } else {
        console.log('not full-screen');
        // set canvas to default size
        setCanvasProps({width: 640, height: 300});
      }
    };
  }, []);

  const openTextOk = () => {
    const newCounter = countOk + 1;
    setCountOK(newCounter);
    console.log(`Button pressed ${newCounter} times`)
  }

  const openTextNo = () => {
    const newCounter = countNo + 1;
    setCountNo(newCounter);
    console.log(`Button pressed ${newCounter} times`)
  }
console.log("App render")
  return (
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ height: '100vh' }}>
              <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: '100vh' }}
              >
                <div>
                  <div data-vjs-player>
                    <video
                      ref={videoRef}
                      className="video-js"
                    />
                    <div className="lines">
                      <Canvas canvas_width={canvasProps.width} canvas_height={canvasProps.height} />
                      {/* <CanvasVideo canvas_width={canvasProps.width} canvas_height={canvasProps.height} /> */}
                    </div>
                  </div>
                </div>
                <div className="form-button">
                  <Grid container spacing={3}>
                    <Grid item>
                      <Button className="button-ok" onClick={openTextOk} variant="outlined" size="medium">successfully</Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={openTextNo} variant="outlined" color="secondary" size="medium">unsuccessfully</Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Box>
          </Grid>
    
  )
}

export default App;
