import { Form, Button } from "react-bootstrap";
import PageHeader from "../header/header";
import './login.css';


export default function LoginPage () {
return (
	<div >
	<PageHeader/>
		<div className="page-div ">
		<div className="auth-wrapper">
          <div className="auth-inner bg-primary">
			<Form className="form">
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
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
        <p className="forgot-password text-right">
          Forgot <a href="/sign-up">password?</a>
        </p>
		</Form>
		</div>
		</div>
		</div>
		</div>
	);
}
