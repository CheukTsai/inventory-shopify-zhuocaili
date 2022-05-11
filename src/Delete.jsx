import './style.css';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function Delete() {
  const [data, setData] = useState({})
  const pathParams = useParams()
  const navigate = useNavigate()

  function getInventory() {
    axios
      .get("/api/inventories/"+pathParams.inventoryId)
      .then((response) => {
        console.log("Successfully get: ", response.data);
        setData({...response.data, 
          deleteComment:""});
        
      })
      .catch(function (error) {
        console.log("Error: ", error.response.data);
      });
  }

  function handleDelete() {
    axios
      .put(`/api/inventories/` + data._id, {
        ...data,
        isDeleted: true
      })
      .then((response) => {
        console.log("Successfully get: ", response.data);
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
            <h2>name: {data.name}</h2>
            <h2>amount: {data.amount}</h2>
            <h2>Delete Comment</h2>
            <textarea onChange={e=>{
              setData({...data, 
                deleteComment:e.target.value});
            }}></textarea>
            <div className="button red" onClick={() => {
              handleDelete()
            }}>Delete</div>
            </div>
        </div>
    </div>
  );
}

export default Delete;