import React from "react";

export function Cell(props){
    const { d, xScale, yScale, color, selectedCountry, setSelectedCountry, selectedYear, setSelectedYear, setYear} = props;
    
    const getOpacity = (selectedCountry, thisPoint) => {
        if  (!selectedCountry) {
            return 1
        } else {
            return (selectedCountry === thisPoint.country) ? 1 : 0.3
        }
    }

    const getStrokeWidth = (selectedCountry, thisPoint) => {
        
        if  ((!selectedCountry) && (!selectedYear)) {
            return 1
        } else {
            return (selectedCountry === thisPoint.country) ? 1.5 : 0.3
            }
        }

    const mouseOver = (d) => {
        setSelectedCountry(d.country);
        setSelectedYear(d.year);
        setYear(d.year-1991);
    };
    const mouseOut = () => {
        setSelectedCountry(null);
        setSelectedYear(null)
    };
    
    return <g transform={`translate(${xScale(d.year)}, ${yScale(d.country)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"black"}
        strokeWidth={getStrokeWidth(selectedCountry, d)}
        opacity={getOpacity(selectedCountry, d)} onMouseEnter={()=>{mouseOver(d)}} onMouseOut={mouseOut}
         />
    </g>
}
            