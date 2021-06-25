var id = -1;
window.onload = function () {
    // Verifica se o usuário logado está logado
    if (sessionStorage.getItem("idLogado") == null) {
        // Redireciona para a tela de login
        location.href = "../../../login/";
    }
    else {
        var btnCancelar = document.getElementById(`btnCancelar`);
        var titulo = document.getElementById(`titulo`);
        var btnSalvar = document.getElementById(`btnSalvar`);
        var btnSair = document.getElementById(`btnSair`);
        var txtObservacao = document.getElementById("txtObservacao");

        btnCancelar.addEventListener(`click`, mostraLista);
        btnSair.addEventListener(`click`, sair);
        // Execute a function when the user releases a key on the keyboard
        txtObservacao.addEventListener("keyup", pressionarEnter);

        //alert(sessionStorage.getItem("id")) ;
        // Verifica se tem usuário armazenado na sessão para 
        // atualizar um registro existente ou inserir um novo registro
        if (sessionStorage.getItem("id") != null) {
            id = Number(sessionStorage.getItem("id"));
            titulo.innerHTML = `Alterar dados do serviço`;
            // Chama a função que retorna os dados que deverá ser alterado
            consultaPorId();
            btnSalvar.addEventListener(`click`, alterar);
        } else {
            limparCampos();
            // Chama função que preenche os eventos na TAG select
            preencheSelectTiposServicos();
            preencheSelectFornecedores();
            btnSalvar.addEventListener(`click`, cadastrar);
        }
    }
};

// Função que busca os tipos de serviços do servidor
function preencheSelectTiposServicos(id = null) {
    $.ajax({
        url: servidor + 'tiposervico/consultaridedescricao.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            let selTipoServico = document.getElementById("selTipoServico");
            if (dados != null) {
                for (let item in dados) {
                    var option = document.createElement("option");
                    option.value = dados[item].idtiposervico;
                    option.text = dados[item].descricao;
                    if (id != null && dados[item].idtiposervico == id) {
                        option.selected = true;
                    }
                    selTipoServico.add(option);
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

// Função que busca os fornecedores do servidor
function preencheSelectFornecedores(id = null) {
    $.ajax({
        url: servidor + 'fornecedor/consultaridenomefantasia.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            let selFornecedor = document.getElementById("selFornecedor");
            if (dados != null) {
                for (let item in dados) {
                    var option = document.createElement("option");
                    option.value = dados[item].idfornecedor;
                    option.text = dados[item].nomefantasia;
                    if (id != null && dados[item].idfornecedor == id) {
                        option.selected = true;
                    }
                    selFornecedor.add(option);
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
        url: servidor + 'servicoevento/consultarporid.php',
        dataType: 'json',
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            id: id
        },
        success: function (dados) {
            //console.log(dados);
            //document.querySelector(`#selTipoServico`).value = dados["tiposervico"];
            preencheSelectTiposServicos(dados["tiposervico"]);
            //document.querySelector(`#selFornecedor`).value = dados["fornecedor"];
            preencheSelectFornecedores(dados["fornecedor"]);
            document.querySelector(`#txtDataPrevista`).value = dados["dataprevista"].substring(0, 10);
            document.querySelector(`#txtDataRealizada`).value = dados["datarealizada"].substring(0, 10);
            
            document.querySelector(`#txtValorTotal`).value = moeda(dados["valortotal"]);
            document.querySelector(`#txtValorPago`).value = moeda(dados["valorpago"]);
            // document.querySelector(`#txtValorTotal`).value = dados["valortotal"].replace(".", ",");
            // document.querySelector(`#txtValorPago`).value = dados["valorpago"].replace(".", ",");
            document.querySelector(`#selSituacao`).value = dados["situacao"];
            document.querySelector(`#txtObservacao`).value = dados["observacao"];
            //document.querySelector(`#selTipoServico`).focus();
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
    var selTipoServico = document.getElementById(`selTipoServico`);
    var selFornecedor = document.getElementById(`selFornecedor`);
    var txtDataPrevista = document.getElementById(`txtDataPrevista`);
    var txtDataRealizada = document.getElementById(`txtDataRealizada`);
    var txtValorTotal = document.getElementById(`txtValorTotal`);
    var txtValorPago = document.getElementById(`txtValorPago`);
    var selSituacao = document.getElementById(`selSituacao`);
    var txtObservacao = document.getElementById(`txtObservacao`);

    // Verifica se todos os campos obrigatórios foram preenchidos ou selecionados
    if (selTipoServico.value == "NN" || selFornecedor.value == "NN") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha ou selecione todos os campos obrigatórios!',
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'servicoevento/inserir.php',
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                evento: sessionStorage.getItem("idEvento"),
                tiposervico: selTipoServico.value,
                fornecedor: selFornecedor.value,
                dataprevista: txtDataPrevista.value,
                datarealizada: txtDataRealizada.value,
                valortotal: (txtValorTotal.value == '' ? '0' : txtValorTotal.value.replace(".", "").replace(",", ".")),
                valorpago: (txtValorPago.value == '' ? '0' : txtValorPago.value.replace(".", "").replace(",", ".")),
                situacao: selSituacao.value,
                observacao: txtObservacao.value
            },
            // Se os dados for enviados corretamente para o servidor...
            success: function (resposta) {
                //console.log(resposta);
                //alert(' cadastrado com sucesso!');
                Swal.fire({
                    title: 'Serviço cadastrado com sucesso!',
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
    var selTipoServico = document.getElementById(`selTipoServico`);
    var selFornecedor = document.getElementById(`selFornecedor`);
    var txtDataPrevista = document.getElementById(`txtDataPrevista`);
    var txtDataRealizada = document.getElementById(`txtDataRealizada`);
    var txtValorTotal = document.getElementById(`txtValorTotal`);
    var txtValorPago = document.getElementById(`txtValorPago`);
    var selSituacao = document.getElementById(`selSituacao`);
    var txtObservacao = document.getElementById(`txtObservacao`);
     // Verifica se todos os campos obrigatórios foram preenchidos ou selecionados
     if (selTipoServico.value == "NN" || selFornecedor.value == "NN") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha ou selecione todos os campos obrigatórios!',
            icon: 'warning'
        });
    } else {
    // Define a função 'ajax' para enviar os dados para o servidor
    $.ajax({
        url: servidor + 'servicoevento/alterar.php',
        dataType: 'json', // Tipo dos dados que serão enviados
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            evento: sessionStorage.getItem("idEvento"),
            tiposervico: selTipoServico.value,
            fornecedor: selFornecedor.value,
            dataprevista: txtDataPrevista.value,
            datarealizada: txtDataRealizada.value,
            valortotal: (txtValorTotal.value == '' ? '0' : txtValorTotal.value.replace(".", "").replace(",", ".")),
            valorpago: (txtValorPago.value == '' ? '0' : txtValorPago.value.replace(".", "").replace(",", ".")),
            situacao: selSituacao.value,
            observacao: txtObservacao.value,
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
            location.href = "../../../login/";
        }
    });
}

function limparCampos() {
    // Pega a data inicial do evento
    var d = new Date(sessionStorage.getItem("dataHoraInicio"));
    var dia = d.getDate(); // 1-31
    var mes = d.getMonth(); // 0-11 (zero=janeiro)
    var ano = d.getFullYear(); // 4 dígitos
    // Formata a data e a hora (note o mês + 1)
    //var dataAtual = dia + '/' + (mes + 1) + '/' + ano;
    var dataAtual = ano + '-' + (mes + 1) + '-' + dia;
    document.querySelector(`#txtDataPrevista`).value = dataAtual;
    document.querySelector(`#txtDataRealizada`).value = "";

    document.querySelector(`#selTipoServico`).selectedIndex = 0;
    document.querySelector(`#selFornecedor`).selectedIndex = 0;
    document.querySelector(`#txtValorTotal`).value = "";
    document.querySelector(`#txtValorPago`).value = "";
    //document.querySelector(`#selSituacao`).value = "1";
    document.querySelector(`#txtObservacao`).value = "";
    document.querySelector(`#selTipoServico`).focus();
}
