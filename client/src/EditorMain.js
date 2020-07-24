import React, { useState, useEffect, useRef } from "react";
import Form from "@rjsf/semantic-ui";
import "./css/JSONEditor.css";
import "./css/ConfigForm.css";
import Editor from "@monaco-editor/react";

export default function EditorMain(props) {
  const { jsonData, file } = props;
  const [schema, setSchema] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const valueGetter = useRef();

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const handleShowValue = () => {
    alert(valueGetter.current());
  };
  // Post config file data to the API to get the schema
  useEffect(() => {
    async function postData() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonData,
      };

      try {
        const response = await fetch("/api/schema", requestOptions);
        const JSONSchema = await response.json();
        setSchema(JSONSchema);
      } catch (e) {
        return e;
      }
    }
    postData();
    setFormData(jsonData);
  },[jsonData]);

  if (!file) {
    return null;
  }

  // Send updated data to the API
  const handleSubmit = async (e) => {
    const response = await fetch("url");
  };

  return (
    <>
      <div className="left-right">
        <div className="panel panel-default">
          <div className="panel-heading">
            formData
            <Editor
              height="80vh"
              theme="dark"
              language="json"
              value={jsonData}
              editorDidMount={handleEditorDidMount}
            />
          </div>
          <button
            className="btn btn-info"
            onClick={handleShowValue}
            disabled={!isEditorReady}
          >
            Preview your changes
          </button>
        </div>
        {schema && formData ? (
          <Form
            schema={schema}
            // onSubmit ={handleShowValue} disabled={!isEditorReady}
            formData={formData}
            onChange={(e) => setFormData(e.formData)}
          />
        ) : null}
      </div>
    </>
  );
}
