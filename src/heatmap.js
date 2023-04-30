import React from "react";
import { min, max, median, quantile, interpolateOrRd, mean , timeFormat, timeParse} from "d3";
import { Cell } from "./cell"
import { Scales } from "./scale";
import { Legend } from "./legend";


export function HeatMap(props) {
    const{margin, height, width, data, year_lst, country, selectedCountry, setSelectedCountry, selectedRow} = props;

    const xScale = Scales.band(year_lst, 0, width);
    const yScale = Scales.band(country, 0, height);

    var colorRange = [interpolateOrRd(0), interpolateOrRd(0.5), interpolateOrRd(1.0)]; 
    var startRange = [0, 
                    median(data, d => d.suicides_calc),
                    max(data, d => d.suicides_calc)];
    // range for legend
    var rangeOfValues = [min(data, d => d.suicides_calc), max(data, d => d.suicides_calc)];
    var colormap = Scales.colormapLiner(startRange, colorRange);


    const Opacity_country = (selectedCountry, thisPoint) => {
        if  (!selectedCountry) {
            return 1
        } else {
            return (selectedCountry.country === thisPoint) ? 1 : 0.4  
        } 
    };

    const Opacity_year = (selectedCountry, thisPoint) => {
        if  (!selectedCountry) {
            return 1
        } else {
            return (selectedCountry.year === thisPoint) ? 1 : 0.4  
        } 
    };

    const fontsize_country = (selectedCountry,thisPoint) => {
        if  (!selectedCountry) {
            return '8px'
        } else {
            // also check if in the same row / col with the selected point
            return (selectedCountry.country === thisPoint) ? '14px' : '8px'  
        } 
    };

    const fontsize_year = (selectedCountry,thisPoint) => {
        if  (!selectedCountry) {
            return '10px'
        } else {
            // also check if in the same row / col with the selected point
            return (selectedCountry.year === thisPoint) ? '15px' : '10px'  
        } 
    };


    return <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map( d => {
                return <Cell key={d.date+d.country} d={d} xScale={xScale} yScale={yScale} 
                color={colormap(d.suicides_calc)}   
                selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} selectedRow={selectedRow}/>
            })
        }
        {year_lst.map(s => {
                        return <g key={s} transform={`translate(${xScale(s)+18},-8)rotate(60)`}>
                        <text style={{textAnchor:'end',fontSize:fontsize_year(selectedCountry,s)}}
                                opacity={Opacity_year(selectedCountry,s)}>
                                    {s}
                            </text>
                        </g>
                    })}
        {country.map(c => {
                    return <text key={c} style={{textAnchor:'end', fontSize:fontsize_country(selectedCountry,c)}} 
                    x={-5} y={yScale(c)+3} opacity={Opacity_country(selectedCountry,c)}>
                                {c}
                            </text>
                })}

        <Legend x={0} y={height+10} width={width/2} height={10} numberOfTicks={5} 
            rangeOfValues={rangeOfValues} colormap={colormap}/>
        </g>

}