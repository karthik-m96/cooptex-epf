import React, { lazy } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Wages.scss";
import { useParams } from "react-router-dom";
const PDF3A = lazy(() => import("../Pdf/PDF3A"));
const PDF6A = lazy(() => import("../Pdf/PDF6A"));

const Wages = () => {
  const [epf, setEpf] = useState([]);

  let params = useParams();

  const getEpf = () => {
    axios.get(`http://localhost:3001/epf/${params.uan}`).then((res) => {
      setEpf(res.data);
      console.log(res.data);
      console.log(res.data.name)
    });
  };

  useEffect(() => {
    getEpf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="wages">
      <h1>Cooptex EPF Master</h1>
      <h3>Data from 1st April 2017 to 31st March 2023</h3>

      <div className="table">
        {epf.length > 0 &&
          <table>
            <thead>
              <tr>
                <th>S. No</th>
                <th>PF No</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {epf.length > 0 && (
                <tr>
                  <td>1</td>
                  <td>{epf[0].uan}</td>
                  <td>{epf[0].name}</td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
      <div className="btn">
        {epf.length > 0 &&
          <div>
            <PDF3A tableData={epf} />
          </div>
        }
        {epf.length > 0 &&
          <div>
            <PDF6A tableData={epf} />
          </div>
        }

      </div>
    </div>
  );
};

export default Wages;
