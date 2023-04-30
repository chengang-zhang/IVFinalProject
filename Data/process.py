import pandas as pd
import numpy as np

df = pd.read_csv("/Users/summerxiao/Desktop/IV/Final Project/IVFinalProject/Data/master.csv")
col_country = ['country', 'year', 'suicides_no', 'population', 'suicides/100k pop',
 'gdp', 'gdp_per_capita']

year = [y for y in range(1991, 2011)]
df_new = df[df['year'].isin(year)]

df_new_by_country = pd.DataFrame(columns = col_country)

for c in df_new['country'].unique():
    for y in year:
        df_new_by_country_sub = df_new[(df_new['country'] == c) & (df_new['year'] == y)]
        df1 = pd.DataFrame({'country':c, 'year':y, 'suicides_no':df_new_by_country_sub['suicides_no'].sum(axis = 0),
         'population':df_new_by_country_sub['population'].sum(axis = 0),
         'gdp': df_new_by_country_sub.iloc[:1,9], 'gdp_per_capita':df_new_by_country_sub.iloc[:1,10]})
        df1['suicides_calc'] = 100000 * df1['suicides_no']/df1['population']
        df_new_by_country = df_new_by_country.append(df1)
# print(df_new_by_country.head(5))
df_new_by_country.to_csv('/Users/summerxiao/Desktop/IV/Final Project/IVFinalProject/Data/by_country.csv', index=False)
print(df_new_by_country['country'].unique().tolist())