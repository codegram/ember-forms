(function() {
window.EF = Ember.Namespace.create({
  findFormRecursively: function(view){
    var currentView = view;
    do{
      if(currentView.get('isForm') === true){ return currentView; }
    }while(currentView = view.get('parentView'));
  },

  findFieldRecursively: function(view){
    var currentView = view;
    do{
      if(currentView.get('isField') === true){ return currentView; }
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
var findFieldRecursively = EF.findFieldRecursively;

EF.Label = Ember.View.extend({
  tagName: 'label',
  field: Ember.computed(function(){
    return findFieldRecursively(this);
  }),
  attributeBindings: ['for'],
  formBinding: 'field.form',
  name: Ember.computed(function(){
    return this.getPath('field.label') || this.getPath('field.name');
  }),
  nameBinding: 'field.label',
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
  LabelView: EF.Label.extend(),
  InputView: null,
  value: null,
  isField: true,

  template: Ember.Handlebars.compile(
    '{{view view.LabelView viewName="labelView"}}' +
    '{{view view.InputView viewName="inputView" fieldBinding="view" ' +
    ' valueBinding="view.value" nameBinding="view.name"}}'
  ),

  setFormView: function(){
    var parentView, formView;

    if(parentView = this.get('parentView')){
      formView = findFormRecursively(parentView);
    }
    if(formView){
      formView.get('fieldViews').pushObject(this);
      this.set('formView', formView);
      this.set('content', formView.get('content'));
    }
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
EF.SelectField = EF.BaseField.extend({
  optionLabelPath: 'content.name',
  optionValuePath: 'content.id',
  InputView: Ember.Select.extend({
    init: function(){
      this.set('optionLabelPath', this.getPath('parentView.optionLabelPath'));
      this.set('optionValuePath', this.getPath('parentView.optionValuePath'));
      this._super();
    },
    contentBinding: 'field.content'
  })
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
EF.SubmitButton = Ember.View.extend({
  tagName: 'button',
  attributeBindings: ['type'],
  type: 'submit',
  name: "Save",
  template: Ember.Handlebars.compile("{{view.name}}")
});

})();



(function() {
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

})();



(function() {
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

})();



(function() {

})();



(function() {

})();

