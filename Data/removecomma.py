# the goal of this file is to add a year property to the json file that would read the suicide count
import json
from pandas import *

data = read_csv("IVFinalProject/Data/by_country.csv")

data.replace(',','', regex=True, inplace=True)

data.to_csv('IVFinalProject/Data/by_country.csv')