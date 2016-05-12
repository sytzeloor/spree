$(document).ready(function () {
  'use strict';

  function formatOptionType(option_type) {
    if(option_type.loading || option_type.selected) {
      return option_type.text;
    } else {
      return option_type.presentation + ' (' + option_type.name + ')';
    }
  }

  if ($('#product_option_type_ids').length > 0) {
    $('#product_option_type_ids').select2({
      placeholder: Spree.translations.option_type_placeholder,
      multiple: true,
      ajax: {
        url: Spree.routes.option_type_search,
        quietMillis: 200,
        datatype: 'json',
        data: function (params) {
          return {
            q: params.term,
            token: Spree.api_key
          };
        },
        processResults: function (data, params) {
          params.page = params.page || 1;

          return {
            results: data
          };
        }
      },
      escapeMarkup: function (markup) { return markup; },
      minimumInputLength: 0,
      templateResult: formatOptionType,
      templateSelection: formatOptionType
    });
  }
});
