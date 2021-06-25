var id = -1;
window.onload = function () {
    // Verifica se o usuário logado está logado
    if (sessionStorage.getItem("idLogado") == null) {
        // Redireciona para a tela de login
        location.href = "../../login/index.html";
    }
    else {
        var btnCancelar = document.getElementById(`btnCancelar`);
        var divLogin = document.getElementById(`divLogin`);
        var divSenha = document.getElementById(`divSenha`);
        var titulo = document.getElementById(`titulo`);
        var btnSalvar = document.getElementById(`btnSalvar`);
        var btnSair = document.getElementById(`btnSair`);

        btnCancelar.addEventListener(`click`, mostraListaUsuarios);
        btnSair.addEventListener(`click`, sair);

        //alert(sessionStorage.getItem("idUser")) ;
        // Verifica se tem usuário armazenado na sessão para 
        // atualizar um registro existente ou inserir um novo registro
        if (sessionStorage.getItem("idUser") != null) {
            id = Number(sessionStorage.getItem("idUser"));
            titulo.innerHTML = `Alterar dados do Usuário`;
            divLogin.hidden = true;
            divSenha.hidden = true;
            // Chama a função que retorna os dados do usuário que deverá ser alterado
            consultaUsuarioPorId();
            btnSalvar.addEventListener(`click`, alteraUsuario);
        } else {
            limparCampos();
            btnSalvar.addEventListener(`click`, cadastraUsuario);
        }
    }
};

// Get the input field
var txtEmail = document.getElementById("txtEmail");
// Execute a function when the user releases a key on the keyboard
txtEmail.addEventListener("keyup", pressionarEnter);

function pressionarEnter(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        if (sessionStorage.getItem("idUser") != null) {
            alteraUsuario();
        } else {
            cadastraUsuario();
        }
    }
}

// Função que busca os dados do usuário pelo ID
function consultaUsuarioPorId() {
    $.ajax({
        url: servidor + 'usuario/consultarporid.php',
        dataType: 'json',
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            id: id
        },
        success: function (dados) {
            //console.log(dados);
            document.querySelector(`#txtNome`).value = dados["nome"];
            document.querySelector(`#txtEmail`).value = dados["email"];
            document.querySelector(`#txtNome`).focus();
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
// cadastrar um novo usuário
function cadastraUsuario() {
    var txtNome = document.getElementById(`txtNome`);
    var txtLogin = document.getElementById(`txtLogin`);
    var txtSenha = document.getElementById(`txtSenha`);
    var txtEmail = document.getElementById(`txtEmail`);

    // Verifica se todos os campos foram preenchidos
    if (txtNome.value == "" || txtLogin.value == "" ||
        txtSenha.value == "") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha todos os campos obrigatórios!',
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'usuario/inserir.php',
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                nome: txtNome.value,
                login: txtLogin.value,
                email: txtEmail.value,
                senha: txtSenha.value
            },
            // Se os dados for enviados corretamente para o servidor...
            success: function (resposta) {
                //console.log(resposta);
                //alert('Usuário cadastrado com sucesso!');
                Swal.fire({
                    title: 'Usuário cadastrado com sucesso!',
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
                        txtNome.value = "";
                        txtLogin.value = "";
                        txtSenha.value = "";
                        txtEmail.value = "";
                        location.href = "../index.html";
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
// Alterar os dados de um usuário já cadastrado
function alteraUsuario() {
    var txtNome = document.getElementById(`txtNome`);
    var txtEmail = document.getElementById(`txtEmail`);
    // Verifica se todos os campos foram preenchidos
    if (txtNome.value == "" || txtEmail.value == "") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha todos os campos obrigatórios!',
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'usuario/alterar.php',
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                nome: txtNome.value,
                email: txtEmail.value,
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
                        txtNome.value = "";
                        txtEmail.value = "";
                        location.href = "../index.html";
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

// Função que volta para a lista de usuários
function mostraListaUsuarios() {
    location.href = "../index.html";
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
            location.href = "../../login/index.html";
        }
    });
}

function limparCampos() {
    document.querySelector(`#txtNome`).value = "";
    document.querySelector(`#txtLogin`).value = "";
    document.querySelector(`#txtSenha`).value = "";
    document.querySelector(`#txtEmail`).value = "";
    document.querySelector(`#txtNome`).focus();
}