import React from "react";

export function Points2(props){
    const {data, xScale, yScale, width, height, selectedCountry, setSelectedCountry} = props;
    //const [selectedCountry, setSelectedCountry] = React.useState(null);
    
    const getColor = (selectedCountry, country) => {
        return selectedCountry===country ? "#800000" : "#FFDCD1";
    }
    const getRadius = (selectedCountry, country) => {
        return selectedCountry===country ? 8 : 4;
    }

    // return <g>
    //          {data.map(d => {
    //              return <circle 
    //              key={d.country} 
    //              cx={xScale(d.suicides_calc)} 
    //              cy={yScale(d.gdp_per_capita)} 
    //              r={getRadius(selectedCountry, d.country)} 
    //              fill={getColor(selectedCountry, d.country)} 
    //              stroke={'black'} 
    //              strokeWidth = {1}
    //              onMouseEnter={(event)=> {setSelectedCountry(d.country)}} 
    //              onMouseOut={()=> {setSelectedCountry(null)}}
                
    //              />
    //          })}
    //          </g>

    if (selectedCountry === null) {
        return <g>
            {data.map(d => {
                return <circle 
                key={d.country} 
                cx={xScale(d.gdp)} 
                cy={yScale(d.suicides_no)} 
                r={getRadius(selectedCountry, d.country)} 
                fill={getColor(selectedCountry, d.country)} 
                stroke={'black'} 
                strokeWidth = {1}
                onMouseEnter={(event)=> {setSelectedCountry(d.country)}} 
                onMouseOut={()=> {setSelectedCountry(null)}}
                
                />
            })}
            </g>
    } else {
        return <g>
            {data.map(d => {
                return <circle 
                key={d.country} 
                cx={xScale(d.gdp)} 
                cy={yScale(d.suicides_no)} 
                r={getRadius(selectedCountry, d.country)} 
                fill={getColor(selectedCountry, d.country)}
                stroke={'black'} 
                strokeWidth = {1}
                onMouseEnter={()=> {setSelectedCountry(d.country)}} 
                onMouseOut={()=> {setSelectedCountry(null)}}
                />
            })}
            <rect key="cover" x={0} y={0} width={width} height={height} fill={'#ff8a75'} opacity={0.2}/>
            {data.filter(d => d.country===selectedCountry).map(d => 
            <circle key={d.country} 
                cx={xScale(d.gdp)} 
                cy={yScale(d.suicides_no)} 
                r={getRadius(selectedCountry, d.country)} 
                fill={getColor(selectedCountry, d.country)}
                stroke={'black'}  
                strokeWidth = {1}
                onMouseEnter={(event)=> {setSelectedCountry(d.country)}} 
                onMouseOut={()=> {setSelectedCountry(null)}}
                />
            )}
        </g>
    }

}