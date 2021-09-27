import React, { useState } from 'react';
import { Box } from '@material-ui/system';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Stack } from '@material-ui/core';
import ReactPlayer from 'react-player';
import './App.css';

const App = () => {
  const [countOk, setCountOK] = useState(0);
  const [countNo, setCountNo] = useState(0);

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

  return (
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100%' }}
          >
            <Box sx={{ height: '100%' }}>
              <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ height: '100%' }}
              >
                <div>
                  <div>
                    <ReactPlayer
                      url="https://s3.eu-central-1.amazonaws.com/video.twistrobotics.com/Canada.mp4"
                      playing={true}
                      loop={true}
                      controls={true}
                    />
                  </div>
                </div>
                <div className="form-button">
                  <Stack direction="row" spacing={3}>
                    <Button className="button-ok" onClick={openTextOk} variant="outlined" size="medium">successfully</Button>
                    <Button onClick={openTextNo} variant="outlined" color="secondary" size="medium">unsuccessfully</Button>
                    </Stack>
                </div>
              </Grid>
            </Box>
          </Grid>
    
  )
}

export default App;
