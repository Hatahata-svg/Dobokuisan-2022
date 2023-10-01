#右下の環境から”Geo_env”に変更する
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point

#csvのDF化
df = pd.read_csv(r"C:\Users\sokag\Desktop\プログラミング\プログラミング\Python\GIS\MapLibre GL JS\csvtogeojson\土木学会選奨土木遺産2022.csv", encoding='cp932')

#ポイント作成
geometry = [Point(xy) for xy in zip(df.longitude, df.latitude)]
geo_df = gpd.GeoDataFrame(df, geometry=geometry)

#shp出力
geo_df.to_file(driver='ESRI Shapefile', filename=r"C:\Users\sokag\Desktop\プログラミング\プログラミング\Python\GIS\MapLibre GL JS\csvtogeojson\geo.shp", encoding='cp932')

# shpをgeojsonに変換
df = gpd.read_file(r"C:\Users\sokag\Desktop\プログラミング\プログラミング\Python\GIS\MapLibre GL JS\csvtogeojson\geo.shp")
df.to_file(r"C:\Users\sokag\Desktop\プログラミング\プログラミング\Python\GIS\MapLibre GL JS\csvtogeojson\土木学会選奨土木遺産2022.geojson", driver='GeoJSON', encoding='utf-8')