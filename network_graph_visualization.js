// D3.js Network Graph Visualization

// Set dimensions and margins for the SVG
const width = 800;
const height = 600;

// Create the SVG container
d3.select("#graph").html(""); // Clear any existing content
const svg = d3.select("#graph")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Initialize the simulation
const simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(d => d.id).distance(100))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2));

// Load the graph data
d3.json("graph_data.json").then(data => {
  // Define color scale for node types
  const color = d3.scaleOrdinal()
    .domain(["person", "project", "group"])
    .range(["#1f78b4", "#33a02c", "#e31a1c"]);

  // Add links
  const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
    .attr("stroke", "#aaa");

  // Add nodes
  const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(data.nodes)
    .enter().append("circle")
    .attr("r", 8)
    .attr("fill", d => color(d.type))
    .call(d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded));

  // Add labels
  const label = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(data.nodes)
    .enter().append("text")
    .text(d => d.id)
    .attr("x", 10)
    .attr("y", 3)
    .attr("font-size", "12px");

  // Update simulation
  simulation
    .nodes(data.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(data.links);

  // Define tick function
  function ticked() {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => (d.x = Math.max(8, Math.min(width - 8, d.x))))
      .attr("cy", d => (d.y = Math.max(8, Math.min(height - 8, d.y))));

    label
      .attr("x", d => d.x + 10)
      .attr("y", d => d.y + 3);
  }

  // Define drag behaviors
  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
});
