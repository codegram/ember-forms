EF.TextareaField = EF.BaseField.extend({
  InputView: Ember.TextArea.extend({
    template: Ember.Handlebars.compile("{{view.value}}")
  })
});
