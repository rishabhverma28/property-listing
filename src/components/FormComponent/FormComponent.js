import React, { useState } from "react";
// import "./App.css";
import axios from "axios";

const URL_TO_BE_CALLED = "http://127.0.0.1:5000";

const FormComponent = props => {
  const [formValues, setFormValues] = useState({
    streetNum: props.data.streetNum || "",
    unitNum: props.data.unitNum || "",
    street: props.data.street || "",
    streetType: props.data.streetType || "",
    suburbName: props.data.suburbName || "",
    postcode: props.data.postcode || "",
    stateSelect: props.data.stateSelect || "NSW",
    propertyType: props.data.propertyType || "House"
  });

  const [listingAdded, setListingAdded] = useState(false);
  const [errorInAdding, setErrorInAdding] = useState(false);

  const handleChange = evt => {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const {
      streetNum,
      unitNum,
      street,
      streetType,
      suburbName,
      postcode,
      stateSelect,
      propertyType
    } = formValues;
    const completeAddress = `${
      unitNum === "" ? "" : unitNum + "/"
    }${streetNum} ${street}, ${suburbName}, ${stateSelect} ${postcode}`;
    if (props.isUpdate === false) {
      axios
        .post(URL_TO_BE_CALLED + "/addListing", {
          streetNum: streetNum,
          unitNum: unitNum,
          street: street,
          streetType: streetType,
          suburbName: suburbName,
          postcode: postcode,
          stateSelect: stateSelect,
          propertyType: propertyType,
          completeAddress: completeAddress
        })
        .then(res => {
          setListingAdded(true);
          setErrorInAdding(false);
        })
        .catch(err => {
          setListingAdded(false);
          setErrorInAdding(true);
        });
    } else {
      console.log("Put called");
      axios.put(URL_TO_BE_CALLED + "/updateListing", {
        _id: props.data._id,
        streetNum: streetNum,
        unitNum: unitNum,
        street: street,
        streetType: streetType,
        suburbName: suburbName,
        postcode: postcode,
        stateSelect: stateSelect,
        propertyType: propertyType,
        completeAddress: completeAddress
      });
    }
  };

  return (
    <form className="prop-listing-form" onSubmit={handleSubmit}>
      <div
        className="prop-listing-form-helper"
        style={{ textAlign: "center", marginBottom: "25px" }}
      >
        Fields marked (*) are required
      </div>
      <div className="prop-listing-form-ques">
        <label htmlFor="streetNum">
          Enter the street number<sup> *</sup>
        </label>
        <input
          type="text"
          value={formValues.streetNum}
          id="streetNum"
          name="streetNum"
          required
          onChange={handleChange}
        />
      </div>
      <div className="prop-listing-form-ques">
        <label htmlFor="unitNum">Enter the unit number</label>
        <input
          type="text"
          value={formValues.unitNum}
          id="unitNum"
          name="unitNum"
          onChange={handleChange}
        />
      </div>
      <div className="prop-listing-form-ques">
        <label htmlFor="street">
          Enter the Street<sup> *</sup>
        </label>
        <input
          type="text"
          value={formValues.street}
          id="street"
          name="street"
          required
          onChange={handleChange}
        />
      </div>
      <div className="prop-listing-form-ques">
        <label htmlFor="streetType">Enter the Street type</label>
        <input
          type="text"
          value={formValues.streetType}
          id="streetType"
          name="streetType"
          onChange={handleChange}
        />
      </div>
      <div className="prop-listing-form-ques">
        <label htmlFor="suburbName">
          Enter the Suburb Name<sup> *</sup>
        </label>
        <input
          type="text"
          value={formValues.suburbName}
          id="suburbName"
          name="suburbName"
          required
          onChange={handleChange}
        />
      </div>
      <div className="prop-listing-form-ques">
        <label htmlFor="postcode">
          Enter the Postcode<sup> *</sup>
        </label>
        <input
          type="text"
          value={formValues.postcode}
          id="postcode"
          name="postcode"
          required
          onChange={handleChange}
        />
      </div>
      <div className="prop-listing-form-ques">
        <label htmlFor="stateSelect">
          Choose the State<sup> *</sup>
        </label>
        <select
          type="text"
          value={formValues.stateSelect}
          id="stateSelect"
          name="stateSelect"
          required
          onChange={handleChange}
        >
          <option>NSW</option>
          <option>TAS</option>
          <option>VIC</option>
          <option>NT</option>
          <option>WA</option>
          <option>ACT</option>
          <option>SA</option>
        </select>
      </div>
      <div className="prop-listing-form-ques">
        <label htmlFor="propertyType">Choose the Property type</label>
        <select
          type="text"
          value={formValues.propertyType}
          id="propertyType"
          name="propertyType"
          onChange={handleChange}
        >
          <option>House</option>
          <option>Apartment</option>
          <option>Other</option>
        </select>
      </div>
      <input
        type="submit"
        value={props.isUpdate ? "Update this Listing!" : "Submit my Listing!"}
        className="submit-buttons"
      />
      {listingAdded ? (
        <div style={{ textAlign: "center" }}>
          Your listing was successfully added
        </div>
      ) : null}
      {errorInAdding ? (
        <div style={{ color: "red", textAlign: "center" }}>
          There was an error in adding your listing. Please try again!
        </div>
      ) : null}
    </form>
  );
};

export default FormComponent;
