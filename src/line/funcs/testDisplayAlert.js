/**
 * @jest-environment jsdom
 */

const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;
const functions = require('./functions.js');

const [htmlPath, jsPath] = functions.getPaths();

async function testMissingLabel(elements, X_label_text, Y_label_text){

	// do initializations: init the files, init our element object, setup our
	// user, and start spying on window.alert. NOTE: mocking the implementation
	// because 'window.alert' not implemented error is being throw when i dont
	// stub the method
	functions.initDomFromFiles(htmlPath, jsPath);
	functions.initElements(elements);
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

	// reset elements object + page for next test, get rid of spy's middleware
	// on the window.alert function :)
	await functions.resetForNextTest(elements);
	alert_spy.mockRestore();

}

async function testMissingCoord(elements, X_input, Y_input){

	// do initializations: init the files, init our element object, setup our
	// user, and start spying on window.alert. NOTE: mocking the implementation
	// because 'window.alert' not implemented error is being throw when i dont
	// stub the method
	functions.initDomFromFiles(htmlPath, jsPath);
	functions.initElements(elements);
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
    // of spys middleware):)
	await functions.resetForNextTest(elements);
	alert_spy.mockRestore();

}

module.exports = ({ testMissingLabel, testMissingCoord });