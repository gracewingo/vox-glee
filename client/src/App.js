import React from "react";
import "./App.css";
import Welcome from './Welcome';
import YAMLpreview from "./YAMLpreview";

const App = () => {

  let platform = ['Chorus configs', 'New York Mag configs'];

  fetch('api')
    .then(res=> {
      console.log(res);
      return res.json();
    })
    .then(json => {
      console.log(json);

    })
    .catch(error => {
      console.error(error);
    })
  return (
    <div className="App">
      <div className='content'>
        <Welcome platform={platform} />
      </div>
    </div>
  );
};

export default App;
