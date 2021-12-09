//Projection
proj4.defs('EPSG:1000','+proj=laea +lat_0=40 +lon_0=-5 +x_0=0 +y_0=0 +ellps=GRS80'+
'+towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

ol.proj.proj4.register(proj4);

//Styles
const noSpainStyle = new ol.style.Style({
    fill: new ol.style.Fill({color:[200, 200, 200, 255]}),
    stroke: new ol.style.Stroke({
    color: 'black'})
});
  
const SpainStyle = new ol.style.Style({
    fill: new ol.style.Fill({color:'white'}),
    stroke: new ol.style.Stroke({
        color: 'black'})
});

//Layers
const spain = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/spain.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')})
    }),
    style: SpainStyle,
    name:'spain'
});

const africa = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/africa.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')}),
    }),
    style: noSpainStyle,
    name:'africa'
});

const andorra = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/andorra1000.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')}),
    }),
    style:noSpainStyle,
    name:'andorra'
});

const canarias = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/canarias.geojson',
        format: new ol.format.GeoJSON(),
    }),
    style:SpainStyle,
    name:'canarias'
});

const europe = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/europe.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')}),
    }),
    style:noSpainStyle,
    name:'europe'
});

const centroids = new ol.layer.Vector({
    name: 'centroids'
});


var listenerKey = spain.getSource().on('change', function(e){

    if(spain.getSource().getState() == 'ready'){

        extent = (spain.getSource().getExtent());

        center = ol.extent.getCenter(extent);

        map.getView().setCenter([center[0]-90000, center[1]-10000]);
        
        spain.getSource().getFeatures().forEach(feature => {
            
            bbox = feature.getGeometry().getExtent();
            centroid = ol.proj.toLonLat(ol.extent.getCenter(bbox));

            name_region = feature.get('name');

            var coords = new ol.Feature({
                name: name_region,
                geometry: new ol.geom.Point(ol.proj.fromLonLat(centroid))
            })
            
            positions.push(coords);

        });

    }else{
        console.log('Spain source is loading');
    }
});

var listenerKey = canarias.getSource().on('change', function(e){

    if(canarias.getSource().getState() == 'ready'){

        extent = (canarias.getSource().getExtent());

        center = ol.extent.getCenter(extent);

        canarymap.getView().setCenter(center);

        canarias.getSource().getFeatures().forEach(feature => {
            bbox = feature.getGeometry().getExtent();
            centroid = ol.proj.toLonLat(ol.extent.getCenter(bbox));

            var coords = new ol.Feature({
                name:'Canarias',
                geometry: new ol.geom.Point(ol.proj.fromLonLat(centroid))
            })

            positions.push(coords);
            
        });

        var position = new ol.source.Vector({
            features: positions
        });
        
        centroids.setSource(position);
        
        map.addLayer(centroids)
        canarymap.addLayer(centroids);
    }
});


function mapMain(){

    map = new ol.Map({
        layers: [andorra, europe, africa, spain],
        view: new ol.View({
        center: [0,0],
        zoom: 6.5,
        projection: ol.proj.get('EPSG:1000')
        }),
        controls:[],
        interactions:[],
        target: 'map'
    });

    canarymap = new ol.Map({
        layers: [canarias],
        view: new ol.View({
        center: [0,0],
        zoom: 6.1
        }),
        target: 'canarymap',
        controls:[],
        interactions:[]
    });

    //Configure the selection

    let select = null;
    let selectcanary = null;

    const selectClick = new ol.interaction.Select({
        condition: ol.events.condition.click
    });

    const selectClickCanary = new ol.interaction.Select({
        condition: ol.events.condition.click
    });

    select = selectClick;
    selectcanary = selectClickCanary;

    if (select !== null) {
        map.addInteraction(select);
        select.on('select', function (e) {
            console.log("Has seleccionado algo");
        });
    }

    if (selectcanary !== null) {
        canarymap.addInteraction(selectcanary);
        selectcanary.on('select', function (e) {
            console.log("Has seleccionado algo");
        });
    }

}