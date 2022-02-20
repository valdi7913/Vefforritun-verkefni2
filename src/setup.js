import {
  createSchema,
  dropSchema,
  end,
} from './lib/db.js';

async function create() {
  await dropSchema();
  await createSchema();
  await end();
}

create().catch((err) => {
  console.error('Error creating running setup', err);
});
