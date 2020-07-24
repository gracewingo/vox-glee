import React, { useState, useEffect } from "react";
import "./css/App.css";
import Welcome from "./Welcome";

const App = () => {
  let platform = ["Chorus configs", "New York Mag configs"];
  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    async function fetchConfigs() {
      const response = await fetch("https://revexp-tools-server.herokuapp.com/api/configs");
      const configs = await response.json();
      setConfigs(configs);
    }
    fetchConfigs();
  }, []);

  return (
    <div className="App">
      <Welcome platform={platform} configs={configs} />
    </div>
  );
};

export default App;
