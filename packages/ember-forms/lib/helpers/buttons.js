var findFormRecursively = EF.findFormRecursively,
    findField = EF.findField;

EF.ButtonHelper = Ember.Object.create({
  helper: function(view, options){
    var buttonView = Ember.View.extend({
      tagName: 'button',
      attributeBindings: ['type'],
      type: 'submit',
      name: 'Save',
      template: Ember.Handlebars.compile("{{unbound view.name}}"),
    });
    var currentView = options.data.view;
    currentView.appendChild(buttonView, options);
  }
});

Ember.Handlebars.registerHelper('form', function(name, options){
  if(name === 'buttons'){
    EF.ButtonHelper.helper(this, options);
  }else{
    throw "Unknown " + name + " in form helper";
  }
});
