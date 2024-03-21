/**
 * @jest-environment jsdom
 */

const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;

const html_path = `${__dirname}/line.html`;
const js_path = `${__dirname}/line.js`;

beforeEach(() => {
	window.localStorage.clear();
    jest.resetModules(); 
});


// function used for initialized dom from files. got this function from lecture
function initDomFromFiles(html_path, js_path) {
	const html = fs.readFileSync(html_path, 'utf8');
	document.open();
	document.write(html);
	document.close();

	require(js_path);
}

/*
 *
 *
 * Tests for adding values to the chart -- 1st test suite for UI tests
 * 
 * 
*/

describe('Tests for adding values to a chart', () => {

	test('Ensure the chart initializes with one blank X and one blank Y input', async () => {
		//Arrange
		initDomFromFiles(html_path, js_path);

		//Assert
		const x_inputs = domTesting.getAllByLabelText(document, 'X');
		const y_inputs = domTesting.getAllByLabelText(document, 'Y');

		expect(x_inputs).toHaveLength(1);
		expect(y_inputs).toHaveLength(1);

		expect(x_inputs[0]).not.toHaveValue();
		expect(y_inputs[0]).not.toHaveValue();
	});

    test('Add 4 preset, established values to the line chart [(1, 2), (3, 4), (5, 6), (7, 8)]', async () => {

		//Arrange
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();

		//Act
		const addButton = domTesting.getByText(document, '+');

		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);

		const x_inputs = domTesting.getAllByLabelText(document, 'X');
		const y_inputs = domTesting.getAllByLabelText(document, 'Y');

		await user.type(x_inputs[0], '1');
		await user.type(y_inputs[0], '2');

		await user.type(x_inputs[1], '3');
		await user.type(y_inputs[1], '4');

		await user.type(x_inputs[2], '5');
		await user.type(y_inputs[2], '6');

		await user.type(x_inputs[3], '7');
		await user.type(y_inputs[3], '8');


		//Length Assertions
		expect(x_inputs).toHaveLength(4);
		expect(y_inputs).toHaveLength(4);

		//Value Assertions
		expect(x_inputs[0]).toHaveValue(1);
		expect(y_inputs[0]).toHaveValue(2);

		expect(x_inputs[1]).toHaveValue(3);
		expect(y_inputs[1]).toHaveValue(4);

		expect(x_inputs[2]).toHaveValue(5);
		expect(y_inputs[2]).toHaveValue(6);

		expect(x_inputs[3]).toHaveValue(7);
		expect(y_inputs[3]).toHaveValue(8);
	});

    test('Add 1 value to a chart (-1, 2)', async () => {
		//Arrange
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();

		//Act
		const x_inputs = domTesting.getAllByLabelText(document, 'X');
		const y_inputs = domTesting.getAllByLabelText(document, 'Y');

		await user.type(x_inputs[0], '-1');
		await user.type(y_inputs[0], '2');

		//Assert length
		expect(x_inputs).toHaveLength(1);
		expect(y_inputs).toHaveLength(1);

		//Assert values
		expect(x_inputs[0]).toHaveValue(-1);
		expect(y_inputs[0]).toHaveValue(2);
	});

    test('Add 1 additional empty value to a chart', async () => {
		//Arrange
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();

		//Act
		const addButton = domTesting.getByText(document, '+');
		await user.click(addButton);

		const x_inputs = domTesting.getAllByLabelText(document, 'X');
		const y_inputs = domTesting.getAllByLabelText(document, 'Y');

		//Assert
		expect(x_inputs).toHaveLength(2);
		expect(y_inputs).toHaveLength(2);

		expect(x_inputs[1]).not.toHaveValue();
		expect(y_inputs[1]).not.toHaveValue();
	});

    test('Add 10 additional empty values to a chart', async () => {
		//Arrange
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();

		//Act
		const addButton = domTesting.getByText(document, '+');
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);

		//Assert
		expect(domTesting.getAllByLabelText(document, 'X')).toHaveLength(11);
		expect(domTesting.getAllByLabelText(document, 'Y')).toHaveLength(11);
	});

    test('Add create a chart starting with 2 values [(0, 0), (100, 200)] and 5 empty values at the end of the inputs to a chart', async () => {
		//Arrange
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();

		//Act
		const addButton = domTesting.getByText(document, '+');

		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);

		const x_inputs = domTesting.getAllByLabelText(document, 'X');
		const y_inputs = domTesting.getAllByLabelText(document, 'Y');

		await user.type(x_inputs[0], '0');
		await user.type(y_inputs[0], '0');

		await user.type(x_inputs[1], '100');
		await user.type(y_inputs[1], '200');

		//Assert
		expect(x_inputs).toHaveLength(7);
		expect(y_inputs).toHaveLength(7);

		expect(x_inputs[0]).toHaveValue(0);
		expect(y_inputs[0]).toHaveValue(0);

		expect(x_inputs[1]).toHaveValue(100);
		expect(y_inputs[1]).toHaveValue(200);
	});

    test('Add 3 empty values at the start of the charts, and 3 set values [(1, 2), (3, 4), (5, 6)] at the end of the inputs to a chart', async () => {
		//Arrange
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();

		//Act
		const addButton = domTesting.getByText(document, '+');
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);

		const x_inputs = domTesting.getAllByLabelText(document, 'X');
		const y_inputs = domTesting.getAllByLabelText(document, 'Y');

		await user.type(x_inputs[4], '1');
		await user.type(y_inputs[4], '2');

		await user.type(x_inputs[5], '3');
		await user.type(y_inputs[5], '4');

		await user.type(x_inputs[6], '5');
		await user.type(y_inputs[6], '6');

		//Assert
		expect(x_inputs).toHaveLength(7);
		expect(y_inputs).toHaveLength(7);

		expect(x_inputs[4]).toHaveValue(1);
		expect(y_inputs[4]).toHaveValue(2);

		expect(x_inputs[5]).toHaveValue(3);
		expect(y_inputs[5]).toHaveValue(4);

		expect(x_inputs[6]).toHaveValue(5);
		expect(y_inputs[6]).toHaveValue(6);
	});

    test('Add 3 values [(1, 4), (5, 2), (9, 0)] and 4 empty inputs in random locations', async () => {
		//Arrange
		initDomFromFiles(html_path, js_path);
		const user = userEvent.setup();

		//Act
		const addButton = domTesting.getByText(document, '+');
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);

		const x_inputs = domTesting.getAllByLabelText(document, 'X');
		const y_inputs = domTesting.getAllByLabelText(document, 'Y');

		await user.type(x_inputs[2], '1');
		await user.type(y_inputs[2], '4');

		await user.type(x_inputs[5], '5');
		await user.type(y_inputs[5], '2');

		await user.type(x_inputs[6], '9');
		await user.type(y_inputs[6], '0');

		//Assert
		expect(x_inputs).toHaveLength(8);
		expect(y_inputs).toHaveLength(8);

		expect(x_inputs[0]).not.toHaveValue();
		expect(y_inputs[0]).not.toHaveValue();

		expect(x_inputs[1]).not.toHaveValue();
		expect(y_inputs[1]).not.toHaveValue();

		expect(x_inputs[2]).toHaveValue(1);
		expect(y_inputs[2]).toHaveValue(4);

		expect(x_inputs[3]).not.toHaveValue();
		expect(y_inputs[3]).not.toHaveValue();

		expect(x_inputs[4]).not.toHaveValue();
		expect(y_inputs[4]).not.toHaveValue();

		expect(x_inputs[5]).toHaveValue(5);
		expect(y_inputs[5]).toHaveValue(2);

		expect(x_inputs[6]).toHaveValue(9);
		expect(y_inputs[6]).toHaveValue(0);

		expect(x_inputs[7]).not.toHaveValue();
		expect(y_inputs[7]).not.toHaveValue();
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
 * Tests for sending data to the graph generation function -- 4th test suite for UI tests
 * 
 * 
*/


describe("Tests for sending data to the graph generation function", () => {
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