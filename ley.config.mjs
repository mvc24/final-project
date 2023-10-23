// async function environmentVariables() {
//   const setEnvironmentVariables = await import('./util/config.mjs');
// import dotenv from 'dotenv';
import { setEnvironmentVariables } from './util/config.mjs';

//   return setEnvironmentVariables();
// }

setEnvironmentVariables();

const options = {
  ssl: Boolean(process.env.POSTGRES_URL),
};

export default options;
