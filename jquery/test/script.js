

$(function() {
  // Build the chart
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: 'container',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: 'Ingredients'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage}%</b>',
      percentageDecimals: 1
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true
        },
        showInLegend: true
      }
    },
    series: [{
      type: 'pie',
      name: 'Ingredient portion',
      data: []
    }]
  });

  // $.each(chart.series[0].points, function(i, point) {

  //   console.log(chart.series[0].points)

  //   $('<input type="hidden" name="slider[]">').val(point.y).appendTo('#sliders')

  //   $('<label>' + point.legendItem.textStr + '</label>').appendTo('#sliders')

  //   $('<div></div>').appendTo('#sliders').slider({
  //     value: point.y,
  //     max: 100,
  //     min: 0,
  //     slide: function(event, ui) {
  //       point.update(ui.value, true)
  //       $(this).prev().val(ui.value)
  //     }
  //   }).children('a').css('background', point.color).text('    ' + point.legendItem.textStr)

  // })

var slider_cnt = 0;

$(document).ready(function(){
    
    $("#myBtn").click(function(){
        var str = $("#myInput").val();
        if (!str) {return;}

        chart.series[0].addPoint([str,0]);
        var len = chart.series[0].points.length;
        var point = chart.series[0].points[len-1];

        //console.log(len)

        slider_cnt += 1;
        $('<div id="slider'+slider_cnt+'">').appendTo('#sliders')
        $('<label>' + point.legendItem.textStr + '</label>').appendTo('#sliders')
        $('<br/>').appendTo('#sliders')
        
        // $('<button type="button" id="button'+slider_cnt+'">Remove</button><br/><br/>').appendTo("#sliders")

        // $('#button'+slider_cnt).click(function() {
        //   console.log(slider_cnt);
        //   $('.slider'+slider_cnt).remove();
        // });

        $('<div></div>').appendTo('#sliders').slider({
          value: point.y,
          max: 100,
          min: 0,
          slide: function(event, ui) {
            point.update(ui.value, true)

            let retlist = chart.series[0].points.map(function (ce) {
              return ce.name + ":" + ce.percentage;
            });

            setAnswer(retlist.toString())

            //console.log(chart.series[0].data)

            //$(this).prev().val(ui.value)
          }
        })

        $('<br/></div>').appendTo("#sliders")

    });
});

});