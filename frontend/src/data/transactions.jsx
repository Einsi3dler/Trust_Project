import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import account from './account';
// ----------------------------------------------------------------------


const transactions = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.company.name(),
  status: sample(['Pending', 'Completed',  'Canceled']),
  role: sample(['Buyer', 'Seller', 'Both', 'Broker']),
  item: sample(['Car', 'Real estate', 'Web services', 'Domain sales', 'Teaching service']),
  price: faker.datatype.number(),
}));

transactions.map((el) => (
	el["buyer"] = (el["role"] === "Buyer") ? account.displayName : faker.name.fullName(),
	el["seller"] = (el["role"] === "Seller") ? account.displayName : faker.name.fullName()
))

export default transactions;
