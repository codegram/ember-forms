EF.FieldHelper = Ember.Object.create({
  helper: function(view, name, options){
    var type = options.type;
    delete(options.type);
    options.name = name;
    var fieldView = this.findField(type);
    var formView = this.findFormRecursively(view);
    var field = formView.appendChild(fieldView, options);
    formView.get('fieldViews').pushObject(field);
    formView.set('formView', formView);
  },

  findField: function(name){
    name = name || 'text';
    var fieldName = Ember.String.camelize(name);
    fieldName = fieldName.replace(/^./, fieldName[0].toUpperCase());
    fieldName = fieldName + 'Field';
    var field = EF[fieldName];
    if(field){
      return field;
    }else{
      throw 'Field ' + name + ' cannot be found';
    }
  },

  findFormRecursively: function(view){
    var currentView = view;
    do{
      if(currentView.get('isForm') === true){
        return currentView;
      }
    }while(currentView = view.get('parentView'));
  }
});

Ember.Handlebars.registerHelper('field', function(name, options){
  EF.FieldHelper.helper(this, name, options.hash);
});
