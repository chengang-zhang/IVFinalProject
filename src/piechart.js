import React from "react";
import * as d3 from "d3";

export function Piechart(props){
    const {data, innerRadius, outerRadius} = props;
    const colorScale = d3.scaleSequential()      
        .interpolator(d3.interpolateReds)      
        .domain([0, data.length]);
    const arcGenerator = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    const pieGenerator = d3.pie()
        .padAngle(0)
        .value((d) => d.value);
    const pies = pieGenerator(data);

    // Step 1: Define the legend labels
    const labels = data.map(d => d.generation);
    console.log(labels)

    return (
        <g transform={`translate(${outerRadius}, ${outerRadius})`}>
            {pies.map((d, i) => {
                const[x, y] = arcGenerator.centroid(d);
                return (
                    <g key={i}>
                        <path d={arcGenerator(d)} fill={colorScale(i)} stroke={'#ffffff'} strokeWidth={3}/>
                    </g>
                );
            })}
            {/* Step 2: Create the legend */}
            <g transform={`translate(${outerRadius*0.75}, ${outerRadius*0.75})`}>
                {labels.map((label, i) => (
                    <g key={i} transform={`translate(0, ${i * 20})`}>
                        {/* Step 4: Add a rectangle with the fill color */}
                        <rect x={0} y={-10} width={10} height={10} fill={colorScale(i)} />
                        {/* Step 5: Add a text label */}
                        <text x={15} y={0} alignmentBaseline="middle">{label}</text>
                    </g>
                ))}
            </g>
        </g>
    );
}
