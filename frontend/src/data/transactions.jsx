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

  if (!userTransactions.length) {
    setUserTransactions([...Array(24)]);
  }

  const transactions = userTransactions.map((el, index) => ({
    id: faker.datatype.uuid(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    name:  faker.name.fullName(),
    status: sample(["Completed", "Pending", "Cancelled"]),
    role: sample(["Buyer", "Seller"]),
    item: "Dummy data",
    description: "Dummy data",
    price:  faker.datatype.number()
  }));

  transactions.map(
    (el) => (
      (el["buyer"] =
        el["role"] === "Buyer" ? account.displayName : faker.name.fullName()),
      (el["seller"] =
        el["role"] === "Seller" ? account.displayName : faker.name.fullName())
    )
  );

  return transactions;
}
