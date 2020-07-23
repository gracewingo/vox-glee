import React, { useState, useEffect } from "react";
import Form from "@rjsf/semantic-ui";
import "./ConfigForm.css";
import "./JSONEditor.css";
import Editor from "@monaco-editor/react";

export default function EditorMain(props) {
  const { jsonData, file } = props;
  const [schema, setSchema] = useState(null);
  const [formData, setFormData] = useState(null);

  const code = {
    employee: {
      name: "sonoo",
      salary: 56000,
      married: true,
    },
  };

  // Post fileData to the API to get the schema
  useEffect(() => {

    async function postData(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonData,
          };
      
          try {
            const response = await fetch("/api/schema", requestOptions);
            const schema = await response.json();
            setSchema(schema);
            return schema;
          } catch (e) {
            return e;
          }
    }
    postData();
  }, []);

  if (!file) {
    return null;
  }

  //   if (!formData) {
  //     setFormData(props.formData);
  //   }

  // Send updated data to the api
  const handleSubmit = async (e) => {
    const response = await fetch("url");
  };

  const schema = {
    title: "A registration form",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
        default: "Chuck",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      telephone: {
        type: "string",
        title: "Telephone",
        minLength: 10,
      },
    },
  };

  const schema

  return (
    <>
      <div className="left-right">
        <div className="panel panel-default">
          <div className="panel-heading">
            formData
            <Editor
              height="90vh" // By default, it fully fits with its parent
              theme="dark"
              language="json"
              value={jsonData}
              // editorDidMount={handleEditorDidMount}
              // options={{ lineNumbers: "off" }}
            />
          </div>
        </div>
        <Form
          schema={schema}
          // schema={props.schema[props.file]}
          // uiSchema={uiSchema}
          // onSubmit={handleSubmit}
          //   formData={props.formData[props.file]}
          // onChange={e => setFormData(e.formData)}
        />
      </div>
    </>
  );
}
