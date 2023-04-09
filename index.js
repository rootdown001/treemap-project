// User Story #1: My tree map should have a title with a corresponding id="title".

// User Story #2: My tree map should have a description with a corresponding id="description".

// User Story #3: My tree map should have rect elements with a corresponding class="tile" that represent the data.

// User Story #4: There should be at least 2 different fill colors used for the tiles.

// User Story #5: Each tile should have the properties data-name, data-category, and data-value containing their corresponding name, category, and value.

// User Story #6: The area of each tile should correspond to the data-value amount: tiles with a larger data-value should have a bigger area.

// User Story #7: My tree map should have a legend with corresponding id="legend".

// User Story #8: My legend should have rect elements with a corresponding class="legend-item".

// User Story #9: The rect elements in the legend should use at least 2 different fill colors.

// User Story #10: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

// User Story #11: My tooltip should have a data-value property that corresponds to the data-value of the active area.
 
// -CREATE VARIABLES-
// margins of svg
const margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
}

// define w & h of svg
const svg_w = 1200 - margin.left - margin.right;
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
                            .size([svg_w - 200, svg_h])
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
                    .append("g")
                    .attr("transform", "translate(" + 30 + ", " + 0 + ")");

    // create tooltip div in .forSvg
    const tooltip = d3.select(".forSvg")
                    .append("div")
                    .attr("id", "tooltip")

    // create legend div in .forSvg
    const legend = d3.select("svg")
                    .append("g")
                    .attr("id", "legend")
                    // .attr("transform", "translate(, 20)")

                    
    

    // make array of categories
    const catArr = root.leaves().map((nodes) => nodes.data.category)
        console.log("🚀 ~ file: index.js:87 ~ catArr:", catArr)
        
    const categories = catArr.filter(function (category, index, self) {
        return self.indexOf(category) === index;
      });
      console.log("🚀 ~ file: index.js:92 ~ categories ~ categories:", categories)
      
    // make array of values
    const valArr = root.leaves().map((nodes) => nodes.value)
        console.log("🚀 ~ file: index.js:96 ~ valArr:", valArr)
        
    // make array of values
    // const values = valArr.filter(function (value, index, self) {
    //     return self.indexOf(value) === index;
    //     });
    // console.log("🚀 ~ file: index.js:101 ~ values ~ values:", values)

    // // find value min & max
    // const extValues = d3.extent(values)
    // console.log("🚀 ~ file: index.js:105 ~ extValues:", extValues)
  



    // prepare a color scale
    const color = d3.scaleOrdinal()
                    .domain(categories)
                    .range(colorArr)

      // And an opacity scale
    // const opacity = d3.scaleLinear()
    //                 .domain(extValues)
    //                 .range([.5,1])

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
            // .style("stroke", "black")
            .style("fill", (d) => color(d.data.category))
            //.style("opacity", (d) => opacity(d.value))
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



    // - TITLES-
    // create title
    heading.append('h1')
        .attr("id", "title")
        .text('Movie Sales');

    // create subtitle
    heading.append('h3')
        .attr("id", "description")
        .text('Top 100 Highest Grossing Movies Grouped by Genre');

    // building legend from scratch so can add rect classes for fCC tests
    const legendHolder = legend.append("g")
                                //.attr("transform", "translate(" + (svg_w - 80) + "," + (svg_h - 350) + ")")
                                .attr("transform", "translate(" + 1000 + "," + 200 + ")")
                                .selectAll("g")
                                .data(categories)
                                .enter()
                                .append("g")
                                // .attr("transform", function(d, i) {
                                //     return "translate(200, " + 200 +")"
                                // })

    legendHolder.append("rect")
                .attr('width', 40)
                .attr('height', 30)
                .attr('class', 'legend-item')
                .attr('fill', function (d) {
                return color(d);
                });






// //     // create legend
//     const legend = d3.legendColor()
//                     .scale(color)
//                     .cells(7)


//     // add g element and call legend obj
//     svg.append("g")
//         .attr("id", "legend")
//         .attr("transform", "translate(" + (svg_w - 80) + "," + (svg_h - 350) + ")")

//         .call(legend);
    

    // -EXIT-
    // exit d3.json().then     
    }) 

    // -CATCH ERRORS-
    // catch error & send to console
    .catch(error => console.log(error));

