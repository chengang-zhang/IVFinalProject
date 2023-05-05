import React from "react";
import * as d3 from "d3";

export function Piechart(props){
    const {data, innerRadius, outerRadius} = props;
    // console.log(innerRadius, outerRadius);
    const colorScale = d3.scaleSequential()      
            .interpolator(d3.interpolateCool)      
            .domain([0, data.length]);
    
    const arcGenerator = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

    const pieGenerator = d3.pie()
            .padAngle(0)
            .value((d) => d.value);

    const pies = pieGenerator(data);
    // console.log(pies);
    return <g transform={`translate(${outerRadius}, ${outerRadius})`}>
        {pies.map((d, i) => {
                // console.log(colorScale(i), i);
                const[x, y] = arcGenerator.centroid(d);
                //console.log(x, y);
                return <g key={i}>
                        <path d={arcGenerator(d)} fill={colorScale(i)} stroke={'#ffffff'} strokeWidth={3}/>
                    </g>
            }
        )}
        </g>
}