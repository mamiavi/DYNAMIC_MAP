
function addSymbols(MODE, CHART_TYPE, YEAR){

  if(positions.getSource().getState() === 'ready'){
    positions.getSource().getFeatures().forEach(feature => {

      name_region = feature.get('name');

      var SStyle =  new ol.style.Style({
        image: symbols[MODE+CHART_TYPE+YEAR+name_region]
      });

      feature.setStyle(SStyle);

    });
  }
}

function displaySexSymbol(){
  CHART_TYPE="SEX";
  addSymbols(MODE, CHART_TYPE, YEAR);
}

function displayAgeSymbol(){
  CHART_TYPE="AGE"
  addSymbols(MODE, CHART_TYPE, YEAR);
}

function displayBothSymbol(){
  CHART_TYPE="BOTH"
  addSymbols(MODE, CHART_TYPE, YEAR);
}