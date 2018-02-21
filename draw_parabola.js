var cwidth = 80;
var a = 1.0, p = 0.0, q = 0.0;
var params = {
    'a': 1.0,
    'p': 0.0,
    'q': 0.0
};

var w = screen.width;
var h = screen.height;

if (window.orientation != 0) {
    var r = w;
    w = h; h = r;
}

$(document).bind("pageinit", "#control-panel", function(e){
    $(this).on("change", "#slider-a", function(e) {
        setTimeout(function(){
            changeValue('a');
        }, 500);

        changeValue('a');
    });

    $(this).on("change", "#slider-p", function(e) {
        setTimeout(function(){
            changeValue('p');
        }, 400);

        changeValue('p');
    });
    
    $(this).on("change", "#slider-q", function(e) {
        setTimeout(function(){
            changeValue('q');
        }, 400);

        changeValue('q');
    });
    
});




function setDisplay() {
    var meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=initial-scale=1.0, width=' + w);
    document.getElementsByTagName('head')[0].appendChild(meta);

}

function parabolafunc(x) {
    return params.a*(x - params.p)*(x - params.p) + params.q;
}

function draw() {
    "use strict";
    var parabola = [];
    
    for (var i = 0; i < 51; i++) {
        var wx = -5.0 + i/5.0;
        parabola.push({x: wx, y: wx*wx});
    }
    
    var margin = {top: 20, right: 25, bottom: 20, left: 25};
    var wh = Math.min(w, h) - 40;
/*    
    alert('screen.width is ' + screen.width + '\n' + 'screen.height is ' + screen.height
         + '\n' + 'window.orientation is ' + window.orientation);
*/
    wh = Math.min(400, wh);
    var width = wh - margin.left - margin.right;
    var height = wh - margin.top - margin.bottom;
    if (w < h) {
        cwidth = w - wh - 20;
    }
    else {
        cwidth = width;
    }
                                
    var x_extent = [-5.0, 5.0], y_extent = [-5.0, 5.0];


    var x_scale = d3.scale.linear()
        .range([0, width])
        .domain(x_extent),
    y_scale = d3.scale.linear()
        .range([height, 0])
        .domain(y_extent);
    
    var line = d3.svg.line()
        .x(function(d) {return x_scale(d.x)})
        .y(function(d) {return y_scale(d.y)});
                                
    
    var ax = d3.select("#plot-panel")
        .append("svg")
        .attr("id", "fig1")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x_axis = d3.svg.axis().scale(x_scale).tickSize(-height).ticks(11).orient("bottom");
    var y_axis = d3.svg.axis().scale(y_scale).tickSize(-width).ticks(11).orient("left");

    ax.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    ax.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + (height) + ")")
        .call(x_axis);

    ax.append("g")
        .attr("class", "y axis")
        .call(y_axis);

    var path = ax.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "maroon")
        .attr("stroke-width", 2)
        .attr("d", line(parabola));


    return function redraw() {
        for (var i = 0; i < 51; i++) {
            var x = parabola[i].x;
            parabola[i].y = parabolafunc(x);
        };
        path
            .transition()
            .duration(2)
            .attr("d", line(parabola));
    };


}

//var redraw = draw();

function changeValue (param) {
    params[param] = parseFloat($('#slider-' + param).val());
    redraw();
}

