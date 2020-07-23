import React, { useState } from "react";
import "./Configs.css";
import ConfigFileList from "./ConfigFileList";
import { List } from "semantic-ui-react";

const Configs = (props) => {

  function getConfigFiles(){
    const fileData = {};
    const formKeys = Object.keys(props.configs).filter(
      (key) => key !== "_id" && key !== "name"
    );

    formKeys.map((key) => {
      if (Array.isArray(props.configs[key])) {
        let obj = { ...props.configs[key] };
        fileData[key] = obj;
      } else {
        fileData[key] = props.configs[key];
      }
    });
    let configFiles = Object.keys(fileData);
    setConfigFiles(configFiles);
    setFileData(fileData);
  }
  
  const [showConfigFiles, showHideConfigFiles] = useState(false);
  const [fileData, setFileData ] = useState(null);
  const [ configFiles, setConfigFiles ] = useState(null);

  return (
    <>
      <ul>
        <List className="site">
          <List.Item>
            <List.Icon name="folder" />
            <List.Content>
              <List.Header 
              onClick={(e) => {
                getConfigFiles();
                console.log('clicking ', e.target)
                showHideConfigFiles((current) => !current.showConfigFiles);

              }}
              >{props.configs.name}</List.Header>
              {showConfigFiles &&
              <ConfigFileList configFiles={configFiles} fileData={fileData}/>}
            </List.Content>
          </List.Item>
        </List>
      </ul>
    </>
  );
};

export default Configs;
