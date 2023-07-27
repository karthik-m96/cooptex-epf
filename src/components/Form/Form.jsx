import { React, useState } from "react";
import logo from "../../assets/cooptex.png";
import "./Form.scss";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/epf/${inputData}`);

  };

  return (
    <div className="cooptex">
      <div className="form">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h2>Cooptex EPF Master</h2>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-uan">
            <label htmlFor="uan">Enter the PF number: </label> <br />
            <input
              type="text"
              id="uan"
              name="uan_no"
              value={inputData}
              placeholder="PF number to search"
              onChange={(e) => setInputData(e.target.value)}
              required
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
