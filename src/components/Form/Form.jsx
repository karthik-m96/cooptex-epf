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

  const handleInputChange = (e) => {
    const value = e.target.value?.trim();
    if(isNaN(value)) return;
    //! Use this reg ex if the expression if fully needed
    // Refer https://stackoverflow.com/questions/61654324/how-to-prevent-user-from-entering-spaces-in-an-input-form-field-in-reactjs
    // const value = e.target.value?.replace(/\D/g, ""); 
    setInputData(value);
  };

  return (
    <div className="cooptex">
      <div className="form">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h2>Co-optex EPF Master</h2>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-uan">
            <label htmlFor="uan">Enter the PF number: </label> <br />
            <input
              id="uan"
              key="uan"
              name="uan_no"
              min={1}
              value={inputData}
              placeholder="PF number to search"
              onChange={handleInputChange}
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
