import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from './Components/CreatePost.jsx';
import EditPost from './Components/EditPost.jsx';
import FetchPost from './Components/FetchPost.jsx';
import ViewPost from './Components/ViewPost.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index={true} path="/" element={<App />} /> 
        <Route index={false} path="/create" element={<CreatePost />} /> 
        <Route  path="/dashboard" element={<FetchPost />} /> 
        <Route  path="/edit/:id" element={<EditPost />} /> 
        <Route  path="/view/:id" element={<ViewPost />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
