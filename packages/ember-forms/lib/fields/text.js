require("ember-forms/fields/base");

EF.TextField = EF.BaseField.extend({
  InputView: Ember.TextField.extend({
    attributeBindings: ['name', 'placeholder']
  })
});
