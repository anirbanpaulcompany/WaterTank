function processArray() {
    let inputElement = document.getElementById('inputArray');
    let inputArray = inputElement.value.split(',');
    let bricks = calculateWaterAndBricks(inputArray);
    let water = calculateOnlyWater(inputArray);
    calculateWaterAndBricks(inputArray, bricks);
    calculateOnlyWater(inputArray, water);
}

function createChart(xAxisInput, outputArray, containerId) {
    let dom = document.getElementById(containerId);
    let myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    let option = {
        xAxis: {
            type: 'category',
            data: xAxisInput
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: outputArray,
                type: 'bar'
            }
        ]
    };
    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
    window.addEventListener('resize', myChart.resize);
}

const countWater = (finalArray) => {
    let sum = 0;
    for (let i = 0; i < finalArray.length; i++) {
        let element = finalArray[i];
        if (element != '-') {
            sum += +element;
        }
    }
    return sum;
};

function calculateWaterAndBricks(bricks) {
    let finalArray = [];
    let firstArray = [];
    let secondArray = [];
    let result = [];
    let lastValueForFirstArray = 0;
    let lastValueForSecondArray = 0;

    for (let i = 0; i < bricks.length; i++) {
        let element = bricks[i];
        if (element == 0) {
            firstArray.push(lastValueForFirstArray);
        } else {
            firstArray.push('-');
            lastValueForFirstArray = element;
        }
    }

    for (let i = bricks.length - 1; i >= 0; i--) {
        let element = bricks[i];
        if (element == 0) {
            secondArray[i] = lastValueForSecondArray;
        } else {
            secondArray[i] = '-';
            lastValueForSecondArray = element;
        }
    }

    for (let i = 0; i < bricks.length; i++) {
        let first = firstArray[i];
        let second = secondArray[i];
        if (first == '-') {
            finalArray[i] = '-';
        } else {
            finalArray[i] = first - second > 0 ? second : first;
        }
    }

    for (let i = 0; i < bricks.length; i++) {
        let element = bricks[i];
        if (element == 0) {
            result.push({
                value: finalArray[i],
                itemStyle: {
                    color: '#0000FF'
                }
            });
        } else {
            result.push({
                value: element,
                itemStyle: {
                    color: '#FFFF00'
                }
            });
        }
    }

    createChart(bricks, result, 'chart-container');
    let outputSpan = document.getElementById('waterAmount');
    outputSpan.innerHTML = `Total ${countWater(finalArray)} Water Units`;
}

function calculateOnlyWater(water) {
    let finalArray = [];
    let firstArray = [];
    let secondArray = [];
    let result = [];
    let lastValueForFirstArray = 0;
    let lastValueForSecondArray = 0;

    for (let i = 0; i < water.length; i++) {
        let element = water[i];
        if (element == 0) {
            firstArray.push(lastValueForFirstArray);
        } else {
            firstArray.push('-');
            lastValueForFirstArray = element;
        }
    }

    for (let i = water.length - 1; i >= 0; i--) {
        let element = water[i];
        if (element == 0) {
            secondArray[i] = lastValueForSecondArray;
        } else {
            secondArray[i] = '-';
            lastValueForSecondArray = element;
        }
    }

    for (let i = 0; i < water.length; i++) {
        let first = firstArray[i];
        let second = secondArray[i];
        if (first == '-') {
            finalArray[i] = '-';
        } else {
            finalArray[i] = first - second > 0 ? second : first;
        }
    }

    for (let i = 0; i < water.length; i++) {
        let element = water[i];
        if (element == 0) {
            result.push({
                value: finalArray[i],
                itemStyle: {
                    color: '#0000FF'
                }
            });
        } else {
            result.push({
                value: 0,
                itemStyle: {
                    color: '#0000FF'
                }
            });
        }
    }

    createChart(water, result, 'chart-container-water');

    let outputSpan = document.getElementById('waterAmount');
    outputSpan.innerHTML = `Total Water Units: ${countWater(finalArray)}`;
}
