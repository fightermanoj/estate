import React, { useEffect, useState, useCallback, memo } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import "./DangerAlertComponent.scss";

const toolObject = [
  {
    functionDeclarations: [
      {
        name: "analyze_image_data",
        description:
          "Analyzes the provided image data to detect dangerous or unsafe incidents. Returns a safety alert if an issue is detected.",
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
      text: `In this conversation, you will help the user analyze image data to detect dangerous or physically unsafe incidents. Use tools to process images before responding.`,
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
