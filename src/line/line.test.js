/**
 * @jest-environment jsdom
 */

const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;

const html_path = `${__dirname}/line.html`;
const js_path = `${__dirname}/line.js`;

// this will hold every element on the DOM that we'll need to mess aroudn with
// for our integration tests
const elements = {

	X_inputs: undefined,
	Y_inputs: undefined,
	X_label: undefined,
	Y_label: undefined,
	title_input: undefined,
	color_input: undefined,
	add_input_button: undefined,
	generate_chart_button: undefined

};

describe('UI integration tests', () => {

    test('Adding values in the chart builder', async () => {

		// do initializations: load in files that we're gonna be testing, init
		// our elements object
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();

		// do assertion: quick check that we only have 1 (X, Y) input available to 
		// us to start off.
		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(1);
		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(1);

		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '0');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '0');
		await user.click(domTesting.getByText(document, '+'));
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '100');
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '200');
		await user.click(domTesting.getByText(document, '+'));


		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(3);
		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(3);

		// reset everything for next test
		await resetForNextTest(elements);
	});

/*
		// tests to make sure that we can properly create and fill input boxes
		await testFillInputs([['0','0'],['100','200']]);
		await testFillInputs(elements, [['1','2'],['3','4'],['5','6'],['7','8']]);
		await testFillInputs(elements, [['-1','2']]);

		// tests to make sure that we can properly create empty input boxes
		await testEmptyInputs(elements, 2);
		await testEmptyInputs(elements, 5);
		await testEmptyInputs(elements, 100);

		// tests to make sure that adding new input boxes does not affect old
		// inputs
		await testAddValues(elements, [['0','0'],['100','200']], 5);
		await testAddValues(elements, [['1','2'],['3','4'],['5','6'],['7','8']], 2);
	initElements(elements);
	initElements(elements);
		await testAddValues(elements, [['-1','2']], 100);
		
    });

	test('Alerts displayed for missing chart data', async () => {

		// run several tests! cant hurt to run more :)
		await testMissingLabel(elements, '0', '0');
		await testMissingCoord(elements, 'X', 'Y');

		await testMissingLabel(elements, '1000', '2000000');
		await testMissingCoord(elements, 'Iterations', 'SSE');

		await testMissingLabel(elements, '-35', '-926');
		await testMissingCoord(elements, 'Epochs', 'Accuracy');

	});

	test('Clearing chart data', async () => {
		
		// run several tests! cant hurt to run more :)
		await testClearChart(elements, 'Cats vs. Dogs', '#123ABC',
							 [['1','2'],['3','4'],['5','6'],['7','8']], 2);

		await testClearChart(elements, 'Sum Squared Error', '#FFFFFF',
							 [['1','2'],['2','1'],['3','0.5']], 1);
		
		await testClearChart(elements, 'Validation Accuracy', '#ABABAB',
							 [['1','0.876'],['50','0.945']], 50);

	});

	test('Data correctly sent to chart generation function', async () => {
		
		// run several tests! cant hurt to run more :)
		await testDataSent(elements, "Cats vs. Dogs", "1", "2", "Cats", 
						   "Dogs");

		await testDataSent(elements, "Sum Squared Error", "1", "3.1415", 
						   "Iterations", "Sum Squared Error");

		await testDataSent(elements, "Validation Accuracy", "50", "0.945", 
						   "Iterations", "Accuracy");
	});
*/
});




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
	expect(elements.X_inputs).toHaveLength(expected_length);
	expect(elements.Y_inputs).toHaveLength(expected_length);

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



async function testMissingCoord(elements, X_label_text, Y_label_text){

	// do initializations: init the files, init our element object, setup our
	// user, and start spying on window.alert. NOTE: mocking the implementation
	// because 'window.alert' not implemented error is being throw when i dont
	// stub the method
	initDomFromFiles(html_path, js_path);
	initElements(elements);
	const user = userEvent.setup();
	const alert_spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

	// do actions: type in the given text for the X_label and the Y_label,
	// click the generate chart button
	await user.type(elements.X_label, X_label_text);
	await user.type(elements.Y_label, Y_label_text);
	await user.click(elements.generate_chart_button);
		
	// do assertions: assert that alert was called and that it was given the
	// parameter "Error: No data specified!"
	const call = alert_spy.mock.calls[0][0];
	expect(alert_spy).toHaveBeenCalled();
	expect(call).toEqual('Error: No data specified!');

	// this function will refresh everything for our future tests! (+ get rid
    // of spys middleware) :)
	await resetForNextTest(elements);
	alert_spy.mockRestore();

}

async function testMissingLabel(elements, X_input, Y_input){

	// do initializations: init the files, init our element object, setup our
	// user, and start spying on window.alert. NOTE: mocking the implementation
	// because 'window.alert' not implemented error is being throw when i dont
	// stub the method
	initDomFromFiles(html_path, js_path);
	initElements(elements);
	const user = userEvent.setup();
	const alert_spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

	// do actions: type in the given text for the X_input and the Y_input,
	// click the generate chart button
	await user.type(elements.X_inputs[0], X_input);
	await user.type(elements.Y_inputs[0], Y_input);
	await user.click(elements.generate_chart_button);
		
	// do assertions: assert that alert was called and that it was given the
	// parameter "Error: Must specify a label for both X and Y!"
	const call = alert_spy.mock.calls[0][0];
	expect(alert_spy).toHaveBeenCalled();
	expect(call).toEqual('Error: Must specify a label for both X and Y!');

	// this function will refresh everything for our future tests! (+ get rid
    // of spys middleware) :)
	await resetForNextTest(elements);
	alert_spy.mockRestore();

}


async function testDataSent(elements, title, X_input, Y_input, X_label, 
                            Y_label){

    // init dom elements but dont use jest.isolateModules as noted by alex
    initDomFromFiles(html_path, js_path);
    initElements(elements);
 
    // mocked generateChartImg function - return valid img URL
    const gen_chart_spy = require('../lib/generateChartImg.js');
    jest.mock('../lib/generateChartImg.js');
    gen_chart_spy.mockImplementation(() => { return 'http://placekitten.com/480/480'; });

    // do action: type in information to generate our chart with
    const user = userEvent.setup();
    await user.type(elements.title_input, title);
    await user.type(elements.X_inputs[0], X_input);
    await user.type(elements.Y_inputs[0], Y_input);
    await user.type(elements.X_label, X_label);
    await user.type(elements.Y_label, Y_label);
    await user.click(elements.generate_chart_button);

    // assert that our function was called
    expect(gen_chart_spy).toHaveBeenCalled(); 
    
	// this function will refresh everything for our future tests! (+ get rid
    // of spys middleware):)
    await resetForNextTest(elements);
    gen_chart_spy.mockRestore();

}

async function testClearChart(elements, title, color, inputs, 
                              num_empty_inputs){

	// do initializations: init the files, setup our user
	initDomFromFiles(html_path, js_path);
	initElements(elements);
	const user = userEvent.setup();
	var length = 1;

	// do actions: type in the charts title, input a new color
	await user.type(elements.title_input, title);
	domTesting.fireEvent.input(elements.color_input, 
							   {target: {value: color}});
	
	// do actions: insert all given inputs, make N many empty input boxes,
	// click the clear chart button in hopes that itll clear everything!
	await insertInputs(elements, inputs, 1);
	await makeEmptyInputs(elements, num_empty_inputs);
	await user.click(elements.clear_chart_button);

	// do assertions: assert theres only one (X, Y) input, assert that all
	// other values have been cleared of their previous text, assert that the
	// previously assigned color has been returned to its default value
	assertInputLength(elements, 1);
	expect(elements.title_input).toHaveValue('');
	expect(elements.X_label).toHaveValue('');
	expect(elements.Y_label).toHaveValue('');
	expect(elements.X_inputs[0]).toHaveValue(null);
	expect(elements.Y_inputs[0]).toHaveValue(null);
	expect(elements.color_input).toHaveValue('#ff4500');

	// this function will refresh everything for our future tests! :)
	await resetForNextTest(elements);
}

async function testAddValues(elements, inputs, num_empty_inputs){

	// do initializations: load in files that we're gonna be testing, init
	// expected length of (X, Y) pairs, grab the input fields, the '+' 
	// button, and init our user for events
    initDomFromFiles(html_path, js_path);
	initElements(elements);
	const user = userEvent.setup();
	var expected_length = 1;

	// do assertion: quick check that we only have 1 (X, Y) input available to 
	// us to start off.
	assertInputLength(elements, 1);

	await insertInputs(elements, inputs, 1);
	await makeEmptyInputs(elements, num_empty_inputs);
	const assertion_arr = createTestArray(inputs, num_empty_inputs);

	// do assertion: make sure that after entering our inputs and creating new
	// empty inputs, we have the expected amount of input boxes present in the
	// DOM.
	assertInputLength(elements, inputs.length + num_empty_inputs);
	assertInputValues(elements, assertion_arr);

	// this function will refresh everything for our future tests! :)
	await resetForNextTest(elements);

}

async function testFillInputs(inputs){

	// do initializations: load in files that we're gonna be testing, init
	// our elements object
    initDomFromFiles(html_path, js_path);

	// do assertion: quick check that we only have 1 (X, Y) input available to 
	// us to start off.
	expect(elements.X_inputs).toHaveLength(1);
	expect(elements.Y_inputs).toHaveLength(1);

	// do action: insert all of the given inputs with an expected starting
	// length of 1 input 
	let cur_length = 1;
	const user = userEvent.setup();

	for(const input of inputs) {

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

	const assertion_arr = createTestArray(inputs, 1);

	// do assertion: make sure that the length of all of the inputs is correct
	// and make sure all inputs have the given inputs within them. we expect
	// input.length + 1 inputs as we started with 1 input box originally
	expect(elements.X_inputs).toHaveLength(inputs.length + 1);
	expect(elements.Y_inputs).toHaveLength(inputs.length + 1);

	expect(elements.X_inputs).toHaveLength(assertion_arr.length);
	expect(elements.Y_inputs).toHaveLength(assertion_arr.length);

	// reset everything for next test
	await resetForNextTest(elements);
}

async function testEmptyInputs(elements, num_empty_inputs){

	// do initializations: load in files that we're gonna be testing, init
	// our elements object that will hold all relevant DOM elements
    initDomFromFiles(html_path, js_path);
	initElements(elements);

	// do action: click the add input button n - 1 times.
	await makeEmptyInputs(elements, num_empty_inputs);
	const assertion_arr = createTestArray([], num_empty_inputs);

	// do assertion: make sure that all of our clicks created a new input box
	assertInputLength(elements, num_empty_inputs);
	assertInputValues(elements, assertion_arr);
	
	// reset for next test
	await resetForNextTest(elements);

}

