/**
 * @jest-environment jsdom
 */
const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;
const functions = require('./functions.js');

const [html_path, js_path] = functions.getPaths('/line.html', '/line.js');

// this function will perform the first test given in the "UI integration 
// tests" section of the assignment document. The specific test is labeled as
// "adding values in the chart builder".
async function testAddValues(elements, inputs, num_empty_inputs){

	// do initializations: load in files that we're gonna be testing, init
	// expected length of (X, Y) pairs, grab the input fields, the '+' 
	// button, and init our user for events
    functions.initDomFromFiles(html_path, js_path);
	functions.initElements(elements);
	const user = userEvent.setup();
	var expected_length = 1;

	// do assertion: quick check that we only have 1 (X, Y) input available to 
	// us to start off.
	functions.assertInputLength(elements, 1);

	await functions.insertInputs(elements, inputs, 1);
	await functions.makeEmptyInputs(elements, num_empty_inputs);
	const assertion_arr = functions.createTestArray(inputs, num_empty_inputs);

	// do assertion: make sure that after entering our inputs and creating new
	// empty inputs, we have the expected amount of input boxes present in the
	// DOM.
	functions.assertInputLength(elements, inputs.length + num_empty_inputs);
	functions.assertInputValues(elements, assertion_arr);

	// this function will refresh everything for our future tests! :)
	await functions.resetForNextTest(elements);

}

async function testFillInputs(elements, inputs){

	// do initializations: load in files that we're gonna be testing, init
	// our elements object
    functions.initDomFromFiles(html_path, js_path);
	functions.initElements(elements);

	// do assertion: quick check that we only have 1 (X, Y) input available to 
	// us to start off.
	functions.assertInputLength(elements, 1);

	// do action: insert all of the given inputs with an expected starting
	// length of 1 input 
	await functions.insertInputs(elements, inputs, 1);
	const assertion_arr = functions.createTestArray(inputs, 1);

	// do assertion: make sure that the length of all of the inputs is correct
	// and make sure all inputs have the given inputs within them. we expect
	// input.length + 1 inputs as we started with 1 input box originally
	functions.assertInputLength(elements, inputs.length + 1);
	functions.assertInputValues(elements, assertion_arr);

	// reset everything for next test
	await functions.resetForNextTest(elements);

}

async function testEmptyInputs(elements, num_empty_inputs){

	// do initializations: load in files that we're gonna be testing, init
	// our elements object that will hold all relevant DOM elements
    functions.initDomFromFiles(html_path, js_path);
	functions.initElements(elements);

	// do action: click the add input button n - 1 times.
	await functions.makeEmptyInputs(elements, num_empty_inputs);
	const assertion_arr = functions.createTestArray([], num_empty_inputs);

	// do assertion: make sure that all of our clicks created a new input box
	functions.assertInputLength(elements, num_empty_inputs);
	functions.assertInputValues(elements, assertion_arr);
	
	// reset for next test
	await functions.resetForNextTest(elements);

}

module.exports = ({testAddValues, testFillInputs, testEmptyInputs});