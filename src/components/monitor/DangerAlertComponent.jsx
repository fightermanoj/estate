import React, { useEffect, useState, useCallback, memo } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext";
import "./DangerAlertComponent.scss";

const toolObject = [
  {
    functionDeclarations: [
      {
        name: "analyze_image_data",
        description:
          "Your name is DARSHAN. You are from now a visual assistant to the user, you have to guide me on every question I ask you.Along with that you also are a friendly chatbot to me as well. You also have to direct me to the things you see in the video once i ask for, and guide me to reach them, by using the 3x3 grid system.Remember that you are always looking from the human eye point of view.You only tell me to move hand left right up or down and nothing else on asking. You do not tell about the 3x3 grid. You can understand all the languages but reply only in english",
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
      text: `Your name is DARSHAN. You are from now a visual assistant to the user, you have to guide me on every question I ask you.Along with that you also are a friendly chatbot to me as well. You also have to direct me to the things you see in the video once i ask for, and guide me to reach them, by using the 3x3 grid system.Remember that you are always looking from the human eye point of view.You only tell me to move hand left right up or down and nothing else on asking. You do not tell about the 3x3 grid. You can understand all the languages but reply only in english.`,
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
