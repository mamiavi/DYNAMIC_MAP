
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

  if(positionsCanary.getSource().getState() === 'ready'){
    positionsCanary.getSource().getFeatures().forEach(feature => {
      name_region = feature.get('name');

      var CStyle = new ol.style.Style({
        image: symbols[MODE+CHART_TYPE+YEAR+name_region]
      });

      feature.setStyle(CStyle);

    })
  }

}

function displaySexSymbol(){
  CHART_TYPE="SEX";
  addSymbols(MODE, CHART_TYPE, YEAR);
  if(MODE === 'Relative'){
    document.getElementById("image_legend").src = './SYMBOLS/legends/RelativeSex.svg'
  }
}

function displayAgeSymbol(){
  CHART_TYPE="AGE"
  addSymbols(MODE, CHART_TYPE, YEAR);
  if(MODE === 'Relative'){
    document.getElementById("image_legend").src = './SYMBOLS/legends/RelativeAge.svg'
  }
}

function displayBothSymbol(){
  CHART_TYPE="BOTH"
  addSymbols(MODE, CHART_TYPE, YEAR);
  if(MODE === 'Relative'){
    document.getElementById("image_legend").src = './SYMBOLS/legends/RelativeBoth.svg'
  }
}