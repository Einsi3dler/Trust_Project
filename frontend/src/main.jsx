import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import  'react-bootstrap/dist/react-bootstrap';
import './App.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <App />
		</BrowserRouter>
);
