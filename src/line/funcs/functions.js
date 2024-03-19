/**
 * @jest-environment jsdom
 */
const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;

// function used for initialized dom from files. got this function from lecture
function initDomFromFiles(html_path, js_path) {
	const html = fs.readFileSync(html_path, 'utf8');
	document.open();
	document.write(html);
	document.close();

	require(js_path)
}

// this function will init input fields and buttons that we need to use for
// testing. this will save us a few lines of code in the long run.
function initElements(elements){

	elements.X_inputs = domTesting.getAllByLabelText(document, 'X');
	elements.Y_inputs = domTesting.getAllByLabelText(document, 'Y');
	elements.X_label = domTesting.getByLabelText(document, 'X label');
	elements.Y_label = domTesting.getByLabelText(document, 'Y label');
	elements.title_input = domTesting.getByLabelText(document, 'Chart title');
	elements.color_input = domTesting.getByLabelText(document, 'Chart color');
	elements.add_input_button = domTesting.getByText(document, '+');
	elements.generate_chart_button = domTesting.getByText(document, 
														  'Generate chart');
	elements.clear_chart_button = domTesting.getByText(document, 
													   'Clear chart data');

}

// this function will reset everything back to its original condition for the 
// next test
function resetForNextTest(elements){

	X_inputs = undefined;
	Y_inputs = undefined;
	X_label = undefined;
	Y_label = undefined;
	title_input = undefined;
	color_input = undefined;
	add_input_button = undefined;
	generate_chart_button = undefined;
	window.localStorage.clear();
    jest.resetModules(); 

}

async function insertInputs(elements, inputs, cur_length){

	const user = userEvent.setup();

	for(const input of inputs){

		// do actions: create new (X, Y) inputs and add the above values 
		// (stored in input) to them
		await user.type(elements.X_inputs[cur_length - 1], input[0]);
		await user.type(elements.Y_inputs[cur_length - 1], input[1]);
		await user.click(elements.add_input_button);
		cur_length++;

		// do some assertions: make sure that our (X, Y) inputs increment
		// with each press of the add_input_button
		assertInputLength(elements, cur_length);

	}

}

async function makeEmptyInputs(elements, num_empty_inputs){

	const user = userEvent.setup();

	// we will always start with one empty input box so we only need to iterate
	// through num_empty_inputs - 1 times.
	for(var i = 0; i < num_empty_inputs - 1; i++){

		await user.click(elements.add_input_button);

	}

}

function assertInputValues(elements, inputs){

	initElements(elements);
	var idx = 0;

	for(const input of inputs){

		// if ouur inputs array contains numbers, parse them. if our inputs
		// array contains a pair of nulls, expect null for the given input
		const expected_X = isNaN( parseInt(inputs[idx][0]) ) 
											 ? null : parseInt(inputs[idx][0]);
		const expected_Y = isNaN( parseInt(inputs[idx][1]) ) 
											  ? null: parseInt(inputs[idx][1]);

		// assert that our values are as expected
		expect(elements.X_inputs[idx]).toHaveValue( expected_X );
		expect(elements.Y_inputs[idx]).toHaveValue( expected_Y );
		idx++;

	}

}

// this function will assert whether or not the list of (X, Y) inputs is equal
// to an expected length
function assertInputLength(elements, expected_length){

	// initElements will refresh the elements on the page
	initElements(elements);
	expect(elements.X_inputs).toHaveLength(expected_length);
	expect(elements.Y_inputs).toHaveLength(expected_length);

}

// this function will get the path to the html and js paths that we want to use
// for testing. this is needed because all of these functions are an extra 
// directory deeper now (in the /funcs directory)
function getPaths(html_file, js_file){

	const html_path = ((`${__dirname}`).split('/')).slice(0, -1).join('/') 
																+ html_file;
	const js_path = ((`${__dirname}`).split('/')).slice(0, -1).join('/') 
																+ js_file;

	return [html_path, js_path];

}

// will create an array of all past inputs in the test that we can easily do
// assertions on.
function createTestArray(inputs, num_empty_inputs){

	var testing_arr = [];

	// add expected inputs to the array
	for(const input of inputs){

		testing_arr.push([ parseInt( input[0] ), parseInt( input[1] ) ]);

	}

	// add expected NaN values to represent empty inputs
	for(var i = 0; i < num_empty_inputs; i++){ 
		const NaN_pair = [NaN, NaN];
		testing_arr.push(NaN_pair); 
	}

	return testing_arr;

}

module.exports = ({ initDomFromFiles, initElements, resetForNextTest, 
    assertInputValues, assertInputLength, insertInputs, makeEmptyInputs,
	getPaths, createTestArray });