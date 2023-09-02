import { Form, Button } from "react-bootstrap";
import PageHeader from "../header/header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css';



export default function LoginPage () {
  const api = "http://localhost:5000/auth/login";
  const [errorMessages, setErrorMessages] = useState();
  const [logUserData, setLogUserData] = useState();
  const navigate = useNavigate()

  const handleSubmit = () => {
	// Stop the default submit and page load

	const loginHtmlForm = document.getElementById("login-form");
	const loginFormData = new FormData(loginHtmlForm);

	// Handle validations
	axios.post(api, loginFormData)
		.then(response => {
		console.log(response.data);
		const data = response.data
		setLogUserData(data);
		console.log(logUserData)
		navigate("/chat", {state: {logUserData}})

		})
		.catch(error => {
			if (error.response) {
				console.log(error.response);
				setErrorMessages(error.response.data.message);
			}
		})
	}

	const handleRedirect = (event) => {
		event.preventDefault()
		handleSubmit();
		if (errorMessages) {
			console.log(errorMessages)
			const formDiv = document.getElementById("error_msg");
			formDiv.innerHTML = `${errorMessages}`;
			formDiv.style.display = "grid";
		}

	}

	return (
	<div >
	<PageHeader/>
		<div className="page-div ">
		<div className="auth-wrapper">
		<p id="error_msg" className="text-center"></p>
          <div className="auth-inner bg-primary">
			<Form id="login-form" method="POST">
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
          <Button type="submit" onClick={handleRedirect} className="btn btn-dark">
            Submit
          </Button>
        </div>
        <p className="forgot-password text-right" >
          Forgot <a href="/signup">password?</a>
        </p>
		</Form>
		</div>
		</div>
		</div>
		</div>
	);
}
