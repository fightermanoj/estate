import React from "react";

const GradioApp = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <iframe
        src="https://huggingface.co/spaces/fardeenKhadri/estate" // URL of the Gradio app
        title="Safety Analyzer"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
};

export default GradioApp;
