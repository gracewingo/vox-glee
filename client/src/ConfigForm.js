import React, { useState } from "react";
import Form from "@rjsf/semantic-ui";
import "./css/ConfigForm.css";

const ConfigForm = (props) => {
  const [formData, setFormData] = useState(null);

  // check if this is still needed
  if (!props.file) {
    return null;
  }

  // Send to the api/configs to set the new data in the database
  const handleSubmit = async (e) => {
    const response = await fetch('/api/configs');
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

