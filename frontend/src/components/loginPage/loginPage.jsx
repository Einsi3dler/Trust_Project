import { Button } from "react-bootstrap";
import PageHeader from "../header/header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css';



export default function LoginPage () {
  const api = "http://localhost:5000/auth/login";
  const [errorMessages, setErrorMessages] = useState();
  const [logUserData, setLogUserData] = useState(false);
  const navigate = useNavigate()

  function handleSubmit () {

	const loginHtmlForm = document.getElementById("login-form");
	const loginFormData = new FormData(loginHtmlForm);

	// Handle validations
	axios.post(api, loginFormData)
		.then(response => {
		const data = response.data;
		setErrorMessages(false);
		setLogUserData(data);
		localStorage.setItem('loggedUser', JSON.stringify(data));
		})
		.catch(error => {
			if (error.response) {
				setErrorMessages(error.response.data.message);
			}
		})
	}

	function handleRedirect () {

		handleSubmit();
		if (errorMessages) {
			const formDiv = document.getElementById("error_msg");
			formDiv.innerHTML = `${errorMessages}`;
			formDiv.style.display = "grid";
			return false
		}
		if (logUserData) {

			navigate("/chat", {state: {logUserData}})
		}


	}

	return (
	<div >
	<PageHeader/>
		<div className="page-div ">
		<div className="auth-wrapper">
		<p id="error_msg" className="text-center"></p>
          <div className="auth-inner bg-primary">
			<form onSubmit={(e)=>{ e.preventDefault(); handleRedirect()}} id="login-form" method="POST">
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
			id="email"
			name="email"
			required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
			name="password"
			id="password"
			required
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <Button type="submit" className="btn btn-dark">
            Submit
          </Button>
        </div>
        <p className="forgot-password text-right" >
          Forgot <a href="/signup">password?</a>
        </p>
		</form>
		</div>
		</div>
		</div>
		</div>
	);
}
