import React from "react";
import MonacoEditor from "react-monaco-editor";
import './JSONEditor.css'

const JSONEditor = (props) => {

    const editorDidMount = (editor, monaco) => {
        editor.focus();
     }

    const onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
      }
    const options = {
        selectOnLineNumbers: true
    };

  // The value in the MonacoEditor is going to be the schema data.
  // This needs to be the same state as the ConfigForm
  return (
    <div className="panel panel-default">
    <div className="panel-heading">
    formData
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={'hello!'}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      </div>
    </div>
  );
};

export default JSONEditor;
