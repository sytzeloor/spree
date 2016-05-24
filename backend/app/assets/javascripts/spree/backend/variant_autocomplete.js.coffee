# variant autocompletion
$(document).ready ->
  if $("#variant_autocomplete_template").length > 0
    window.variantTemplate = Handlebars.compile($("#variant_autocomplete_template").text())
    window.variantStockTemplate = Handlebars.compile($("#variant_autocomplete_stock_template").text())
    window.variantLineItemTemplate = Handlebars.compile($("#variant_line_items_autocomplete_stock_template").text())
  return

formatVariantResult = (variant) ->
  console.log(variant)
  if variant.loading || variant.selected || !variant.id
    variant.text
  else
    variant.image = variant.images[0].mini_url  if variant["images"][0] isnt `undefined` and variant["images"][0].mini_url isnt `undefined`
    variantTemplate variant: variant

$.fn.variantAutocomplete = ->
  @select2
    width: 'element'
    placeholder: Spree.translations.variant_placeholder
    minimumInputLength: 3
    inputData: (element, callback) ->
      $.get Spree.routes.variants_api + "/" + element.val(), { token: Spree.api_key }, (data) ->
        callback data
    ajax:
      url: Spree.url(Spree.routes.variants_api)
      quietMillis: 200
      datatype: 'json'
      data: (term, page) ->
        q:
          product_name_or_sku_cont: term.term
        token: Spree.api_key

      processResults: (data, page) ->
        console.log(data)
        window.variants = data["variants"]
        results: data["variants"]

    escapeMarkup: (markup) ->
      markup
    templateSelection: (variant) ->
      variant.name
    templateResult: formatVariantResult
    # formatResult: formatVariantResult
    # formatSelection: (variant, container, escapeMarkup) ->
    #   if !!variant.options_text
    #     Select2.util.escapeMarkup("#{variant.name} (#{variant.options_text})")
    #   else
    #     Select2.util.escapeMarkup(variant.name)
