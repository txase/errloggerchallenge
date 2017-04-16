var origError = global.Error;
var errors = [];
global.Error = function Error() {
  var err = origError.apply(this, arguments);

  errors.push(err);
  if (errors.length > 10) errors.shift();

  return err;
}

process.on('exit', function() {
  if (errors.length > 0) {
    console.error('Last 10 errors:');
    errors.forEach(function(error) {
      console.error(error.toString());
    });
  }
});

process.on('SIGINT', function() {
  process.exit(130);
});

process.on('SIGTERM', function() {
  process.exit(143);
});
