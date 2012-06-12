require("ember-forms/buttons");

var findFormRecursively = EF.findFormRecursively,
    findField = EF.findField;

EF.ButtonHelper = Ember.Object.create({
  helper: function(view, options){
    var buttonView = EF.SubmitButton;
    var currentView = options.data.view;
    currentView.appendChild(buttonView, options.hash);
  }
});

/**
  A helper to be used in a handlebars template. Will generate a submit button
  that intented to trigger the form submission. Usage:

     {{ form buttons }}

  It accepts the following options:

  * name: The button's text
*/
Ember.Handlebars.registerHelper('form', function(name, options){
  if(name === 'buttons'){
    EF.ButtonHelper.helper(this, options);
  }else{
    throw "Unknown " + name + " in form helper";
  }
});
