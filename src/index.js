import "./style.css";
import React from 'react';
import ReactDOM from "react-dom";
import * as d3 from "d3";
import { csv, json } from "d3";
import { HeatMap } from './heatmap';

const csvurl = 'https://raw.githubusercontent.com/chengang-zhang/IVFinalProject/main/Data/by_country.csv'
const country_lst = ['Albania', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 
'Barbados', 'Belarus', 'Belgium', 'Belize', 'Brazil', 'Bulgaria', 'Canada', 'Chile', 'Colombia', 
'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Ecuador', 'El Salvador', 'Estonia',
'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Grenada', 'Guatemala', 'Guyana', 'Hungary', 'Iceland', 'Ireland', 
'Israel', 'Italy', 'Jamaica', 'Japan', 'Kazakhstan', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Latvia', 'Lithuania', 
'Luxembourg', 'Macau', 'Maldives', 'Malta', 'Mauritius', 'Mexico', 'Montenegro', 'Netherlands', 'New Zealand', 
'Nicaragua', 'Norway', 'Panama', 'Paraguay', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 
'Republic of Korea', 'Romania', 'Russian Federation', 'Saint Lucia', 'Saint Vincent and Grenadines', 
'San Marino', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'Spain', 'Sri Lanka', 'Suriname', 
'Sweden', 'Switzerland', 'Thailand', 'Trinidad and Tobago', 'Turkey', 'Turkmenistan', 'Ukraine', 'United Arab Emirates', 
'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan']
const year_lst = [1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010]
const WIDTH = 900;
const HEIGHT = 530;

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.year = +d.year;
                d.suicides_no = +d.suicides_no;
                d.population = +d.population;
                d.suicides_calc = +d.suicides_calc;
                d.gdp = +d.gdp;
                d.gdp_per_capita = +d.gdp_per_capita;
            });
            setData(data);
        });
    }, []);
    return dataAll;
}

function Suicide(){
    //highlight only
    const [selectedYear, setSelectedYear] = React.useState(null);
    //a row + highlight + dim other countries
    const [selectedCountry, setSelectedCountry] = React.useState(null);

    
    const heatmap_margin = {top: 40, right: 160, bottom: 50, left: 140};
    const heatmap_height = HEIGHT - heatmap_margin.top - heatmap_margin.bottom;
    const heatmap_width = WIDTH - heatmap_margin.left - heatmap_margin.right;

    const data = useData(csvurl);
    if(!data){
        return <pre>Loading...</pre>
    }

    return <div>
        <p>Understanding Global Suicide Trends</p>
        <p>By Summer Xiao & Chengang Zhang</p>
        <p>Suicide/100k pop VS 1991-2010</p>
        <svg width={WIDTH} height={HEIGHT}>
            <g>
                <HeatMap margin={heatmap_margin} height={heatmap_height} width={heatmap_width} 
                data={data} year_lst={year_lst} country={country_lst} 
                selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>
            </g>
        </svg>
        </div>

}


ReactDOM.render(<Suicide/ >, document.getElementById("root"));