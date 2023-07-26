import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Table.scss"

const Table = () => {
  const [epf, setEpf] = useState([]);

  const getEpf = () => {
    axios.get("http://localhost:3000/epf").then((res) => {
      setEpf(res.data);
    });
  };

  useEffect(() => {
    getEpf();
  }, [epf]);
  return (
    <div>
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
          {epf.map((item) => (
            <tr key={item.s_no}>
              <td>{item.s_no}</td>
              <td>{item.uan}</td>
              <td>{item.name}</td>
              <td>{item.wages}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );  
};

export default Table;
