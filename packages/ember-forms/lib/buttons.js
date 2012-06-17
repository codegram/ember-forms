var findFormRecursively  = EF.findFormRecursively;

/**
 @class
 Represents a submit button.

 * name: The button text
*/
EF.SubmitButton = Ember.View.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'submit',
  name: Ember.computed(function(){ return this.getPath('parentView.submitName'); }),
  form: Ember.computed(function(){ return findFormRecursively(this); }),
  template: Ember.Handlebars.compile("{{view.name}}")
});

EF.Buttons = Ember.ContainerView.extend({
  classNames: ['buttons'],
  childViews: [EF.SubmitButton],
  submitName: 'Save'
});
