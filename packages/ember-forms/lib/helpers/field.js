var findFormRecursively = EF.findFormRecursively,
    findField = EF.findField;

EF.FieldHelper = Ember.Object.create({
  helper: function(view, name, options){
    var type = options.as;
    delete(options.as);
    options.name = name;
    var fieldView = findField(type);
    var formView = findFormRecursively(view);
    var field = formView.appendChild(fieldView, options);
  }
});

Ember.Handlebars.registerHelper('field', function(name, options){
  EF.FieldHelper.helper(this, name, options.hash);
});
