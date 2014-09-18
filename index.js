// Put your module code here!
process.on('exit', function() {
	printErrors(function(){
		process.exit();
	});
});

process.on('SIGINT', function () {
  printErrors(function(){
		process.exit();
  });
});

process.on('SIGTERM', function() {
	printErrors(function(){
		process.exit();
  });
});

var errors = []

Error = function Error(message) {
	this.message = message;
	this.name = Error.name;
	
	errors.push(this);
}

var printErrors = function(done) {
	var str = '';
	if(errors.length){
		str += "Last 10 errors:";
		if(errors.length > 10){
			errors = errors.slice(errors.length-10);
		}
		var count = 0;
		errors.forEach(function(err) {
			str += "\n" + err.name + ": " + err.message;
			if(++count == errors.length){
				console.error(str);
				done();
			}
		});
	}
};
