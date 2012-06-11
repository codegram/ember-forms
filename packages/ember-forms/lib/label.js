require("ember-forms/core");

var findFieldRecursively = EF.findFieldRecursively;

EF.Label = Ember.View.extend({
  tagName: 'label',
  field: Ember.computed(function(){
    return findFieldRecursively(this);
  }),
  attributeBindings: ['for'],
  formBinding: 'field.form',
  name: Ember.computed(function(){
    return this.getPath('field.label') || this.getPath('field.name');
  }),
  nameBinding: 'field.label',
  template: Ember.Handlebars.compile("{{view.name}}"),
  didInsertElement: function(){
    // We bind it here to avoid re-rendering before the element was inserted
    Ember.bind(this, 'for', 'component.inputView.elementId');
  }
});
