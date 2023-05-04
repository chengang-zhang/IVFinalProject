import React from "react";
import { geoPath, geoEqualEarth, geoMercator } from "d3-geo";
// import { feature } from "topojson-client";

export function WorldMap(props){
    const {map, colormap, projection, width, height, data} = props;
    let path = geoPath(geoEqualEarth()); // the default projection
    // if (projection==="geoEqualEath"){
    //     path = geoPath(geoRobinson().fitSize([width, height], map));
    // }
    // if (projection==="geoMercator"){
    //     path = geoPath(geoMercator().fitSize([width, height], map));
    // }
    // console.log(path({type:"Sphere"}));

    return <g>
            {/* <path className={'sphere'} d={path({type: 'Sphere'})} /> */}
            {/* geounit = country */}
            {   
                map.features.map( feature => {
                const country = data.filter( d => d.geounit === feature.properties.name); // Todo: apply string methods to remove spaces
                if (country[0]){
                    return <path key={feature.properties.name+"boundary"} className={"boundary"} 
                d={path(feature)}
                style={{fill:colormap(country[0].suicides_calc)}}/>}
                else {
                    return <path key={feature.properties.name+"boundary"} className={"boundary"} 
                d={path(feature)}/>} 
                }
            )}
        </g>
}