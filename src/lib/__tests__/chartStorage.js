const { JSDOM } = require('jsdom'); 

// TODO: Document This. 

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

///////////////////////////// 
// Function 1. 
///////////////////////////// 

test('The initial Test - saveChart. ', () => { 
    window.localStorage.clear() ; 
    const chartData = {
        type: 'line',
        data: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 30 }
        ],
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Sample Chart',
        color: '#FFFFFF'
    };
    saveChart(chartData);
    const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'));
    expect(savedCharts).toHaveLength(1); 
    // TODO: This can be taken as logic in a unit test. 
    expect(savedCharts[0]).toEqual(chartData); 
    window.localStorage.clear() ; 
}); 

// TODO: Additional Tests: 
// TODO: If an index is not provided in the input. 
// TODO: If an index is provided in the input. 

///////////////////////////// 
// Function 2. - Not Correct - Can not use saveChart. 
///////////////////////////// 

test( "The initial Test - loadAllSavedCharts. " , function () { 
    window.localStorage.clear() ; 
    const chart_1 = {
        type: 'line',
        data: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 30 }
        ],
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Sample Chart',
        color: '#FFFFFF'
    };
    const chart_2 = {
        type: 'line',
        data: [
            { x: 1, y: 10 },
            { x: 3, y: 30 },
            { x: 2, y: 20 }
        ],
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Sample Chart',
        color: '#FFFFFF'
    }; 
    saveChart( chart_1 ) ; 
    saveChart( chart_2 ) ; 
    // TODO: This can be taken as logic in a unit test. 
    var expectedList = [ chart_1 , chart_2 ] ; 
    expect( loadAllSavedCharts() ).toEqual( expectedList ) ; 
    window.localStorage.clear() ; 
}) ; 

// TODO: Additional Tests: 
// TODO: If multiple charts are saved. 
// TODO: If no chart is saved. 

///////////////////////////// 
// Function 3. - Not Correct - Can not use saveChart. 
///////////////////////////// 

test( "The initial Test - loadSavedChart. " , function () { 
    window.localStorage.clear() ; 
    const chart_1 = {
        type: 'line',
        data: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 30 }
        ],
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Sample Chart',
        color: '#FFFFFF'
    };
    const chart_2 = {
        type: 'line',
        data: [
            { x: 1, y: 10 },
            { x: 3, y: 30 },
            { x: 2, y: 20 }
        ],
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Sample Chart',
        color: '#FFFFFF'
    }; 
    saveChart( chart_1 ) ; 
    saveChart( chart_2 ) ; 
    // TODO: This can be taken as logic in a unit test. 
    expect( loadSavedChart( 1 ) ).toEqual( chart_2 ) ; 
    window.localStorage.clear() ; 
}) ; 

// TODO: Additional Tests: Create It. 

///////////////////////////// 
// Function 4. 
///////////////////////////// 

test('The initial Test - updateCurrentChartData. ', () => {
    const chartData = {
        type: 'line',
        data: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 30 }
        ],
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Sample Chart',
        color: '#FFFFFF'
    };
    updateCurrentChartData(chartData);
    const storedChartDataString = window.localStorage.getItem('currentChartData');
    const storedChartData = JSON.parse(storedChartDataString) ; 
    expect(storedChartData).toEqual(chartData);
}); 

// TODO: Additional Tests: Create It. 

///////////////////////////// 
// Function 5. - Not Correct. - Can not use updateCurrentChartData. 
///////////////////////////// 

test( "The initial Test - loadCurrentChartData. " , function () { 
    window.localStorage.clear() ; 
    const chartData = {
        type: 'line',
        data: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 30 }
        ],
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Sample Chart',
        color: '#FFFFFF'
    };
    updateCurrentChartData( chartData ) ; 
    expect( loadCurrentChartData() ).toEqual( chartData ) ; 
    window.localStorage.clear() ; 
}) ; 

// TODO: Additional Tests: Create It. 
