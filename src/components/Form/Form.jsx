import React, { useState } from "react";
import logo from "../../assets/cooptex.png"
import "./Form.scss";

const Form = () => {
  const [name, setName] = useState("");
  const [pfNumber, setPfNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("PF Number:", pfNumber);
  };

  return (
    <div className="cooptex">
      <div className="form">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-name">
            <label htmlFor="name">Employee Name: </label> <br />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-uan">
            <label htmlFor="uan">Enter the PF number: </label> <br />
            <input
              type="text"
              id="uan"
              value={pfNumber}
              onChange={(e) => setPfNumber(e.target.value)}
            />
          </div>
          <div className="form-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
