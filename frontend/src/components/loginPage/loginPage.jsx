import { Form, Button } from "react-bootstrap";
import PageHeader from "../header/header";
import { useState } from "react";
import axios from "axios";
import './login.css';



export default function LoginPage () {


	return (
	<div >
	<PageHeader/>
		<div className="page-div ">
		<div className="auth-wrapper">
          <div className="auth-inner bg-primary">
			<Form action="http://localhost:5000/auth/login" method="POST" id="login-form">
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
          Forgot <a href="/sign-up">password?</a>
        </p>
		</Form>
		</div>
		</div>
		</div>
		</div>
	);
}
