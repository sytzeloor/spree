$.fn.productAutocomplete = function (options) {
  'use strict';

  // Default options
  options = options || {};
  var multiple = typeof(options.multiple) !== 'undefined' ? options.multiple : true;

  function formatProduct(product) {
    if(product.loading || product.selected) {
      return product.text;
    } else {
      return product.name;
    }
  }

  this.select2({
    width: 'element',
    minimumInputLength: 3,
    multiple: multiple,
    // inputData: function (element, callback) {
    //   $.get(Spree.routes.product_search, {
    //     ids: element.val().split(','),
    //     token: Spree.api_key
    //   }, function (data) {
    //     callback(multiple ? data.products : data.products[0]);
    //   });
    // },
    ajax: {
      url: Spree.routes.product_search,
      datatype: 'json',
      data: function (term, page) {
        return {
          q: {
            name_or_master_sku_cont: term,
          },
          m: 'OR',
          token: Spree.api_key
        };
      },
      processResults: function (data, params) {
        var products = data.products ? data.products : [];

        return {
          results: products
        };
      }
    },
    escapeMarkup: function (markup) { return markup; },
    templateResult: formatProduct,
    templateSelection: formatProduct
  });
};

$(document).ready(function () {
  $('.product_picker').productAutocomplete();
});
