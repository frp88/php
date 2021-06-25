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
            titulo.innerHTML = `Alterar dados da tarefa`;
            // Chama a função que retorna os dados que deverá ser alterado
            consultaPorId();
            btnSalvar.addEventListener(`click`, alterar);
        } else {
            limparCampos();
            // Chama função que preenche os eventos na TAG select
            preencheSelectEventos();
            btnSalvar.addEventListener(`click`, cadastrar);
        }
    }
};

// Função que busca todos os usuários do servidor
function preencheSelectEventos(id = null) {
    $.ajax({
        //url: servidor + 'evento/consultaridetitulo.php',
        url: servidor + 'evento/consultareventosagendados.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            let selEvento = document.getElementById("selEvento");
            if (dados != null) {
                for (let item in dados) {
                    var option = document.createElement("option");
                    option.value = dados[item].idevento;
                    option.text = dados[item].titulo;
                    if (id != null && dados[item].idevento == id) {
                        option.selected = true;
                    }
                    selEvento.add(option);
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
        url: servidor + 'tarefa/consultarporid.php',
        dataType: 'json',
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            id: id
        },
        success: function (dados) {
            //console.log(dados);
            document.querySelector(`#txtTitulo`).value = dados["titulo"];
            document.querySelector(`#txtDescricao`).value = dados["descricao"];
            //document.querySelector(`#selEvento`).value = dados["evento"];
            preencheSelectEventos(dados["evento"]);
            document.querySelector(`#txtDataInicio`).value = dados["datahorainicio"].substring(0, 10);
            document.querySelector(`#txtHoraInicio`).value = dados["datahorainicio"].substring(11, 16);
            document.querySelector(`#txtDataFim`).value = dados["datahorafim"].substring(0, 10);
            document.querySelector(`#txtHoraFim`).value = dados["datahorafim"].substring(11, 16);
            document.querySelector(`#selSituacao`).value = dados["situacao"];
            document.querySelector(`#txtObservacao`).value = dados["observacao"];
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
    var selEvento = document.getElementById(`selEvento`);
    var txtDataInicio = document.getElementById(`txtDataInicio`);
    var txtHoraInicio = document.getElementById(`txtHoraInicio`);
    var dataHoraInicio = `${txtDataInicio.value} ${txtHoraInicio.value}`;
    var txtDataFim = document.getElementById(`txtDataFim`);
    var txtHoraFim = document.getElementById(`txtHoraFim`);
    var dataHoraFim = `${txtDataFim.value} ${txtHoraFim.value}`;
    var selSituacao = document.getElementById(`selSituacao`);
    var txtObservacao = document.getElementById(`txtObservacao`);

    // Verifica se todos os campos foram preenchidos
    if (txtTitulo.value == "" || selSituacao.value == "") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha todos os campos obrigatórios!',
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'tarefa/inserir.php',
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                titulo: txtTitulo.value,
                descricao: txtDescricao.value,
                evento: selEvento.value,
                datahorainicio: dataHoraInicio,
                datahorafim: dataHoraFim,
                situacao: selSituacao.value,
                observacao: txtObservacao.value
            },
            // Se os dados for enviados corretamente para o servidor...
            success: function (resposta) {
                //console.log(resposta);
                //alert(' cadastrado com sucesso!');
                Swal.fire({
                    title: 'Tarefa cadastrada com sucesso!',
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
    var selEvento = document.getElementById(`selEvento`);
    var txtDataInicio = document.getElementById(`txtDataInicio`);
    var txtHoraInicio = document.getElementById(`txtHoraInicio`);
    var dataHoraInicio = `${txtDataInicio.value} ${txtHoraInicio.value}`;
    var txtDataFim = document.getElementById(`txtDataFim`);
    var txtHoraFim = document.getElementById(`txtHoraFim`);
    var dataHoraFim = `${txtDataFim.value} ${txtHoraFim.value}`;
    var selSituacao = document.getElementById(`selSituacao`);
    var txtObservacao = document.getElementById(`txtObservacao`);
    // Verifica se todos os campos foram preenchidos
    if (txtTitulo.value == "" || selSituacao.value == "") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha todos os campos obrigatórios!',
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'tarefa/alterar.php',
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                titulo: txtTitulo.value,
                descricao: txtDescricao.value,
                evento: selEvento.value,
                datahorainicio: dataHoraInicio,
                datahorafim: dataHoraFim,
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
    document.querySelector(`#selEvento`).selectedIndex = 0;
    document.querySelector(`#txtDataInicio`).value = dataAtual;
    document.querySelector(`#txtDataFim`).value = dataAtual;
    document.getElementById("txtHoraInicio").value = "08:00";
    document.getElementById("txtHoraFim").value = "18:00";
    document.querySelector(`#selSituacao`).selectedIndex = 0;
    document.querySelector(`#txtObservacao`).value = "";
    document.querySelector(`#txtTitulo`).focus();
}
