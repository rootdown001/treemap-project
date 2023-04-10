// -CREATE VARIABLES-
// margins of svg
const margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
}

// define w & h of svg
const svg_w = 1300 - margin.left - margin.right;
const svg_h = 660 - margin.top - margin.bottom;

// define padding variable
const paddingHor = 30;
const paddingVert = 30;
const adj = 30;


// define colors for map - pastal 7 colors created using "i want hue"
const colorArr = ["#a7dfe5", "#e6b8b3", "#9dc8ae", "#d1bbdf", "#d7dab7", "#aac4e2", "#acc2bd"]

 
// enter d3.json api
d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json")
    .then(dataObj => {
    console.log("🚀 ~ file: index.js:49 ~ dataObj:", dataObj)

        // data Movies
        const dataMovies = dataObj.children[0]
        console.log("🚀 ~ file: index.js:54 ~ dataMovies:", dataMovies)
        
        // define root for treemap call
        const root = d3.hierarchy(dataObj)
                        .sum((d) => d.hasOwnProperty("value") ? d.value : 0)
                        .sort((a, b) => b.value - a.value);
        console.log("🚀 ~ file: index.js:58 ~ root:", root)

        // define treemap
        const treemap = d3.treemap()
                            .size([svg_w - 190, svg_h])
                            .padding(1);

        // call root from treemap
        treemap(root);

    const heading = d3.select(".forSvg")
                        .append("heading")



    // create svg obj - give dimensions
    const svg = d3.select(".forSvg")
                    .append("svg")
                    .attr("height", svg_h + margin.top + margin.bottom)
                    .attr("width", svg_w)
                    //.append("g")
                    .attr("transform", "translate(" + 30 + ", " + 20 + ")");

    // create tooltip div in .forSvg
    const tooltip = d3.select(".forSvg")
                    .append("div")
                    .attr("id", "tooltip")

    // create legend div in .forSvg
    const legend = d3.select("svg")
                    .append("g")
                    .attr("id", "legend")
                    

    // make array of categories
    const catArr = root.leaves().map((nodes) => nodes.data.category)
        
    const categories = catArr.filter(function (category, index, self) {
        return self.indexOf(category) === index;
      });
      
    // make array of values
    const valArr = root.leaves().map((nodes) => nodes.value)


    // prepare a color scale
    const color = d3.scaleOrdinal()
                    .domain(categories)
                    .range(colorArr)

    


    svg.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("class", "tile")
        .attr("data-name", (d) => d.data.name)
        .attr("data-category", (d) => d.data.category)
        .attr("data-value", (d) => d.value)
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .style("fill", (d) => color(d.data.category))
        .on("mouseover", function(event, d) {
            tooltip.html("Name: " + d.data.name + "<br>" + "Category: " + d.data.category + "<br>" + "Value: " + d.value)
                    .style("display", "block")
                    .attr("data-value", d.data.value)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY - 80 + "px")
                    .style("background-color", "lightgray")
        })
        .on("mouseout", function() {
                        tooltip.style("display", "none")
        })

        svg.selectAll('text')
        .data(root.leaves())
        .enter()
        .append('text')
        .selectAll('tspan')
        .data(d => {
            return d.data.name.split(/(?=[A-Z][^A-Z])/g) // split the name of movie
                .map(v => {
                    return {
                        text: v,
                        x0: d.x0,                        // keep x0 reference
                        y0: d.y0                         // keep y0 reference
                    }
                });
        })
        .enter()
        .append('tspan')
        .attr("x", (d) => d.x0 + 5)
        .attr("y", (d, i) => d.y0 + 15 + (i * 10))       // offset by index 
        .text((d) => d.text)
        .attr("font-size", "0.6em")
        .attr("fill", "black");



    // - TITLES-
    // create title
    heading.append('h1')
        .attr("id", "title")
        .text('Movie Sales');

    // create subtitle
    heading.append('h3')
        .attr("id", "description")
        .text('Top 100 Highest Grossing Movies Grouped by Genre');

    const legendHolder = legend.append("g")
                                .attr("transform", "translate(" + 1040 + "," + 0 + ")")
                                .selectAll("rect")
                                .data(categories)
                                .enter()
                                .append("rect")
                                .attr('class', 'legend-item')
                                .attr("width", 15)
                                .attr("height", 15)
                                .attr("transform", function(d, i) {
                                    return "translate(20, " + (200 + (i*26)) + ")"
                                })
                                .attr("fill", (d) => color(d))

    legendHolder.select("#legend")
                .data(categories)
                .enter()
                .append("text")
                .text((d) => d)
                .attr("transform", function(d, i) {
                    return "translate(50, " + (214 + (i*26)) + ")"
                })

    

    // -EXIT-
    // exit d3.json().then     
    }) 

    // -CATCH ERRORS-
    // catch error & send to console
    .catch(error => console.log(error));

