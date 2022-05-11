import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import Delete from './Delete';
import Edit from './Edit';
import Create from './Create';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}></Route>
      <Route path={"/delete/:inventoryId"} element={<Delete/>}></Route>
      <Route path={"/edit/:inventoryId"} element={<Edit/>}></Route>
      <Route path={"/create"} element={<Create/>}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


