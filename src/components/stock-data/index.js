import React, { useState, useEffect } from "react";
import "./index.css";

export default function StockData() {
  let [listData, setListData] = useState([]);
  let [searchvalue, setSearchValue] = useState("");

  useEffect(() => {
    getallData();
  }, []);

  const getallData = () => {
    fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${searchvalue}`)
      .then((response) => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log("jsonData", jsonData);
        setListData(jsonData);
      })
      .catch((error) => {
        // handle your errors here
        console.error(error);
      });
  };

  console.log("listData", listData && listData.data && listData.data.length);

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="text"
          className="large"
          placeholder="Type Date"
          id="app-input"
          data-testid="app-input"
          value={searchvalue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className=""
          onClick={getallData}
          id="submit-button"
          data-testid="submit-button"
        >
          Search
        </button>
      </section>
      {listData && listData.data && listData.data.length > 0 ? (
        <ul
          className="mt-50 slide-up-fade-in styled"
          id="stockData"
          data-testid="stock-data"
        >
          <li className="py-10">
            Open : {listData && listData.data && listData.data.open}
          </li>
          <li className="py-10">
            Close: {listData && listData.data && listData.close}{" "}
          </li>
          <li className="py-10">
            High : {listData && listData.data && listData.high}{" "}
          </li>
          <li className="py-10">
            Low : {listData && listData.data && listData.low}{" "}
          </li>
        </ul>
      ) : (
        <div
          className="mt-50 slide-up-fade-in"
          id="no-result"
          data-testid="no-result"
        >
          No Result Found
        </div>
      )}
    </div>
  );
}
