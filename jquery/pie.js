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
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          connectorWidth: 2,
          style: {fontSize: '20px'}
        },
        showInLegend: false
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
    
    $("#add_button").click(function(){
        var str = $("#ingredient_input").val();
        if (!str) {return;}
        if (str.match('^\\s+') || str.match('\\s+$')) {
          alert("Name cannot be empty, begin with a space, or end with a space.")
          $("#ingredient_input").val('');
          return;
        }

        if (!str.match('^[A-Za-z0-9 _\\-&]+$')) {
          alert("Name can only have letters, numbers, spaces, underscores, dashes, and ampersands.");
          $("#ingredient_input").val('');
          return;
        }

        for (let i=0; i<chart.series[0].points.length; i++) {
            if (str.toUpperCase() === chart.series[0].points[i].name.toUpperCase()) {
                alert(str + " is already an ingredient.");
                $("#ingredient_input").val('');
                return;
            }
        }

        $("#ingredient_input").val('');

        chart.series[0].addPoint([str,1]);
        var len = chart.series[0].points.length;
        var point = chart.series[0].points[len-1];

        //console.log(len)

        slider_cnt += 1;
        $('<div id="slider'+slider_cnt+'"></div>').appendTo('#sliders')
        $('<label id="ingredient_name">' + str + '</label>').appendTo('#slider'+slider_cnt)
        $('<span>&nbsp;&nbsp;</span>').appendTo('#slider'+slider_cnt)
        $('<button type="button" id="button'+slider_cnt+'">Remove</button><br/><br/>').appendTo('#slider'+slider_cnt)

        $(document).on("click", "#button"+slider_cnt, function(){
           let name = $(this).parent().children("#ingredient_name")[0].innerText;

           // console.log(name);
           // console.log($(this).parent().children("#ingredient_name")[0].innerText);

           let slength = chart.series[0].points.length;
           for (let j=0; j<slength; j++) {
              if (name === chart.series[0].points[j].name) {
                  chart.series[0].points[j].remove();
                  break;
              }
           }

           $(this).parent().remove();
        });

        // $('#button'+slider_cnt).click(function() {
        //   console.log(slider_cnt);
        //   $('#slider'+slider_cnt).remove();
        // });

        $('<div></div>').appendTo('#slider'+slider_cnt).slider({
          value: 1,
          max: 100,
          min: 1,
          slide: function(event, ui) {
            point.update(ui.value, true)

            let retlist = chart.series[0].points.map(function (ce) {
              return ce.name + ":" + ce.percentage.toFixed(1);
            });

            console.log(retlist.toString())

            // console.log(chart.series[0].points[0].name)
            // console.log(chart.series[0].points[0].percentage)
            //$(this).prev().val(ui.value)
          }
        })

        $('<br/>').appendTo('#slider'+slider_cnt)
    });
});

$('#ingredient_input').keydown(function (event) {
    if (event.keyCode == 13) { 
         $('#add_button').click()
    }
});

});