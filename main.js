var map = new maplibregl.Map({
    container: 'map',
    style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json', // 地図のスタイル
    center: [139.7024, 35.6598], // 中心座標
    zoom: 4, // ズームレベル
});


//★チェック用★
//マーカーの表示
//var marker = new maplibregl.Marker().setLngLat([139.70356, 35.65901]).addTo(map);
//ポップアップの表示
//var popup = new maplibregl.Popup({
//    offset: 25, // ポップアップの位置
//    closeButton: false, // 閉じるボタンの表示
//}).setText('渋谷ヒカリエ');
//var marker = new maplibregl.Marker().setLngLat([139.70356, 35.65901]).setPopup(popup).addTo(map);

map.on('load', function () {
    map.loadImage('./JPG/つり橋アイコン1.png', function (error, image) {
        if (error) throw error;
        map.addImage('facility_icon', image);
    });
    map.addSource('facility_point', {
        type: 'geojson',
        data: "土木学会選奨土木遺産2022.geojson",
    });
    map.addLayer({
        id: 'facility_point',
        type: 'symbol',
        source: 'facility_point',
        layout: {
            'icon-image': 'facility_icon',
            'icon-size': 0.1,
        },
    });
});

// 地物クリック時にポップアップを表示する
map.on('click', 'facility_point', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
     var name = e.features[0].properties['構造物名'];

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    // ポップアップを表示する
    new maplibregl.Popup({
        offset: 10, // ポップアップの位置
        closeButton: false, // 閉じるボタンの表示
    })
        .setLngLat(coordinates)
        .setHTML(name)
        .addTo(map);
});
