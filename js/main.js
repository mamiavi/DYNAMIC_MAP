//Initialize global variables
let CHART_TYPE = null;
let YEAR = null;
let MODE = null;
let years = [];
let VEL = "1000";
let sliderYear;
let selector;
let symbols = {};
var positions = [];

function mainInit(){

	mapMain();

	showStats();

	selector = document.getElementById("selectYear");

	for(var i = 2020; i>2006;i--){
		years.push(i);
		var option = document.createElement("option");
		option.value=i;
		option.innerHTML=i;
		selector.appendChild(option);
	}

	YEAR = years[0];
	MODE = 'Relative';
	years.reverse();

	fetchSymbols();

}

window.onload = function() {

	document.getElementById("btnAge").addEventListener("click", displayAgeSymbol);
	document.getElementById("btnBoth").addEventListener("click", displayBothSymbol);
	document.getElementById("btnSex").addEventListener("click", displaySexSymbol);

	document.getElementById("btnPlay").addEventListener("click", playAnimation);

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


	selector = document.getElementById("selectYear").addEventListener("click", function(){YEAR=this.value;});
	sliderYear = document.getElementById("sliderYear").oninput = function(){YEAR=this.value;};

	vel_selector = document.getElementById("selectVelocity").addEventListener("click", function(){VEL=this.value;})

	div_explore = document.getElementById("div_explore");
	div_stats = document.getElementById("div_stats");
	div_chart = document.getElementById("div_chart");

	mainInit();
};