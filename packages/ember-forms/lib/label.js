require("ember-forms/core");

var findFieldRecursively = EF.findFieldRecursively,
    findFormRecursively  = EF.findFormRecursively;

/**
  @class
  @private

  Represents an input's label. Depends on the following attributes:

  * name: The label name. Will fallback to the raw field name

  @extends Ember.View
*/
EF.Label = Ember.View.extend({
  tagName: 'label',
  attributeBindings: ['for'],
  template: Ember.Handlebars.compile("{{view.name}}"),
  field: Ember.computed(function(){ return findFieldRecursively(this); }),
  form: Ember.computed(function(){ return this.get('field.formView'); }),
  name: Ember.computed(function(){
    return this.get('field.label') || this.get('field.name');
  }),
  didInsertElement: function(){
    // We bind it here to avoid re-rendering before the element was inserted
    Ember.bind(this, 'for', 'component.inputView.elementId');
  }
});
