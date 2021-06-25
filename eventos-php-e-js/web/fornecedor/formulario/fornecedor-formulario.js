var id = -1;
// Get the input field
var txtObservacao = document.getElementById("txtObservacao");
// Execute a function when the user releases a key on the keyboard
txtObservacao.addEventListener("keyup", pressionarEnter);

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
        var rbPessoaFisica = document.getElementById(`rbPessoaFisica`);
        var rbPessoaJuridica = document.getElementById(`rbPessoaJuridica`);

        btnCancelar.addEventListener(`click`, mostraLista);
        btnSair.addEventListener(`click`, sair);
        rbPessoaFisica.addEventListener(`change`, defineTipoPessoa);
        rbPessoaJuridica.addEventListener(`change`, defineTipoPessoa);

        //alert(sessionStorage.getItem("id")) ;
        // Verifica se tem usuário armazenado na sessão para 
        // atualizar um registro existente ou inserir um novo registro
        if (sessionStorage.getItem("id") != null) {
            id = Number(sessionStorage.getItem("id"));
            titulo.innerHTML = `Alterar dados do fornecedor`;
            // Chama a função que retorna os dados que deverá ser alterado            
            consultaPorId();
            btnSalvar.addEventListener(`click`, alterar);
        } else {
            limparCampos();
            btnSalvar.addEventListener(`click`, cadastrar);
        }
    }
};

function defineTipoPessoa() {
    var rbPessoaFisica = document.getElementById(`rbPessoaFisica`);
    if (rbPessoaFisica.checked == true) { 
        document.getElementById(`lblNome`).innerHTML = `Nome: *`;
        document.getElementById(`txtNomeFantasia`).placeholder = `Digite o nome`;
        //document.getElementById(`txtRazaoSocial`).placeholder = ``;
        //document.getElementById(`txtRazaoSocial`).value = ``;
        //document.getElementById(`txtRazaoSocial`).disabled = true;
        document.getElementById(`lblRazaoSocial`).innerHTML = `RG:`;
        document.getElementById(`txtRazaoSocial`).placeholder = `Digite o RG`;
        document.getElementById(`lblCnpj`).innerHTML = `CPF:`;
        document.getElementById(`txtCnpj`).placeholder = `Digite o CPF`;
        document.getElementById(`lblData`).innerHTML = `Data de Nascimento:`;
    } else {
        document.getElementById(`lblNome`).innerHTML = `Nome Fantasia: *`;
        document.getElementById(`txtNomeFantasia`).placeholder = `Digite o nome fantasia`;
        document.getElementById(`lblRazaoSocial`).innerHTML = `Razão Social:`;
        document.getElementById(`txtRazaoSocial`).placeholder = `Digite a razão social`;
        //document.getElementById(`txtRazaoSocial`).disabled = false;
        document.getElementById(`lblCnpj`).innerHTML = `CNPJ:`;
        document.getElementById(`txtCnpj`).placeholder = `Digite o CNPJ`;
        document.getElementById(`lblData`).innerHTML = `Data de Fundação:`;
    }
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
        url: servidor + 'fornecedor/consultarporid.php',
        dataType: 'json',
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            id: id
        },
        success: function (dados) {
            //console.log(dados);
            document.querySelector(`#rbPessoaFisica`).checked = (dados["tipo"] == `PF`);
            document.querySelector(`#rbPessoaJuridica`).checked = (dados["tipo"] == `PJ`);
            var rbPessoaFisica = document.querySelector(`#rbPessoaFisica`);
            document.querySelector(`#lblNome`).innerHTML = (rbPessoaFisica.checked == true ? `Nome: *` : `Nome Fantasia: *`);
            document.querySelector(`#lblRazaoSocial`).innerHTML = (rbPessoaFisica.checked == true ? `RG` : `Razão Social`);
            //document.getElementById(`txtRazaoSocial`).placeholder = ``;
            //document.getElementById(`txtRazaoSocial`).disabled = (dados["tipo"] == `PF`);
           
            document.querySelector(`#lblCnpj`).innerHTML = (rbPessoaFisica.checked == true ? `CPF` : `CNPJ:`);
            document.querySelector(`#lblData`).innerHTML = (rbPessoaFisica.checked == true ? `Data de Nascimento:` : `Data de Fundação:`);
            
            document.querySelector(`#txtNomeFantasia`).value = dados["nomefantasia"];
            document.querySelector(`#txtRazaoSocial`).value = dados["razaosocial"];
            document.querySelector(`#txtCnpj`).value = dados["cnpj"];
            document.querySelector(`#txtFixo`).value = dados["fixo"];
            document.querySelector(`#txtCelular1`).value = dados["celular1"];
            document.querySelector(`#txtCelular2`).value = dados["celular2"];
            document.querySelector(`#txtEmail`).value = dados["email"];
            document.querySelector(`#txtEndereco`).value = dados["endereco"];
            document.querySelector(`#txtDataFundacao`).value = dados["datafundacao"];
            document.querySelector(`#txtObservacao`).value = dados["observacao"];
            document.querySelector(`#txtNomeFantasia`).focus();
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
    var txtCnpj = document.getElementById(`txtCnpj`);
    var txtNomeFantasia = document.getElementById(`txtNomeFantasia`);
    var txtRazaoSocial = document.getElementById(`txtRazaoSocial`);
    var txtFixo = document.getElementById(`txtFixo`);
    var txtCelular1 = document.getElementById(`txtCelular1`);
    var txtCelular2 = document.getElementById(`txtCelular2`);
    var txtEmail = document.getElementById(`txtEmail`);
    var txtEndereco = document.getElementById(`txtEndereco`);
    var txtDataFundacao = document.getElementById(`txtDataFundacao`);
    var txtObservacao = document.getElementById(`txtObservacao`);
    var tipo = (document.querySelector(`#rbPessoaFisica`).checked ? `PF` : `PJ`);

    // Verifica se todos os campos foram preenchidos
    if (txtNomeFantasia.value == "") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha todos os campos obrigatórios!',
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'fornecedor/inserir.php',
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                cnpj: txtCnpj.value,
                nomefantasia: txtNomeFantasia.value,
                razaosocial: txtRazaoSocial.value,
                fixo: txtFixo.value,
                celular1: txtCelular1.value,
                celular2: txtCelular2.value,
                email: txtEmail.value,
                endereco: txtEndereco.value,
                datafundacao: txtDataFundacao.value,
                tipo: tipo,
                observacao: txtObservacao.value
            },
            // Se os dados for enviados corretamente para o servidor...
            success: function (resposta) {
                //console.log(resposta);
                //alert(' cadastrado com sucesso!');
                Swal.fire({
                    title: 'Fornecedor cadastrado com sucesso!',
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
                        txtCnpj.value = "";
                        txtNomeFantasia.value = "";
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
    var txtCnpj = document.getElementById(`txtCnpj`);
    var txtNomeFantasia = document.getElementById(`txtNomeFantasia`);
    var txtRazaoSocial = document.getElementById(`txtRazaoSocial`);
    var txtFixo = document.getElementById(`txtFixo`);
    var txtCelular1 = document.getElementById(`txtCelular1`);
    var txtCelular2 = document.getElementById(`txtCelular2`);
    var txtEmail = document.getElementById(`txtEmail`);
    var txtEndereco = document.getElementById(`txtEndereco`);
    var txtDataFundacao = document.getElementById(`txtDataFundacao`);
    var txtObservacao = document.getElementById(`txtObservacao`);
    var tipo = (document.querySelector(`#rbPessoaFisica`).checked ? `PF` : `PJ`);
    // Verifica se todos os campos foram preenchidos
    if (txtNomeFantasia.value == "") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha todos os campos obrigatórios!',
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'fornecedor/alterar.php',
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                cnpj: txtCnpj.value,
                nomefantasia: txtNomeFantasia.value,
                razaosocial: txtRazaoSocial.value,
                fixo: txtFixo.value,
                celular1: txtCelular1.value,
                celular2: txtCelular2.value,
                email: txtEmail.value,
                endereco: txtEndereco.value,
                datafundacao: txtDataFundacao.value,
                tipo: tipo,
                situacao: 'Ed',
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
                        txtCnpj.value = "";
                        txtNomeFantasia.value = "";
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
    document.querySelector(`#rbPessoaFisica`).checked = false;
    document.querySelector(`#rbPessoaJuridica`).checked = true;
    document.querySelector(`#txtNomeFantasia`).value = "";
    document.querySelector(`#txtRazaoSocial`).value = "";
    document.querySelector(`#txtCnpj`).value = "";
    document.querySelector(`#txtFixo`).value = "";
    document.querySelector(`#txtCelular1`).value = "";
    document.querySelector(`#txtCelular2`).value = "";
    document.querySelector(`#txtEmail`).value = "";
    document.querySelector(`#txtEndereco`).value = "";
    document.querySelector(`#txtDataFundacao`).value = "";
    document.querySelector(`#txtObservacao`).value = "";
    document.querySelector(`#txtNomeFantasia`).focus();
}