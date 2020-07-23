import React, { useState } from "react";
import Form from "@rjsf/semantic-ui";
import "./ConfigForm.css";

const ConfigForm = (props) => {
  const [formData, setFormData] = useState(null);

  // check if this is still needed
  if (!props.file) {
    return null;
  }

  // Send to .... ?
  const handleSubmit = async (e) => {
    const response = await fetch("url");
  };

  if (!formData) {
    setFormData(props.formData);
  }

  return (
    <div>
      <Form
        // schema={schema}
        // schema={props.schema[props.file]}
        // uiSchema={uiSchema}
        // onSubmit={handleSubmit}
        // formData={props.formData[props.file]}
        // onChange={e => setFormData(e.formData)}
      />
    </div>
  );
};

export default ConfigForm;

