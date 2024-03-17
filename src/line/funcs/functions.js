/**
 * @jest-environment jsdom
 */

const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;

// function used for initialized dom from files. got this function from lecture
function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8');
	document.open();
	document.write(html);
	document.close();

	require(jsPath)
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

// this function will assert whether or not the list of (X, Y) inputs is equal
// to an expected length
function assertInputLength(elements, expected_length){

	initElements(elements);
	expect(elements.X_inputs).toHaveLength(expected_length);
	expect(elements.Y_inputs).toHaveLength(expected_length);

}

// this function will get the path to the html and js paths that we want to use
// for testing. this is needed because all of these functions are an extra 
// directory deeper now
function getPaths(){

	const htmlPath = ((`${__dirname}`).split('/')).slice(0, -1).join('/') + '/line.html';
	const jsPath = ((`${__dirname}`).split('/')).slice(0, -1).join('/') + '/line.js';

	return [htmlPath, jsPath];

}

module.exports = ({ initDomFromFiles, initElements, resetForNextTest, 
    assertInputLength, getPaths });