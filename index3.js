




var data = {"name": "New York City", "children": [
    {"name": "Bronx", "population": 1471160},
    {"name": "Brooklyn", "population": 2648771},
    {"name": "Manhattan", "population": 1664727},
    {"name": "Queens", "population": 2358582},
    {"name": "Staten Island", "population": 479458}
]};

//const data2 = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"


//var drawTreemap = function(id) {
let root = d3.hierarchy(data)
                .sum(d => d.hasOwnProperty("populaion") ? d.popuation : 0)
                .sort((a, b) => b.value - a.value);

// if (id === "demo2") {
// //root.sum(d => d.hasOwnProperty("population") ? d.population : 0);
// }
//else if (id === "demo3") {
// root.eachAfter(d => {
// if (!d.hasOwnProperty("children")) {
// d.value = d.data.population;
// }
// else {
// d.value = 0;
// for (var i in d.children)
// d.value += d.children[i].value;
// }
// });
//}

let treemap = d3.treemap()
.size([250,250])
.padding(4);

treemap(root);

d3.select("#demo2")
.selectAll('rect')
.data(root.leaves())
.enter()
.append('rect')
.attr('x', d => d.x0)
.attr('y', d => d.y0)
.attr('width', d => d.x1 - d.x0)
.attr('height', d => d.y1 - d.y0)
.style("stroke", "black")
.style("fill", "#69b3a2")
//};


//drawTreemap("demo2");
// drawTreemap("demo3");

