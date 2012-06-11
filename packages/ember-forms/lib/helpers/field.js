var findFormRecursively = EF.findFormRecursively,
    findField = EF.findField;

EF.FieldHelper = Ember.Object.create({
  helper: function(view, name, options){
    var optionsHash = options.hash,
        type = optionsHash.as,
        currentView = options.data.view,
        fieldView = findField(type);

    if(Ember.empty(optionsHash.name)){ optionsHash.name = name; }
    delete(optionsHash.as);
    currentView.appendChild(fieldView, optionsHash);
  }
});

Ember.Handlebars.registerHelper('field', function(name, options){
  EF.FieldHelper.helper(this, name, options);
});
