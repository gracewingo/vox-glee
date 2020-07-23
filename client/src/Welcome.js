import React, { useState } from "react";
import Configs from "./Configs";
import "./Configs.css";
import "./Welcome.css";
import glee from './glee.jpg'

const Welcome = (props) => {
  let dummyNYMag = ["grubstreet"];

  const [{ config, platform }, showConfigs] = useState({ config: false });

  return (
    <div>
      {!config && (
        <>
          <div className="flex-welcome">
          <img src={glee}></img>
          <h3>Welcome to Glee: A visual editor for creating, editing, and managing ConcertAds-Configs</h3>
  
          </div>
          <h2>What would you like to create?</h2>
          <ul>
            {React.Children.map(props.platform, (platform) => (
              <li
                className="platform"
                onClick={() => {
                  showConfigs((currentConfig) => ({
                    config: !currentConfig.config,
                    platform: platform,
                  }));
                }}
              >
                {platform}
              </li>
            ))}
          </ul>
        </>
      )}
      {config && (
        <>
          <h1 className="header">Choose a site</h1>
          <div className="config-container">
            {props.configs.map((config) => (
              <Configs
                key={config._id}
                className="site"
                configs={platform === "Chorus configs" ? config : dummyNYMag}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Welcome;
