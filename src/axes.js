import React from "react";

export { XAxis, YAxis };

function XAxis (props) {
    const {chartType,xScale,height,width,axisLabel} = props;

    if (chartType === "scatter") {
        const ticks = xScale.ticks();
        return <g>
            <line x1={0} y1={height} x2={width} y2={height} stroke={'black'}/>
            {ticks.map(tickValue =>
                <g key = {tickValue} transform={`translate(${xScale(tickValue)},${height})`}>
                    <line y2 = {10} stroke = {"black"}/>
                    <text style = {{ textAnchor:'middle',fontSize:'10px' }} y = {20}>
                        {tickValue}   
                    </text>
                </g>)}
            <text style = {{fontSize:'14px'}} transform={`translate(${width-180},${height-10})`}>
                {axisLabel}
            </text>
        </g>
    }
    if (chartType === "bar") {
        const ticks = xScale.domain();
        //console.log(ticks)
        return <g>
            {<line x1={0} y1={height} x2={width} y2={height} stroke='black'/>}
            {ticks.map(tickValue =>
                <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <text style={{textAnchor: 'start', fontSize:'8px'}} y={height+3} transform={`rotate(75, 0, ${height+3})`}>
                        {tickValue}
                    </text>
                </g>
            )}
        </g>
    }
}

function YAxis(props) {
    const {yScale, height, axisLabel} = props;
    const ticks = yScale.ticks();
    console.log(ticks)
    return <g>
        <line y2={height} stroke={'black'} />
        {ticks.map(tickValue => 
                <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                    <line x2={10} stroke={'black'} />
                    <text style={{textAnchor:'end', fontSize:'10px'}}>
                        {tickValue}
                    </text>
                </g>
            )
        }
        <text style={{ textAnchor:'end', fontSize:'14px'}} x={0} y={14} transform={`rotate(-90)`}>
            {axisLabel}
        </text>
        
    </g>
    
}