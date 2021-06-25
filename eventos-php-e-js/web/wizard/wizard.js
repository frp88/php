jQuery(function ($) {
    $('.wizard').wizard({
        buttonLabels: {
            next: 'Avançar',
            back: 'Voltar',
            finish: 'Concluir'
        },
        templates: {
            buttons: function () {
                const options = this.options;
                return `<div class="wizard-buttons intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5"><a class="wizard-back button w-24 justify-center block bg-gray-200 text-gray-600" href="#${this.id}" data-wizard="back" role="button">${options.buttonLabels.back}</a><a class="wizard-next button w-24 justify-center block bg-theme-1 text-white ml-2" href="#${this.id}" data-wizard="next" role="button">${options.buttonLabels.next}</a><a class="wizard-finish button w-24 justify-center block bg-theme-1 text-white ml-2" href="#${this.id}" data-wizard="finish" role="button">${options.buttonLabels.finish}</a></div>`;
            }
        },

    });
});