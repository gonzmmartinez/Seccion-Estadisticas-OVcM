// Establecer fuente Poppins
Chart.defaults.font.family = "Barlow";
Chart.register(ChartDataLabels);

// Constante ctx
const ctx = document.getElementById('grafico1').getContext('2d');

// Datos
const rawData = [
{Tipo: 'Consultas', 'Lugar': {'OVFG':{'Distrito': {2020: {'Centro': 589, 'Norte-Orán': 25, 'Norte-Tartagal': 106, 'Sur-Metán': 1},2021: {'Centro': 257, 'Norte-Orán': 14, 'Norte-Tartagal': 183, 'Sur-Anta': 3, 'Sur-Metán': 4},2022: {'Centro': 10, 'Norte-Orán': 16, 'Norte-Tartagal': 146, 'Sur-Anta': 1, 'Sur-Metán': 1}, 2023: {'Centro': 6, 'Norte-Orán': 7, 'Norte-Tartagal': 59, 'Sur-Anta': 0, 'Sur-Metán': 0}}}}},
{Tipo: 'Familiar', 'Lugar': {'Comisarias':{'Distrito': {2020: {'Centro': 6466, 'Norte-Orán': 548, 'Norte-Tartagal': 1080, 'Sur-Metán': 712},2021: {'Centro': 7848, 'Norte-Orán': 659, 'Norte-Tartagal': 1192, 'Sur-Anta': 115, 'Sur-Metán': 770},2022: {'Centro': 6786, 'Norte-Orán': 852, 'Norte-Tartagal': 1281, 'Sur-Anta': 239, 'Sur-Metán': 724},2023: {'Centro': 3694, 'Norte-Orán': 462, 'Norte-Tartagal': 573, 'Sur-Anta': 127, 'Sur-Metán': 344}}},'Otros organismos': {'Distrito': {2020: {'Centro': 177, 'Norte-Orán': 18, 'Sur-Metán': 0},2021: {'Centro': 401, 'Norte-Orán': 90, 'Sur-Anta': 9, 'Sur-Metán': 0},2022: {'Centro': 514, 'Norte-Orán': 61, 'Sur-Anta': 8, 'Sur-Metán': 0},2023: {'Centro': 284, 'Norte-Orán': 30, 'Sur-Anta': 18, 'Sur-Metán': 0}}},'OVFG': {'Distrito': {2020: {'Centro': 227, 'Norte-Orán': 52, 'Norte-Tartagal': 41, 'Sur-Metán': 85},2021: {'Centro': 264, 'Norte-Orán': 139, 'Norte-Tartagal': 112, 'Sur-Anta': 20, 'Sur-Metán': 121},2022: {'Centro': 227, 'Norte-Orán': 140, 'Norte-Tartagal': 72, 'Sur-Anta': 36, 'Sur-Metán': 91},2023: {'Centro': 104, 'Norte-Orán': 61, 'Norte-Tartagal': 60, 'Sur-Anta': 20, 'Sur-Metán': 55}}}}},
{Tipo: 'Género', 'Lugar': {'Comisarias': {'Distrito': {2020: {'Centro': 7793, 'Norte-Orán': 1011, 'Norte-Tartagal': 1853, 'Sur-Metán': 625},2021: {'Centro': 8607, 'Norte-Orán': 1183, 'Norte-Tartagal': 2142, 'Sur-Anta': 106, 'Sur-Metán': 767},2022: {'Centro': 7902, 'Norte-Orán': 1672, 'Norte-Tartagal': 2241, 'Sur-Anta': 341, 'Sur-Metán': 793},2023: {'Centro': 3816, 'Norte-Orán': 750, 'Norte-Tartagal': 1005, 'Sur-Anta': 116, 'Sur-Metán': 440}}},'Otros organismos': {'Distrito': {2020: {'Centro': 251, 'Norte-Orán': 292, 'Sur-Metán': 19},2021: {'Centro': 488, 'Norte-Orán': 379, 'Sur-Anta': 1, 'Sur-Metán': 23},2022: {'Centro': 534, 'Norte-Orán': 183, 'Sur-Anta': 5, 'Sur-Metán': 20},2023: {'Centro': 312, 'Norte-Orán': 79, 'Sur-Anta': 3, 'Sur-Metán': 11}}},'OVFG': {'Distrito': {2020: {'Centro': 479, 'Norte-Orán': 57, 'Norte-Tartagal': 81, 'Sur-Metán': 70},2021: {'Centro': 681, 'Norte-Orán': 129, 'Norte-Tartagal': 144, 'Sur-Anta': 17, 'Sur-Metán': 85},2022: {'Centro': 564, 'Norte-Orán': 166, 'Norte-Tartagal': 145, 'Sur-Anta': 62, 'Sur-Metán': 89},2023: {'Centro': 228, 'Norte-Orán': 55, 'Norte-Tartagal': 63, 'Sur-Anta': 21, 'Sur-Metán': 57}}}}},
{Tipo: 'No VFG', 'Lugar': {'No corresponde': {'Distrito': {2020: {'Centro': 4030, 'Norte-Orán': 432, 'Norte-Tartagal': 561, 'Sur-Metán': 177},2021: {'Centro': 5567, 'Norte-Orán': 621, 'Norte-Tartagal': 623, 'Sur-Anta': 26, 'Sur-Metán': 242},2022: {'Centro': 5070, 'Norte-Orán': 844, 'Norte-Tartagal': 837, 'Sur-Anta': 88, 'Sur-Metán': 308},2023: {'Centro': 2739, 'Norte-Orán': 468, 'Norte-Tartagal': 470, 'Sur-Anta': 22, 'Sur-Metán': 124}}}}}
];

function getChartData(year, lugar, distrito) {
    return rawData.map(item => ({
        Tipo: item.Tipo,
        Cantidad: item.Lugar[lugar] ? item.Lugar[lugar].Distrito[year][distrito] || 0 : 0
    }))
};

Bagc = []
Borc = []

function changeDistritos() {
    const year = document.getElementById('Year').value;
    const lugar = document.getElementById('Lugar').value;
    const distrito = document.getElementById('Distrito').value;

    const newData = getChartData(year, lugar, distrito);

    grafico1.data.labels = newData.map(item => item.Tipo);
    grafico1.data.datasets[0].data = newData.map(item => item.Cantidad);

    const values = newData.map(item => item.Cantidad);

    // console.log(values)

    const max = Math.max(...values);
    const newBagc = values.map(value => value === max ? 'rgba(231,165,44,0.7)' : 'rgb(82,76,66,0.7)');
    const newBorc = values.map(value => value === max ? 'rgba(231,165,44,0.9)' : 'rgb(82,76,66,0.9)');
    const newBagc_hover = values.map(value => value === max ? 'rgba(231,165,44,0.8)' : 'rgb(82,76,66,0.8)');
    const newBorc_hover = values.map(value => value === max ? 'rgba(231,165,44,1)' : 'rgb(82,76,66,1)');

    grafico1.data.labels = newData.map(item => item.Tipo);
    grafico1.data.datasets[0].data = values;
    grafico1.data.datasets[0].backgroundColor = newBagc;
    grafico1.data.datasets[0].hoverBackgroundColor = newBagc_hover;
    grafico1.data.datasets[0].borderColor = newBorc;
    grafico1.data.datasets[0].hoverBorderColor = newBorc_hover;
    grafico1.data.datasets[0].borderWidth = 1;
    grafico1.update();
}

const initialData = getChartData(2022, 'Comisarias', 'Centro')

const data = {
    labels: initialData.map(item => item.Tipo),
    datasets: [{
        label: 'Cantidad',
        data: initialData.map(item => item.Cantidad)
    }]
};

const config = {
    type: 'bar',
    data: data,
    plugins: [ChartDataLabels],
    options: {
        animation: {
            duration: 200
        },
        plugins: {
            datalabels: {
                font: {
                    size: 10
                },
                color: 'rgb(184, 184, 184)',
                display: function(context) {
                    const year = document.getElementById('Year').value;
                    const lugar = document.getElementById('Lugar').value;
                    const distrito = document.getElementById('Distrito').value;
                    var values = getChartData(year, lugar, distrito).map(item => item.Cantidad);
                    var max = Math.max(...values);
                    var values_map = values.map(value => !(!(value <= (max*0.3)) || !(value != 0)) ? true : false)
                    return values_map
                },
                clamp: true,
                anchor: 'end',
                align: 'top',
                offset: 0
            },
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: (context) => {
                        return context[0].label.replaceAll(",","");
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Cantidad'
                }
            },
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Lugar'
                }
            }
        }
    }
};

const grafico1 = new Chart(ctx, config);

changeDistritos();