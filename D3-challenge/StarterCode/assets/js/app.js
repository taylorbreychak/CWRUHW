var svgWidth = 900;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 80, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var chart = svg.append("g");


d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);


d3.csv("assets/data/data.csv", function(err, myData) {
  if (err) throw err;

  myData.forEach(function(data) {
    data.obese = Number(data.obese);
    data.bachelorOrHigher = Number(data.bachelorOrHigher);
    data.currentSmoker = Number(data.currentSmoker);
  });

  console.log(myData);

  
  var yLinearScale = d3.scaleLinear().range([height, 0]);

  var xLinearScale = d3.scaleLinear().range([0, width]);

  
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

 
  var xMin;
  var xMax;
  var yMax;

 
  function findMinAndMax(dataColumnX) {
    xMin = d3.min(myData, function(data) {
      return Number(data[dataColumnX]) * 0.8;
    });

    xMax = d3.max(myData, function(data) {
      return Number(data[dataColumnX]) * 1.1;
    });

    yMax = d3.max(myData, function(data) {
      return Number(data.bachelorOrHigher) * 1.1;
    });
  }


  var currentAxisLabelX = "obese";

  var currentAxisLabelY = "bachelorOrHigher";

  writeAnalysis(currentAxisLabelX, currentAxisLabelY);

  
  findMinAndMax(currentAxisLabelX);

 
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([0, yMax]);

 
  var toolTip = d3
    .tip()
    .attr("class", "tooltip")
    
    .offset([80, -60])
    
    .html(function(data) {
      var itemName = data.state;
      var itemEdu = Number(data.bachelorOrHigher);
      var itemInfo = Number(data[currentAxisLabelX]);
      var itemString;
      
      if (currentAxisLabelX === "obese") {
        itemString = "Obese: ";
      }
      else {
        itemString = "Smoker: ";
      }
      if (currentAxisLabelY === "bachelorOrHigher") {
        eduString = "College Grad: ";
      }
      else {
        eduString = "HS Grad: ";
      }
      return itemName +
        "<hr>" +
        eduString +
        itemEdu + "%<br>" +
        itemString +
        itemInfo + "%";
    });

 
  chart.call(toolTip);

  chart
    .selectAll("circle")
    .data(myData)
    .enter()
    .append("circle")
    .attr("cx", function(data, index) {
      return xLinearScale(Number(data[currentAxisLabelX]));
    })
    .attr("cy", function(data, index) {
      return yLinearScale(Number(data.bachelorOrHigher));
    })
    .attr("r", "12")
    .attr("fill", "lightblue")
   
    .on("mouseover", function(data) {
      toolTip.show(data)})
    .on("mouseout", function(data) {
      toolTip.hide(data)});

  chart
    .selectAll("text")
    .data(myData)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("class","stateText")
    .style("fill", "white")
    .style("font", "10px sans-serif")
    .style("font-weight", "bold")
    .text(function(data) {
      return data.abbr;})
    .on("mouseover", function(data) {
      toolTip.show(data)})
    .on("mouseout", function(data) {
      toolTip.hide(data)})
    .attr("x", function(data, index) {
      return xLinearScale(Number(data[currentAxisLabelX]));
    })
    .attr("y", function(data, index) {
      return yLinearScale(Number(data.bachelorOrHigher))+4;
    });

  
  chart
    .append("g")
    .attr("transform", "translate(0," + height + ")")
   
    .attr("class", "x-axis")
    .call(bottomAxis);

 
  chart.append("g")
    .attr("class", "y-axis")
    .call(leftAxis);

  
  chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("class", "axis-text")
    .attr("data-axis-name", "bachelorOrHigher")
    .text("Bachelor's Degree or Greater");

 
  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
    )
   
    .attr("class", "axis-text active")
    .attr("data-axis-name", "obese")
    .text("Obese (BMI > 30)(%)");

  chart
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 45) + ")"
    )
   
    .attr("class", "axis-text inactive")
    .attr("data-axis-name", "currentSmoker")
    .text("Current Smoker (%)");


  });
