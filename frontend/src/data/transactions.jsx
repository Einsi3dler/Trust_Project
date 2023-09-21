import { faker } from "@faker-js/faker";
import { sample } from "lodash";
import account from "./account";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Transactions() {
  const [userTransactions, setUserTransactions] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/${account.id}/transactions`)
      .then((response) => {
        setUserTransactions(response.data);
      })
      .catch((error) => {
        setUserTransactions([...Array(24)]);
        console.log(error.message);
      });
  }, []);

  const transactions = userTransactions.map((el, index) => ({
    id: el.id ? el.id : faker.datatype.uuid(),
    avatarUrl: `/assets/i mages/avatars/avatar_${index + 1}.jpg`,
    name: el.name ? el.name : faker.name.fullName(),
    status: el.status === 2 ? "Completed" : "Pending",
    role: account.id === el.buyer_id ? "Buyer" : "Seller",
    item: el.item ? el.item : "Dummy data",
    description: el.description ? el.description : "Dummy data",
    price: el.agreed_price ? el.agreed_price : faker.datatype.number()
  }));

  const dummyTransactions = [...Array(30)].map((el, index) => ({
    id:  faker.datatype.uuid(),
    avatarUrl: `/assets/i mages/avatars/avatar_${index + 1}.jpg`,
    name: faker.name.fullName(),
    status:  sample(["Completed", "Cancelled",  "Pending"]),
    role:  sample(["Buyer", "Seller"]),
    item: "Dummy data",
    description:  "Dummy data",
    price: faker.datatype.number()
  }));

  transactions.map(
    (el) => (
      (el["buyer"] =
        el["role"] === "Buyer" ? account.displayName : faker.name.fullName()),
      (el["seller"] =
        el["role"] === "Seller" ? account.displayName : faker.name.fullName())
    )
  );

  dummyTransactions.map(
    (el) => (
      (el["buyer"] =
        el["role"] === "Buyer" ? account.displayName : faker.name.fullName()),
      (el["seller"] =
        el["role"] === "Seller" ? account.displayName : faker.name.fullName())
    )
  );

  return transactions ? transactions : dummyTransactions;
}
