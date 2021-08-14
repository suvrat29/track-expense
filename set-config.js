var replace = require('replace-in-file');
var apiUrl = process.env.apiUrl;
var accessToken = process.env.accessToken;

const options = {
  files: './projects/track-expense-login/src/environments/environment.prod.ts',
  from: /{API_URL}/g,
  to: apiUrl,
  allowEmptyPaths: false,
};

const options2 = {
  files: './projects/track-expense-login/src/environments/environment.prod.ts',
  from: /{ACCESS_TOKEN}/g,
  to: accessToken,
  allowEmptyPaths: false,
}

try {
  let changedFiles = replace.sync(options);
  console.log('API URL set: ' + apiUrl);
  let changedFiles2 = replace.sync(options2);
  console.log('ACESS TOKEN set: ' + accessToken);
}
catch (error) {
  console.error('Error occurred:');
}
