/**
  Default namespace. Here's where you'll find everything related
  to ember-forms.
*/
window.EF = Ember.Namespace.create({

  /**
    Will find the container form recursively through the view hierarchy. Since
    forms cannot contain other forms (http://www.w3.org/TR/xhtml1/#prohibitions)
    this will resolve to a single EF.Form or undefined otherwise.

    @type EF.Form
  */
  findFormRecursively: function(view){
    var currentView = view;
    do{
      if(currentView.get('isForm') === true){ return currentView; }
    }while(currentView = view.get('parentView'));
  },

  /**
    Will find the first EF.BaseField in line looking recursively through the
    view hierarchy.

    @type EF.BaseField
  */
  findFieldRecursively: function(view){
    var currentView = view;
    do{
      if(currentView.get('isField') === true){ return currentView; }
    }while(currentView = view.get('parentView'));
  },

  /**
    Returns a field class given a particular name. For example, 
    `findField("text")` will return `EF.TextField`.

    @type String
  */
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
