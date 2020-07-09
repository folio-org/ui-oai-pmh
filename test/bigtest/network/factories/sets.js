import faker from 'faker';

import { Factory } from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  name: () => faker.commerce.productName(),
  metadata: {
    createdDate: faker.date.past(0.1, faker.date.past(0.1)).toString(),
    createdByUserId: faker.random.uuid(),
    updatedDate: faker.date.past(0.1).toString(),
    updatedByUserId: faker.random.uuid(),
  },
});
