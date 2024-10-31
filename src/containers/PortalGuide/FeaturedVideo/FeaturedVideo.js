import React, { useState, useRef, useEffect } from "react"
import ReactPlayer from 'react-player';
import { makeStyles } from "@mui/styles"
import {
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MuiDialogTitle from "@mui/material/DialogTitle";
import guideData from "data/dummy/guideData";
import { IconGraphy } from "@leapeasy/ui-kit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  playbtn: {
    fontSize: '50px',
  },
  dialog: {
    width: '100%',
    height: '100%',
  },
  dialogtitle: {
    margin: 0,
    // padding: 0
  },
}));

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.dialogtitle} {...other}>
      <Typography variant="h6" color="primary">
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <IconGraphy icon="General.Clear" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};


export const FeaturedVideo = (props) => {

  const { userRole } = props;
  const classes = useStyles();
  const { guideSteps } = guideData;
  const [video, setVideo] = useState(null);
  const playerRef = useRef(null);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    setVideoData(guideSteps);
  }, [video]);

  const handlePreview = (data) => {
    setVideo(data);
    setVideoData(null);
    playerRef.current.showPreview();
  };

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" spacing={3}>
        {videoData &&
          videoData.map((step, index) => (
            <>
              {userRole === 'pm' ? (
                <>
                  {!(index === 2 || index === 3) && (
                    <Grid item xs={12} md={6} lg={4}>
                      <Card elevation={5}>
                        <CardMedia>
                          <ReactPlayer
                            url={step.videoURL}
                            ref={playerRef}
                            width="100%"
                            height="300px"
                            playing={false}
                            onClickPreview={() => handlePreview(step)}
                            playIcon={
                              <IconButton color="primary" onClick={() => handlePreview(step)}>
                                <IconGraphy icon="MediaDevices.PlayArrow" />
                              </IconButton>
                            }
                            light
                          />
                          <Typography color="primary" variant="h6" className="p-2">
                            {step.title}
                          </Typography>
                        </CardMedia>
                      </Card>
                    </Grid>
                  )}
                </>
              ) : (
                <>
                  <Grid item xs={12} md={6} lg={4}>
                    <Card elevation={5}>
                      <CardMedia>
                        <ReactPlayer
                          url={step.videoURL}
                          ref={playerRef}
                          width="100%"
                          height="300px"
                          playing={false}
                          onClickPreview={() => handlePreview(step)}
                          playIcon={
                            <IconButton color="primary" onClick={() => handlePreview(step)}>
                              <IconGraphy icon="MediaDevices.PlayArrow" />
                            </IconButton>
                          }
                          light
                        />
                        <Typography color="primary" variant="h6" className="p-2">
                          {step.title}
                        </Typography>
                      </CardMedia>
                    </Card>
                  </Grid>
                </>
              )}
            </>
          ))}
      </Grid>
      {video && (
        <Dialog
          open
          className={classes.dialog}
          onClose={() => setVideo(null)}
          maxWidth="md"
          scroll="body"
        >
          <DialogTitle onClose={() => setVideo(null)}>{video.title}</DialogTitle>
          <DialogContent className="p-2">
            <ReactPlayer
              url={video.videoURL}
              width="100%"
              height="500px"
              controls
              playing
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}