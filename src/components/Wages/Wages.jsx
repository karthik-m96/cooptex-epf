import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Wages.scss";
import { useParams } from "react-router-dom";
import PDF3A from "../Pdf/PDF3A";
import PDF6A from "../Pdf/PDF6A";

const Wages = () => {
  const [epf, setEpf] = useState([]);

  let params = useParams();

  const getEpf = () => {
    axios.get(`http://localhost:3001/epf/${params.uan}`).then((res) => {
      setEpf(res.data);
      console.log(res.data.name)
    });
  };

  useEffect(() => {
    getEpf();
  }, []);

  return (
    <div className="wages">
      <h1>Cooptex EPF</h1>
      <div className="btn">
        {epf.length > 0 &&
          <div>
            <PDF3A uan={params.uan} name={epf[0].name} wages={epf[0].wages} employer_share={epf[0].employer_share} />
          </div>
        }
        {epf.length > 0 &&
          <div>
            <PDF6A uan={params.uan} name={epf[0].name} wages={epf[0].wages} />
          </div>
        }

      </div>
      <div className="table">
        {epf.length > 0 &&
          <table>
            <thead>
              <tr>
                <th>S. No</th>
                <th>UAN No</th>
                <th>Name</th>
                <th>Wages</th>
                <th>Employer Share</th>
              </tr>
            </thead>
            <tbody>
              {epf.map((item, index) => (
                <tr key={item.s_no}>
                  <td>{index + 1}</td>
                  <td>{item.uan}</td>
                  <td>{item.name}</td>
                  <td>{item.wages}</td>
                  <td>{item.employer_share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};

export default Wages;
