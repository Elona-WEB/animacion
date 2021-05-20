import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Animation() {
  const data = [
    { name: "Medellín", index2005: 3, index2006: 33 },
    { name: "Cali", index2005: 39, index2006: 45 },
    { name: "Bogotá", index2005: 7, index2006: 31 },
    { name: "Pereira", index2005: 35, index2006: 36 },
    { name: "Bucaramanga", index2005: 16, index2006: 23 },
    { name: "Cúcuta", index2005: 45, index2006: 45 },
    { name: "Armenia", index2005: 6, index2006: 16 },
  ];

  useEffect(() => {
    const canvas = d3.select("#canvas");

    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 60, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    //Forma inicial
    const y = d3.scaleLinear().domain([0, 45]).range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    //Despligo barras sin nada
    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "blue")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(0))
      .attr("width", x.bandwidth());

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

    var eX = g
      .append("g")
      .classed("x--axis", true)
      .attr("transform", `translate(0, ${iheight})`);

    var eY = g.append("g").classed("y--axis", true);

    //ANIMACIONES CON BOTONES
    const b1 = d3.select("#b2005");
    b1.on("click", function () {
      const newData = g.selectAll("rect").data(data);
      newData
        .enter()
        .append("rect")
        .merge(newData)
        .transition()
        .duration(1000)
        .attr("class", "bar")
        .style("fill", "green")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.index2005))
        .attr("height", (d) => iheight - y(d.index2005))
        .attr("width", x.bandwidth());

      eX.call(d3.axisBottom(x));
      eY.transition().call(d3.axisLeft(y));
    });

    const b2 = d3.select("#b2006");

    b2.on("click", function () {
      const newData = g.selectAll("rect").data(data);
      newData
        .enter()
        .append("rect")
        .merge(newData)
        .transition()
        .duration(1000)
        .attr("class", "bar")
        .style("fill", "blue")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.index2006))
        .attr("height", (d) => iheight - y(d.index2006))
        .attr("width", x.bandwidth());

      eX.call(d3.axisBottom(x));
      eY.transition().call(d3.axisLeft(y));
    });
  });

  return (
    <div>
      <div id="canvas"></div>
      <div>
        <button id="b2005">2005</button>
        <button id="b2006">2006</button>
      </div>
    </div>
  );
}
