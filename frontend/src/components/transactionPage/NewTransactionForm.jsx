/* eslint-disable react/no-unescaped-entities */
import { Button, Form } from "react-bootstrap";
import UserHeader from "../header/usersHeader";
import "./transaction.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewConversation() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  console.log(user);
  const api = `http://localhost:5000/api/v1/${user.id}/start_transaction`;
  const [errorMessages, setErrorMessages] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [role, setRole] = useState("selling");
  const [options, setOptions] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    const transactionHtmlForm = document.getElementById("transaction-form");
    const transactionFormData = new FormData(transactionHtmlForm);
    if (role === "selling") {
      transactionFormData.append("seller_id", user.id);
      transactionFormData.append("buyer_id", selectedOption);
    } else {
      transactionFormData.append("buyer_id", user.id);
      transactionFormData.append("seller_id", selectedOption);
    }
    // Handle validations
    axios
      .post(api, transactionFormData)
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessages(error.response.data.message);
          console.log(errorMessages);
        }
      });
  }
  const handleOptionChange = (event) => {
    const selectedValue = event.target.id;
    setSelectedOption(selectedValue);
  };

  function getUsers() {
    const users_api = "http://localhost:5000/api/v1/users";
    axios
      .get(users_api)
      .then((response) => {
        const data = response.data;
        setOptions(data);
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessages(error.response.data.message);
        }
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <UserHeader />
      <div className="page-div ">
        <div className="auth-wrapper ">
          <div className="auth-inner transaction-div" id="signup">
            <Form
              className="form"
              action=""
              id="transaction-form"
              method="POST"
              onSubmit={(e) => handleSubmit(e)}
            >
              <h3 className="text-dark">Start New Transaction</h3>

              <div className="mb-3">
                <label>Transaction title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Transaction title"
                  name="name"
                  id="transaction_title"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Transaction description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  className="desc text-break form-control"
                  placeholder="item description (optional)"
                />
              </div>

              <select
                className="user-role form-select"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="selling">I'm selling</option>
                <option value="buying">I'm buying</option>
              </select>

              <input
                className="partner form-control"
                list="userlist"
                id="user-list"
                placeholder={`Select your ${
                  role === "selling" ? "buyer" : "seller"
                }`}
              />
              <datalist
                onChange={handleOptionChange}
                id="userlist"
                required
              >
                {options?.map((option) => (
                  <option
                    key={option.id}
                    value={option.first_name + " " + option.last_name}
                  />
                ))}
              </datalist>

              <div className="mb-3">
                <label>Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter item"
                  name="item"
                  id="item"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Agreed Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter price"
                  name="price"
                  id="price"
                  required
                />
              </div>

              <div className="d-grid">
                <Button type="submit" className="btn btn-primary">
                  Start Transaction
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
