/**
 * @jest-environment jsdom
 */

const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;

const htmlPath = `${__dirname}/line.html`;
const jsPath = `${__dirname}/line.js`;

// custom functions imported from 'functions' directory
const functions = require('./funcs/functions.js');
const testAddValues = require('./funcs/testAddValues.js');
const testAlert = require('./funcs/testDisplayAlert.js');
const testClearChart = require('./funcs/testClearChart.js');
const testDataSent = require('./funcs/testDataSent.js');

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

		// run several tests! cant hurt to run more :)
		await testAddValues(elements, [['0','0'],['100','200']], 5);
		await testAddValues(elements, [['1','2'],['3','4'],['5','6'],['7','8']], 2);
		await testAddValues(elements, [['-1','2']], 100);
		
    });

	test('Alerts displayed for missing chart data', async () => {

		// run several tests! cant hurt to run more :)
		await testAlert.testMissingLabel(elements, 'Cats', 'Bananas');
		await testAlert.testMissingCoord(elements, '1', '2');

		await testAlert.testMissingLabel(elements, 'Cats', 'Bananas');
		await testAlert.testMissingCoord(elements, '1', '2');

		await testAlert.testMissingLabel(elements, 'Cats', 'Bananas');
		await testAlert.testMissingCoord(elements, '1', '2');

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

});