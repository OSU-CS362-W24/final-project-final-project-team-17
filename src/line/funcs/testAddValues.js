/**
 * @jest-environment jsdom
 */

const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;
const functions = require('./functions.js');

const [htmlPath, jsPath] = functions.getPaths();

// this function will perform the first test given in the "UI integration 
// tests" section of the assignment document. The specific test is labeled as
// "adding values in the chart builder".
async function testAddValues(elements, inputs, num_empty_inputs){

	// do initializations: load in files that we're gonna be testing, init
	// expected length of (X, Y) pairs, grab the input fields, the '+' 
	// button, and init our user for events
    functions.initDomFromFiles(htmlPath, jsPath);
	functions.initElements(elements);
	const user = userEvent.setup();
	var expected_length = 1;

	// do assertion: quick cehck that we only have 1 (X, Y) input available to 
	// us to start off.
	functions.assertInputLength(elements, expected_length);

	for(const input of inputs){

		// do actions: create new (X, Y) inputs and add the above values 
		// (stored in input) to them
		await user.type(elements.X_inputs[expected_length - 1], input[0]);
		await user.type(elements.Y_inputs[expected_length - 1], input[1]);
		await user.click(elements.add_input_button);
		expected_length++;

		// do some assertions: make sure that our (X, Y) inputs increment
		// with each press of the add_input_button
		functions.assertInputLength(elements, expected_length);

	}

	// do actions: add K empty (X, Y) inputs, refresh list of (X, Y) inputs
	for(var i = 0; i < num_empty_inputs - 1; i++){ 
		await user.click(elements.add_input_button); expected_length++;
	}
	functions.assertInputLength(elements, expected_length);

	// one final run through all of the created (X, Y) coordinates to make sure
	// that adding inputs did not erase any past inputs.
	for(var i = 0; i < inputs.length + num_empty_inputs; i++){

		// do assertions: assert that the first N inputs have the correct 
		// values stored inside of them
		if( i < inputs.length ){

			expect(elements.X_inputs[i]).toHaveValue( parseInt(inputs[i][0]) );
			expect(elements.Y_inputs[i]).toHaveValue( parseInt(inputs[i][1]) );

		}

		// do assertions: assert that the final M inputs are all empty
		else{

			expect(elements.X_inputs[i]).toHaveValue(null);
			expect(elements.Y_inputs[i]).toHaveValue(null);

		}

	}

	await functions.resetForNextTest(elements);

}

module.exports = testAddValues;