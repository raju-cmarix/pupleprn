import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Card, Progress } from "reactstrap";
import { IoPlay, IoPlayBack, IoPlayForward, IoPause } from "react-icons/io5";
import purplePRNVideo from "../../../assets/video/PurplePRN.mp4";
import MainImage from "../../../assets/images/icons/main-vector.svg";


const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [seekTime, setSeekTime] = useState(null);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [forwardClicked, setForwardClicked] = useState(false);
  const playerRef = useRef(null);

  // Update progress while playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (playerRef.current) {
          const played = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          const newProgress = (played / duration) * 100;
          setProgress(newProgress);
        }
      }, 1000); // Update progress every second

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowThumbnail(false);
  };

  const handleForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const newTime = currentTime + 10;
      playerRef.current.seekTo(newTime, "seconds");
      setSeekTime(newTime);
      setForwardClicked(true);
    }
  };

  const handleBackward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const newTime = currentTime - 10;
      playerRef.current.seekTo(newTime, "seconds");
      setSeekTime(newTime);
    }
  };

  const handleProgressClick = (e) => {
    if (playerRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const progressBarWidth = rect.width;
      const newProgress = (x / progressBarWidth) * 100;
      setProgress(newProgress);

      const duration = playerRef.current.getDuration();
      const newTime = (newProgress / 100) * duration;

      playerRef.current.seekTo(newTime, "seconds");
      setSeekTime(newTime);
      setForwardClicked(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    playerRef.current.seekTo(0);
    setProgress(0);
    setSeekTime(null);
    setForwardClicked(false);
    setShowThumbnail(true);
  };

  return (
    <>
      <div className="videoPlayer  landing-main-img">
        <Card className="card-player">
          {showThumbnail ? (
            <div className="react-player" onClick={handlePlayPause}>
              <img className="video-thumbnail" src={MainImage} alt="Thumbnail" />
            </div>
          ) : (
            <ReactPlayer
              ref={playerRef}
              playing={isPlaying}
              controls={false}
              width="100%"
              height="100%"
              className="react-player"
              onEnded={handleEnded}
              url={purplePRNVideo}
            />
          )}

          <div className="progress-container" onClick={handleProgressClick}>
            <Progress
              className={
                showThumbnail ? "my-3 progress-without-cursor" : "my-3 progress"
              }
              value={progress}
              style={{
                height: "4px",
              }}
              max={100}
            />
          </div>

          <div className=" btn-handler">
            <button className="btn-play" onClick={handleBackward}>
              <IoPlayBack className="btn-playhandle" />
            </button>
            <button className="btn-play" onClick={handlePlayPause}>
              {isPlaying ? (
                <IoPause className="playhandle" />
              ) : (
                <IoPlay className="playhandle" />
              )}
            </button>
            <button className="btn-play" onClick={handleForward}>
              <IoPlayForward className="btn-playhandle" />
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default VideoPlayer;
