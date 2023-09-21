import { faker } from "@faker-js/faker";
import { sample } from "lodash";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Sellers() {
  const [userSellers, setSellers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/sellers")
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const sellers = userSellers.map((el, index) => ({
    id: el.id ? el.id : faker.datatype.uuid(),
    avatarUrl: `/assets/i mages/avatars/avatar_${index + 1}.jpg`,
    name: el.name ? el.name : faker.name.fullName(),
    status: el.status === 2 ? "Completed" : "Pending",
	isVerified: sample(["Yes", "No"]),
    amount: faker.datatype.number(),
	transaction: sample([2, 4, 5, 7, 9, 12, 15]),
	company: faker.company.name()
  }));

  const dummySellers = [...Array(30)].map((el, index) => ({
    id:  faker.datatype.uuid(),
    avatarUrl: `/assets/i mages/avatars/avatar_${index + 1}.jpg`,
    name: faker.name.fullName(),
    status:  sample(["Completed", "Cancelled",  "Pending"]),
	isVerified: sample(["Yes", "No"]),
	amount: faker.datatype.number(),
	transaction: sample([2, 4, 5, 7, 9, 12, 15]),
	company: faker.company.name()
  }));


  return sellers ? sellers : dummySellers;
}
