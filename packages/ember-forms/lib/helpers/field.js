var findFormRecursively = EF.findFormRecursively,
    findField = EF.findField;

EF.FieldHelper = Ember.Object.create({
  helper: function(view, name, options){
    var optionsHash = options.hash,
        type = optionsHash.as,
        currentView = options.data.view,
        fieldView = findField(type);

    if(Ember.isEmpty(optionsHash.name)){ optionsHash.name = name; }
    delete(optionsHash.as);
    currentView.appendChild(fieldView, optionsHash);
  }
});

/**
  A handlebars helper that will render a field with its input and label.

     {{ field name }}

  It accepts the following options:

  * as: The field type. Defaults to `text`. Can be `text`, `textarea` and
    `select`.

  Any other options will be passed to the particular field instance and may
  modify its behavior.
*/
Ember.Handlebars.registerHelper('field', function(name, options){
  EF.FieldHelper.helper(this, name, options);
});
