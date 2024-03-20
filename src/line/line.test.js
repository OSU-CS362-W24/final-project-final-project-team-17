/**
 * @jest-environment jsdom
 */

const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const exp = require('constants');
const userEvent = require('@testing-library/user-event').default;

const html_path = `${__dirname}/line.html`;
const js_path = `${__dirname}/line.js`;

beforeEach(() => {
	window.localStorage.clear();
    jest.resetModules(); 
})

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

/*
 *
 *
 * Tests for adding values to the chart -- 1st test suite for UI tests
 * 
 * 
*/

describe('Tests for adding values to a chart', () => {

	test('Ensure the chart initializes with one blank X and one blank Y input', async () => {
		initDomFromFiles(html_path, js_path);

		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(1);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(1);

		expect(domTesting.getAllByLabelText(document, 'X')[0]).toHaveValue(null);
		expect(domTesting.getAllByLabelText(document, 'Y')[0]).toHaveValue(null);
	});

    test('Added 2 values to a chart', async () => {

		// do initializations: load in files that we're gonna be testing, init
		// our elements object
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();

		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '0');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '0');
		await user.click(domTesting.getByText(document, '+'));
		await user.type(domTesting.getAllByLabelText(document, 'X')[1], '100');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[1], '200');


		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(2);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(2);

		expect(domTesting.getAllByLabelText(document, 'X')[0]).toHaveValue(0);
		expect(domTesting.getAllByLabelText(document, 'Y')[0]).toHaveValue(0);

		expect(domTesting.getAllByLabelText(document, 'X')[1]).toHaveValue(100);
		expect(domTesting.getAllByLabelText(document, 'Y')[1]).toHaveValue(200);
	});


    test('Added 4 values to a chart', async () => {

		// do initializations: load in files that we're gonna be testing, init
		// our elements object
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();

		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '1');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '2');
		await user.click(domTesting.getByText(document, '+'));

		await user.type(domTesting.getAllByLabelText(document, 'X')[1], '3');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[1], '4');
		await user.click(domTesting.getByText(document, '+'));

		await user.type(domTesting.getAllByLabelText(document, 'X')[2], '5');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[2], '6');
		await user.click(domTesting.getByText(document, '+'));

		await user.type(domTesting.getAllByLabelText(document, 'X')[3], '7');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[3], '8');


		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(4);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(4);

		expect(domTesting.getAllByLabelText(document, 'X')[0]).toHaveValue(1);
		expect(domTesting.getAllByLabelText(document, 'Y')[0]).toHaveValue(2);

		expect(domTesting.getAllByLabelText(document, 'X')[1]).toHaveValue(3);
		expect(domTesting.getAllByLabelText(document, 'Y')[1]).toHaveValue(4);

		expect(domTesting.getAllByLabelText(document, 'X')[2]).toHaveValue(5);
		expect(domTesting.getAllByLabelText(document, 'Y')[2]).toHaveValue(6);

		expect(domTesting.getAllByLabelText(document, 'X')[3]).toHaveValue(7);
		expect(domTesting.getAllByLabelText(document, 'Y')[3]).toHaveValue(8);
	});

    test('Added 1 value to a chart', async () => {

		// do initializations: load in files that we're gonna be testing, init
		// our elements object
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();

		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '-1');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '2');

		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(1);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(1);

		expect(domTesting.getAllByLabelText(document, 'X')[0]).toHaveValue(-1);
		expect(domTesting.getAllByLabelText(document, 'Y')[0]).toHaveValue(2);
	});

    test('Added 1 additional empty values to a chart', async () => {

		// do initializations: load in files that we're gonna be testing, init
		// our elements object
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();

		await user.click(domTesting.getByText(document, '+'));


		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(2);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(2);
	});

    test('Added 4 additional empty values to a chart', async () => {

		// do initializations: load in files that we're gonna be testing, init
		// our elements object
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();

		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));


		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(5);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(5);
	});

    test('Added 99 additional empty values to a chart', async () => {

		// do initializations: load in files that we're gonna be testing, init
		// our elements object
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();

		for (var i = 0; i < 99; i++) {
			await user.click(domTesting.getByText(document, '+'));
		}

		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(100);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(100);
	});

    test('Added 2 values and 5 additional empty values to a chart', async () => {

		// do initializations: load in files that we're gonna be testing, init
		// our elements object
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();


		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '0');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '0');
		await user.click(domTesting.getByText(document, '+'));
		await user.type(domTesting.getAllByLabelText(document, 'X')[1], '100');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[1], '200');

		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));


		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(7);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(7);

		expect(domTesting.getAllByLabelText(document, 'X')[0]).toHaveValue(0);
		expect(domTesting.getAllByLabelText(document, 'Y')[0]).toHaveValue(0);

		expect(domTesting.getAllByLabelText(document, 'X')[1]).toHaveValue(100);
		expect(domTesting.getAllByLabelText(document, 'Y')[1]).toHaveValue(200);
	});

    test('Added 4 values and 2 additional empty values to a chart', async () => {

		// do initializations: load in files that we're gonna be testing, init
		// our elements object
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();

		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '1');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '2');
		await user.click(domTesting.getByText(document, '+'));
		await user.type(domTesting.getAllByLabelText(document, 'X')[1], '3');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[1], '4');
		await user.click(domTesting.getByText(document, '+'));
		await user.type(domTesting.getAllByLabelText(document, 'X')[2], '5');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[2], '6');
		await user.click(domTesting.getByText(document, '+'));
		await user.type(domTesting.getAllByLabelText(document, 'X')[3], '7');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[3], '8');

		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));


		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(6);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(6);

		expect(domTesting.getAllByLabelText(document, 'X')[0]).toHaveValue(1);
		expect(domTesting.getAllByLabelText(document, 'Y')[0]).toHaveValue(2);

		expect(domTesting.getAllByLabelText(document, 'X')[1]).toHaveValue(3);
		expect(domTesting.getAllByLabelText(document, 'Y')[1]).toHaveValue(4);

		expect(domTesting.getAllByLabelText(document, 'X')[2]).toHaveValue(5);
		expect(domTesting.getAllByLabelText(document, 'Y')[2]).toHaveValue(6);

		expect(domTesting.getAllByLabelText(document, 'X')[3]).toHaveValue(7);
		expect(domTesting.getAllByLabelText(document, 'Y')[3]).toHaveValue(8);
	});

    test('Added 1 value and 100 additional empty values to a chart', async () => {

		// do initializations: load in files that we're gonna be testing, init
		// our elements object
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();

		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '-1');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '2');

		for (var i = 0; i < 100; i++) {
			await user.click(domTesting.getByText(document, '+'));
		}

		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(101);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(101);

		expect(domTesting.getAllByLabelText(document, 'X')[0]).toHaveValue(-1);
		expect(domTesting.getAllByLabelText(document, 'Y')[0]).toHaveValue(2);
	});

});






/*
 *
 *
 * Tests for window alert -- 2nd test suite for UI tests
 * 
 * 
*/


describe('Tests for proper alert creation', () => {
	test("Test for missing label alerts when no X and Y label are included", async () => {
		// do initializations: init the files, init our element object, setup our
		// user, and start spying on window.alert. NOTE: mocking the implementation
		// because 'window.alert' not implemented error is being throw when i dont
		// stub the method
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();
		const alert_spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

		// do actions: type in the given text for the X_input and the Y_input,
		// click the generate chart button
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '0');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '0');
		await user.click(domTesting.getByText(document, 'Generate chart'));
			
		// do assertions: assert that alert was called and that it was given the
		// parameter "Error: Must specify a label for both X and Y!"
		const call = alert_spy.mock.calls[0][0];
		expect(alert_spy).toHaveBeenCalled();
		expect(call).toEqual('Error: Must specify a label for both X and Y!');

		// this function will refresh everything for our future tests! (+ get rid
		// of spys middleware) :)
		alert_spy.mockRestore();
	});

	test("Test for missing data alert when no data and valid labels are included", async () => {
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();
		const alert_spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

		// do actions: type in the given text for the X_label and the Y_label,
		// click the generate chart button
		await user.type(domTesting.getByLabelText(document, 'X label'), 'X');
		await user.type(domTesting.getByLabelText(document, 'Y label'), 'Y');
		await user.click(domTesting.getByText(document, 'Generate chart'));
			
		// do assertions: assert that alert was called and that it was given the
		// parameter "Error: No data specified!"
		const call = alert_spy.mock.calls[0][0];
		expect(alert_spy).toHaveBeenCalled();
		expect(call).toEqual('Error: No data specified!');

		// this function will refresh everything for our future tests! (+ get rid
		// of spys middleware) :)
		alert_spy.mockRestore();
	});

	test("Test for missing label alerts when no X and Y label are included", async () => {
		// do initializations: init the files, init our element object, setup our
		// user, and start spying on window.alert. NOTE: mocking the implementation
		// because 'window.alert' not implemented error is being throw when i dont
		// stub the method
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();
		const alert_spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

		// do actions: type in the given text for the X_input and the Y_input,
		// click the generate chart button
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '1000');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '2000000');
		await user.click(domTesting.getByText(document, 'Generate chart'));
			
		// do assertions: assert that alert was called and that it was given the
		// parameter "Error: Must specify a label for both X and Y!"
		const call = alert_spy.mock.calls[0][0];
		expect(alert_spy).toHaveBeenCalled();
		expect(call).toEqual('Error: Must specify a label for both X and Y!');

		// this function will refresh everything for our future tests! (+ get rid
		// of spys middleware) :)
		alert_spy.mockRestore();
	});

	test("Test for missing data alert when no data and valid labels are included", async () => {
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();
		const alert_spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

		// do actions: type in the given text for the X_label and the Y_label,
		// click the generate chart button
		await user.type(domTesting.getByLabelText(document, 'X label'), 'Iterations');
		await user.type(domTesting.getByLabelText(document, 'Y label'), 'SSE');
		await user.click(domTesting.getByText(document, 'Generate chart'));
			
		// do assertions: assert that alert was called and that it was given the
		// parameter "Error: No data specified!"
		const call = alert_spy.mock.calls[0][0];
		expect(alert_spy).toHaveBeenCalled();
		expect(call).toEqual('Error: No data specified!');

		// this function will refresh everything for our future tests! (+ get rid
		// of spys middleware) :)
		alert_spy.mockRestore();
	});

	test("Test for missing label alerts when no X and Y label are included", async () => {
		// do initializations: init the files, init our element object, setup our
		// user, and start spying on window.alert. NOTE: mocking the implementation
		// because 'window.alert' not implemented error is being throw when i dont
		// stub the method
		initDomFromFiles(html_path, js_path);

		const user = userEvent.setup();
		const alert_spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

		// do actions: type in the given text for the X_input and the Y_input,
		// click the generate chart button
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '-35');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '-926');
		await user.click(domTesting.getByText(document, 'Generate chart'));
			
		// do assertions: assert that alert was called and that it was given the
		// parameter "Error: Must specify a label for both X and Y!"
		const call = alert_spy.mock.calls[0][0];
		expect(alert_spy).toHaveBeenCalled();
		expect(call).toEqual('Error: Must specify a label for both X and Y!');

		// this function will refresh everything for our future tests! (+ get rid
		// of spys middleware) :)
		alert_spy.mockRestore();
	});

	test("Test for missing data alert when no data and valid labels are included", async () => {
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();
		const alert_spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

		// do actions: type in the given text for the X_label and the Y_label,
		// click the generate chart button
		await user.type(domTesting.getByLabelText(document, 'X label'), 'Epochs');
		await user.type(domTesting.getByLabelText(document, 'Y label'), 'Accuracy');
		await user.click(domTesting.getByText(document, 'Generate chart'));
			
		// do assertions: assert that alert was called and that it was given the
		// parameter "Error: No data specified!"
		const call = alert_spy.mock.calls[0][0];
		expect(alert_spy).toHaveBeenCalled();
		expect(call).toEqual('Error: No data specified!');

		// this function will refresh everything for our future tests! (+ get rid
		// of spys middleware) :)
		alert_spy.mockRestore();
	});
});









/*
 *
 *
 * Tests for clearing chart data -- 3rd test suite for UI tests
 * 
 * 
*/


describe ('Tests for clearing chart data', () => {

	test("Clearing chart data when chart is filled out", async () => {
		// do initializations: init the files, setup our user
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();

		// do actions: type in the charts title, input a new color
		await user.type(domTesting.getByLabelText(document, 'Chart title'), 'Cats vs. Dogs');
		domTesting.fireEvent.input(domTesting.getByLabelText(document, 'Chart color'), {target: {value: '#123ABC'}});
		
		// do actions: insert all given inputs, make N many empty input boxes,
		// click the clear chart button in hopes that itll clear everything!
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '1');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '2');
		await user.click(domTesting.getByText(document, '+'));

		await user.type(domTesting.getAllByLabelText(document, 'X')[1], '3');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[1], '4');
		await user.click(domTesting.getByText(document, '+'));

		await user.type(domTesting.getAllByLabelText(document, 'X')[2], '5');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[2], '6');
		await user.click(domTesting.getByText(document, '+'));

		await user.type(domTesting.getAllByLabelText(document, 'X')[3], '7');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[3], '8');

		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));

		await user.click(domTesting.getByText(document, 'Clear chart data'));

		// do assertions: assert theres only one (X, Y) input, assert that all
		// other values have been cleared of their previous text, assert that the
		// previously assigned color has been returned to its default value
		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(1);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(1);

		expect(domTesting.getByLabelText(document, 'Chart title')).toHaveValue('');
		expect(domTesting.getByLabelText(document, 'X label')).toHaveValue('');
		expect(domTesting.getByLabelText(document, 'Y label')).toHaveValue('');
		expect(domTesting.getAllByLabelText(document, 'X')[0]).toHaveValue(null);
		expect(domTesting.getAllByLabelText(document, 'Y')[0]).toHaveValue(null);
		expect(domTesting.getByLabelText(document, 'Chart color')).toHaveValue('#ff4500');
	});

	test("Clearing chart data when chart is filled out", async () => {
		// do initializations: init the files, setup our user
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();

		// do actions: type in the charts title, input a new color
		await user.type(domTesting.getByLabelText(document, 'Chart title'), 'Sum Squared Error');
		domTesting.fireEvent.input(domTesting.getByLabelText(document, 'Chart color'), {target: {value: '#FFFFFF'}});
		
		// do actions: insert all given inputs, make N many empty input boxes,
		// click the clear chart button in hopes that itll clear everything!
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '1');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '2');
		await user.click(domTesting.getByText(document, '+'));

		await user.type(domTesting.getAllByLabelText(document, 'X')[1], '2');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[1], '1');
		await user.click(domTesting.getByText(document, '+'));

		await user.type(domTesting.getAllByLabelText(document, 'X')[2], '3');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[2], '0.5');

		await user.click(domTesting.getByText(document, '+'));

		await user.click(domTesting.getByText(document, 'Clear chart data'));

		// do assertions: assert theres only one (X, Y) input, assert that all
		// other values have been cleared of their previous text, assert that the
		// previously assigned color has been returned to its default value
		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(1);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(1);

		expect(domTesting.getByLabelText(document, 'Chart title')).toHaveValue('');
		expect(domTesting.getByLabelText(document, 'X label')).toHaveValue('');
		expect(domTesting.getByLabelText(document, 'Y label')).toHaveValue('');
		expect(domTesting.getAllByLabelText(document, 'X')[0]).toHaveValue(null);
		expect(domTesting.getAllByLabelText(document, 'Y')[0]).toHaveValue(null);
		expect(domTesting.getByLabelText(document, 'Chart color')).toHaveValue('#ff4500');
	});


	test("Clearing chart data when chart is filled out", async () => {
		// do initializations: init the files, setup our user
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();

		// do actions: type in the charts title, input a new color
		await user.type(domTesting.getByLabelText(document, 'Chart title'), 'Validation Accuracy');
		domTesting.fireEvent.input(domTesting.getByLabelText(document, 'Chart color'), {target: {value: '#ABABAB'}});
		
		// do actions: insert all given inputs, make N many empty input boxes,
		// click the clear chart button in hopes that itll clear everything!
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], '1');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], '0.876');
		await user.click(domTesting.getByText(document, '+'));

		await user.type(domTesting.getAllByLabelText(document, 'X')[1], '50');
		await user.type(domTesting.getAllByLabelText(document, 'Y')[1], '0.945');

		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));
		await user.click(domTesting.getByText(document, '+'));

		await user.click(domTesting.getByText(document, 'Clear chart data'));

		// do assertions: assert theres only one (X, Y) input, assert that all
		// other values have been cleared of their previous text, assert that the
		// previously assigned color has been returned to its default value
		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(1);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(1);

		expect(domTesting.getByLabelText(document, 'Chart title')).toHaveValue('');
		expect(domTesting.getByLabelText(document, 'X label')).toHaveValue('');
		expect(domTesting.getByLabelText(document, 'Y label')).toHaveValue('');
		expect(domTesting.getAllByLabelText(document, 'X')[0]).toHaveValue(null);
		expect(domTesting.getAllByLabelText(document, 'Y')[0]).toHaveValue(null);
		expect(domTesting.getByLabelText(document, 'Chart color')).toHaveValue('#ff4500');
	});
});




/*
 *
 *
 * Tests for sending data to the test generation function -- 4th test suite for UI tests
 * 
 * 
*/


describe("Tests for sending data to the generation function", () => {
	test("Data correctly sent to chart generation function", async () => {
		// init dom elements but dont use jest.isolateModules as noted by alex
		initDomFromFiles(html_path, js_path);
	
		// mocked generateChartImg function - return valid img URL
		const gen_chart_spy = require('../lib/generateChartImg.js');
		jest.mock('../lib/generateChartImg.js');
		gen_chart_spy.mockImplementation(() => { return 'http://placekitten.com/480/480'; });

		// do action: type in information to generate our chart with
		const user = userEvent.setup();
		await user.type(domTesting.getByLabelText(document, 'Chart title'), "Cats vs. Dogs");
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], "1");
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], "2");
		await user.type(domTesting.getByLabelText(document, 'X label'), "Cats");
		await user.type(domTesting.getByLabelText(document, 'Y label'), "Dogs");
		await user.click(domTesting.getByText(document, 'Generate chart'));

		// assert that our function was called
		expect(gen_chart_spy).toHaveBeenCalled(); 
		
		// this function will refresh everything for our future tests! (+ get rid
		// of spys middleware):)
		gen_chart_spy.mockRestore();
	});

	test("Data correctly sent to chart generation function", async () => {
		// init dom elements but dont use jest.isolateModules as noted by alex
		initDomFromFiles(html_path, js_path);
	
		// mocked generateChartImg function - return valid img URL
		const gen_chart_spy = require('../lib/generateChartImg.js');
		jest.mock('../lib/generateChartImg.js');
		gen_chart_spy.mockImplementation(() => { return 'http://placekitten.com/480/480'; });

		// do action: type in information to generate our chart with
		const user = userEvent.setup();
		await user.type(domTesting.getByLabelText(document, 'Chart title'), "Sum Squared Error");
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], "1");
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], "3.1415");
		await user.type(domTesting.getByLabelText(document, 'X label'), "Iterations");
		await user.type(domTesting.getByLabelText(document, 'Y label'), "Sum Squared Error");
		await user.click(domTesting.getByText(document, 'Generate chart'));

		// assert that our function was called
		expect(gen_chart_spy).toHaveBeenCalled(); 
		
		// this function will refresh everything for our future tests! (+ get rid
		// of spys middleware):)
		gen_chart_spy.mockRestore();
	});

	test("Data correctly sent to chart generation function", async () => {
		// init dom elements but dont use jest.isolateModules as noted by alex
		initDomFromFiles(html_path, js_path);
	
		// mocked generateChartImg function - return valid img URL
		const gen_chart_spy = require('../lib/generateChartImg.js');
		jest.mock('../lib/generateChartImg.js');
		gen_chart_spy.mockImplementation(() => { return 'http://placekitten.com/480/480'; });

		// do action: type in information to generate our chart with
		const user = userEvent.setup();
		await user.type(domTesting.getByLabelText(document, 'Chart title'), "Validation Accuracy");
		await user.type(domTesting.getAllByLabelText(document, 'X')[0], "50");
		await user.type(domTesting.getAllByLabelText(document, 'Y')[0], "0.945");
		await user.type(domTesting.getByLabelText(document, 'X label'), "Iterations");
		await user.type(domTesting.getByLabelText(document, 'Y label'), "Accuracy");
		await user.click(domTesting.getByText(document, 'Generate chart'));

		// assert that our function was called
		expect(gen_chart_spy).toHaveBeenCalled(); 
		
		// this function will refresh everything for our future tests! (+ get rid
		// of spys middleware):)
		gen_chart_spy.mockRestore();
	});
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
function resetForNextTest(){

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

