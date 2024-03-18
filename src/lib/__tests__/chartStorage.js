const { JSDOM } = require('jsdom'); 

// Mock the Local Storage. 

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

// Function 1. 

// If an index is not provided in the input. 

test('Expect, if there is no index input, saveChart to save the chart. ', () => { 
    window.localStorage.clear() ; 
    // Create the data. 
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
    // Call the function to test. 
    saveChart(chartData); 
    // Check if the output is correct. 
    const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'));
    expect(savedCharts).toHaveLength(1); 
    expect(savedCharts[0]).toEqual(chartData); 
    window.localStorage.clear() ; 
}); 

// If an index is provided in the input. 

test('Expect, if there is an index input, saveChart to save the chart to the correct index. ', () => { 
    window.localStorage.clear() ; 
    // Create the data. 
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
            { x: 3, y: 30 },
            { x: 2, y: 20 },
            { x: 1, y: 10 }
        ],
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Sample Chart',
        color: '#FFFFFF'
    }; 
    // Create the setup. 
    saveChart(chart_1); 
    // Call the function to test. 
    saveChart(chart_2 , 0 ); 
    // Check if the output is correct. 
    const savedCharts = JSON.parse(window.localStorage.getItem('savedCharts'));
    expect(savedCharts).toHaveLength(1); 
    expect(savedCharts[0]).toEqual(chart_2); 
    window.localStorage.clear() ; 
}); 

// Function 2. 

// If 1 chart is saved. 

test("Expect, if there is 1 chart currently saved, loadAllSavedCharts to it. ", function () {
    window.localStorage.clear(); 
    // Create the data. 
    const expectedData = [
      {
        type: "line",
        data: [
          { x: 1, y: 10 },
          { x: 2, y: 20 },
          { x: 3, y: 30 },
        ],
        xLabel: "X Axis",
        yLabel: "Y Axis",
        title: "Sample Chart",
        color: "#FFFFFF",
      },
    ]; 
    // Create the setup. 
    window.localStorage.setItem("savedCharts", JSON.stringify(expectedData)); 
    // Call the function to test. 
    const result = loadAllSavedCharts(); 
    // Check if the output is correct. 
    expect(result).toEqual(expectedData);
    window.localStorage.clear();
  });
  
 // If 2+ chart is saved. 

  test("Expect, if there is 2+ chart currently saved, loadAllSavedCharts to return all of it. ", () => {
    window.localStorage.clear(); 
    // Create the data. 
    const expectedData = [
        {
          type: "line",
          data: [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
          ],
          xLabel: "X Axis",
          yLabel: "Y Axis",
          title: "Sample Chart",
          color: "#FFFFFF",
        },
        {
          type: "line",
          data: [
            { x: 1, y: 10 },
            { x: 3, y: 30 },
            { x: 2, y: 20 },
          ],
          xLabel: "X Axis",
          yLabel: "Y Axis",
          title: "Sample Chart",
          color: "#FFFFFF",
        },
    ]; 
    // Create the setup. 
    window.localStorage.setItem("savedCharts", JSON.stringify(expectedData)); 
    // Call the function to test. 
    const result = loadAllSavedCharts(); 
    // Check if the output is correct. 
    expect(result).toEqual(expectedData); 
    window.localStorage.clear();
  });
  
  // If 0 chart is saved. 

  test("Expect, if there is 0 chart currently saved, loadAllSavedCharts to return an em,pty list. ", () => {
    window.localStorage.clear();
    window.localStorage.removeItem("savedCharts"); 
    // Call the function to test. 
    const result = loadAllSavedCharts(); 
    // Check if the output is correct. 
    expect(result).toEqual([]); 
    window.localStorage.clear() ; 
  }); 

// Function 3. 

// If 2 chart is saved, get the 2'nd chart. 

test( "Expect, if 2 chart is saved, index input is 1, loadSavedChart to return the 2'nd chart. " , function () { 
    window.localStorage.clear() ; 
    // Create the data. 
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
    chartList = [ chart_1 , chart_2 ] ; 
    // Create the setup. 
    window.localStorage.setItem("savedCharts", JSON.stringify(chartList)); 
    // Call the function to test. 
    // Check if the output is correct. 
    expect( loadSavedChart( 1 ) ).toEqual( chart_2 ) ; 
    window.localStorage.clear() ; 
}) ; 

// Function 4. 

// If the function is called 1 time. 

test('Expect, if called 1 time, updateCurrentChartData to update the chart data. ', () => { 
    window.localStorage.clear() ; 
    // Create the data. 
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
    // Call the function to test. 
    updateCurrentChartData(chartData); 
    // Check if the output is correct. 
    const storedChartDataString = window.localStorage.getItem('currentChartData');
    const storedChartData = JSON.parse(storedChartDataString) ; 
    expect(storedChartData).toEqual(chartData); 
    window.localStorage.clear() ; 
}); 

// If the function is called 2+ time. 

test('Expect, if called 2+ time, updateCurrentChartData to update the chart data. ', () => {
    window.localStorage.clear() ; 
    // Create the data. 
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
            { x: 3, y: 30 },
            { x: 2, y: 20 },
            { x: 1, y: 10 }
        ],
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Sample Chart',
        color: '#FFFFFF'
    }; 
    // Create the setup. 
    updateCurrentChartData(chart_1); 
    // Call the function to test. 
    updateCurrentChartData(chart_2); 
    // Check if the output is correct. 
    const storedChartDataString = window.localStorage.getItem('currentChartData');
    const storedChartData = JSON.parse(storedChartDataString) ; 
    expect(storedChartData).toEqual(chart_2); 
    window.localStorage.clear() ; 
}); 

// Function 5. 

// If there is 1 chart. 

test( "Expect, if there is 1 chart data, loadCurrentChartData to return the chart. " , function () { 
    window.localStorage.clear() ; 
    // Create the data. 
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
    // Create the setup. 
    window.localStorage.setItem("currentChartData", JSON.stringify(chartData)) ; 
    // Call the function to test. 
    // Check if the output is correct. 
    expect( loadCurrentChartData() ).toEqual( chartData ) ; 
    window.localStorage.clear() ; 
}) ; 

// If there is 0 chart. 

test( "Expect, if there is 0 chart data, loadCurrentChartData to return {}. " , function () { 
    window.localStorage.clear() ; 
    // Call the function to test. 
    // Check if the output is correct. 
    expect( loadCurrentChartData() ).toEqual( {} ) ; 
    window.localStorage.clear() ; 
}) ; 

