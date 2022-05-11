import './style.css';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function Edit() {
  const [data, setData] = useState({})
  const pathParams = useParams()
  const navigate = useNavigate()

  function getInventory() {
    axios
      .get("/api/inventories/"+pathParams.inventoryId)
      .then((response) => {
        console.log("Successfully get: ", response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log("Error: ", error.response.data);
      });
  }

  function handleEdit() {
    axios
      .put(`/api/inventories/` + data._id, {
        ...data
      })
      .then((response) => {
        console.log("Successfully update: ", response.data);
        navigate("/")
      })
      .catch(function (error) {
        console.log("Error: ", error.response.data);
      });
  }

  useEffect(getInventory, [])

  return (
    <div className='page'>
        <div className="container">
            <div className="box">
            <h2>name</h2><input type="text" value={data.name} onChange={
              e=>{
                setData({
                  ...data,
                  name: e.target.value
                })
              }
            }/>
            <h2>amount</h2><input type="number" value={data.amount} onChange={
              e=>{
                setData({
                  ...data,
                  amount: e.target.value
                })
              }
            }/>
            <div className="button blue" onClick={handleEdit}>Submit</div>
            </div>
        </div>
    </div>
  );
}

export default Edit;