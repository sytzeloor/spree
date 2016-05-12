'use strict';

var set_taxon_select = function(selector){
  function formatTaxon(taxon) {
    if(taxon.loading || taxon.selected) {
      return taxon.text;
    } else {
      return taxon.pretty_name;
    }
  }

  if ($(selector).length > 0) {
    $(selector).select2({
      placeholder: Spree.translations.taxon_placeholder,
      multiple: true,
      ajax: {
        url: Spree.routes.taxons_search,
        datatype: 'json',
        data: function (term, page) {
          return {
            per_page: 50,
            page: page,
            without_children: true,
            q: {
              name_cont: term
            },
            token: Spree.api_key
          };
        },
        processResults: function (data, params) {
          params.page = params.page || data.current_page;

          return {
            results: data.taxons,
            pagination: {
              more: (params.page * 30) < data.count
            }
          };
        }
      },
      escapeMarkup: function (markup) { return markup; },
      minimumInputLength: 0,
      templateResult: formatTaxon,
      templateSelection: formatTaxon
    });
  }
}

$(document).ready(function () {
  set_taxon_select('#product_taxon_ids')
});
