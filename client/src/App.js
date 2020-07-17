import React from "react";
import "./App.css";
import Welcome from './Welcome';
import YAMLpreview from "./YAMLpreview";

const App = () => {

  let platform = ['Chorus configs', 'New York Mag configs'];

  async function getData(){
    const response = await fetch('/api/configs');
    const data = await response.json();
    console.log(data);
  }

  getData();
  
  return (
    <div className="App">
      <div className='content'>
        <Welcome platform={platform} />
      </div>
    </div>
  );
};

export default App;
