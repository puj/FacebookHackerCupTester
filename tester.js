var fs = require('fs');

var options;

exports.init = function (runMethod, opts){
	options = opts || {};
	options.inputFile = opts.inputFile || "input.txt";
	options.outputFile = opts.outputFile || "output.txt";
	options.showDebug = opts.showDebug || false;
	options.outputFileStream = fs.openSync(opts.outputFile, 'w');

	var tcs;

	// Read from input file
	fs.readFile(options.inputFile,  "utf-8", function (err, data) {
	  if (err) throw err;
		
		// Array of test case input strings
		tcs = data.replace(/[\r\n]+/g,'\r').split('\r').slice(1);	  

		// Run tests recursively for synchronized output
		runTest(tcs,0,runMethod);

		// Close the output file
		fs.closeSync(options.outputFileStream);
	});
}

function runTest(tcs, i, runMethod){
	// All test cases have been exhausted
	if(typeof tcs[i] === "undefined") return;

	// Create a test case object
	var tc = {
		inputString : tcs[i],	// Save the input string
		id : (parseInt(i)+1),	// Save the test case ID
		stringHeader : "===  TEST CASE " + (parseInt(i)+1) + " ===",
		startTime : Date.now() // Start the timer
	}

	// Print header to debug
	exports.debug(fillStr("=",tc.stringHeader.length));
	exports.debug(tc.stringHeader);

	// Run a test case
	runMethod(tc.inputString,function(data){
		// Print the result to commandline/file
		result("Case #" + tc.id + ": " +data); 

		// Show optional debug output
		exports.debug("Result : " +data);
		exports.debug("Time: " + (Date.now() - tc.startTime) + "ms");
		
		// Run next test case
		runTest(tcs,i+1,runMethod);
	});
}

// Fills a string with a len characters
// e.g. ("-",4) -> "----"
function fillStr(chr, len){
	var str = "";
	while(len-- > 0){
		str+=chr;
	}
	return str;
}

// Prints results, to console and/or file
// Console output if debug is on
// File no matter what
function result(output){
	if(!options.showDebug)console.log(output);
	fs.writeSync(options.outputFileStream, output+"\n");
}


// Prints to console if debug is turned on
exports.debug = function (output){
	if(!options.showDebug)return;
	console.log(output);
}