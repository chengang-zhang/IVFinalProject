import React from "react";
import { max } from 'd3';
import { Scales } from "./scatter_scale";
import { Points2 } from "./points_scatter2";
import { XAxis, YAxis } from "./axes";


export function ScatterPlot2(props){
    const {data, offsetX, offsetY, height, width, selectedCountry, setSelectedCountry} = props;
    const xScale = Scales.linear(0, max(data, d => d.gdp), 0, width)
    const yScale = Scales.linear(0, max(data, d => d.suicides_no), height, 0)

    return <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Points2 data={data} xScale={xScale} yScale={yScale} height={height} width={width}
                selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
                />
            <YAxis yScale={yScale} height={height} axisLabel={"Suicide"}/>
            <XAxis chartType={'scatter'} xScale={xScale} height={height} width={width} axisLabel={"GDP(bn)"}/>
        </g>
    
}