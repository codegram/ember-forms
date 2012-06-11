var findFormRecursively = EF.findFormRecursively,
    findField = EF.findField;

EF.ButtonHelper = Ember.Object.create({
  helper: function(view, name, options){
    var buttonView = Ember.View.extend({
      tagName: 'button',
      attributeBindings: ['type'],
      type: 'submit',
      name: 'Save',
      template: Ember.Handlebars.compile("{{unbound view.name}}"),
    });
    var formView = findFormRecursively(view);
    var button = formView.appendChild(buttonView, options);
  }
});

Ember.Handlebars.registerHelper('form', function(name, options){
  if(name === 'buttons'){
    EF.ButtonHelper.helper(this, options.hash);
  }else{
    throw "Unknown " + name + " in form helper";
  }
});
