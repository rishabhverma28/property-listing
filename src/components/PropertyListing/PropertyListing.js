import React, { useState } from "react";
import "./style.css";
import FormComponent from "../FormComponent/FormComponent";

function PropertyListing(props) {
  const [showForm, setShowForm] = useState(false);
  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="property-listing">
      <div>
        {props.data.unitNum ? props.data.unitNum + "/" : null}
        {props.data.streetNum}
      </div>
      <div>{props.data.street}</div>
      <div>{props.data.suburbName}</div>
      <div>{props.data.postcode}</div>
      <div>{props.data.stateSelect}</div>
      <div onClick={handleClick}>Update</div>
      {showForm && (
        <FormComponent data={props.data} isUpdate={props.isUpdate} />
      )}
    </div>
  );
}

export default PropertyListing;
