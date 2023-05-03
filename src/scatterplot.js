import React from "react";
import { max } from 'd3';
import { min } from 'd3';
import { Scales } from "./scatter_scale";
import { Points } from "./points";
import { XAxis, YAxis } from "./axes";


export function ScatterPlot(props){
    const {data, offsetX, offsetY, height, width, selectedCountry, setSelectedCountry} = props;
    const xScale = Scales.linear(0, max(data, d => d.gdp_per_capita), 0, width)
    const yScale = Scales.linear(0, max(data, d => d.suicide_calc), height, 0)

    return <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Points data={data} xScale={xScale} yScale={yScale} height={height} width={width}
                selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
                />
            <YAxis yScale={yScale} height={height} axisLabel={"Suicide per Capita"}/>
            <XAxis chartType={'scatter'} xScale={xScale} height={height} width={width} axisLabel={"GDP per Capita"}/>
        </g>
    
}