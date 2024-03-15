const generateChartImg = require('../generateChartImg'); 

// Initial Test. 

test('Initial Test. ', async () => { 
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
        title: 'Sample Chart',
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

