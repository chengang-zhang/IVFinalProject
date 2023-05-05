import React from "react";

export { XAxis, YAxis };

function XAxis (props) {
    const {chartType,xScale,height,width,axisLabel} = props;

    if (chartType === "scatter") {
        const ticks = xScale.ticks();
        return <g>
            <line x1={0} y1={height} x2={width} y2={height} stroke={'black'}/>
            {ticks.map(tickValue =>
                <g key = {tickValue} transform={`translate(${xScale(tickValue)},${height}) rotate(30)`}>
                    <line y2 = {10} stroke = {"black"}/>
                    <text style = {{ textAnchor:'start',fontSize:'10px' }} y = {20}>
                        {tickValue}   
                    </text>
                </g>)}
            <text style = {{fontSize:'18px'}} transform={`translate(${width-100},${height-10})`}>
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
                    <line x2={-10} stroke={'black'} />
                    <text x={-12} style={{textAnchor:'end', fontSize:'10px'}}>
                        {tickValue}
                    </text>
                </g>
            )
        }
        <text style={{ textAnchor:'start', fontSize:'18px'}} x={-10} y={-20} transform={`rotate(0)`}>
            {axisLabel}
        </text>
        
    </g>
    
}