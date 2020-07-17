import React, {useState} from "react";
import "./Configs.css";
import Welcome from './Welcome';

const ConfigMap = (props) => {

  return (
    <>
      <h1 className="header">Choose a site</h1>
      <ul>
        {React.Children.map(props.configs, (config) => (
          <li className="site"
          
          
          >{config}</li>
        ))}
        {/* <Editor /> */}
      </ul>
      <button 
      onClick={() => {
        // Figure this out
     }}
     >Back</button>
    </>
  );
};

export default ConfigMap;
