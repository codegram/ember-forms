window.EF = Ember.Namespace.create({
  findFormRecursively: function(view){
    var currentView = view;
    do{
      if(currentView.get('isForm') === true){ return currentView; }
    }while(currentView = view.get('parentView'));
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
  }
});
