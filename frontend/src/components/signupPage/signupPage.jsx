import { Form, Button } from "react-bootstrap";
import PageHeader from "../header/header";


export default function SignupPage () {


	return (
		<div>
		<PageHeader/>
		<div className="page-div">

		<div className="auth-wrapper">
			<div className="auth-inner bg-primary" id="signup">
		<Form className="form" action="http://localhost:5000/auth/signup" method="POST">
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
			name="first_name"
			id="first_name"
			required
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name"
		  name="last_name"
		  id="last_name"
		  required/>
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
			name="email"
			id="email"
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

        <div className="d-grid">
          <Button type="submit" className="btn btn-dark">
            Sign Up
          </Button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </Form>
			</div>
			</div>
			</div>
			</div>
	)
}