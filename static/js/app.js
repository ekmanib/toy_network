const DOM = document.getElementById('container');
const chart = echarts.init(DOM, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
const informationPanel = document.getElementById('info-pane');
let app = {};
let option;


chart.showLoading();
$.getJSON('../../data/example1.json', function (graph) {
    chart.hideLoading();

    console.log(graph)

    graph.nodes.forEach(function (node) {
        node.draggable = true;
    });

    option = {
        title: {
            text: 'Fictituos Graph',
            subtext: 'Force Directed Layout',
            top: 'bottom',
            left: 'left'
        },
        tooltip: {},
        legend: [
            {
                data: graph.categories.map(function (a) {
                    return a.name;
                })
            }
        ],
        animationDuration: 2000,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: "Fictituos Graph",
                type: "graph",
                layout: "force",
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.2
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 30
                    }
                },
            }
        ]
    };

    chart.setOption(option);
});

option && chart.setOption(option);

chart.on('click', function (params) {
    if (params.dataType === 'node') {
        console.log(params.data);

        informationPanel.innerHTML = '<img src="static/assets/logo.png" alt="logo">' + '<h1>Node Information</h1>'
    }
});

chart.on('click', function (params) {
    if (params.dataType === 'edge') {
        console.log(params.data);

        informationPanel.innerHTML = '<img src="static/assets/logo.png" alt="logo">' + '<h1>Edge Information</h1>'
    }
});

function resetInformationPanel() {
    informationPanel.innerHTML = '<img src="static/assets/logo.png" alt="logo">' + '<h1>Title</h1>' + '<h2>Subtitle</h2>'
};

window.addEventListener('resize', chart.resize);
