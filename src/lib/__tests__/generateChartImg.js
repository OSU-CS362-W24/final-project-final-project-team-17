const generateChartImg = require('../generateChartImg'); 

// Done. 

test('Expect to generate a chart, when the title and the color is provided. ', async () => {
    const pointList = [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 }
    ];
    const dataForTheChart = {
        type: 'line',
        data: pointList,
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Chart',
        color: '#FFFFFF'
    };
    const imgUrl = await generateChartImg(
        dataForTheChart.type,
        dataForTheChart.data,
        dataForTheChart.xLabel,
        dataForTheChart.yLabel,
        dataForTheChart.title,
        dataForTheChart.color
    );
    expect(typeof imgUrl).toBe('string');
    expect(imgUrl.length).toBeGreaterThan(0);
});

test('Expect to generate a chart, when the title is not provided. ', async () => {
    const pointList = [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 }
    ];
    const dataForTheChart = {
        type: 'line',
        data: pointList,
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        color: '#FFFFFF'
    };
    const imgUrl = await generateChartImg(
        dataForTheChart.type,
        dataForTheChart.data,
        dataForTheChart.xLabel,
        dataForTheChart.yLabel,
        undefined,
        dataForTheChart.color
    );
    expect(typeof imgUrl).toBe('string');
    expect(imgUrl.length).toBeGreaterThan(0);
});

test('Expect to generate a chart, when the color is not provided. ', async () => {
    const pointList = [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 }
    ];
    const dataForTheChart = {
        type: 'line',
        data: pointList,
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Chart'
    };
    const imgUrl = await generateChartImg(
        dataForTheChart.type,
        dataForTheChart.data,
        dataForTheChart.xLabel,
        dataForTheChart.yLabel,
        dataForTheChart.title,
        undefined
    );
    expect(typeof imgUrl).toBe('string');
    expect(imgUrl.length).toBeGreaterThan(0);
});

test('Expect to generate a line chart. ', async () => {
    const pointList = [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 }
    ];
    const dataForTheChart = {
        type: 'line',
        data: pointList,
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Line Chart',
        color: '#FFFFFF'
    };
    const imgUrl = await generateChartImg(
        dataForTheChart.type,
        dataForTheChart.data,
        dataForTheChart.xLabel,
        dataForTheChart.yLabel,
        dataForTheChart.title,
        dataForTheChart.color
    );
    expect(typeof imgUrl).toBe('string');
    expect(imgUrl.length).toBeGreaterThan(0);
});

test('Expect to generate a scatter chart. ', async () => {
    const pointList = [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 }
    ];
    const dataForTheChart = {
        type: 'scatter',
        data: pointList,
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Scatter Chart',
        color: '#FFFFFF'
    };
    const imgUrl = await generateChartImg(
        dataForTheChart.type,
        dataForTheChart.data,
        dataForTheChart.xLabel,
        dataForTheChart.yLabel,
        dataForTheChart.title,
        dataForTheChart.color
    );
    expect(typeof imgUrl).toBe('string');
    expect(imgUrl.length).toBeGreaterThan(0);
});

test('Expect to generate a bar chart. ', async () => {
    const pointList = [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 }
    ];
    const dataForTheChart = {
        type: 'bar',
        data: pointList,
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Bar Chart',
        color: '#FFFFFF'
    };
    const imgUrl = await generateChartImg(
        dataForTheChart.type,
        dataForTheChart.data,
        dataForTheChart.xLabel,
        dataForTheChart.yLabel,
        dataForTheChart.title,
        dataForTheChart.color
    );
    expect(typeof imgUrl).toBe('string');
    expect(imgUrl.length).toBeGreaterThan(0);
});

test('Expect to generate a chart, when the input list is empty. ', async () => {
    const pointList = [];
    const dataForTheChart = {
        type: 'line',
        data: pointList,
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Empty Chart',
        color: '#FFFFFF'
    };
    const imgUrl = await generateChartImg(
        dataForTheChart.type,
        dataForTheChart.data,
        dataForTheChart.xLabel,
        dataForTheChart.yLabel,
        dataForTheChart.title,
        dataForTheChart.color
    );
    expect(typeof imgUrl).toBe('string');
    expect(imgUrl.length).toBeGreaterThan(0);
});

test('Expect to generate a chart, when the input list has 10+ points. ', async () => {
    const pointList = [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 },
        { x: 4, y: 40 },
        { x: 5, y: 50 },
        { x: 6, y: 60 },
        { x: 7, y: 70 },
        { x: 8, y: 80 },
        { x: 9, y: 90 },
        { x: 10, y: 100 }
    ];
    const dataForTheChart = {
        type: 'line',
        data: pointList,
        xLabel: 'X Axis',
        yLabel: 'Y Axis',
        title: 'Large Chart',
        color: '#FFFFFF'
    };
    const imgUrl = await generateChartImg(
        dataForTheChart.type,
        dataForTheChart.data,
        dataForTheChart.xLabel,
        dataForTheChart.yLabel,
        dataForTheChart.title,
        dataForTheChart.color
    );
    expect(typeof imgUrl).toBe('string');
    expect(imgUrl.length).toBeGreaterThan(0);
});