/**
 * @jest-environment jsdom
 */

const fs = require('fs');
require('@testing-library/jest-dom');
const domTesting = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;
const functions = require('./functions.js');

const [htmlPath, jsPath] = functions.getPaths();

async function testDataSent(elements, title, X_input, Y_input, X_label, Y_label){

    // init dom elements but dont use jest.isolateModules as noted by alex
    functions.initDomFromFiles(htmlPath, jsPath);
    functions.initElements(elements);
 
    // mocked generateChartImg function - return valid img URL
    const spy = require('../../lib/generateChartImg.js');
    jest.mock('../../lib/generateChartImg.js');
    spy.mockImplementation(() => { return 'http://placekitten.com/480/480'; });

    // do action: type in information to generate our chart with
    const user = userEvent.setup();
    await user.type(elements.title_input, title);
    await user.type(elements.X_inputs[0], X_input);
    await user.type(elements.Y_inputs[0], Y_input);
    await user.type(elements.X_label, X_label);
    await user.type(elements.Y_label, Y_label);
    await user.click(elements.generate_chart_button);

    // assert that our function was called
    expect(spy).toHaveBeenCalled(); 
    
    // do some clean up at the end of the test
    spy.mockRestore();
    await functions.resetForNextTest(elements);

}

module.exports = testDataSent;