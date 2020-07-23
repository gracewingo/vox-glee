import React, { useState, useEffect } from "react";
import "./App.css";
import Welcome from './Welcome';

const App = () => {

  let platform = ['Chorus configs', 'New York Mag configs'];
  const [ configs, setConfigs ] = useState([]);


  useEffect(() => {
    async function fetchConfigs() {
      const response = await fetch('/api/configs');
      const configs = await response.json();
      setConfigs(configs);
    }
    fetchConfigs();
  }, []); 

  return (
    <div className="App">
      <div className='content'>
        <Welcome platform={platform} configs={configs}/>
      </div>
    </div>
  );
};

export default App;
