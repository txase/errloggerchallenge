const 
	LoggerError = (function(ErrorGlobal){ return function Error(){ // Function#name is determined by an anonymous function's name
		log.unshift(arguments[0])
		log.length = 10
		return new ErrorGlobal(arguments[0], arguments[1], arguments[2]) // apparently Error's constructor can have 3 args, but Function#apply doesn't work on constructors, and there's no splat operator in ES5
	} })(Error), // iife to preserve `Error` reference at the beginning of the script
	log = []
	
Error = LoggerError

;['SIGINT', 'SIGTERM', 'exit'].forEach(function(s){
	var f
	process.on(s, f = function callee(code){
		if(callee.signal > 0) process.exit(callee.signal)
		
		if(log[0]) console.error('Last 10 errors:')
		log.reverse().forEach(function(e, i){
			console.error('Error: ' + e)
		})
		
		process.exit(code)
	})
	f.signal = { SIGINT: 130, SIGTERM: 143, exit: 0 }[s]
})