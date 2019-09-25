import React from "react";
import "./style.css";
function PropertyListing(props) {
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
    </div>
  );
}

export default PropertyListing;
