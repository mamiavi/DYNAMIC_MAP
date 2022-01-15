function chart(ccaa){
    for(com in data){
        if(ccaa == data[com].MetaData[2].Nombre){

            var serie = {}

            for(i in data[com].Data){
                anyo = data[com].Data[i].Anyo;
                valor = data[com].Data[i].Valor;
                serie[anyo] = valor;

            }
            var chartDom = document.getElementById('chart');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
            xAxis: {
                type: 'category',
                data: Object.keys(serie)
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: Object.values(serie),
                type: 'line'
                }
            ],
            title: [
                {
                    left:'center',
                    text:ccaa
                }
            ]
            };

            option && myChart.setOption(option);
        }
    }
}
