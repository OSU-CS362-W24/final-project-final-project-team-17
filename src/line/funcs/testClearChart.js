/**
 * @jest-environment jsdom
 */
const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;
const functions = require('./functions.js');

const [htmlPath, jsPath] = functions.getPaths();

async function testClearChart(elements, title, color, inputs, 
                              num_empty_inputs){

	// do initializations: init the files, setup our user
	functions.initDomFromFiles(htmlPath, jsPath);
	functions.initElements(elements);
	const user = userEvent.setup();
	var length = 1;

	// do actions: type in the charts title, input a new color
	await user.type(elements.title_input, title);
	domTesting.fireEvent.input(elements.color_input, 
							   {target: {value: color}});
	
	// do actions: create new (X, Y) inputs and add the above values 
	// (stored in input) to them
	for(const input of inputs){

		await user.type(elements.X_inputs[length - 1], input[0]);
		await user.type(elements.Y_inputs[length - 1], input[1]);
		await user.click(elements.add_input_button);

	}

	// do actions: add K empty (X, Y) inputs then clear the chart
	for(var i = 0; i < num_empty_inputs - 1; i++){ 
		await user.click(elements.add_input_button);
	}
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