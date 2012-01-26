# Facebook Hackercup Tester
A simple tester to ease rapid testing during the HackerCup competitions.

1.  Easy debug functionality  
2.  Always write to the output.txt in the proper format  
3.  Easily switch between debug and "result mode"  
4.  Automatically shows runtime in ms in debug mode  

## Installation
1. git clone  into your working director (e.g. .../Billboard/ )
2. Create a new .js file and go to the Usage section

## Usage
Use the following template in your .js file.  I use "index.js".

	var tester = require ("./tester.js"),
		d = require ("./tester.js").debug;

	tester.init(run,{
		showDebug:true,			
		inputFile:"input.txt",
		outputFile:"output.txt",

	} );

	function run(inputString,callback){
		var myResult;
		// Do your calculations here

		// Debug some data
		d("myResult currently is : " + myResult)

		// Return your result to the tester
		callback(myResult);
	}

## Preview
Debug output looks like this:

	====================
	===  TEST CASE 1 ===
	Precalculating primes...
	Sifting through library...
	License to kill mode on...
	Headshot...
	Result : 2
	Time: 5ms
	====================
	===  TEST CASE 2 ===
	<Some debug info>
	Result : 4
	Time: 0ms


Good luck and have fun!  