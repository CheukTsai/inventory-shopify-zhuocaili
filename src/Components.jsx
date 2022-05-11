import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Box(props) {
  const navigate = useNavigate();

  const { _id, name, amount, isDeleted, deleteComment } = props.data;
  const [deleting, setDeleting] = useState(false);

  function handleUndelete(data) {
    axios
      .put(`/api/inventories/` + _id, {
        data,
        isDeleted: false
      })
      .then((response) => {
        console.log("Successfully update: ", response.data);
      })
      .catch(function (error) {
        console.log("Error: ", error.response.data);
      });
  }

  function handlePermanatlyDelete(id) {
    axios
      .delete(`/api/inventories/` + id)
      .then((response) => {
        console.log("Successfully delete: ", response.data);
      })
      .catch(function (error) {
        console.log("Error: ", error.response.data);
      });
  }

  function generateUndeletedButtons() {
    return (
      <div className="button-container">
        <Button color="red" click={()=>navigate(`/delete/` + _id)}>
          Delete
        </Button>
        <Button color="blue" click={()=>navigate(`/edit/` + _id)}>Edit</Button>
      </div>
    );
  }

  function generateDeletedButtons() {
    return (
      <div className="button-container">
        <Button color="red" click={() => {
          handlePermanatlyDelete(props.data._id)
          props.setClick(true)
        }}>Permenantly Delete</Button>
        <Button color="blue" click={()=> {
          handleUndelete({...props.data, isDeleted: false, deleteComment: ""})
          props.setClick(true)
        }}>Undelete</Button>
      </div>
    );
  }

  return (
    <div className={isDeleted ? "box box-gray" : "box"}>
      <div className="text-part">
        <h2>name: {name}</h2>
        <h2>amount: {amount}</h2>
        {isDeleted ? <h2>Delete Comment: {deleteComment}</h2> : null}
        {isDeleted ? generateDeletedButtons() : generateUndeletedButtons()}
      </div>
    </div>
  );
}

function Container(props) {
  const [inventories, setInventories] = useState([]);
  const [click, setClick] = useState(false)

  const navigate = useNavigate()

  function getInventories() {
    axios
      .get("/api/inventories/")
      .then((response) => {
        console.log("Successfully get: ", response.data);
        setInventories(response.data);
      })
      .catch(function (error) {
        console.log("Error: ", error.response.data);
      });
  }

  function handleCreate(data) {
    axios
      .post(`/api/inventories/`, 
        data
      )
      .then((response) => {
        console.log("Successfully create: ", response.data);
      })
      .catch(function (error) {
        console.log("Error: ", error.response.data);
      });
  }

  useEffect(getInventories, [click]);

  return (
    <div className="container">
      <Button color="blue" click={() => navigate("/create")}>Create Inventory</Button>
      {inventories.map((i) => {
        return <Box data={i} setClick={setClick}></Box>;
      })}
    </div>
  );
}

function Button(props) {
  return (
    <div className={"button " + props.color} onClick={props.click}>
      {props.children}
    </div>
  );
}

export { Box, Container };
