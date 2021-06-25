let id = -1;
window.onload = function () {
    // Verifica se o usuário logado está logado
    if (sessionStorage.getItem("idLogado") == null) {
        // Redireciona para a tela de login
        location.href = "../login/";
    }
    else {
        //var btnNovo = document.getElementById(`btnNovo`);
        var btnSair = document.getElementById(`btnSair`);

        //btnNovo.addEventListener(`click`, mostraFormulario);
        btnSair.addEventListener(`click`, sair);

        // Executa as funções que geram os gráficos e as tabelas
        pizza();
        colunas();
        tarefasAtrasadas();
        tarefasDoDia();
        tarefas7Dias();
        eventos();
    }
};

// Função que busca todos os usuários do servidor
function pizza() {
    $.ajax({
        url: servidor + 'dashboard/qtdtarefasporsituacao.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            var co = 0, ea = 0, af = 0, ca = 0;
            dados.forEach(function (item) {
                if (item.situacao == "AF")
                    af = item.quantidade;
                if (item.situacao == "CA")
                    ca = item.quantidade;
                if (item.situacao == "EA")
                    ea = item.quantidade;
                if (item.situacao == "CO")
                    co = item.quantidade;
            });
            var ctx = document.getElementById('myChart');
            // ctx.height = 405;
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Concluído", "Em andamento", "A fazer", "Cancelada",],
                    datasets: [{
                        data: [co, ea, af, ca],
                        backgroundColor: ["#4CAF50", "#FF8B26", "#1565C0", "#f44336"],
                        hoverBackgroundColor: ["#2E7D32", "#e57600", "#004E8C", "#b71c1c"],
                        borderWidth: 5,
                        borderColor: "#fff"
                    }]
                },
                options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                        display: false,
                    },
                    title: {
                        display: false,
                        text: 'Chart.js Doughnut Chart'
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    plugins: {
                        labels: {
                            //render: 'value',
                            render: 'percentage',
                            fontColor: 'white',
                            fontStyle: 'bold',
                            precision: 0
                        }
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                                var total = meta.total;
                                var currentValue = dataset.data[tooltipItem.index];
                                var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                                return currentValue + ' (' + percentage + '%)';
                            },
                            title: function (tooltipItem, data) {
                                return data.labels[tooltipItem[0].index];
                            }
                        }
                    },
                }
            });
        },
        // Se der erro no envio dos dados para o servidor...
        error: function (erro) {
            //console.log(erro);
            // Exibe mensagem de erro
            //alert('Houve um erro de conexão com o banco de dados');
            Swal.fire({
                title: 'Houve um erro de conexão com o banco de dados.',
                icon: 'warning'
            });
        }
    });
}

function colunas() {
    $.ajax({
        url: servidor + 'dashboard/qtdeventosprox12meses.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            //var itens = ["2020/12", "2020/12", "2020/12", "2020/12", "2020/12", "2020/12", "2020/12", "2020/12"];
            var itens = [];
            //var valores = [5, 9, 6, 1, 2, 7, 15, 12];
            var valores = [];
            dados.forEach(function (item) {
                //itens.push(item.am)
                itens.push(`${item.am.substring(5, 7)}/${item.am.substring(0, 4)}`)
                valores.push(item.quantidade)
            });

            //console.log(itens);
            //console.log(valores);
            var ctx1 = document.getElementById('ano');
            ctx1.height = 120;
            var ano = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: itens,
                    datasets: [{
                        label: 'Quantidade por mês',
                        data: valores,
                        backgroundColor: '#00ACC1',
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        position: 'top',
                        display: false,
                    },
                    plugins: {
                        labels: {
                            render: 'value',
                            fontColor: 'white',
                            fontStyle: 'bold',
                            precision: 2
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            formatter: Math.round,
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 20,
                            bottom: 0
                        }
                    },
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItem, data) {
                                var mesExtenso;
                                //switch (data.labels[tooltipItem[0].index][0] + data.labels[tooltipItem[0].index][1]) {
                                switch (data.labels[tooltipItem[0].index].substring(0, 2)) {
                                    case '01':
                                        mesExtenso = "Janeiro"; break;
                                    case '02':
                                        mesExtenso = "Fevereiro"; break;
                                    case '03':
                                        mesExtenso = "Março"; break;
                                    case '04':
                                        mesExtenso = "Abril"; break;
                                    case '05':
                                        mesExtenso = "Maio"; break;
                                    case '06':
                                        mesExtenso = "Junho"; break;
                                    case '07':
                                        mesExtenso = "Julho"; break;
                                    case '08':
                                        mesExtenso = "Agosto"; break;
                                    case '09':
                                        mesExtenso = "Setembro"; break;
                                    case '10':
                                        mesExtenso = "Outubro"; break;
                                    case '11':
                                        mesExtenso = "Novembro"; break;
                                    case '12':
                                        mesExtenso = "Dezembro"; break;
                                    default:
                                        mesExtenso = "Outro"
                                }
                                console.log(data.labels[tooltipItem[0].index]);
                                return mesExtenso + " de " + data.labels[tooltipItem[0].index].substring(3, 7);

                            }
                        }
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value) { if (value % 1 === 0) { return value; } }
                            },
                        }]
                    },
                    "hover": {
                        "animationDuration": 0
                    },
                    "animation": {
                        "duration": 1,
                        "onComplete": function () {
                            var chartInstance = this.chart,
                                ctx = chartInstance.ctx;

                            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';

                            this.data.datasets.forEach(function (dataset, i) {
                                var meta = chartInstance.controller.getDatasetMeta(i);
                                meta.data.forEach(function (bar, index) {
                                    var data = dataset.data[index];
                                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                                });
                            });
                        }
                    },
                }
            });
        },
        // Se der erro no envio dos dados para o servidor...
        error: function (erro) {
            //console.log(erro);
            // Exibe mensagem de erro
            //alert('Houve um erro de conexão com o banco de dados');
            Swal.fire({
                title: 'Houve um erro de conexão com o banco de dados.',
                icon: 'warning'
            });
        }
    });
}

function tarefasAtrasadas() {
    $.ajax({
        url: servidor + 'dashboard/tarefasatrasadas.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            let lista = document.getElementById("listaTarefasAtrasadas");
            lista.innerHTML = `<div class="accordion">`;
            if (dados != null) {
                dados.forEach(function (item) {
                    lista.innerHTML += (`<div class="accordion__pane border border-gray-200 p-3">
                    <a href="javascript:;" class="accordion__pane__toggle font-medium block">${item.titulo}</a>
                    <div class="accordion__pane__content mt-3 text-gray-700 leading-relaxed" style="display: none">
                    <p><strong>Data Início:</strong> ${moment(item.datahorainicio).format("DD/MM/YYYY - HH:mm")}</p>
                    <p><strong>Data Fim:</strong> ${moment(item.datahorafim).format("DD/MM/YYYY - HH:mm")}</p>
                    <p><strong>Descrição:</strong> ${item.descricao}</p>
                    </div>
                    </div>`);
                });
            }
            else {
                lista.innerHTML += ``;
            }
            lista.innerHTML += `</div>`
        },
        // Se der erro no envio dos dados para o servidor...
        error: function (erro) {
            //console.log(erro);
            // Exibe mensagem de erro
            //alert('Houve um erro de conexão com o banco de dados');
            Swal.fire({
                title: 'Houve um erro de conexão com o banco de dados.',
                icon: 'warning'
            });
        }
    });
}

function tarefasDoDia() {
    $.ajax({
        url: servidor + 'dashboard/tarefasdodia.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            let lista = document.getElementById("listaTarefasDoDia");
            lista.innerHTML = `<div class="accordion">`;
            if (dados != null) {
                dados.forEach(function (item) {
                    lista.innerHTML += (`<div class="accordion__pane border border-gray-200 p-3">
                    <a href="javascript:;" class="accordion__pane__toggle font-medium block">${item.titulo}</a>
                    <div class="accordion__pane__content mt-3 text-gray-700 leading-relaxed" style="display: none">
                    <p><strong>Data Início:</strong> ${moment(item.datahorainicio).format("DD/MM/YYYY - HH:mm")}</p>
                    <p><strong>Data Fim:</strong> ${moment(item.datahorafim).format("DD/MM/YYYY - HH:mm")}</p>
                    <p><strong>Descrição:</strong> ${item.descricao}</p>
                    </div>
                    </div>`);
                });
            }
            else {
                lista.innerHTML += ``;
            }
            lista.innerHTML += `</div>`
        },
        // Se der erro no envio dos dados para o servidor...
        error: function (erro) {
            //console.log(erro);
            // Exibe mensagem de erro
            //alert('Houve um erro de conexão com o banco de dados');
            Swal.fire({
                title: 'Houve um erro de conexão com o banco de dados.',
                icon: 'warning'
            });
        }
    });
}

function tarefas7Dias() {
    $.ajax({
        url: servidor + 'dashboard/tarefasprox7dias.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            let lista = document.getElementById("listaTarefas7Dias");
            lista.innerHTML = `<div class="accordion">`;
            if (dados != null) {
                dados.forEach(function (item) {
                    lista.innerHTML += (`<div class="accordion__pane border border-gray-200 p-3">
                    <a href="javascript:;" class="accordion__pane__toggle font-medium block">${item.titulo}</a>
                    <div class="accordion__pane__content mt-3 text-gray-700 leading-relaxed" style="display: none">
                    <p><strong>Data Início:</strong> ${moment(item.datahorainicio).format("DD/MM/YYYY - HH:mm")}</p>
                    <p><strong>Data Fim:</strong> ${moment(item.datahorafim).format("DD/MM/YYYY - HH:mm")}</p>
                    <p><strong>Descrição:</strong> ${item.descricao}</p>
                    </div>
                    </div>`);
                });
            }
            else {
                lista.innerHTML += ``;
            }
            lista.innerHTML += `</div>`
        },
        // Se der erro no envio dos dados para o servidor...
        error: function (erro) {
            //console.log(erro);
            // Exibe mensagem de erro
            //alert('Houve um erro de conexão com o banco de dados');
            Swal.fire({
                title: 'Houve um erro de conexão com o banco de dados.',
                icon: 'warning'
            });
        }
    });
}

function eventos() {
    $.ajax({
        url: servidor + 'dashboard/eventosprox30dias.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            // console.log(dados);
            let lista = document.getElementById("listaEventos");
            lista.innerHTML = `<div class="accordion">`;
            if (dados != null) {
                dados.forEach(function (item) {
                    lista.innerHTML += (`<div class="accordion__pane border border-gray-200 p-3">
                    <a href="javascript:;" class="accordion__pane__toggle font-medium block">${item.titulo}</a>
                    <div class="accordion__pane__content mt-3 text-gray-700 leading-relaxed" style="display: none">
                    <p><strong>Data Início:</strong> ${moment(item.datahorainicio).format("DD/MM/YYYY - HH:mm")}</p>
                    <p><strong>Data Fim:</strong> ${moment(item.datahorafim).format("DD/MM/YYYY - HH:mm")}</p>
                    <p><strong>Descrição:</strong> ${item.descricao}</p>
                    </div>
                    </div>`);
                });
            }
            else {
                lista.innerHTML += ``;
            }
            lista.innerHTML += `</div>`
        },
        // Se der erro no envio dos dados para o servidor...
        error: function (erro) {
            //console.log(erro);
            // Exibe mensagem de erro
            //alert('Houve um erro de conexão com o banco de dados');
            Swal.fire({
                title: 'Houve um erro de conexão com o banco de dados.',
                icon: 'warning'
            });
        }
    });
}

// Função que pergunta como o usuário deseja sair do aplicativo
function sair() {
    //if (confirm("Deseja sair?") == 1) { 
    Swal.fire({
        title: 'Sair do sistema?',
        text: "Deseja sair do sistema?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.value) {
            // Remove os dados do usuário armazenados na seção
            sessionStorage.clear();
            // Redireciona para a página de login
            location.href = "../login/";
        }
    });
}