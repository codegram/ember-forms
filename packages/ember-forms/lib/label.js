require("ember-forms/core");

EF.Label = Ember.View.extend({
  tagName: 'label',
  componentBinding: 'parentView',
  attributeBindings: ['for'],
  formBinding: 'component.form',
  nameBinding: 'component.label',
  template: Ember.Handlebars.compile("{{view.name}}"),
  didInsertElement: function(){
    // We bind it here to avoid re-rendering before the element was inserted
    Ember.bind(this, 'for', 'component.inputView.elementId');
  }
});
