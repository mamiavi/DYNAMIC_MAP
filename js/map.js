//Projection
proj4.defs('EPSG:1000','+proj=laea +lat_0=40 +lon_0=-5 +x_0=0 +y_0=0 +ellps=GRS80'+
'+towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

ol.proj.proj4.register(proj4);

//Styles
const noSpainStyle = new ol.style.Style({
    fill: new ol.style.Fill({color:[220, 220, 220, 255]}),
    stroke: new ol.style.Stroke({
    color: 'black'})
});
  
const SpainStyle = new ol.style.Style({
    fill: new ol.style.Fill({color:'white'}),
    stroke: new ol.style.Stroke({
        color: 'black'})
});

const selectedStyle = new ol.style.Style({
    fill: new ol.style.Fill({color: [255,200,200]}),
    stroke: new ol.style.Stroke({
        color: 'red'
    })
})

//Layers: Simplified to 1000 meters and deleted the decimals. Canarias simplified 0.01 degrees
const spain = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/spainSimplified.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')})
    }),
    style: SpainStyle,
    name:'spain'
});

const africa = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/africaSimplified.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')})
    }),
    style: noSpainStyle,
    name:'africa'
});

const andorra = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/andorra1000.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')})
    }),
    style:noSpainStyle,
    name:'andorra'
});

const canarias = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/canariasSimplified.geojson',
        format: new ol.format.GeoJSON(),
    }),
    style:SpainStyle,
    name:'canarias'
});

const europe = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/europeSimplified.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')})
    }),
    style:noSpainStyle,
    name:'europe'
});

const positions = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/positions1000.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')})
    }),
    style:[],
    name: 'positions'
});

const positionsSEX = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/positionsSEX.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')})
    }),
    style:[],
    name: 'positionsSEX'
});

const positionsAGE = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/positionsAGE.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')})
    }),
    style:[],
    name: 'positionsAGE'
});

const positionsBOTH = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/positionsBOTH.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:1000')})
    }),
    style:[],
    name: 'positionsBOTH'
});

const positionsCanary = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CARTOGRAPHY/positions4326.geojson',
        format: new ol.format.GeoJSON({dataProjection: ol.proj.get('EPSG:4326')})
    }),
    style:[]
})


var listenerKey = spain.getSource().on('change', function(e){

    if(spain.getSource().getState() == 'ready'){

        extent = (spain.getSource().getExtent());

        center = ol.extent.getCenter(extent);

        map.getView().setCenter([center[0]-200000, center[1]-10000]);
        
    }else{
        console.log('Spain source is loading');
    }
});

var listenerKey = canarias.getSource().on('change', function(e){

    if(canarias.getSource().getState() == 'ready'){

        extent = (canarias.getSource().getExtent());

        center = ol.extent.getCenter(extent);

        canarymap.getView().setCenter(center);

        loader.style.display = "none";
        div_map.style.display = "block";

    }else{
        console.log('Canary source is loading')
    }
});


function mapMain(){

    map = new ol.Map({
        layers: [andorra, europe, africa, spain, positionsSEX, positionsAGE, positionsBOTH],
        view: new ol.View({
        center: [0,0],
        zoom: 6.5,
        projection: ol.proj.get('EPSG:1000')
        }),
        controls:[new ol.control.ScaleLine({target: document.getElementById("scaleline")})],
        interactions:[],
        target: 'map'
    });

    canarymap = new ol.Map({
        layers: [canarias, positionsCanary],
        view: new ol.View({
        center: [0,0],
        zoom: 6.1
        }),
        target: 'canarymap',
        controls:[],
        interactions:[]
    });

    div_map.style.display = 'none';

    //Configure the selection

    selectClick = new ol.interaction.Select({
        layers:[spain],
        condition: ol.events.condition.click,
        style: selectedStyle
    });

    selectClickCanary = new ol.interaction.Select({
        layers:[canarias],
        condition: ol.events.condition.click,
        style: selectedStyle
    });

    map.addInteraction(selectClick);
    canarymap.addInteraction(selectClickCanary);

    selectClick.on('select', function(e){
        if(e.target.getFeatures().item(0)){
            showChart();
            document.getElementById("btnStats").className = "nav-link"
            document.getElementById("btnChart").className = "nav-link active"
            chart(e.target.getFeatures().item(0).getProperties().name);
        }
    })

    selectClickCanary.on('select', function(e){
        if(e.target.getFeatures().item(0)){
            showChart();
            document.getElementById("btnStats").className = "nav-link"
            document.getElementById("btnChart").className = "nav-link active"
            chart(e.target.getFeatures().item(0).getProperties().name);
        }
    })

}