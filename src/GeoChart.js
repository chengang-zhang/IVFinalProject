import React, { useRef, useEffect, useState } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import useResizeObserver from "./useResizeObserver";

/**
 * Component that renders a map of Germany.
 */

function GeoChart({ data_map, property,width,height}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    

    const minProp = min(data_map.features, feature => feature.properties[property]);
    const maxProp = max(data_map.features, feature => feature.properties[property]);
    console.log(maxProp)
    
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#FFDCD1", "#800000"]);

    // use resized dimensions
    // but fall back to getBoundingClientRect, if no dimensions yet.
    // const { width, height } =
    //   dimensions || wrapperRef.current.getBoundingClientRect();
    const WIDTH = WIDTH;
    const HEIGHT = HEIGHT;

    // projects geo-coordinates on a 2D plane
    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data_map)
      .precision(100);

    // takes geojson data,
    // transforms that into the d attribute of a path element
    const pathGenerator = geoPath().projection(projection);

    // render each country
    svg
      .selectAll(".country")
      .data(data_map.features)
      .join("path")
      .on("click", (event, feature) => {
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr("class", "country")
      .transition()
      .attr("fill", feature => colorScale(feature.properties[property]))
      .attr("d", feature => pathGenerator(feature));

    // render text
    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        feature =>
          feature &&
          feature.properties.name +
            ": " +
            feature.properties[property].toLocaleString()
      )
      .attr("x", 10)
      .attr("y", 25);
  }, [data_map, dimensions, property, selectedCountry]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef} height={530} width={900}></svg>
    </div>
  );
}

export default GeoChart;