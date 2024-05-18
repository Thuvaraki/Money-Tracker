import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [purpose, setPurpose] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return json;
  }

  function addNewTransaction(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    console.log("API URL:", url);

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ purpose, price, date, description }),
    }).then((response) => {
      response.json().then((json) => {
        setPurpose("");
        setPrice("");
        setDate("");
        setDescription("");
        console.log("result", json);
        setTransactions([...transactions, json]);
      });
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "purpose") {
      setPurpose(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + Number(transaction.price);
  }

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card w-50">
        <div className="card-body">
          <form onSubmit={addNewTransaction}>
            <div className="d-flex align-items-center justify-content-center">
              <h2 className={`mb-4 ${balance > 0 ? "green" : "red"}`}>
                Rs {balance}
              </h2>
            </div>
            <div className="w-100">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter your purpose of transaction"
                name="purpose"
                value={purpose}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter price like +200 or -300"
                name="price"
                value={price}
                onChange={handleInputChange}
              />
              <input
                type="date"
                className="form-control mb-3"
                name="date"
                value={date}
                onChange={handleInputChange}
              />
              <textarea
                className="form-control mb-3"
                placeholder="Description of transaction"
                name="description"
                value={description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-dark w-100">
                Add new transaction
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container d-flex flex-column  w-50 mt-4">
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <div key={index} className="card mt-2 w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <div>{transaction.purpose}</div>
                    <div>{transaction.description}</div>
                  </div>
                  <div>
                    <div
                      className={`price ${
                        transaction.price < 0 ? "red" : "green"
                      }`}
                    >
                      {transaction.price}
                    </div>
                    <div>{transaction.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
