require("ember-forms/fields/base");

EF.PasswordField = EF.BaseField.extend({
  InputView: Ember.TextField.extend({
    attributeBindings: ['name', 'placeholder'],
    type: 'password'
  })
});
