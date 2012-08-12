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
  name: Ember.computed(function(){ return this.get('parentView.submitName'); }),
  template: Ember.Handlebars.compile("{{view.name}}")
});

EF.Buttons = Ember.ContainerView.extend({
  classNames: ['buttons'],
  childViews: [EF.SubmitButton],
  form: Ember.computed(function(){ return findFormRecursively(this); }),
  submitName: Ember.computed(function(){ return this.get('form.submitName'); })
});
