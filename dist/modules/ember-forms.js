(function() {
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

})();



(function() {
EF.Label = Ember.View.extend({
  tagName: 'label',
  componentBinding: 'parentView',
  attributeBindings: ['for'],
  formBinding: 'component.form',
  nameBinding: 'component.label',
  template: Ember.Handlebars.compile("{{view.name}}"),
  didInsertElement: function(){
    // We bind it here to avoid re-rendering before the element was inserted
    Ember.bind(this, 'for', 'component.inputView.elementId');
  }
});

})();



(function() {
var findFormRecursively = EF.findFormRecursively;

EF.BaseField = Ember.View.extend({
  name: null,
  formView: null,
  tagName: 'div',
  classNames: ['input'],
  labelBinding: 'name',
  LabelView: EF.Label.extend(),
  InputView: null,
  value: null,

  template: Ember.Handlebars.compile(
    '{{view view.LabelView viewName="labelView"}}' +
    '{{view view.InputView viewName="inputView" fieldBinding="view" ' +
    ' valueBinding="view.value" nameBinding="view.name"}}'
  ),

  setFormView: function(){
    var formView = findFormRecursively(this.get('parentView'));
    formView.get('fieldViews').pushObject(this);
    this.set('formView', formView);
    this.set('content', formView.get('content'));
  },

  bindValue: function(){
    Ember.oneWay(this, 'value', 'content.' + this.get('name'));
  },

  data: Ember.computed(function(){
    var data = {};
    data[this.get('name')] = this.get('value');
    return data;
  }).property('value'),

  init: function(){
    this._super();
    this.setFormView();
    this.bindValue();
  }
});

})();



(function() {
EF.TextField = EF.BaseField.extend({
  InputView: Ember.TextField.extend({
    attributeBindings: ['name']
  })
});

})();



(function() {
EF.TextareaField = EF.BaseField.extend({
  InputView: Ember.TextArea.extend({
    template: Ember.Handlebars.compile("{{view.value}}")
  })
});

})();



(function() {
EF.SubmitButton = Ember.View.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'submit',
  template: Ember.Handlebars.compile("Save")
});

})();



(function() {
/*
 * Usage:
 */
EF.Form = Ember.View.extend({
  tagName: 'form',
  attributeBindings: ['action'],
  fieldViews: Ember.A(),
  buttons: ['submit'],
  content: null,
  isForm: true,

  data: Ember.computed(function(){
    var data = {};
    this.get('fieldViews').forEach(function(field){
      var fieldData = field.get('data');
      for(var key in fieldData){
        data[key] = fieldData[key];
      }
    });
    return data;
  }).property('fieldViews.@each.value'),

  submit: function(){
    this.save(this.get('data'));
    return false;
  },

  save: function(data){ }
});

})();



(function() {
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

})();



(function() {
var findFormRecursively = EF.findFormRecursively,
    findField = EF.findField;

EF.ButtonHelper = Ember.Object.create({
  helper: function(view, options){
    var buttonView = Ember.View.extend({
      tagName: 'button',
      attributeBindings: ['type'],
      type: 'submit',
      name: 'Save',
      template: Ember.Handlebars.compile("{{unbound view.name}}"),
    });
    var currentView = options.data.view;
    currentView.appendChild(buttonView, options);
  }
});

Ember.Handlebars.registerHelper('form', function(name, options){
  if(name === 'buttons'){
    EF.ButtonHelper.helper(this, options);
  }else{
    throw "Unknown " + name + " in form helper";
  }
});

})();



(function() {

})();

