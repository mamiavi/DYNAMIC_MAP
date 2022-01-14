function setBubble(range, bubble){
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;
  
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
};

function clearSelection(){
    selectClick.getFeatures().clear();
};

function readStatsFile(){
    fetch('/DATA/stats.json')
  .then(response => response.json())
  .then(data => stats = data);
}

function selectRegion(stat){
    
    clearSelection();

    if(stat != 'mer' && stat != 'ler'){
        layer = spain.getSource().getFeatures().filter(feature=>
            feature.get('name') == stats[stat][MODE][YEAR].region);
        selectClick.getFeatures().push(layer[0])
        chart(stats[stat][MODE][YEAR].region);
        showChart();
        
    }else{
        layer = spain.getSource().getFeatures().filter(feature=>
            feature.get('name') == stats[stat][YEAR].region);
        selectClick.getFeatures().push(layer[0])
        chart(stats[stat][YEAR].region);
        showChart();
    }
    
};

function showChart(){
    div_stats.style.display = "none";
    div_chart.style.display = "block"; 
};

function showStats(){
    div_chart.style.display = "none"; 
    div_stats.style.display = "block";
}

function fetchSymbols(){

    modes = ['Absolute', 'Relative'];
    types = ['SEX', 'AGE', 'BOTH'];
    regions = ['Andalucía','Aragón','Asturias, Principado de', 'Balears, Illes', 'Canarias','Cantabria','Castilla La Mancha','Castilla y León','Cataluña', 'Ceuta','Comunitat Valenciana','Extremadura','Galicia','Madrid, Comunidad de','Melilla','Murcia, Región de','Navarra, Comunidad Foral de','País Vasco','Rioja, La'];
    
    for(var i=0; i<modes.length;i++){
        for(var j=0; j<types.length;j++){
            for(var k=0;k<years.length;k++){
                for(var r=0;r<regions.length;r++){
                    //Here I have to customice the scale depending on the symbol and the mode
                    symbols[modes[i]+types[j]+years[k]+regions[r]] = new ol.style.Icon({
                        src: './SYMBOLS/'+modes[i]+'/'+types[j]+'/'+years[k]+'/'+regions[r]+'.svg',
                        scale: 0.2
                    });

                    symbols[modes[i]+types[j]+years[k]+regions[r]].load();
                }
            }
        }
    }
}

async function getData(){
    const response = await fetch("./DATA/charts.json");
    const data = await response.json();
    return data;
  }
