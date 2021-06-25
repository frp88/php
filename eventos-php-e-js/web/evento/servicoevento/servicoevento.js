let id = -1; // ID do Servico
let idEvento = -1; // ID do Evento
window.onload = function () {
    // Verifica se o usuário logado está logado
    if (sessionStorage.getItem("idLogado") == null) {
        // Redireciona para a tela de login
        location.href = "../../login/";
    }
    else {
        var btnNovo = document.getElementById(`btnNovo`);
        var btnVoltar = document.getElementById(`btnVoltar`);
        var btnSair = document.getElementById(`btnSair`);

        btnNovo.addEventListener(`click`, mostraFormulario);
        btnVoltar.addEventListener(`click`, mostraListaEventos);
        btnSair.addEventListener(`click`, sair);

        // Executa a função que busca os dados do evento do servidor
        buscaDadosEvento();
        // Executa a função que busca todos os serviços de um determinado evento do servidor
        listaServicosEvento();
    }
};

// Função que volta para a lista 
function mostraListaEventos() {
    location.href = "../";
}

// Função que busca os dados pelo ID
function buscaDadosEvento() {
    $.ajax({
        url: servidor + 'evento/consultarporidnomecliente.php',
        dataType: 'json',
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            id: sessionStorage.getItem("idEvento")
        },
        success: function (dados) {
            //console.log(dados);
            document.querySelector(`#infoEvento`).innerHTML = `Evento: ${dados["titulo"]} - Cliente: ${dados["nome"]}`;
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

// Função que busca todos os serviços de um determinado evento do servidor
function listaServicosEvento() {
    $.ajax({
        url: servidor + 'servicoevento/consultarporevento.php',
        dataType: 'json',
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            evento: sessionStorage.getItem("idEvento")
        },
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

            { data: 'idservicoevento', visible: false },
            { data: 'descricaotiposervico', title: "Serviço" },
            { data: 'nomefantasia', title: "Fornecedor" },
            {
                data: 'dataprevista', title: "Data Prevista", className: 'text-center',
                render: function (data, type, row) {
                    if (type === "sort" || type === "type") {
                        return data;
                    }
                    //return moment(data).format("DD/MM/YYYY");
                    return (moment(data).format("DD/MM/YYYY") == 'Invalid date' ? "" : moment(data).format("DD/MM/YYYY"));
                }
            },
            {
                data: 'datarealizada', title: "Data Realizada", className: 'text-center',
                render: function (data, type, row) {
                    if (type === "sort" || type === "type") {
                        return data;
                    }
                    //return (data == '' ? moment(data).format("DD/MM/YYYY - HH:mm") : "" );
                    return (moment(data).format("DD/MM/YYYY") == 'Invalid date' ? "" : moment(data).format("DD/MM/YYYY"));
                }
            },
            { data: 'valortotal', title: "Valor Total", className: 'text-center', render: $.fn.dataTable.render.number('.', ',', 2, 'R$ ').display },
            { data: 'valorpago', title: "Valor Pago", className: 'text-center', render: $.fn.dataTable.render.number('.', ',', 2, 'R$ ').display },
            { data: 'situacao', title: "Sit.", className: 'text-center' },
            //{ data: 'observacao', title: "Observação" },
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
                title: "Lista de Serviços do Evento",
                className: "button bg-theme-2 shadow-md mr-2 border text-gray-700",
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'pdf',
                text: 'Baixar PDF',
                titleAttr: 'Baixar arquivo PDF',
                title: "Lista de Serviços do Evento",
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
        mostraFormulario(data.idservicoevento);
    });
    $('#tabela').on('click', '.btn-excluir', function (e) {
        var data = table.row($(this).parents('tr')).data();
        excluir(data.idservicoevento);
    });
}

// Função que preenche a TAG <table> da página com os dados retornados do servidor
function preencheTabelaOld(dados) {
    console.log(dados);
    let lista = document.getElementById("lista");
    lista.innerHTML = `<table class="table" id="lista">`;
    lista.innerHTML += `<thead><tr>
    <th class="whitespace-no-wrap">TÍTULO</th>
    <th class="whitespace-no-wrap">SERVIÇO</th>
    <th class="whitespace-no-wrap">FORNECEDOR</th>
    <th class="whitespace-no-wrap">VALOR TOTAL</th>
    <th class="whitespace-no-wrap">VALOR PAGO</th>
    <th class="whitespace-no-wrap">SIT.</th>
    <th class="text-center whitespace-no-wrap">AÇÕES</th>
    </tr></thead>`;
    if (dados != null) {
        for (let item in dados) {
            //console.log(dados[item]);
            let sit = ``;
            switch (dados[item].situacao) {
                case `CA`:
                    sit = `Cancelado`;
                    break;
                case `OR`:
                    sit = `Orçamento`;
                    break;
                default:
                    sit = `Confirmado`;
                    break;
            }
            lista.innerHTML += (`<tr>
                <td title='${dados[item].descricao}'>${dados[item].titulo}</td>
                <td>${dados[item].descricaotiposervico != null ? dados[item].descricaotiposervico : ''}</td>
                <td>${dados[item].nomefantasia != null ? dados[item].nomefantasia : ''}</td>
                <td>R$ ${Number(dados[item].valortotal).toFixed(2)}</td>
                <td>R$ ${Number(dados[item].valorpago).toFixed(2)}</td>                
                <td title='${sit}'>${dados[item].situacao}</td>
                <td class="text-center whitespace-no-wrap"><div class="flex justify-center items-center">              
                <a class="flex items-center mr-3" title="Alterar" href="#" onclick="mostraFormulario(${dados[item].idservicoevento})"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                 Alterar </a>
                 <a class="flex items-center text-theme-6" title="Excluir"  href="#" onclick="excluir(${dados[item].idservicoevento})" data-toggle="modal" data-target="#delete-confirmation-modal"> 
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 w-4 h-4 mr-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> 
                 Excluir </a>
                 </div>
			    </td></tr>`);
        }
    }
    else {
        lista.innerHTML += `<tr><td colspan="7" class="text-center">Nenhum serviço cadastrado...</td></tr>`;
    }
    lista.innerHTML += `</table>`
}

function excluir(id) {
    Swal.fire({
        title: 'Excluir serviço?',
        text: "Deseja realmente excluir este serviço?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.value) {
            // Chama a função que exclui o usuário no BD
            excluirServicoEvento(id);
        }
    });
}

// Função que altera a senha do usuário logado
function excluirServicoEvento(id) {
    $.ajax({
        url: servidor + 'servicoevento/excluir.php',
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
            listaServicosEvento();
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
            location.href = "../../login/";
        }
    });
}