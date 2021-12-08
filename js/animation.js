
function playAnimation(){

    years.forEach((year, i) => {    
        setTimeout(() => {

            addSymbols(MODE, CHART_TYPE, year);

            sliderYear.value = year;//TODO: know why this is not working

            for(var i=0; i<selector.options.length; i++){
    
                if(selector.options[i].value == year){
                    selector.options[i].selected = true;
                }else{
                    selector.options[i].selected = false;
                }
            }
            
        }, i * VEL);
      });

}