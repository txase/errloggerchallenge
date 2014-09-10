var exec = require('child_process').exec;
var test = require('tape');

// Travis-CI doesn't have node in its path, but we can get it from npm test
var node = process.argv[2];

function verifyOutput(t, stdout, stderr, firstError, lastError) {
  t.equal(stdout, '', 'should not output anything to stdout');

  if (firstError === undefined) {
    t.equal(stderr, '', 'should not output anything to stderr');
  } else {
    var expected = 'Last 10 errors:\n';
    for (var i = firstError; i <= lastError; i++) {
      expected += 'Error: ' + i + '!\n';
    }

    t.equal(stderr, expected, 'should output last 10 error messages');
  }

  t.end();
}

function verifyNoError(t, err, stdout, stderr, firstError, lastError) {
  t.error(err, 'should not error out executing tester.js');

  if (err) {
    t.end();
    return;
  }

  verifyOutput(t, stdout, stderr, firstError, lastError);
}

function verifyError(t, err, code, stdout, stderr, firstError, lastError) {
  t.ok(err, 'should error out executing tester.js');

  if (!err) {
    t.end();
    return;
  }

  t.equal(err.killed, true, 'tester.js should have been killed');
  t.equal(err.code, code, 'exit code should still be ' + code);

  if (err.killed !== true || err.code !== code) {
    t.end();
    return;
  }

  verifyOutput(t, stdout, stderr, firstError, lastError);
}

test('Nothing output when no errors', function(t) {
  exec(node + ' tester.js', {env: {TEST_NUMBER: 1}}, function(err, stdout, stderr) {
    verifyNoError(t, err, stdout, stderr);
  });
});

test('Output one error', function(t) {
  exec(node +' tester.js', {env: {TEST_NUMBER: 2}}, function(err, stdout, stderr) {
    verifyNoError(t, err, stdout, stderr, 1, 1);
  });
});

test('Output two errors', function(t) {
  exec(node + ' tester.js', {env: {TEST_NUMBER: 3}}, function(err, stdout, stderr) {
    verifyNoError(t, err, stdout, stderr, 1, 2);
  });
});

test('Output last ten errors', function(t) {
  exec(node + ' tester.js', {env: {TEST_NUMBER: 4}}, function(err, stdout, stderr) {
    verifyNoError(t, err, stdout, stderr, 41, 50);
  });
});

// Sadly, Travis-CI won't let us kill child processes
if (!process.env.TRAVIS) {
  test('Output five errors after killed by SIGINT', function(t) {
    child = exec(node + ' tester.js', {env: {TEST_NUMBER: 5}}, function(err, stdout, stderr) {
      verifyError(t, err, 130, stdout, stderr, 1, 5);
    });

    setTimeout(function() {
      child.kill('SIGINT');
    }, 1000);
  });

  test('Output five errors after killed by SIGTERM', function(t) {
    child = exec(node + ' tester.js', {env: {TEST_NUMBER: 5}}, function(err, stdout, stderr) {
      verifyError(t, err, 143, stdout, stderr, 1, 5);
    });

    setTimeout(function() {
      child.kill('SIGTERM');
    }, 1000);
  });
}
