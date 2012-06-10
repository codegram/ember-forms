EF.TextComponent = EF.BaseComponent.extend({
  InputView: Ember.TextField.extend({
    componentBinding: 'parentView',
    valueBinding: 'component.value',
    attributeBindings: ['name'],
    name: 'component.name'
  })
});
