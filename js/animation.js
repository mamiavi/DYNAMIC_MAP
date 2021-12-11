
function playAnimation(){

    years.forEach((year, i) => {    
        setTimeout(() => {

            addSymbols(MODE, CHART_TYPE, year);

            document.getElementById("sliderYear").value=year;

            setBubble(document.getElementById("sliderYear"), document.getElementById("bubble"));
            
        }, i * VEL);
      });

}