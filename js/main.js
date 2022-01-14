//Initialize global variables
let CHART_TYPE = null;
let YEAR = null;
let MODE = null;
let stop = false;
let years = [];
let VEL = "1000";
let symbols = {};
let data = null;
let stats = {};
let selectClick;
let selectClickCanary;

function mainInit(){

	mapMain();

	showStats();

	div_stats.childNodes.forEach(child => {

        child.onclick = function(){
            clearSelection();
            selectRegion(child.id);
        }
    });

	for(var i = 2020; i>2006;i--){
		years.push(i);

	}

	YEAR = years[0];
	MODE = 'Relative';
	years.reverse();

	fetchSymbols();

	getData().then(response => {
		data = response;
	})

	readStatsFile();
}

window.onload = function() {

	document.getElementById("btnAge").addEventListener("click", displayAgeSymbol);
	document.getElementById("btnBoth").addEventListener("click", displayBothSymbol);
	document.getElementById("btnSex").addEventListener("click", displaySexSymbol);

	document.getElementById("btnPlay").addEventListener("click", playAnimation);
	document.getElementById("btnStop").addEventListener("click", function(){stop=true;});

	document.getElementById("btnChart").addEventListener("click", function(){
		this.className = "nav-link active";
		document.getElementById("btnStats").className = "nav-link";
		showChart();
	});
	document.getElementById("btnStats").addEventListener("click", function(){
		this.className = "nav-link active";
		document.getElementById("btnChart").className = "nav-link";
		showStats();
	});

	document.getElementById("btnAbsolute").addEventListener("click", function(){MODE=this.innerHTML;
	document.getElementById("btnRelative").className = "nav-link";
	this.className = "nav-link active";
	addSymbols(MODE,CHART_TYPE,YEAR);});
	document.getElementById("btnRelative").addEventListener("click", function(){MODE=this.innerHTML;
	document.getElementById("btnAbsolute").className = "nav-link"
	this.className = "nav-link active";
	addSymbols(MODE,CHART_TYPE,YEAR)});

	document.getElementById("sliderYear").addEventListener("input", function(){
		YEAR = this.value;
		addSymbols(MODE, CHART_TYPE, YEAR);
		setBubble(this, document.getElementById("bubble"));
	});

	vel_selector = document.getElementById("selectVelocity").addEventListener("click", function(){VEL=this.value;})

	div_explore = document.getElementById("div_explore");
	div_stats = document.getElementById("div_stats");
	div_chart = document.getElementById("div_chart");

	div_map = document.getElementById("map");
	loader = document.getElementById("loader");

	mainInit();
};