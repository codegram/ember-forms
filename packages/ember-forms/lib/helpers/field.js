var findFormRecursively = EF.findFormRecursively,
    findField = EF.findField;

EF.FieldHelper = Ember.Object.create({
  helper: function(view, name, options){
    var optionsHash = options.hash;
    var type = optionsHash.as;
    delete(optionsHash.as);
    var currentView = options.data.view;
    var fieldView = findField(type);
    currentView.appendChild(fieldView, {name: name});
  }
});

Ember.Handlebars.registerHelper('field', function(name, options){
  EF.FieldHelper.helper(this, name, options);
});
