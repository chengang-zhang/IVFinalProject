import "./style.css";
import React,{useState} from 'react';
import ReactDOM from "react-dom";
import * as d3 from "d3";
import GeoChart from "./GeoChart";
//import data_map from "../Data/GeoChart.world.geo.json";
import data_map from "../Data/new.json";
//import "./App.css";
import DonutChart from './DonutChart.js';
import { Piechart } from './piechart.js';
import { csv, json } from "d3";
import { HeatMap } from './heatmap';
import { ScatterPlot } from './scatterplot';
import 'bootstrap/dist/css/bootstrap.min.css'; //import bootstrap

//console.log(data_map)
//const pieurl = 'https://raw.githubusercontent.com/chengang-zhang/IVFinalProject/main/Data/test.csv'
const pieurl = 'https://raw.githubusercontent.com/chengang-zhang/IVFinalProject/main/Data/by_generation.csv'
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
// const year_lst = ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010']

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
    const [year, setYear] = React.useState('0');
    const [property, setProperty] = useState("2000");
    const [selectedYear, setSelectedYear] = React.useState(null);
    //a row + highlight + dim other countries
    const [selectedCountry, setSelectedCountry] = React.useState(null);
    const [left,setLeft] = React.useState(null);
    const [top,setTop] = React.useState(null);

    const year_lst = [1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010]


    const heatmap_margin = {top: 40, right: 160, bottom: 50, left: 140};
    const heatmap_height = HEIGHT - heatmap_margin.top - heatmap_margin.bottom;
    const heatmap_width = WIDTH - heatmap_margin.left - heatmap_margin.right;

    const changeHandler = (event) => {
        setYear(event.target.value);
    }

    const pieDataAll = useData(pieurl);

    const dataAll = useData(csvurl);
    if(!dataAll){
        return <pre>Loading...</pre>
    }
    if(!pieDataAll){
        return <pre>Loading...</pre>
    }
    const data = dataAll.filter( d => {
        return d.year === year_lst[year];
    });

    // const currentCountry= pieDataAll.filter(d => d.country===selectedCountry)[0];
    // console.log(currentCountry)

    const pieDataCountry = pieDataAll.filter( pd => {
        return pd.country === selectedCountry;
    });

    console.log(pieDataCountry)

    const pieData = pieDataCountry.filter( pd => {
        return pd.year === year_lst[year];
    });
    console.log(pieData)

    var transposedData = [];
    pieData.forEach(function(d) { 
    for (var key in d) {
        var obj = {};
        if (key !== '' && key !== "country" && key !== "year" && key !== 'suicides_no' && key !== 'population' && key !== 'suicides_calc' && key !== 'gdp' && key !=='gdp_per_capita') {
        obj.generation = key;
        obj.value = d[key];
        transposedData.push(obj);
        } 
    }
    });

    console.log(transposedData)
    

    //console.log(data)

    return <div>
        <div className='row'>
            <div className='col-lg-12'>
                <h1 className="text-center">Understanding Global Suicide Trends</h1>
                <h2 className="text-center">By Summer Xiao & Chengang Zhang</h2>
                <p className="text-center">Suicide/100k pop VS 1991-2010</p>
            </div>
        </div>
        <div className='row text-center'>
            <div className='col-lg-6'>
                <svg width={WIDTH} height={HEIGHT}>
                    <g>
                        <HeatMap margin={heatmap_margin} height={heatmap_height} width={heatmap_width} 
                        data={dataAll} year_lst={year_lst} country_lst={country_lst} 
                        selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
                        selectedYear={selectedYear} setSelectedYear={setSelectedYear} setYear={setYear}/>
                    </g>
                </svg>
            </div>
            <div className='col-lg-1'>

            </div>
            <div className='col-lg-5'>
                <svg width={WIDTH} height={HEIGHT}>
                    <g>
                    
                      <Piechart data={transposedData} innerRadius={100} outerRadius={HEIGHT-300} />
                        
                    </g>
                </svg>
            </div>
        </div>
        <div className='row'>
            <div className="container-sm col-3 text-center">
                <label htmlFor="customRange1" className="form-label">Select A Year</label>
            </div>
        </div>
        <div className='row'>
            <div className="container-sm col-3 text-center">
                <input className="text-center" key="yearText" type="text" value={year_lst[year]} readOnly/>
            </div>
        </div>
        <div className='row'>
            <div className="container-sm col-3 text-center">
            <input key="slider" className="form-range text-center" id="customRange1" type='range' min='0' max='19' value={year} step='1' onChange={changeHandler}/>
            </div>
        </div>
        <div className='row'>
            <div className='col-lg-6'>
                <GeoChart data_map={data_map} property={year_lst[year]} height={HEIGHT} width={WIDTH} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>
            </div>
            <div className='col-lg-6'>
                <svg width={WIDTH} height={HEIGHT}>
                    <g>
                    <ScatterPlot data={data} offsetX={heatmap_margin.left} offsetY={heatmap_margin.top} height={heatmap_height} width={heatmap_width}
                        selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
                        setLeft={setLeft} setTop={setTop}
                    /> 
                    </g>
                </svg>
            </div>
        </div>
            <div className="row">
                <div className='col-lg-6'>
                    
                </div>
                <div className='col-lg-6'>
                    
                </div>
            </div>
        </div>


}

const rootElement = document.getElementById('root')
ReactDOM.render(<Suicide/ >, rootElement);
{/* ReactDOM.render(<Suicide/ >, document.getElementById("root")); */}