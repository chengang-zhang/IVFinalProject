import React from "react";
import { min, max, median, interpolateOrRd} from "d3";
import { Cell } from "./cell"
import { Scales } from "./scale";
import { Legend } from "./legend";


export function HeatMap(props) {
    const{margin, height, width, data, year_lst, country_lst, selectedCountry, setSelectedCountry, selectedYear, setSelectedYear, setYear} = props;

    const xScale = Scales.band(year_lst, 0, width);
    const yScale = Scales.band(country_lst, 0, height);

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
            return (selectedCountry === thisPoint) ? 1 : 0.2
        } 
    };

    const Opacity_year = (selectedYear, thisPoint) => {
        if  (!selectedYear) {
            return 1
        } else {
            return (selectedYear === thisPoint) ? 1 : 0.4  
        } 
    };

    const fontsize_country = (selectedCountry,thisPoint) => {
        if  (!selectedCountry) {
            return '8px'
        } else {
            // also check if in the same row / col with the selected point
            return (selectedCountry === thisPoint) ? '14px' : '6px'  
        } 
    };

    const fontsize_year = (selectedYear,thisPoint) => {
        if  (!selectedYear) {
            return '10px'
        } else {
            // also check if in the same row / col with the selected point
            return (selectedYear === thisPoint) ? '16px' : '10px'  
        } 
    };

    const color_year = (selectedYear,thisPoint) => {
        if  (!selectedYear) {
            return ''
        } else {
            // also check if in the same row / col with the selected point
            return (selectedYear === thisPoint) ? '#800000' : ''  
        } 
    };

    const color_country = (selectedYear,thisPoint) => {
        if  (!selectedYear) {
            return ''
        } else {
            // also check if in the same row / col with the selected point
            return (selectedYear === thisPoint) ? '#800000' : ''  
        } 
    };


    return <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map( d => {
                return <Cell key={d.country+d.year} d={d} xScale={xScale} yScale={yScale} 
                color={colormap(d.suicides_calc)}   
                selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
                selectedYear={selectedYear} setSelectedYear={setSelectedYear} setYear={setYear}/>
            })
        }
        {year_lst.map(s => {
                        return <g key={s} transform={`translate(${xScale(s)+18},-8)rotate(40)`}>
                        <text style={{textAnchor:'end',fontSize:fontsize_year(selectedYear,s),stroke:color_year(selectedYear,s)}}
                                opacity={Opacity_year(selectedYear,s)}>
                                    {s}
                            </text>
                        </g>
                    })}
        {country_lst.map(c => {
                    return <text key={c} style={{textAnchor:'end', fontSize:fontsize_country(selectedCountry,c), stroke:color_country(selectedCountry,c)}} 
                    x={-5} y={yScale(c)+3} opacity={Opacity_country(selectedCountry,c)}>
                                {c}
                            </text>
                })}

        <Legend x={0} y={height+8} width={width/2} height={8} numberOfTicks={5} 
            rangeOfValues={rangeOfValues} colormap={colormap}/>
        </g>

}