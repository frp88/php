var id = -1;
window.onload = function () {
    // Verifica se o usuário logado está logado
    if (sessionStorage.getItem("idLogado") == null) {
        // Redireciona para a tela de login
        location.href = "../../login/";
    }
    else {
        var btnCancelar = document.getElementById(`btnCancelar`);
        var titulo = document.getElementById(`titulo`);
        var btnSalvar = document.getElementById(`btnSalvar`);
        var btnSair = document.getElementById(`btnSair`);
        //var txtValor = document.getElementById(`txtValor`);
        //var txtObservacao = document.getElementById("txtObservacao");
        var txtDiaParcela = document.getElementById("txtDiaParcela");

        btnCancelar.addEventListener(`click`, mostraLista);
        btnSair.addEventListener(`click`, sair);
        // Execute a function when the user releases a key on the keyboard
        txtDiaParcela.addEventListener("keyup", pressionarEnter);
        
        //alert(sessionStorage.getItem("id")) ;
        // Verifica se tem usuário armazenado na sessão para 
        // atualizar um registro existente ou inserir um novo registro
        if (sessionStorage.getItem("id") != null) {
            id = Number(sessionStorage.getItem("id"));
            titulo.innerHTML = `Alterar dados do evento`;
            // Chama a função que retorna os dados que deverá ser alterado
            consultaPorId();

            btnSalvar.addEventListener(`click`, alterar);
        } else {
            limparCampos()
            // Chama função que preenche os eventos na TAG select
            preencheSelectTiposEventos();
            preencheSelectClientes();
            btnSalvar.addEventListener(`click`, cadastrar);
        }
    }
};

// Função que busca os tipos de eventos do servidor
function preencheSelectTiposEventos(id = null) {
    $.ajax({
        url: servidor + 'tipoevento/consultaridedescricao.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            let selTipoEvento = document.getElementById("selTipoEvento");
            if (dados != null) {
                for (let item in dados) {
                    var option = document.createElement("option");
                    option.value = dados[item].idtipoevento;
                    option.text = dados[item].descricao;
                    if (id != null && dados[item].idtipoevento == id) {
                        option.selected = true;
                    }
                    selTipoEvento.add(option);
                }
            }
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

// Função que busca os clientes do servidor
function preencheSelectClientes(id = null) {
    $.ajax({
        url: servidor + 'cliente/consultaridenome.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            let selCliente = document.getElementById("selCliente");
            if (dados != null) {
                for (let item in dados) {
                    var option = document.createElement("option");
                    option.value = dados[item].idcliente;
                    option.text = dados[item].nome;
                    if (id != null && dados[item].idcliente == id) {
                        option.selected = true;
                    }
                    selCliente.add(option);
                }
            }
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

function pressionarEnter(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        if (sessionStorage.getItem("id") != null) {
            alterar();
        } else {
            cadastrar();
        }
    }
}

// Função que busca os dados pelo ID
function consultaPorId() {
    $.ajax({
        url: servidor + 'evento/consultarporid.php',
        dataType: 'json',
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            id: id
        },
        success: function (dados) {
            //console.log(dados);            
            preencheSelectClientes(dados["cliente"]);
            preencheSelectTiposEventos(dados["tipoevento"]);
            document.querySelector(`#txtTitulo`).value = dados["titulo"];
            document.querySelector(`#txtDescricao`).value = dados["descricao"];
            document.querySelector(`#txtDataInicio`).value = dados["datahorainicio"].substring(0, 10);
            document.querySelector(`#txtHoraInicio`).value = dados["datahorainicio"].substring(11, 16);
            document.querySelector(`#txtDataFim`).value = dados["datahorafim"].substring(0, 10);
            document.querySelector(`#txtHoraFim`).value = dados["datahorafim"].substring(11, 16);
            document.querySelector(`#txtLocalCerimonia`).value = dados["localcerimonia"];
            document.querySelector(`#txtLocalRecepcao`).value = dados["localrecepcao"];
            document.querySelector(`#txtQtdConvidados`).value = dados["qtdconvidados"];
            document.querySelector(`#txtHorariosDisponiveis`).value = dados["horariosdisponiveis"];
            document.querySelector(`#txtAlergias`).value = dados["alergias"];
            document.querySelector(`#txtObservacao`).value = dados["observacao"];
            document.querySelector(`#txtQtdConvidados`).value = dados["qtdconvidados"];
            document.querySelector(`#selSituacao`).value = dados["situacao"];
            document.querySelector(`#selFormaPgto`).value = dados["formapgto"];
            document.querySelector(`#txtValor`).value = moeda(dados["valor"]);
            //document.querySelector(`#txtValor`).value = (dados["valor"] != null ? dados["valor"].replace(".", ",") : '');
            document.querySelector(`#txtQtdParcelas`).value = dados["qtdparcelas"];
            document.querySelector(`#txtDiaParcela`).value = dados["diaparcela"];
            document.querySelector(`#txtTitulo`).focus();

        },
        // Se der erro no envio dos dados para o servidor...
        error: function (erro) {
            //console.log(erro);
            //alert('Houve um erro de conexão com o banco de dados');
            Swal.fire({
                title: 'Houve um erro de conexão com o banco de dados.',
                icon: 'warning'
            });
        }
    });
}

// Função que envia dos dados para o servidor  
function cadastrar() {
    var txtTitulo = document.getElementById(`txtTitulo`);
    var txtDescricao = document.getElementById(`txtDescricao`);
    var selTipoEvento = document.getElementById(`selTipoEvento`);
    var selCliente = document.getElementById(`selCliente`);
    var txtDataInicio = document.getElementById(`txtDataInicio`);
    var txtHoraInicio = document.getElementById(`txtHoraInicio`);
    var dataHoraInicio = `${txtDataInicio.value} ${txtHoraInicio.value}`;
    var txtDataFim = document.getElementById(`txtDataFim`);
    var txtHoraFim = document.getElementById(`txtHoraFim`);
    var dataHoraFim = `${txtDataFim.value} ${txtHoraFim.value}`;
    var txtLocalCerimonia = document.getElementById(`txtLocalCerimonia`);
    var txtLocalRecepcao = document.getElementById(`txtLocalRecepcao`);
    var txtQtdConvidados = document.getElementById(`txtQtdConvidados`);
    var txtHorariosDisponiveis = document.getElementById(`txtHorariosDisponiveis`);
    var txtAlergias = document.getElementById(`txtAlergias`);
    var txtObservacao = document.getElementById(`txtObservacao`);
    var selSituacao = document.getElementById(`selSituacao`);
    var selFormaPgto = document.getElementById(`selFormaPgto`);
    var txtValor = document.getElementById(`txtValor`);
    var txtQtdParcelas = document.getElementById(`txtQtdParcelas`);
    var txtDiaParcela = document.getElementById(`txtDiaParcela`);

    // Verifica se todos os campos foram preenchidos
    if (txtTitulo.value == "" || selTipoEvento.value == "NN" || selCliente.value == "NN") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha ou selecione todos os campos obrigatórios!',
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'evento/inserir.php',
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                titulo: txtTitulo.value,
                descricao: txtDescricao.value,
                tipoevento: selTipoEvento.value,
                cliente: selCliente.value,
                datahorainicio: dataHoraInicio,
                datahorafim: dataHoraFim,
                localcerimonia: txtLocalCerimonia.value,
                localrecepcao: txtLocalRecepcao.value,
                qtdconvidados: (txtQtdConvidados.value == '' ? '0' : txtQtdConvidados.value.replace(",", ".")),
                horariosdisponiveis: txtHorariosDisponiveis.value,
                alergias: txtAlergias.value,
                observacao: txtObservacao.value,
                situacao: selSituacao.value,
                formapgto: selFormaPgto.value,
                valor: (txtValor.value == '' ? '0' : txtValor.value.replace(".", "").replace(",", ".")),
                qtdparcelas: (txtQtdParcelas.value == '' ? '1' : txtQtdParcelas.value.replace(",", ".")),
                diaparcela: (txtDiaParcela.value == '' ? '0' : txtDiaParcela.value.replace(",", "."))
            },
            // Se os dados for enviados corretamente para o servidor...
            success: function (resposta) {
                //console.log(resposta);
                //alert(' cadastrado com sucesso!');
                Swal.fire({
                    title: 'Evento cadastrado com sucesso!',
                    text: "Clique no botão para voltar.",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok',
                    cancelButtonText: 'Não',
                    showCancelButton: false
                }).then((result) => {
                    if (result.value) {
                        location.href = "../";
                    }
                });
            },
            // Se der erro no envio dos dados para o servidor...
            error: function (erro) {
                //console.log(erro);
                //alert('Houve um erro no cadastro.');
                Swal.fire({
                    title: 'Houve um erro no cadastro.',
                    icon: 'warning'
                });
            }
        });
    }
}

// Função que envia dos dados para o servidor  
// Alterar os dados já cadastrado
function alterar() {
    var txtTitulo = document.getElementById(`txtTitulo`);
    var txtDescricao = document.getElementById(`txtDescricao`);
    var selTipoEvento = document.getElementById(`selTipoEvento`);
    var selCliente = document.getElementById(`selCliente`);
    var txtDataInicio = document.getElementById(`txtDataInicio`);
    var txtHoraInicio = document.getElementById(`txtHoraInicio`);
    var dataHoraInicio = `${txtDataInicio.value} ${txtHoraInicio.value}`;
    var txtDataFim = document.getElementById(`txtDataFim`);
    var txtHoraFim = document.getElementById(`txtHoraFim`);
    var dataHoraFim = `${txtDataFim.value} ${txtHoraFim.value}`;
    var txtLocalCerimonia = document.getElementById(`txtLocalCerimonia`);
    var txtLocalRecepcao = document.getElementById(`txtLocalRecepcao`);
    var txtQtdConvidados = document.getElementById(`txtQtdConvidados`);
    var txtHorariosDisponiveis = document.getElementById(`txtHorariosDisponiveis`);
    var txtAlergias = document.getElementById(`txtAlergias`);
    var txtObservacao = document.getElementById(`txtObservacao`);
    var selSituacao = document.getElementById(`selSituacao`);
    var selFormaPgto = document.getElementById(`selFormaPgto`);
    var txtValor = document.getElementById(`txtValor`);
    var txtQtdParcelas = document.getElementById(`txtQtdParcelas`);
    var txtDiaParcela = document.getElementById(`txtDiaParcela`);
    // Verifica se todos os campos foram preenchidos
    if (txtTitulo.value == "" || selTipoEvento.value == "NN" || selCliente.value == "NN") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha ou selecione todos os campos obrigatórios!',
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'evento/alterar.php',
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                titulo: txtTitulo.value,
                descricao: txtDescricao.value,
                tipoevento: selTipoEvento.value,
                cliente: selCliente.value,
                datahorainicio: dataHoraInicio,
                datahorafim: dataHoraFim,
                localcerimonia: txtLocalCerimonia.value,
                localrecepcao: txtLocalRecepcao.value,
                qtdconvidados: (txtQtdConvidados.value == '' ? '0' : txtQtdConvidados.value.replace(",", ".")),
                horariosdisponiveis: txtHorariosDisponiveis.value,
                alergias: txtAlergias.value,
                observacao: txtObservacao.value,
                situacao: selSituacao.value,
                formapgto: selFormaPgto.value,
                valor: (txtValor.value == '' ? '0' : txtValor.value.replace(".", "").replace(",", ".")),
                qtdparcelas: (txtQtdParcelas.value == '' ? '1' : txtQtdParcelas.value.replace(",", ".")),
                diaparcela: (txtDiaParcela.value == '' ? '0' : txtDiaParcela.value.replace(",", ".")),
                id: id
            },
            // Se os dados for enviados corretamente para o servidor...
            success: function (resposta) {
                //console.log(resposta);
                //alert('Dados alterados com sucesso!');
                Swal.fire({
                    title: 'Dados alterados com sucesso!',
                    text: "Clique no botão para voltar.",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok',
                    cancelButtonText: 'Não',
                    showCancelButton: false
                }).then((result) => {
                    if (result.value) {
                        location.href = "../";
                    }
                });
            },
            // Se der erro no envio dos dados para o servidor...
            error: function (erro) {
                //console.log(erro);
                //alert('Houve um erro na atualização dos dados.');
                Swal.fire({
                    title: 'Houve um erro na atualização dos dados.',
                    icon: 'warning'
                });
            }
        });
    }
}

// Função que volta para a lista 
function mostraLista() {
    location.href = "../";
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
            location.href = "../../login/";
        }
    });
}

function limparCampos() {
    var d = new Date();
    var dia = d.getDate();  // 1-31
    var mes = d.getMonth(); // 0-11 (zero=janeiro)
    var ano = d.getFullYear(); // 4 dígitos
    // Formata a data e a hora (note o mês + 1)
    //var dataAtual = dia + '/' + (mes + 1) + '/' + ano;
    var dataAtual = ano + '-' + (mes + 1) + '-' + dia;
    document.querySelector(`#txtTitulo`).value = "";
    document.querySelector(`#txtDescricao`).value = "";
    document.querySelector(`#selTipoEvento`).selectedIndex = 0;
    document.querySelector(`#selCliente`).selectedIndex = 0;
    document.querySelector(`#txtDataInicio`).value = dataAtual;
    document.querySelector(`#txtDataFim`).value = dataAtual;
    document.getElementById("txtHoraInicio").value = "08:00";
    document.getElementById("txtHoraFim").value = "18:00";
    document.querySelector(`#txtLocalCerimonia`).value = "";
    document.querySelector(`#txtLocalRecepcao`).value = "";
    document.querySelector(`#txtQtdConvidados`).value = "";
    document.querySelector(`#txtHorariosDisponiveis`).value = "";
    document.querySelector(`#txtAlergias`).value = "";
    document.querySelector(`#txtObservacao`).value = "";
    //document.querySelector(`#selSituacao`).value = "1";
    //document.querySelector(`#selFormaPgto`).value = "4";
    document.querySelector(`#txtValor`).value = "";
    document.querySelector(`#txtQtdParcelas`).value = "";
    document.querySelector(`#txtDiaParcela`).value = "";
    document.querySelector(`#txtTitulo`).focus();
}