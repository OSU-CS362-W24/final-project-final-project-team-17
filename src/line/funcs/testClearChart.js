/**
 * @jest-environment jsdom
 */
const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;
const functions = require('./functions.js');

const [html_path, js_path] = functions.getPaths('/line.html', '/line.js');

async function testClearChart(elements, title, color, inputs, 
                              num_empty_inputs){

	// do initializations: init the files, setup our user
	functions.initDomFromFiles(html_path, js_path);
	functions.initElements(elements);
	const user = userEvent.setup();
	var length = 1;

	// do actions: type in the charts title, input a new color
	await user.type(elements.title_input, title);
	domTesting.fireEvent.input(elements.color_input, 
							   {target: {value: color}});
	
	// do actions: insert all given inputs, make N many empty input boxes,
	// click the clear chart button in hopes that itll clear everything!
	await functions.insertInputs(elements, inputs, 1);
	await functions.makeEmptyInputs(elements, num_empty_inputs);
	await user.click(elements.clear_chart_button);

	// do assertions: assert theres only one (X, Y) input, assert that all
	// other values have been cleared of their previous text, assert that the
	// previously assigned color has been returned to its default value
	functions.assertInputLength(elements, 1);
	expect(elements.title_input).toHaveValue('');
	expect(elements.X_label).toHaveValue('');
	expect(elements.Y_label).toHaveValue('');
	expect(elements.X_inputs[0]).toHaveValue(null);
	expect(elements.Y_inputs[0]).toHaveValue(null);
	expect(elements.color_input).toHaveValue('#ff4500');

	// this function will refresh everything for our future tests! :)
	await functions.resetForNextTest(elements);

}

module.exports = testClearChart;