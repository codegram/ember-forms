EF.TextField = EF.BaseField.extend({
  InputView: Ember.TextField.extend({
    attributeBindings: ['name']
  })
});
