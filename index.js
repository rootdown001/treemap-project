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
    right: 100,
    bottom: 30,
    left: 30
}

// define w & h of svg
const svg_w = 1400 - margin.left - margin.right;
const svg_h = 730 - margin.top - margin.bottom;

// define padding variable
const paddingHor = 30;
const paddingVert = 30;
const adj = 30;


// define colors for map - pastal 7 colors created using "i want hue"
const color = ["#a7dfe5", "#e6b8b3", "#9dc8ae", "#d1bbdf", "#d7dab7", "#aac4e2", "#acc2bd"]

 
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
                            .size([svg_w, svg_h])
                            .paddingOuter(10);

        // call root from treemap
        treemap(root);

    // const heading = d3.select(".forSvg")
    //                     .append("heading")

    // create svg obj - give dimensions
    const svg = d3.select(".forSvg")
                    .append("svg")
                    .attr("height", svg_h + margin.top + margin.bottom)
                    .attr("width", svg_w + margin.left + margin.right)
                    .append("g")
                    .attr("transform", "translate(" + 30 + ", " + 0 + ")");

    svg.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
            .attr("x", (d) => d.x0)
            .attr("y", (d) => d.y0)
            .attr("width", (d) => d.x1 - d.x0)
            .attr("height", (d) => d.y1 - d.y0)
            .style("stroke", "black")
            .style("fill", "#69b3a2")

// // create color scale
//     const varianceArr = [];
//     for (let obj of dataObj.monthlyVariance) {
//         varianceArr.push(obj.variance)
//     }

//     const varianceExtent = d3.extent(varianceArr)

//     const rectColor = d3.scaleSequential(d3.interpolateInferno)
//                         .domain([varianceExtent[0], varianceExtent[1]])

    
// // create xAxis
//     const xAxis = d3.axisBottom()
//                         .scale(xScale)
//                         // use map to get array of all years from data object
//                         .tickValues(xScale.domain()
//                         // use filter to return an array of years by decade
//                         .filter(value => value % 10 === 0))

// // create y axis
//     const yAxis = d3.axisLeft()
//                         .scale(yScale)
//                         .tickValues(yScale.domain())
//                         .tickFormat(m => {
//                             const date = new Date(0);
//                             date.setUTCMonth(m);
//                             const formatDate = d3.utcFormat("%B")
//                             // console.log(formatDate(date))
//                             return formatDate(date)
//                         })




    
//     // create tooltip div in .forSvg
//     const tooltip = d3.select(".forSvg")
//                     .append("div")
//                     .attr("id", "tooltip")
 

//     // - RUN THROUGH DATA AND CREATE MAP-
//     svg.selectAll("rect")
//         .data(dataObj.monthlyVariance)
//         .enter()
//         .append("rect")
//         .attr("x", (d) => {
//             return xScale((d.year))})
//         .attr("y", (d) => {
//             return yScale(d.month - 1)})
//         .attr("width", (d) => xScale.bandwidth(d.year))
//         .attr("height", (d) => yScale.bandwidth((d.month - 1)))
//         .attr("fill", (d) => rectColor(d.variance))
//         .attr("transform", "translate(" + (margin.left + adj) + ", " + 0 + ")")
//         .attr("class", "cell")
//         .attr("data-month", (d) => d.month - 1)
//         .attr("data-year", (d) => d.year)
//         .attr("data-temp", (d) => d.variance)
//         .on("mouseover", function(event, d) {
//             const date = new Date(d.year, (d.month - 1))
//             tooltip.html(d3.utcFormat("%B, %Y")(date) + "<br>" + "Variance: " + d.variance)
//                 .style("display", "block")
//                 .attr("data-year", d.year)
//                 .style("left", event.pageX + 20 + "px")
//                 .style("top", event.pageY - 80 + "px")
//                 .style("background-color", "lightgray")
//         })
//         .on("mouseout", function() {
//             tooltip.style("display", "none")
//         })

//     // -AXIS-
//     // add x axis
//     svg.append("g")
//         .attr("id", "x-axis")
//         .attr("transform", "translate(60, " + (560 - adj) + ")")
//         .call(xAxis)

//     // add y axis
//     svg.append("g")
//         .attr("id", "y-axis")
//         .attr("transform", "translate(" + (60) + ", " + (0) + ")")
//         .call(yAxis)


//     // - TITLES-
//     // create title
//     heading.append('h2')
//         .attr("id", "title")
//         .text('Monthly Global Land to Surface Temperature');

//     // create subtitle
//     heading.append('h3')
//         .attr("id", "description")
//         .text('Variation from Base Temperature: 1753 - 2015');

//     // title fo y axis
//     svg.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("x", -280)
//         .attr("y", 1)
//         .attr("font-size", "1rem")
//         .text("Months")

//     // create legend
//     const legend = d3.legendColor()
//                     .scale(rectColor)
//                     .cells(8)

//     // add g element and call legend obj
//     svg.append("g")
//         .attr("id", "legend")
//         .attr("transform", "translate(" + (svg_w + 20) + "," + (svg_h - 350) + ")")
//         .call(legend);
    

    // -EXIT-
    // exit d3.json().then     
    }) 

    // -CATCH ERRORS-
    // catch error & send to console
    .catch(error => console.log(error));

