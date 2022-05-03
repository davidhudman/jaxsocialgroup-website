import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function App() {
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [showPayButton, setShowPayButton] = useState(false);
  const [showError, setShowError] = useState(true);
  const [forWhat, setForWhat] = useState("");

  const changeInvoiceAmount = (e) => {
    if (isNaN(e.target.value) || e.target.value <= 0) {
      // show error message
      setShowError(true);
      setShowPayButton(false);
    } else {
      setInvoiceAmount(e.target.value);
      setShowError(false);
      setShowPayButton(true);
    }
  };

  const changeTipAmount = (e) => {
    if (isNaN(e.target.value) || e.target.value < 0) {
      // show error message
    } else {
      setTipAmount(e.target.value);
      document.getElementById("tipAmount").value = parseFloat(
        e.target.value
      ).toFixed(2);
    }
  };

  const getTotalAmount = () => {
    if (isNaN(tipAmount) || tipAmount < 0) {
      return parseFloat(invoiceAmount).toFixed(2);
    } else {
      return (parseFloat(invoiceAmount) + parseFloat(tipAmount)).toFixed(2);
    }
  };

  return (
    <div className="App">
      {/* Title */}
      <h1>Pay Me BCH</h1>
      <br />

      {/* Amount owed input */}
      <div className="form-group input-group-lg">
        <input
          type="number"
          onChange={(e) => changeInvoiceAmount(e)}
          placeholder="Enter amount owed"
          className="form-control text-center"
        />
      </div>

      {/* Tip Button Section */}
      <label className="lb-lg">Tip:</label>
      <br />
      <div class="btn-group btn-group-justified" role="group">
        {[0, 0.15, 0.18, 0.2, 0.25].map((num) => {
          return (
            <div class="btn-group" role="group">
              <button
                className="btn btn-default btn-lg"
                onClick={(e) => changeTipAmount(e)}
                value={parseFloat(invoiceAmount) * num}
              >
                {num * 100}%
              </button>
            </div>
          );
        })}
      </div>
      <br />
      <br />

      {/* Tip Input Section */}
      <div className="form-group input-group-lg">
        <input
          id="tipAmount"
          type="number"
          onChange={(e) => changeTipAmount(e)}
          className="form-control text-center"
          placeholder="Or enter custom tip (USD)"
        />
      </div>

      {/* Description Input Section */}
      <div className="form-group input-group-lg">
        <label className="lb-lg" htmlFor="whatForInput">
          Description: &nbsp;
        </label>
        <br />
        <input
          id="whatForInput"
          type="text"
          onChange={(e) => setForWhat(e.target.value)}
          placeholder="order number, pizza, etc"
          className="form-control text-center"
        />
      </div>
      <br />

      {/* Total Amuont Section */}
      {/* <br />
      <h4>Total amount: ${getTotalAmount()}</h4>
      <br /> */}

      {/* Pay Button Section */}
      <form
        name="prompt-cash-form"
        action="https://prompt.cash/pay"
        method="get"
      >
        <input type="hidden" name="token" value="608-eiDIZuKh" />
        <input type="hidden" name="tx_id" value={Date.now()} />
        <input type="hidden" name="amount" value={getTotalAmount()} />
        <input type="hidden" name="currency" value="USD" />
        <input type="hidden" name="desc" value={forWhat} />
        <input type="hidden" name="return" value="http://pay.flylert.com" />
        {/* <input
            type="hidden"
            name="callback"
            value="http://your-store.com/api/v1/update-payment"
          /> */}
        <button
          type="submit"
          className={
            showPayButton
              ? "btn btn-block btn-lg btn-success"
              : "btn btn-block btn-lg btn-warning"
          }
          disabled={!showPayButton}
        >
          Pay ${getTotalAmount()}
        </button>
      </form>
    </div>
  );
}
