import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import PropertyListing from "./components/PropertyListing/PropertyListing";

const URL_TO_BE_CALLED = "https://hidden-cove-65944.herokuapp.com";
function App() {
  const [formValues, setFormValues] = useState({
    streetNum: "",
    unitNum: "",
    street: "",
    streetType: "",
    suburbName: "",
    postcode: "",
    stateSelect: "NSW",
    propertyType: "House"
  });

  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [listingsFound, setListingsFound] = useState(false);

  const handleChange = evt => {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value
    });
  };

  const searchChange = evt => {
    const value = evt.target.value;
    setSearchInput(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      // console.log();
      const result = await axios.get(URL_TO_BE_CALLED);
      setData(result.data);
      console.log(result.data);
    };
    fetchData();
  }, []);

  const findListing = () => {
    // const
    // const result = axios.post("http://localhost:5000/findListing/" + searchInput);
    // setSearchResults(result.data)
    // console.log(result.data);
    axios
      .post(URL_TO_BE_CALLED + "/findListing", {
        query: searchInput
      })
      .then(res => {
        if (res.status === 200) {
          setSearchResults(res.data);
          setListingsFound(true);
          console.log(searchResults);
        } else {
          setListingsFound(false);
        }
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
    console.log(completeAddress);
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
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PropertyListings</h1>
      </header>
      <h2>Search for Properties</h2>
      <div className="App-searchbar">
        <div className="property-listing-search">
          <label htmlFor="propertySearch">Find a property listing</label>
          <input
            type="search"
            value={searchInput}
            onChange={searchChange}
            name="propertySearch"
            id="propertySearch"
          />
        </div>
        <button onClick={findListing} className="submit-buttons">
          Find a listing
        </button>
        <div className="searched-listings">
          {listingsFound ? (
            searchResults.length > 0 ? (
              searchResults.map(val => {
                return (
                  <PropertyListing key={val._id} data={val}>
                    {val.completeAddress}
                  </PropertyListing>
                );
              })
            ) : (
              <div>Sorry, no results found</div>
            )
          ) : null}
        </div>
      </div>
      <h2 className="prop-listing-form-text">
        Please enter the details of your property listing!
      </h2>
      <form className="prop-listing-form" onSubmit={handleSubmit}>
        <span className="prop-listing-form-helper">
          Fields marked (*) are required
        </span>
        <div className="prop-listing-form-ques">
          <label htmlFor="streetNum">Enter the street number</label>
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
          <label htmlFor="street">Enter the street</label>
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
          <label htmlFor="streetType">Enter the street type</label>
          <input
            type="text"
            value={formValues.streetType}
            id="streetType"
            name="streetType"
            onChange={handleChange}
          />
        </div>
        <div className="prop-listing-form-ques">
          <label htmlFor="suburbName">Enter the Suburb Name</label>
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
          <label htmlFor="postcode">Enter the Postcode</label>
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
          <label htmlFor="stateSelect">Choose the State</label>
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
            required
            onChange={handleChange}
          >
            <option>House</option>
            <option>Apartment</option>
            <option>Other</option>
          </select>
        </div>
        <input
          type="submit"
          value="Submit my Listing!"
          className="submit-buttons"
        />
      </form>
      {data.length > 0 ? <h2>Here are all the Listings on the site</h2> : null}
      <div className="all-listings">
        {data.length > 0 &&
          data.map(val => {
            return (
              <PropertyListing key={val._id} data={val}>
                {val.streetNum}
              </PropertyListing>
            );
          })}
      </div>
    </div>
  );
}

export default App;