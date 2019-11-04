// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");


var dataFilter = 0;
ufos = data

console.log(data);

data.forEach((ufoSighting) => {
	var row = tbody.append("tr");
	Object.entries(ufoSighting).forEach(([key, value]) => {
		var cell = tbody.append("td");
		cell.text(value);
	});
});


var submit = d3.select("#filter-btn");

submit.on("click", function () {

	
	d3.event.preventDefault();

	
	var inputElement = d3.select("#datetime");

	
	var inputValue = inputElement.property("value");

	var filteredData = ufos.filter(ufo => ufo.datetime === inputValue);
	buildTable(filteredData);

});


function buildTable(dataFilter) {

	tbody.html("");
	dataFilter.forEach((ufoSighting) => {
		var row = tbody.append("tr");
		Object.entries(ufoSighting).forEach(([key, value]) => {
			var cell = tbody.append("td");
			cell.text(value);
		});
	});
}