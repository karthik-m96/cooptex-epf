import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Wages.scss";
import { useParams } from "react-router-dom";

const Wages = () => {
  const [epf, setEpf] = useState([]);

  let params = useParams();

  const getEpf = () => {
    axios.get(`http://localhost:3001/epf/${params.uan}`).then((res) => {
      setEpf(res.data);
    });
  };

  useEffect(() => {
    getEpf();
  }, []);

  return (
    <div className="wages">
      <h1>Cooptex EPF</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>S. No</th>
              <th>UAN No</th>
              <th>Name</th>
              <th>Wages</th>
            </tr>
          </thead>
          <tbody>
            {epf.map((item, index) => (
              <tr key={item.s_no}>
                <td>{index + 1}</td>
                <td>{item.uan}</td>
                <td>{item.name}</td>
                <td>{item.wages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wages;
