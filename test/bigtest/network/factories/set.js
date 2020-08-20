import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: () => faker.random.uuid(),
  name: () => faker.commerce.productName(),
  description: faker.lorem.text,
  createdDate: faker.date.past(0.1, faker.date.past(0.1)).toString(),
  createdByUserId: faker.random.uuid(),
  updatedDate: faker.date.past(0.1).toString(),
  updatedByUserId: faker.random.uuid(),
  filteringConditions: [
    {
      name : 'location',
      value : faker.lorem.word,
      setSpec : faker.lorem.word,
    },
    {
      name : 'resourceType',
      value : faker.lorem.word,
      setSpec : faker.lorem.word,
    },
    {
      name : 'format',
      value : faker.lorem.word,
      setSpec : faker.lorem.word,
    },
    {
      name : 'illPolicy',
      value : faker.lorem.word,
      setSpec : faker.lorem.word,
    },
    {
      name : 'materialType',
      value : faker.lorem.word,
      setSpec : faker.lorem.word,
    },
  ],
});
