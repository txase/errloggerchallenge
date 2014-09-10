require('./index.js');

if (Error.name !== 'Error') {
  console.error('Aiiiiieeeee! Error function name is wrong!');
  process.exit(1);
}

function createErrors(num) {
  for (var i = 1; i <= num; i++) new Error(i + '!');
}

switch (process.env.TEST_NUMBER) {
  case '1':
    // No errors thrown
    break;

  case '2':
    // Create one error
    createErrors(1);
    break;

  case '3':
    // Create two errors
    createErrors(2);
    break;

  case '4':
    // Create 50 errors
    createErrors(50);
    break;

  case '5':
    // Create 5 errors, wait till killed by signal
    createErrors(5);
    setInterval(function() {}, 10000);
    break;

  default:
    break;
}
