var findFormRecursively = EF.findFormRecursively,
    findField = EF.findField;

EF.FieldHelper = Ember.Object.create({
  helper: function(view, name, options){
    var type = options.type;
    delete(options.type);
    options.name = name;
    var fieldView = findField(type);
    var formView = findFormRecursively(view);
    var field = formView.appendChild(fieldView, options);
  }
});

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

Ember.Handlebars.registerHelper('field', function(name, options){
  EF.FieldHelper.helper(this, name, options.hash);
});

Ember.Handlebars.registerHelper('form', function(name, options){
  if(name === 'buttons'){
    EF.ButtonHelper.helper(this, options.hash);
  }else{
    throw "Unknown " + name + " in form helper";
  }
});
