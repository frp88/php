let id = -1;
window.onload = function () {
    // Verifica se o usuário logado está logado
    if (sessionStorage.getItem("idLogado") == null) {
        // Redireciona para a tela de login
        location.href = "../login/";
    }
    else {
        var btnNovo = document.getElementById(`btnNovo`);
        var btnSair = document.getElementById(`btnSair`);

        btnNovo.addEventListener(`click`, mostraFormulario);
        btnSair.addEventListener(`click`, sair);

        // Execura a função que busca todos os usuários no servidor
        listaFornecedores();
    }
};

// Função que busca todos os usuários do servidor
function listaFornecedores() {
    $.ajax({
        url: servidor + 'fornecedor/consultar.php',
        dataType: 'json',
        type: 'GET',
        success: function (dados) {
            //console.log(dados);
            preencheTabela(dados);
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

var table;
// Função que preenche a TAG <table> da página com os dados retornados do servidor
function preencheTabela(dados) {
    //console.log(dados);
    table = $('#tabela').DataTable({
        data: dados,
        dom: 'Blfrtip',
        columns: [
            { data: 'nomefantasia', title: "Nome" },
            { data: 'idfornecedor', visible: false },
            { data: 'fixo', title: "Telefone" },
            { data: 'celular1', title: "Celular" },
            { data: 'email', title: "E-mail" },
            {
                "data": null, title: "Ações", className: 'text-center',
                "defaultContent": '<div class="flex sm:justify-center items-center"><a class="flex items-center mr-3 btn-editar" href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg> Editar </a>'
                    + '<a class="flex items-center text-theme-6  btn-excluir" href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 w-4 h-4 mr-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> Excluir </a></div>',
                "targets": -1
            }
        ],
        buttons: [
            {
                extend: 'excel',
                text: 'Baixar planilha',
                titleAttr: 'Baixar arquivo de planilha',
                title: "Lista de Fornecedores",
                className: "button bg-theme-2 shadow-md mr-2 border text-gray-700",
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'pdf',
                text: 'Baixar PDF',
                titleAttr: 'Baixar arquivo PDF',
                title: "Lista de Fornecedores",
                className: "button bg-theme-2 shadow-md mr-2 border text-gray-700",
                exportOptions: {
                    columns: ':visible'
                }
            },
        ],
        responsive: true,
        language: {
            emptyTable: 'Nenhum registro encontrado',
            info: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
            infoEmpty: 'Mostrando 0 até 0 de 0 registros',
            infoFiltered: '(Filtrados de _MAX_ registros)',
            infoPostFix: '',
            thousands: ',',
            lengthMenu: '_MENU_ resultados por página',
            loadingRecords: 'Carregando...',
            processing: 'Processando...',
            search: 'Pesquisar:',
            zeroRecords: 'Nenhum registro encontrado',
            paginate: {
                first: 'Primeiro',
                last: 'Último',
                next: 'Próximo',
                previous: 'Anterior'
            },
            aria: {
                sortAscending: ': Ordenar colunas de forma ascendente',
                sortDescending: ': Ordenar colunas de forma descendente'
            },
            buttons: {
                copyTitle: 'Copiar para área de transferência',
                // copyKeys: 'Appuyez sur <i>ctrl</i> ou <i>\u2318</i> + <i>C</i> pour copier les données du tableau à votre presse-papiers.
                // <br><br>Pour annuler, cliquez sur ce message ou appuyez sur Echap.',
                copySuccess: {
                    _: '%d linhas copiadas',
                    1: '1 linha copiada'
                }
            },
            select: {
                rows: {
                    _: ' - Total de %d linhas selecionadas',
                    0: ' - Clique em uma linha para selecionar',
                    1: ' - Somente 1 linha selecionada'
                }
            }
        },
    });

    $('#tabela').on('click', '.btn-editar', function (e) {
        var data = table.row($(this).parents('tr')).data();
        mostraFormulario(data.idfornecedor);
    });
    $('#tabela').on('click', '.btn-excluir', function (e) {
        var data = table.row($(this).parents('tr')).data();
        excluir(data.idfornecedor);
    });
}

function excluir(id) {
    Swal.fire({
        title: 'Excluir fornecedor?',
        text: "Deseja realmente excluir este fornecedor?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.value) {
            // Chama a função que exclui o usuário no BD
            excluirFornecedor(id);
        }
    });
}

// Função que altera a senha do usuário logado
function excluirFornecedor(id) {
    $.ajax({
        url: servidor + 'fornecedor/excluir.php',
        dataType: 'json', // Tipo dos dados que serão enviados
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            id: id
        },
        // Se os dados for enviados corretamente para o servidor...
        success: function (resposta) {
            //console.log(resposta);
            table.destroy();
            // Chama a Função que atualiza a lista
            listaFornecedores();
        },
        // Se der erro no envio dos dados para o servidor...
        error: function (erro) {
            //console.log(erro);
            //alert('Houve um erro na exclusão.');
            Swal.fire({
                title: 'Houve um erro na exclusão.',
                icon: 'warning'
            });
        }
    });
}

// Função que exibe a página de formulário
function mostraFormulario(id) {
    sessionStorage.removeItem("id")
    if (Number(id) >= 0) {
        sessionStorage.setItem("id", id);
    }
    location.href = "./formulario/";
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
