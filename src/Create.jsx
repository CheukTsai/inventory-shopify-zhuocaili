import "./style.css";
import React, { useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Create() {
  const [data, setData] = useState({});
  const pathParams = useParams();
  const navigate = useNavigate();

  function handleCreate() {
    axios
      .post(`/api/inventories/`, data)
      .then((response) => {
        console.log("Successfully create: ", response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log("Error: ", error.response.data);
      });
  }

  return (
    <div className="page">
      <div className="container">
        <div className="box">
          <h2>name</h2>
          <input
            type="text"
            value={data.name}
            onChange={(e) => {
              setData({
                ...data,
                name: e.target.value,
              });
            }}
          />
          <h2>amount</h2>
          <input
            type="number"
            value={data.amount}
            onChange={(e) => {
              setData({
                ...data,
                amount: e.target.value,
              });
            }}
          />
          <div className="button blue" onClick={handleCreate}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
