
function addSymbols(MODE, CHART_TYPE, YEAR){

  if(CHART_TYPE === 'SEX'){

    positionsSEX.setVisible(true);
    positionsBOTH.setVisible(false);
    positionsAGE.setVisible(false);

    if(positionsSEX.getSource().getState() === 'ready'){
      positionsSEX.getSource().getFeatures().forEach(feature => {
  
        name_region = feature.get('name');
  
        var SStyle =  new ol.style.Style({
          image: symbols[MODE+CHART_TYPE+YEAR+name_region]
        });
  
        feature.setStyle(SStyle);
  
      });
    }
  }

  if(CHART_TYPE === 'AGE'){

    positionsAGE.setVisible(true);
    positionsBOTH.setVisible(false);
    positionsSEX.setVisible(false);

    if(positionsAGE.getSource().getState() === 'ready'){
      positionsAGE.getSource().getFeatures().forEach(feature => {
  
        name_region = feature.get('name');
  
        var SStyle =  new ol.style.Style({
          image: symbols[MODE+CHART_TYPE+YEAR+name_region]
        });
  
        feature.setStyle(SStyle);
  
      });
    }
  }

  if(CHART_TYPE === 'BOTH'){

    positionsBOTH.setVisible(true);
    positionsSEX.setVisible(false);
    positionsAGE.setVisible(false);

    if(positionsBOTH.getSource().getState() === 'ready'){
      positionsBOTH.getSource().getFeatures().forEach(feature => {
  
        name_region = feature.get('name');
  
        var SStyle =  new ol.style.Style({
          image: symbols[MODE+CHART_TYPE+YEAR+name_region]
        });
  
        feature.setStyle(SStyle);
  
      });
    }
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
  if(MODE === 'Absolute'){
    document.getElementById("image_legend").src = './SYMBOLS/legends/RelativeSex.svg'
  }
}

function displayAgeSymbol(){
  CHART_TYPE="AGE"
  addSymbols(MODE, CHART_TYPE, YEAR);
  if(MODE === 'Relative'){
    document.getElementById("image_legend").src = './SYMBOLS/legends/RelativeAge.svg'
  }
  if(MODE === 'Absolute'){
    document.getElementById("image_legend").src = './SYMBOLS/legends/RelativeAge.svg'
  }
}

function displayBothSymbol(){
  CHART_TYPE="BOTH"
  addSymbols(MODE, CHART_TYPE, YEAR);
  if(MODE === 'Relative'){
    document.getElementById("image_legend").src = './SYMBOLS/legends/RelativeBoth.svg'
  }
  if(MODE === 'Absolute'){
    document.getElementById("image_legend").src = './SYMBOLS/legends/RelativeBoth.svg'
  }
}