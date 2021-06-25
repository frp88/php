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
        listaEventos();
    }
};

// Função que busca todos os usuários do servidor
function listaEventos() {
    $.ajax({
        url: servidor + 'evento/consultar.php',
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
            {
                data: 'titulo', title: "Título",
                render: function (data, type, full, meta) {
                    return '<span data-tooltip="' + full.descricao + '">' + data + '</span>';
                }
            },
            { data: 'idevento', visible: false },
            { data: 'nome', title: "Cliente" },
            //{ data: 'datahorainicio' },
            //{ data: 'datahorafim' },
            {
                data: 'datahorainicio', title: "Início", className: 'text-center',
                render: function (data, type, row) {
                    if (type === "sort" || type === "type") {
                        return data;
                    }
                    return moment(data).format("DD/MM/YYYY - HH:mm");
                }
            },
            {
                data: 'datahorafim', title: "Fim", className: 'text-center',
                render: function (data, type, row) {
                    if (type === "sort" || type === "type") {
                        return data;
                    }
                    return moment(data).format("DD/MM/YYYY - HH:mm");
                }
            },
            { data: 'situacao', title: "Sit.", className: 'text-center' },
            {
                "data": null, title: "Ações", className: 'text-center',
                "defaultContent": '<div class="flex sm:justify-center items-center"><a title="Ver serviços do evento" class="flex items-center mr-3 btn-servicos" href="#"> <svg width="12" height="12" fill="#888" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="th-list" class="svg-inline--fa fa-th-list fa-w-16 w-4 h-4 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"></path></svg> Serviços </a>'
                    + '<a class="flex items-center mr-3  btn-editar" href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg> Editar </a>'
                    + '<a class="flex items-center text-theme-6  btn-excluir" href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 w-4 h-4 mr-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> Excluir </a></div>',
                "targets": -1
            }
        ],
        buttons: [
            {
                extend: 'excel',
                text: 'Baixar planilha',
                titleAttr: 'Baixar arquivo de planilha',
                title: "Lista de Eventos",
                className: "button bg-theme-2 shadow-md mr-2 border text-gray-700",
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'pdf',
                text: 'Baixar PDF',
                titleAttr: 'Baixar arquivo PDF',
                title: "Lista de Eventos",
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
    $('#tabela').on('click', '.btn-servicos', function (e) {
        var data = table.row($(this).parents('tr')).data();
        sessionStorage.setItem("dataHoraInicio", data.datahorainicio);
        mostraServicosEvento(data.idevento);
    });
    $('#tabela').on('click', '.btn-editar', function (e) {
        var data = table.row($(this).parents('tr')).data();
        mostraFormulario(data.idevento);
    });
    $('#tabela').on('click', '.btn-excluir', function (e) {
        var data = table.row($(this).parents('tr')).data();
        //excluir(data.idevento);
        verificaExclusao(data.idevento);
    });
}


// Função que preenche a TAG <table> da página com os dados retornados do servidor
function preencheTabelaOld(dados) {
    console.log(dados);
    let lista = document.getElementById("lista");
    lista.innerHTML = `<table class="table" id="lista">`;
    lista.innerHTML += `<thead><tr>
    <th class="whitespace-no-wrap">TÍTULO</th>
    <th class="whitespace-no-wrap">CLIENTE</th>
    <th class="whitespace-no-wrap">INÍCIO</th>
    <th class="whitespace-no-wrap">FIM</th>
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
                case `CO`:
                    sit = `Concluído`;
                    break;
                case `RE`:
                    sit = `Remarcado`;
                    break;
                default:
                    sit = `Agendado`;
                    break;
            }
            let dataHoraInicio = `${dados[item].datahorainicio.substring(8, 10)}/${dados[item].datahorainicio.substring(5, 7)}/${dados[item].datahorainicio.substring(0, 4)} - ${dados[item].datahorainicio.substring(11, 16)}`;
            let dataHoraFim = `${dados[item].datahorafim.substring(8, 10)}/${dados[item].datahorafim.substring(5, 7)}/${dados[item].datahorafim.substring(0, 4)} - ${dados[item].datahorafim.substring(11, 16)}`;
            lista.innerHTML += (`<tr ondblclick="mostraServicosEvento(${dados[item].idevento})">
                <td title='${dados[item].descricao}'>${dados[item].titulo}</td>
                <td>${dados[item].nome != null ? dados[item].nome : ''}</td>
                <td>${dataHoraInicio}</td>
                <td>${dataHoraFim}</td>
                <td title='${sit}'>${dados[item].situacao}</td>
                <td class="text-center whitespace-no-wrap"><div class="flex justify-center items-center">              
                <a class="flex items-center mr-3" title="Ver serviços do evento" href="#" onclick="mostraServicosEvento(${dados[item].idevento})"> <svg width="12" height="12" fill="#888" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="th-list" class="svg-inline--fa fa-th-list fa-w-16 w-4 h-4 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"></path></svg>
                 Serviços </a>
                 <a class="flex items-center mr-3" title="Alterar" href="#" onclick="mostraFormulario(${dados[item].idevento})"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square w-4 h-4 mr-1"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                 Alterar </a>
                 <a class="flex items-center text-theme-6" title="Excluir"  href="#" onclick="verificaExclusao(${dados[item].idevento})" data-toggle="modal" data-target="#delete-confirmation-modal"> 
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 w-4 h-4 mr-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> 
                 Excluir </a>
                 </div>
			    </td></tr>`);
        }
    }
    else {
        lista.innerHTML += `<tr><td colspan="6" class="text-center">Nenhum evento cadastrado...</td></tr>`;
    }
    lista.innerHTML += `</table>`
}

function mostraServicosEvento(id) {
    //alert(id);
    sessionStorage.setItem("idEvento", id);
    location.href = "./servicoevento/";
}

// Função que retorna os serviços de um determinado evento
function verificaExclusao(id) {
    $.ajax({
        url: servidor + 'servicoevento/consultarporevento.php',
        dataType: 'json',
        type: 'POST', // Como os dados serão enviados
        data: { // Dados que serão enviados
            evento: id
        },
        success: function (dados) {
            //console.log(dados);
            //alert(dados.length);
            if (!dados != []) {
                //excluir(id);
                Swal.fire({
                    title: 'Excluir evento?',
                    text: "Deseja realmente excluir este evento?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não'
                }).then((result) => {
                    if (result.value) {
                        // Chama a função que exclui o evento no BD
                        excluirEvento(id);
                    }
                });
            }
            else {
                Swal.fire({
                    title: 'Não foi possível excluir o evento.',
                    text: "Para excluir o evento, primeiro exclua todos os serviços vinculados à este evento.",
                    icon: 'warning'
                });
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

function excluir(id) {
    Swal.fire({
        title: 'Excluir evento?',
        text: "Deseja realmente excluir este evento?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.value) {
            // Chama a função que exclui o evento no BD
            excluirEvento(id);
        }
    });
}


// Função que 
function excluirEvento(id) {
    $.ajax({
        url: servidor + 'evento/excluir.php',
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
            listaEventos();
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
