/**
 * @jest-environment jsdom
 */

const fs = require("fs");

require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require("@testing-library/user-event").default;

const htmlPath = `${__dirname}/line.html`;
const jsPath = `${__dirname}/line.js`;

// function used for initialized dom from files. got this function from lecture
function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8');
	document.open();
	document.write(html);
	document.close();

	
	jest.isolateModules(function() {
		require(jsPath)
	});
}

// this function will init input fields and buttons that we need to use for
// testing. this will save us a few lines of code in the long run.
function initElements(elements){

	elements.X_inputs = domTesting.getAllByLabelText(document, 'X');
	elements.Y_inputs = domTesting.getAllByLabelText(document, 'Y');
	elements.add_input_button = domTesting.getByText(document, '+');

}

// this function will clear all of the elements present in the elements object
// and it will press the clear chart data button to reset the (X, Y) inputs
// for the next test so we dont run into errors :)
async function clearElements(elements, user){

	elements.X_inputs = undefined;
	elements.Y_inputs = undefined;
	elements.add_input_button = undefined;
	await user.click( domTesting.getByText(document, 'Clear chart data') );

}

// this function will assert whether or not the list of (X, Y) inputs is equal
// to an expected length
function assertInputLength(elements, expected_length){

	initElements(elements);
	expect(elements.X_inputs).toHaveLength(expected_length);
	expect(elements.Y_inputs).toHaveLength(expected_length);

}

// this function will perform the first test given in the "UI integration 
// tests" section of the assignment document. The specific test is labeled as
// "adding values in the chart builder".
async function test1(elements, inputs, num_empty_inputs){

	// do initializations: load in files that we're gonna be testing, init
	// expected length of (X, Y) pairs, grab the input fields, the '+' 
	// button, and init our user for events
    initDomFromFiles(htmlPath, jsPath);
	initElements(elements);
	const user = userEvent.setup();
	var expected_length = 1;

	// do assertion: quick cehck that we only have 1 (X, Y) input available to 
	// us to start off.
	assertInputLength(elements, expected_length);

	for(const input of inputs){

		// do actions: create new (X, Y) inputs and add the above values 
		// (stored in input) to them
		await user.type(elements.X_inputs[expected_length - 1], input[0]);
		await user.type(elements.Y_inputs[expected_length - 1], input[1]);
		await user.click(elements.add_input_button);
		expected_length++;

		// do some assertions: make sure that our (X, Y) inputs increment
		// with each press of the add_input_button
		assertInputLength(elements, expected_length);

	}

	// do actions: add K empty (X, Y) inputs, refresh list of (X, Y) inputs
	for(var i = 0; i < num_empty_inputs - 1; i++){ 
		await user.click(elements.add_input_button); expected_length++;
	}
	assertInputLength(elements, expected_length);

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

	// reset elements object + page for next test :)
	await clearElements(elements, user);

}

describe('UI integration tests', () => {

	const elements = {

		X_inputs: undefined,
		Y_inputs: undefined,
		add_input_button: undefined

	};

    test('Adding values in the chart builder', async () => {

		// run a few different versions of the test so we know that we arent
		// missing some weird case that would throw an error
		await test1(elements, [['0','0'],['100','200']], 5);
		await test1(elements, [['1','2'],['3','4'],['5','6'],['7','8']], 2);
		await test1(elements, [['-1','2']], 10);
		
    });

});