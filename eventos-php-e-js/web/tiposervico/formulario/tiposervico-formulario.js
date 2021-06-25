var id = -1;
window.onload = function () {
    // Verifica se o usuário logado está logado
    if (sessionStorage.getItem("idLogado") == null) {
        // Redireciona para a tela de login
        location.href = "../../login/";
    }
    else{
        var btnCancelar = document.getElementById(`btnCancelar`);
        var titulo = document.getElementById(`titulo`);
        var btnSalvar = document.getElementById(`btnSalvar`);
        var btnSair = document.getElementById(`btnSair`);
        
        btnCancelar.addEventListener(`click`, mostraLista);
        btnSair.addEventListener(`click`, sair);
        
        //alert(sessionStorage.getItem("id")) ;
        // Verifica se tem usuário armazenado na sessão para 
        // atualizar um registro existente ou inserir um novo registro
        if (sessionStorage.getItem("id") != null) {
            id = Number(sessionStorage.getItem("id")); 
            titulo.innerHTML = `Alterar dados do tipo de serviço`;
            // Chama a função que retorna os dados do usuário que deverá ser alterado
            consultaPorId();
            btnSalvar.addEventListener(`click`, alterar);
        }else{
            limparCampos();
            btnSalvar.addEventListener(`click`, cadastrar);
        }   
    }  
};

// Get the input field
var txtObservacao = document.getElementById("txtObservacao");
// Execute a function when the user releases a key on the keyboard
txtObservacao.addEventListener("keyup", pressionarEnter);

function pressionarEnter(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        if (sessionStorage.getItem("id") != null) {
            alterar();
        }else{
            cadastrar();
        }     
    }
}

// Função que busca os dados do usuário pelo ID
function consultaPorId() {
    $.ajax({
        url: servidor + 'tiposervico/consultarporid.php',
        dataType: 'json', 
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            id: id
        }, 
        success: function (dados) {
            //console.log(dados);
            document.querySelector(`#txtDescricao`).value = dados["descricao"];
            document.querySelector(`#txtObservacao`).value = dados["observacao"];
            document.querySelector(`#txtDescricao`).focus();
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
// cadastrar um novo tipo de serviço
function cadastrar() {
    var txtDescricao = document.getElementById(`txtDescricao`);
    var txtObservacao = document.getElementById(`txtObservacao`);
    
    // Verifica se todos os campos foram preenchidos
    if (txtDescricao.value == "") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha todos os campos obrigatórios!',            
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'tiposervico/inserir.php', 
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                descricao: txtDescricao.value,
                observacao: txtObservacao.value
            },
            // Se os dados for enviados corretamente para o servidor...
            success: function (resposta) {
                //console.log(resposta);
                //alert('Usuário cadastrado com sucesso!');
                Swal.fire({
                    title: 'Tipo de serviço cadastrado com sucesso!',
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
                        txtDescricao.value = "";
                        txtObservacao.value = "";
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
// Alterar os dados de um tipo de serviço já cadastrado
function alterar() {
    var txtDescricao = document.getElementById(`txtDescricao`);
    var txtObservacao = document.getElementById(`txtObservacao`);
    // Verifica se todos os campos foram preenchidos
    if (txtDescricao.value == "") {
        //alert('Preencha todos os dados!');
        Swal.fire({
            title: 'Preencha todos os campos obrigatórios!',            
            icon: 'warning'
        });
    } else {
        // Define a função 'ajax' para enviar os dados para o servidor
        $.ajax({
            url: servidor + 'tiposervico/alterar.php',
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                descricao: txtDescricao.value,
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
                        txtDescricao.value = "";
                        txtObservacao.value = "";
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

// Função que volta para a lista de tipos de serviços
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

function limparCampos(){
    document.querySelector(`#txtDescricao`).value = "";
    document.querySelector(`#txtObservacao`).value = "";
    document.querySelector(`#txtDescricao`).focus();
}
