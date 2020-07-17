import React, { useState } from "react";
import Configs from "./Configs.js";

const Welcome = (props) => {
  let dummyNYMag = ["grubstreet", "intelligencer", "thecut", "thestrategist"];

  let dummyChorus = [
    "chalkbeat",
    "chicagosuntimes",
    "choruswhitelabel",
    "curbed",
    "deseret",
    "dsow",
    "eater",
    "funnyordie",
    "johnfrieda",
    "mcelroyfamily",
    "meridian",
    "polygon",
    "racked",
  ];

  const [{ config, platform }, showConfigs] = useState({ config: false });

  return (
    <div>
      {!config && (
        <>
          <h5>Welcome to the ConcertAds-Configs Interface</h5>
          <h2>What would you like to create?</h2>
          <ul>
            {React.Children.map(props.platform, (platform) => (
              <li
                className="platform"
                onClick={() => {
                  console.log(platform);
                  showConfigs((currentConfig) => ({
                    config: !currentConfig.config,
                    platform: platform
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
          <Configs
            configs={platform === "Chorus configs" ? dummyChorus : dummyNYMag}
            config={config}
          />
        </>
      )}
    </div>
  );
};

export default Welcome;
