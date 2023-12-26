import { createdb, dropdb } from 'pgtools';
import { config } from 'dotenv';

config();
const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_NAME,
} = process.env;

const pgtoolsConfig = {
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  host: DATABASE_HOST,
};

switch (process.argv[2]) {
  case 'db:create':
    createDatabase();
    break;
  case 'db:drop':
    dropDatabase();
    break;
  default:
    console.log('Unrecognized command!');
}

async function createDatabase(): Promise<void> {
  console.log(1);

  try {
    await createdb(pgtoolsConfig, DATABASE_NAME);
    console.log(`Database ${DATABASE_NAME} has been successfully created!`);
  } catch (error) {
    if (error.name === 'duplicate_database') {
      console.log(`Database ${DATABASE_NAME} already exists!`);
    } else {
      console.log(error.message);
    }
  }
}

async function dropDatabase(): Promise<void> {
  try {
    await dropdb(pgtoolsConfig, DATABASE_NAME);
    console.log(`Database ${DATABASE_NAME} has been successfully dropped!`);
  } catch (error) {
    if (error.name === 'invalid_catalog_name') {
      console.log(`Database ${DATABASE_NAME} does not exist!`);
    } else {
      console.log(error.message);
    }
  }
}
