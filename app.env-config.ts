import { writeFile } from 'fs';
const environment = 'prod';
const isProd = environment === 'prod';

const targetPath = `./projects/track-expense-login/src/environments/environment.${environment}.ts`;
const envConfigFile = `
export const environment = {
  production: ${isProd},
  accessToken: "${process.env.accessToken}",
  apiUrl: "${process.env.apiUrl}"
};
`
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
