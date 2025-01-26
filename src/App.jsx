import React from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import StreamingConsole from "./components/StreamingConsole";
import Spatial from "./components/spatial_shared/App";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (typeof API_KEY !== "string") {
  throw new Error("Set REACT_APP_GEMINI_API_KEY in the .env file.");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

const App = () => {
  return (
    <main>
      <Routes>
        {/* public routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route
          path="/chat"
          element={<StreamingConsole apiKey={API_KEY} uri={uri} />}
        />
        <Route path="/spatial" element={<Spatial />} />
        {/* <Route path="/spatial" element={<Spatial />} /> */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </main>
  );
};

export default App;
