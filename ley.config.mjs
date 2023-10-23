import { setEnvironmentVariables } from './util/config.mjs';

// async function environmentVariables() {
//   const setEnvironmentVariables = await import('./util/config.mjs');

//   return setEnvironmentVariables();
// }

setEnvironmentVariables();

const options = {
  ssl: Boolean(process.env.POSTGRES_URL),
};

export default options;
