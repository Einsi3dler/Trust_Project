import { faker } from "@faker-js/faker";
import { sample } from "lodash";
import account from "./account";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const allUsers = users.map((el, index) => ({
    id: el.id ? el.id : faker.datatype.uuid(),
    avatarUrl: `/assets/i mages/avatars/avatar_${index + 1}.jpg`,
    name: el.first_name ? el.first_name + " " + el.last_name : faker.name.fullName(),
    status:  sample(["Active", "Banned"]),
    role: account.id === el.buyer_id ? "Buyer" : "Seller",
	isVerified: sample(["Yes", "No"]),
	job: sample(['Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer']),
	company: faker.company.name()
  }));

  const dummyUsers = [...Array(30)].map((_, index) => ({
    id:  faker.datatype.uuid(),
    avatarUrl: `/assets/i mages/avatars/avatar_${index + 1}.jpg`,
    name: faker.name.fullName(),
    status:  sample(["Completed", "Cancelled",  "Pending"]),
    role:  sample(["Buyer", "Seller", "Both", "Broker"]),
	isVerified: sample(["Yes", "No"]),
	job: sample(['Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer']),
	company: faker.company.name()
  }));

   console.log(users);
  return allUsers
}
