import React from "react";
import "./css/Configs.css";
import ConfigFileList from "./ConfigFileList";
import { List } from "semantic-ui-react";

const Configs = (props) => {

  const { configs, onClick} = props

  return (
    <>
      <ul>
        <List className="site">
          <List.Item>
            <List.Icon name="folder" />
            <List.Content>
              <List.Header
                onClick={(e) => {onClick(e)}}
              >
                {configs.name}
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </ul>
    </>
  );
};

export default Configs;
