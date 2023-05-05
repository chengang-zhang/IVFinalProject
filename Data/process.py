import pandas as pd
import numpy as np

df = pd.read_csv("/Users/summerxiao/Desktop/IV/Final Project/IVFinalProject/Data/master.csv")
col_country = ['country', 'year', 'suicides_no', 'population', 'suicides_calc',
 'gdp', 'gdp_per_capita']

year = [y for y in range(1991, 2011)]
df_new = df[df['year'].isin(year)]

df_new_by_country = pd.DataFrame(columns = col_country)
df_new_by_generation = pd.DataFrame()


for c in df_new['country'].unique():
    for y in year:
        df_new_by_country_sub = df_new[(df_new['country'] == c) & (df_new['year'] == y)]
        df1 = pd.DataFrame({'country':c, 'year':y, 'suicides_no':df_new_by_country_sub['suicides_no'].sum(axis = 0),
         'population':df_new_by_country_sub['population'].sum(axis = 0),
         'gdp': df_new_by_country_sub.iloc[:1,9], 'gdp_per_capita':df_new_by_country_sub.iloc[:1,10]})
        df1['suicides_calc'] = 100000 * df1['suicides_no']/df1['population']
        df_new_by_generation_sub = df_new_by_country_sub.groupby(by="generation")["suicides_no"].sum()
        df2 = pd.DataFrame({'country':c, 'year':y, 'Generation X':0, 'Silent':0, 'G.I. Generation':[0], 
                                'Boomers':0, 'Millenials':0, 'Generation Z':0})
        for i, r in df_new_by_generation_sub.iteritems():
            if int(df1['suicides_no']) == 0:
                continue
            if i == 'Generation X':
                df2['Generation X'] = float(r/df1['suicides_no'])
            elif i == 'Silent':
                df2['Silent'] = float(r/df1['suicides_no'])
            elif i == 'G.I. Generation':
                df2['G.I. Generation'] = float(r/df1['suicides_no'])
            elif i == 'Boomers':
                df2['Boomers'] = float(r/df1['suicides_no'])
            elif i == 'Millenials':
                df2['Millenials'] = float(r/df1['suicides_no'])
            elif i == 'Generation Z':
                df2['Generation Z'] = float(r/df1['suicides_no'])
        df_new_by_generation = df_new_by_generation.append(df2)
        df_new_by_country = df_new_by_country.append(df1)
# print(df_new_by_country.head(5))
df_new_by_country.replace(',','', regex=True, inplace=True)
pd.to_numeric(df_new_by_country['gdp'], downcast='integer')
df_new_by_country.to_csv('/Users/summerxiao/Desktop/IV/Final Project/IVFinalProject/Data/by_country.csv')
df_new_by_generation.to_csv('/Users/summerxiao/Desktop/IV/Final Project/IVFinalProject/Data/by_generation.csv')
# print(df_new_by_country['country'].unique().tolist())
# print(df['generation'].unique())