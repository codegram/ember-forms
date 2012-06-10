EF.SubmitButton = Ember.View.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'submit',
  template: Ember.Handlebars.compile("Save")
});
