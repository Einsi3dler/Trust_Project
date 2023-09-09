import { Button, Form } from "react-bootstrap";
import PageHeader from "../header/header";
import "./transaction.css";

export default function NewConversation() {
  return (
    <div>
      <PageHeader />
      <div className="page-div ">
        <div className="auth-wrapper ">
          <div className="auth-inner transaction-div" id="signup">
            <Form className="form" action="" method="POST">
              <h3 className="text-dark">Start New Transaction</h3>

              <div className="mb-3">
                <label>Transaction title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Transaction title"
                  name="trans_title"
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
                  className="form-control desc text-break"
                  placeholder="item description (optional)"
                />
              </div>

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
