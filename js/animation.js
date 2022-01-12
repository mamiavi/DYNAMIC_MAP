
// function playAnimation(){
//     //Adapt this to use the stop button
//     years.forEach((year, i) => {    
//         setTimeout(() => {

//             addSymbols(MODE, CHART_TYPE, year);

//             document.getElementById("sliderYear").value=year;

//             setBubble(document.getElementById("sliderYear"), document.getElementById("bubble"));
            
//         }, i * VEL);
//       });

// }

function playAnimation(){

    stop = false;
    var i = 0;
    
    var interval = setInterval(function(){

        year = years[i];

        addSymbols(MODE, CHART_TYPE, year);

        document.getElementById("sliderYear").value=year;
        setBubble(document.getElementById("sliderYear"), document.getElementById("bubble"));

        i++;

        if(i === years.length) clearInterval(interval);
        if(stop === true) clearInterval(interval);
    }, 1*VEL);
}