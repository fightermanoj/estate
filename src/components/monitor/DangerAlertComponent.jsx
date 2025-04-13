import React, { useEffect, useState, useCallback, memo } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import "./DangerAlertComponent.scss";

const toolObject = [
  {
    functionDeclarations: [
      {
        name: "analyze_image_data",
        description:
          "You are a drone assistany AI Agent with a attached camera so based on the camera feed you have to explain the user what is in front of the user and then i will give u a satillite image with numbered matrixs so try to tell where are u based on the image and tell the user where drone is present in which matrix or the zone the drone may be present . explain also how would the done navigate throught the from the camera input",
        parameters: {
          type: "object",
          properties: {
            image_data: { type: "string", description: "Base64 encoded image data." },
          },
          required: ["image_data"],
        },
      },
    ],
  },
];

const systemInstructionObject = {
  parts: [
    {
      text: `In this conversation, you will help the user analyze image data to analyse what is in the image and track the accurate location of the image. Use tools to process images before responding.`,
    },
  ],
};

function DangerAlertComponent() {
  const { client, setConfig, connect, connected } = useLiveAPIContext();

  useEffect(() => {
    setConfig({
      model: "models/gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: "audio",
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
        },
      },
      systemInstruction: systemInstructionObject,
      tools: toolObject,
    });
  }, [setConfig]);

  const [imageData, setImageData] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  const analyzeImage = useCallback(async () => {
    if (!imageData) {
      alert("Please provide image data before analyzing.");
      return;
    }

    if (!connected) await connect();

    client.send({
      tool: "analyze_image_data",
      args: { image_data: imageData },
    });
  }, [client, connect, connected, imageData]);

  useEffect(() => {
    const onToolResponse = (response) => {
      if (response.tool === "analyze_image_data") {
        const result = response.result;
        if (result.alert) {
          setAlertMessage(result.alert);
        } else {
          setAlertMessage("No dangerous incidents detected.");
        }
      }
    };

    client.on("toolresponse", onToolResponse);
    return () => client.off("toolresponse", onToolResponse);
  }, [client]);

  return (
    <div className="app">
      <h1>🛑 Safety Alert System</h1>
      <textarea
        className="imageDataInput"
        placeholder="Paste base64-encoded image data here..."
        value={imageData}
        onChange={(e) => setImageData(e.target.value)}
      />
      <button className="analyzeButton" onClick={analyzeImage}>
        Analyze Image
      </button>
      {alertMessage && <div className="alertMessage">{alertMessage}</div>}
    </div>
  );
}

export const DangerAlert = memo(DangerAlertComponent);
