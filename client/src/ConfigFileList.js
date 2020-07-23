import React, { useState } from "react";
import { List, Divider, Grid, Image, Segment } from "semantic-ui-react";
import ConfigForm from "./ConfigForm";
import JSONEditor from "./JSONEditor";
import "./ConfigFileList.css";

export default function ConfigFileList({ configFiles, fileData }) {
  function onClickConfigFile(e) {
    let fileDataName = e.target.innerHTML;
    setFileData(fileDataName);
  }

  const [fileDataName, setFileData] = useState(null);
  // When I click on a config (site) yaml file name, show the corresponding form for it.

  return (
    <>
      <div className="configList-container">
        <div className="list-container">
          {configFiles.map((configFile, i) => (
            <List key={i}>
              <List.Item>
                <List.Icon name="folder" />
                <List.Content>
                  <List.Header onClick={(e) => onClickConfigFile(e)}>
                    {configFile}
                  </List.Header>
                </List.Content>
              </List.Item>
            </List>
          ))}
        </div>
        <div className='left-right'>
          {fileDataName && <JSONEditor />}
          {fileDataName && (
            <ConfigForm
              formData={fileData}
              schema={fileData}
              file={fileDataName}
            />
          )}
        </div>
      </div>
    </>
  );
}
