import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { LiveAPIProvider } from "../contexts/LiveAPIContext";
import SidePanel from "./shared/SidePanel";
import { GenList } from "./shared/GenList";
import ControlTray from "./shared/ControlTray";
import clsx from "clsx";
import "./StreamingConsole.scss";

const StreamingConsole = ({ apiKey, uri, supportsVideo = true }) => {
  // Reference for the video element
  const videoRef = useRef(null);

  // State for the active video stream
  const [videoStream, setVideoStream] = useState(null);

  if (!apiKey) {
    throw new Error(
      "API key is required to use the StreamingConsole component."
    );
  }

  return (
    <div className="streaming-console">
      <LiveAPIProvider url={uri} apiKey={apiKey}>
        <SidePanel />
        <main>
          <div className="main-app-area">
            {/* Main application area */}
            <GenList />
            <video
              className={clsx("stream", {
                hidden: !videoRef.current || !videoStream,
              })}
              ref={videoRef}
              autoPlay
              playsInline
            />
          </div>
          <ControlTray
            videoRef={videoRef}
            supportsVideo={supportsVideo}
            onVideoStreamChange={setVideoStream}
          >
            {/* Add custom buttons or elements here */}
          </ControlTray>
        </main>
      </LiveAPIProvider>
    </div>
  );
};

// PropTypes for validation
StreamingConsole.propTypes = {
  apiKey: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  supportsVideo: PropTypes.bool,
};

export default StreamingConsole;
