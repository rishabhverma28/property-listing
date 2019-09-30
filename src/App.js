import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import FormComponent from "./components/FormComponent/FormComponent";

import PropertyListing from "./components/PropertyListing/PropertyListing";

const URL_TO_BE_CALLED = "http://127.0.0.1:5000";
// const URL_TO_BE_CALLED = "https://hidden-cove-65944.herokuapp.com";;
function App() {
  const emptyData = {
    streetNum: "",
    unitNum: "",
    street: "",
    streetType: "",
    suburbName: "",
    postcode: "",
    stateSelect: "NSW",
    propertyType: "House"
  };

  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [listingsFound, setListingsFound] = useState(false);

  const searchChange = evt => {
    const value = evt.target.value;
    setSearchInput(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(URL_TO_BE_CALLED);
      setData(result.data);
    };
    fetchData();
  }, []);

  const findListing = () => {
    axios
      .post(URL_TO_BE_CALLED + "/findListing", {
        query: searchInput
      })
      .then(res => {
        if (res.status === 200) {
          setSearchResults(res.data);
          setListingsFound(true);
        } else {
          setListingsFound(false);
        }
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
                  <PropertyListing key={val._id} data={val} isUpdate={true}>
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
      <FormComponent data={emptyData} isUpdate={false} />

      {data.length > 0 ? <h2>Here are all the Listings on the site</h2> : null}
      <div className="all-listings">
        {data.length > 0 &&
          data.map(val => {
            return (
              <PropertyListing key={val._id} data={val} isUpdate={true}>
                {val.streetNum}
              </PropertyListing>
            );
          })}
      </div>
    </div>
  );
}

export default App;
