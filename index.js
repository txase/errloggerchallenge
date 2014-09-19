var _origError      = Error,
    stashedErrors   = [];

Error = function Error( message ) {
  stashedErrors.push( 'Error: ' + message );
  if ( stashedErrors.length > 10 ) { stashedErrors.shift(); }
  return _origError.apply( this, arguments );
};
Error.prototype = _origError;

var trapHandler = function( code ) {
  process.exit( code );
};

var exitHandler = function( code ) {
  if ( stashedErrors.length > 0 ) {  
    console.error( 'Last 10 errors:' );
    console.error( stashedErrors.join('\n') );
  }

  process.exit( code );
};

process.on( 'exit',    exitHandler );
process.on( 'SIGINT',  trapHandler.bind(null, 130) );
process.on( 'SIGTERM', trapHandler.bind(null, 143) );
