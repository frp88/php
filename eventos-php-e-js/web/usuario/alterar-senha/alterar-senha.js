window.onload = function () {
    // Verifica se o usuário logado está logado
    if (sessionStorage.getItem("idLogado") == null) {
        // Redireciona para a tela de login
        location.href = "../login/index.html";
    }
    else{
        var btnAlterarSenha = document.getElementById(`btnAlterarSenha`);
        var btnCancelar = document.getElementById(`btnCancelar`);
        btnAlterarSenha.addEventListener(`click`, verificaSenha);
        btnCancelar.addEventListener(`click`, mostraListaUsuarios);
    }
};

// Função que verifica se pode alterar a senha
function verificaSenha() {
    var txtSenhaAntiga = document.getElementById(`txtSenhaAntiga`);
    var txtNovaSenha = document.getElementById(`txtNovaSenha`);
    var txtRepitaSenha = document.getElementById(`txtRepitaSenha`);
    // Verifica se todos os campos foram preenchidos
    if (txtSenhaAntiga.value == "" || txtNovaSenha.value == "" ||
        txtRepitaSenha.value == "") {
        //alert('Preencha todos os campos!');
        Swal.fire({
            title: 'Preencha todos os campos!',            
            icon: 'warning'
        });
    } else if (txtNovaSenha.value != txtRepitaSenha.value) {
        //alert("'Nova Senha' e 'Repita Nova Senha' não estão iguais!");
        Swal.fire({
            title: 'As senhas não coincidem.',            
            icon: 'warning'
        });
          
    } else {
        // Captura os dados digitados pelo usuário
        $.ajax({
            // Servidor onde os dados serão enviadas
            url: servidor + 'usuario/consultarporidesenha.php', // Servidor Local
            dataType: 'json', // Tipo dos dados que serão enviados
            type: 'POST', // Como os dados serão enviados
            data: { // Dados que serão enviados
                id: sessionStorage.getItem("idLogado"),
                senha: txtSenhaAntiga.value
            },
            // Se os dados for enviados corretamente para o servidor...
            success: function (dados) {
                //console.log(dados);
                // Verifica se retornou um usuário com o e-mail e senha informados
                if (dados.resp == 1) { // E-mail e senha Ok
                    // CHAMA A FUNÇÃO QUE ALTERA A SENHA
                    alterarSenha();
                } else {
                    // Exibe mensagem usuário e/ou senha inválidos
                    //alert('Senha antiga inválida!');
                    Swal.fire({
                        title: 'Senha antiga inválida!',            
                        icon: 'warning'
                    });     
                }
            },
            // Se der erro no envio dos dados para o servidor...
            error: function (erro) {
                //console.log(erro);
                // Exibe mensagem de erro
                //alert('Houve um erro de conexão com o banco de dados.');
                Swal.fire({
                    title: 'Houve um erro de conexão com o banco de dados.',            
                    icon: 'warning'
                });                  
            }
        });
    }
}

// Função que altera a senha do usuário logado
function alterarSenha() {
    var txtSenhaAntiga = document.getElementById(`txtSenhaAntiga`);
    var txtNovaSenha = document.getElementById(`txtNovaSenha`);
    var txtRepitaSenha = document.getElementById(`txtRepitaSenha`);
    $.ajax({
        url: servidor + 'usuario/alterarsenha.php', // Servidor Local
        dataType: 'json', // Tipo dos dados que serão enviados
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            id: sessionStorage.getItem("idLogado"),
            novaSenha: txtNovaSenha.value
        },
        // Se os dados for enviados corretamente para o servidor...
        success: function (resposta) {
            //console.log(resposta);
            Swal.fire({
                title: 'Senha alterada com sucesso!',
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
                    txtSenhaAntiga.value = "";
                    txtNovaSenha.value = "";
                    txtRepitaSenha.value = "";
                    // Vai para a página de lista de usuários
                    location.href = "../index.html";
                }
            });
        },
        // Se der erro no envio dos dados para o servidor...
        error: function (erro) {
            //console.log(erro);
            //alert('Houve um erro na alteração da senha.');
            Swal.fire({
                title: 'Houve um erro na alteração da senha.',            
                icon: 'warning'
            });      
        }
    });
}

// Função que volta para a lista de usuários
function mostraListaUsuarios() {
    location.href = "../index.html";
}