/**
 @class
 Represents a submit button.

 * name: The button text
*/
EF.SubmitButton = Ember.View.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'submit',
  name: "Save",
  template: Ember.Handlebars.compile("{{view.name}}")
});
