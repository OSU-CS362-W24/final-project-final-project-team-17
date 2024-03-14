// Mock - Thank U Perplexity. 

const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost'
});
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
}; 
const { saveChart , loadAllSavedCharts , loadSavedChart , updateCurrentChartData , loadCurrentChartData } = require( "../chartStorage" ) ; 

/**
 * @jest-environment jsdom
 */ 

require('@testing-library/jest-dom'); 

// Function 2. 

test( "Initial Test - loadAllSavedCharts. " , function () { 
    window.localStorage.clear() ; 
    const chart_1 = { type: 'line', data: [1, 2, 3] }; 
    const chart_2 = { type: 'line', data: [1, 4, 3] }; 
    saveChart( chart_1 ) ; 
    saveChart( chart_2 ) ; 
    var expectedList = [ { type: 'line', data: [1, 2, 3] } , { type: 'line', data: [1, 4, 3] } ] ; 
    expect( loadAllSavedCharts() ).toEqual( expectedList ) ; 
    window.localStorage.clear() ; 
}) ; 

// Function 3. 

test( "Initial Test - loadSavedChart. " , function () { 
    window.localStorage.clear() ; 
    const chart_1 = { type: 'line', data: [1, 2, 3] }; 
    const chart_2 = { type: 'line', data: [1, 4, 3] }; 
    saveChart( chart_1 ) ; 
    saveChart( chart_2 ) ; 
    var expectedChart = { type: 'line', data: [1, 4, 3] } ; 
    expect( loadSavedChart( 1 ) ).toEqual( expectedChart ) ; 
    window.localStorage.clear() ; 
}) ; 

// Function 5. 

test( "Initial Test - loadCurrentChartData. " , function () { 
    window.localStorage.clear() ; 
    const chart_1 = { type: 'line', data: [1, 2, 3] }; 
    updateCurrentChartData( chart_1 ) ; 
    var expectedChart = { type: 'line', data: [1, 2, 3] } ; 
    expect( loadCurrentChartData() ).toEqual( expectedChart ) ; 
    window.localStorage.clear() ; 
}) ; 
