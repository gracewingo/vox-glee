import React, { useState } from "react";
import Configs from "./Configs";
import { List, Search } from "semantic-ui-react";
import EditorMain from "./EditorMain";
import "./css/Configs.css";
import "./css/Welcome.css";
import glee from "./glee.jpg";
import rocket from "./rocket.jpeg";


const Welcome = (props) => {
  const [{ config, configSet }, showConfigs] = useState({ config: false });

  function getConfigFiles(e) {
    let configData = props.configs.filter(
      (config) => config.name === e.target.innerHTML
    );

    const fileData = {};
    const formKeys = Object.keys(configData[0]).filter(
      (key) => key !== "_id" && key !== "name"
    );

    formKeys.map((key) => {
      if (Array.isArray(configData[0][key])) {
        let obj = { ...configData[0][key] };
        fileData[key] = obj;
      } else {
        fileData[key] = configData[0][key];
      }
    });

    let configFiles = Object.keys(fileData);
    setConfigFiles(configFiles);
    setFileData(fileData);
    setSiteName(e.target.innerHTML);
    toggleTrueFalse();
  }

  function onClickConfigFile(e) {
    let fileDataName = e.target.innerHTML;
    let jsonFileData = JSON.stringify(fileData[fileDataName], null, " ");
    setJSONData(jsonFileData);
    setFileDataName(fileDataName);
  }

  const [isToggled, setToggled] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [configFiles, setConfigFiles] = useState(null);
  const [siteName, setSiteName] = useState(null);

  const [fileDataName, setFileDataName] = useState(null);
  const [jsonFileData, setJSONData] = useState(null);

  const toggleTrueFalse = () => setToggled(!isToggled);

  let nymag, chorus;
  if (props.configs) {
    chorus = props.configs.filter((config) => config.name !== "grubstreet");
    nymag = props.configs.filter((config) => config.name === "grubstreet");
  }

  return (
    <div>
      {!config && (
        <>
          <div className="main-header">
            <div className="flex-welcome">
              <img className="glee" src={glee}></img>
              <h3>
                Welcome to Glee, A visual editor for creating, editing, and managing
                ConcertAds-Configs.
              </h3>
            </div>
            <h2>What would you like to create?</h2>
            <div className="flex-welcome2">
            <ul>
              {React.Children.map(props.platform, (platform) => (
                <li
                  className="platform"
                  onClick={() => {
                    showConfigs((currentConfig) => ({
                      config: !currentConfig.config,
                      platform: platform,
                      configSet: platform === "Chorus configs" ? chorus : nymag,
                    }));
                  }}
                >
                  {platform}
                </li>
              ))}
            </ul>
            <div>
              <img src={rocket}></img>
            </div>
            </div>
            <a href='https://github.com/gracewingo/vox-glee'>Link to Github</a>
          </div>
        </>
      )}
      {config && (
        <>
          <h1 className="main-header">Choose a site</h1>
          <div className="config-container">
            <div className="siteList-pane">
              <Search />
              {configSet.map((config) => (
                <List className="site" key={config._id}>
                  <List.Item>
                    <List.Icon name="folder" />
                    <List.Content>
                      <List.Header
                        onClick={(e) => {
                          getConfigFiles(e);
                        }}
                      >
                        {config.name}
                      </List.Header>
                      {isToggled && siteName === config.name ? (
                        <div className="list-container">
                          {configFiles.map((configFile, i) => (
                            <List key={i}>
                              <List.Item>
                                <List.Icon name="file" />
                                <List.Content>
                                  <List.Header
                                    onClick={(e) => onClickConfigFile(e)}
                                  >
                                    {configFile}
                                  </List.Header>
                                </List.Content>
                              </List.Item>
                            </List>
                          ))}
                        </div>
                      ) : null}
                    </List.Content>
                  </List.Item>
                </List>
              ))}
            </div>
            <div className="editor-pane">
              {fileDataName && (
                <EditorMain jsonData={jsonFileData} file={fileDataName} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Welcome;
