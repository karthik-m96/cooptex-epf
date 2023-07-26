import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

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
      
      {epf.map((item) => {
        return (
          <div key={item.s_no}>
            <h3>UAN No: {item.uan}</h3>
            <h3>Name: {item.name}</h3>
            <h3>Wages: {item.wages}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
