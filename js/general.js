function clearSelection(){

}

function selectRegion(statCode){
    console.log('Me has pulsado!', statCode);
}

function showChart(){
    div_stats.style.display = "none";
    div_chart.style.display = "block"; 
};

function showStats(){
    div_chart.style.display = "none"; 
    div_stats.style.display = "block";

    //Create the predefine sentences: Most equal region, Less equal region, Less unemployment, More unemplyment
    //FIrst add a onClick for each item in the list
    //That onClick must to call a function to clear the possible selected items and or ccaa
    //That onClick must to call the function to find the ccaa that matchs the query and the select it

    for (var i = 0; i < div_stats.childNodes.length; i++){

        if(div_stats.childNodes[i].id !== undefined){
            var statCode = div_stats.childNodes[i].id;
            div_stats.childNodes[i].onclick = function(){

                clearSelection();
                selectRegion(statCode);

            }
        }
    }
}

function fetchSymbols(){

    modes = ['Absolute', 'Relative'];
    types = ['SEX', 'AGE', 'BOTH'];
    regions = ['Andalucía','Aragón','Asturias, Principado de', 'Balears, Illes', 'Canarias','Cantabria','Castilla La Mancha','Castilla y León','Cataluña', 'Ceuta','Comunitat Valenciana','Extremadura','Galicia','Madrid, Comunidad de','Melilla','Murcia, Región de','Navarra, Comunidad Foral de','País Vasco','Rioja, La'];
    
    for(var i=0; i<modes.length;i++){
        for(var j=0; j<types.length;j++){
            for(var k=0;k<years.length;k++){
                for(var r=0;r<regions.length;r++){

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
