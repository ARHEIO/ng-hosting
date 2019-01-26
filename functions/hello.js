exports.handler = async (event, context) => {
  const name = event.queryStringParameters.name || "World";
  const execFile = require('child_process').execFile;
  execFile('./test.sh'); 
  return {
    statusCode: 200,
    body: `Hello, ${name}`
  };
};