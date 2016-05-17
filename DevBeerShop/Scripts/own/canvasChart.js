var chartNS = chartNS || {};

chartNS.findMax = function (object) {
    var max = 0;
    for (var item in object) {
        var number = object[item];
        if (number.sales > max) {
            max = number.sales;
        }
    }

    return max;
}
chartNS.createAxis = function (context, startx, starty, endx, endy) {
    context.beginPath();
    context.moveTo(startx, starty);
    context.lineTo(endx, endy);
    context.closePath();
    context.stroke();
}
chartNS.createBar = function (context, data, startX, barWidth, width) {
    
    context.lineWidth = '1.2';
    var startY = chartNS.findMax(data) + 50;
    chartNS.createAxis(context, startX, startY, startX, startX);
    chartNS.createAxis(context, startX, startY, width, startY);

    context.lineWidth = '0.0';
    var maxHeight = startY-1;
    var i = 0;
    var xPosition, number, yPosition, fromBotton;

    var resultBar = function (beer) {
        xPosition = 20 + startX + (i * barWidth) + (i * 30);
        yPosition = maxHeight - beer.sales;
        fromBotton = maxHeight - (maxHeight - beer.sales);

        context.fillStyle = 'gold';
        context.fillRect(xPosition, yPosition, barWidth, fromBotton);

        context.textAlign = 'left';
        context.fillStyle = 'black';
        context.fillText(beer.month, xPosition, maxHeight + 25);
        context.fillText(beer.sales, xPosition, yPosition - 5);
        i++;
    };
    data.forEach(resultBar);
}

var salesChart = [
    {
        month: 'Jan',
        sales: 410
    },
    {
        month: 'Feb',
        sales: 310
    },
    {
        month: 'Mar',
        sales: 210
    },
    {
        month: 'Apr',
        sales: 280
    },
    {
        month: 'May',
        sales: 320
    },
    {
        month: 'Jun',
        sales: 170
    },
    {
        month: 'Jul',
        sales: 321
    },
    {
        month: 'Aug',
        sales: 97
    },
    {
        month: 'Sep',
        sales: 184
    },
    {
        month: 'Oct',
        sales: 171
    },
    {
        month: 'Nov',
        sales: 210
    },
    {
        month: 'Dec',
        sales: 320
    }];

var drawChart = function() {
    var canvas = document.getElementById('salesChartBar');

    if (canvas && canvas.getContext) {
        var context = canvas.getContext('2d');
        chartNS.createBar(context, salesChart, 30, 20, canvas.width -50);
    }
};


