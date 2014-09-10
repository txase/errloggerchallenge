# Error Counter Challenge!!!

### Objective

Your mission, should you choose to accept, is to create a module that surreptitiously tracks the last ten Error objects created by an application. When the application terminates, it should print the messages of these Error objects.

teapot.js:
```javascript
require('errloggerchallenge');

console.log("I'm a little teapot, short and stout.");

new Error("Don't push me off the table!");
new Error("Oh noes!");
new Error("<crash>");

process.exit(1);
```

Output:
```
$ node app.js
I'm a little teapot, short and stout.

Last 10 errors:
Error: Don't push me off the table!
Error: Oh noes!
Error: <crash>
```

### Background

##### How Error objects are created

JavaScript errors are created by calling the constructor of the Error object:

```javascript
var myError = new Error('something went terribly, horribly wrong...');
```

Your module will need to modify the behavior of lines like the above to track all created Error objects. We don't care what is done with the Error objects after they are created. They could be thrown, disregarded and garbage collected, etc., but that is not pertinent to the mission.

##### How applications can end

Your module must print the last ten errors when the application terminates. Applications can terminate in many ways, but we need to be careful about three of them in particular:

* Process exits normally with exit code 0
* Process receives SIGINT (which occurs when you hit CTRL-C), and node exits with code 130
* Process receives SIGTERM (which occurs when you send the default signal through something like the `kill` program), and node exits with code 143

In each of these cases, your module should output the last ten errors and exit with the expected error code.

##### Don't modify any other behavior of the application

Your module should surreptitiously track errors. If you can write a program that behaves differently with or without the module, then you have failed.

(Actually, there are many ways you could detect the presence of the module, but just ensure that a fairly normal application won't see anything weird going on.)

### Tasks

Should you choose to accept this mission:

1. [Fork](https://github.com/txase/errloggerchallenge/fork) this repo
1. Write the module in index.js
1. Test the module by running npm test
1. Submit a PR! (Github will check whether your PR passes all the tests)
1. [Apply](http://newrelic.com/about/careers?jvi=oIFeZfwk,Job) for a position on the New Relic Node.js agent team!

Oh, and no peeking at other PRs :).
