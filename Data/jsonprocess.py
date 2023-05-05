# the goal of this file is to add a year property to the json file that would read the suicide count
import json
from pandas import *

data = read_csv("IVFinalProject/Data/by_country.csv")

country = data['country'].tolist()
year = data['year'].tolist()
suicides_no = data['suicides_no'].tolist()
population = data['population'].tolist()
suicides_calc = data['suicides_calc'].tolist()
gdp = data['gdp'].tolist()
gdp_per_capita = data['gdp'].tolist()

country_suicide = dict()

for i in range(len(country)):
    key = country[i]
    try: 
        year_data = year[i]
        suicide_data = suicides_calc[i]
        country_suicide[key].append([str(year_data),suicide_data])
    except:
        year_data = year[i]
        suicide_data = suicides_calc[i]
        country_suicide[key] = [[str(year_data),suicide_data]]

year_lst = [1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010]
year_as_string = [str(i) for i in year_lst]
#print(country_suicide['United States'])
filename = 'IVFinalProject/Data/GeoChart.world.geo.json'
# load file
with open(filename) as f:
    data_json = json.load(f)

# print (len(data_json['features']))
print(data_json['features'][0]['properties']['geounit'])

for i in range(len(data_json['features'])):
    year_list_test = [i for i in year_as_string]
    country_test = data_json['features'][i]['properties']['geounit']
    country_test2 = data_json['features'][i]['properties']['name']
    country_test3 = data_json['features'][i]['properties']['name_long']
    if (country_test in country_suicide.keys()):
        for value in country_suicide[country_test]:
            year_for_json = value[0]
            suicide_for_json = value[1]
            year_list_test.remove(year_for_json)
            data_json['features'][i]['properties'][year_for_json] = suicide_for_json
        if len(year_list_test) > 0:
            for year in year_list_test:
                data_json['features'][i]['properties'][year] = -1

    else:
        if (country_test2 in country_suicide.keys()):
            for value in country_suicide[country_test2]:
                year_for_json = value[0]
                suicide_for_json = value[1]
                year_list_test.remove(year_for_json)
                data_json['features'][i]['properties'][year_for_json] = suicide_for_json
            if len(year_list_test) > 0:
                for year in year_list_test:
                    data_json['features'][i]['properties'][year] = -1
        else:   
            if (country_test3 in country_suicide.keys()):
                for value in country_suicide[country_test3]:
                    year_for_json = value[0]
                    suicide_for_json = value[1]
                    year_list_test.remove(year_for_json)
                    data_json['features'][i]['properties'][year_for_json] = suicide_for_json 
                if len(year_list_test) > 0:
                    for year in year_list_test:
                        data_json['features'][i]['properties'][year] = -1 
            else:  
                for x in year_as_string:
                    data_json['features'][i]['properties'][x] = -1

#list of countries we have in our data set
country_lst = ['Albania', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 
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

# print(len(country_lst))

#list of years we have in our data set
year_lst = [1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010]

#list of years as strings
year_as_string = [str(i) for i in year_lst]

#get the number of countries in the json file
#nested: features, properties, geounit


# edit data
# data["features"]["properties"][] = {"randomdata" : "data"}

# overwrite file
with open("IVFinalProject/Data/new.json", 'w') as f:
    json.dump(data_json, f, indent=4)