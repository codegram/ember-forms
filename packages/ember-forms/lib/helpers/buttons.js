var findFormRecursively = EF.findFormRecursively,
    findField = EF.findField;

EF.ButtonHelper = Ember.Object.create({
  helper: function(view, options){
    var buttonView = EF.SubmitButton;
    var currentView = options.data.view;
    currentView.appendChild(buttonView, options.hash);
  }
});

Ember.Handlebars.registerHelper('form', function(name, options){
  if(name === 'buttons'){
    EF.ButtonHelper.helper(this, options);
  }else{
    throw "Unknown " + name + " in form helper";
  }
});
