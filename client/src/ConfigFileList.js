import React, { useState } from "react";
import { List } from "semantic-ui-react";
import EditorMain from "./EditorMain";
import "./css/ConfigFileList.css";

export default function ConfigFileList({ configFiles, fileData }) {

  function onClickConfigFile(e) {
    let fileDataName = e.target.innerHTML;
    let jsonFileData = JSON.stringify(fileData[fileDataName], null, " ");
    setJSONData(jsonFileData);
    setFileData(fileDataName);
  }

  const [fileDataName, setFileData] = useState(null);
  const [jsonFileData, setJSONData] = useState(null);

  return (
    <>
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

          {fileDataName && (
            <EditorMain jsonData={jsonFileData} file={fileDataName} />
          )}

    </>
  );
}
