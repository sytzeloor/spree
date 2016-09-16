// variant autocompletion
$(document).ready(function() {
  if($("#variant_autocomplete_template").length > 0) {
    window.variantTemplate = Handlebars.compile($("#variant_autocomplete_template").text());
    window.variantStockTemplate = Handlebars.compile($("#variant_autocomplete_stock_template").text());
    window.variantLineItemTemplate = Handlebars.compile($("#variant_line_items_autocomplete_stock_template").text());
  }
})

formatVariantResult = function(variant) {
  if(variant.loading || variant.selected || !variant.id) {
    return variant.text;
  } else {
    if(variant["images"][0] != undefined && variant["images"][0].mini_url != undefined) {
      variant.image = variant.images[0].mini_url;
    }

    return variantTemplate({ variant: variant });
  }
};

$.fn.variantAutocomplete = function() {
  $(this).select2({
    width: 'element',
    placeholder: Spree.translations.variant_placeholder,
    minimumInputLength: 0,
    ajax: {
      url: Spree.routes.variants_api,
      datatype: 'json',
      data: function(term, page) {
        console.log(term);
        return {
          q: {
            product_name_or_sku_cont: term.term
          },
          token: Spree.api_key
        }
      },
      processResults: function(data, page) {
        window.variants = data["variants"];
        return { results: data["variants"] };
      }
    },
    escapeMarkup: function(markup) { return markup; },
    templateSelection: formatVariantResult,
    templateResult: formatVariantResult
  });
};
