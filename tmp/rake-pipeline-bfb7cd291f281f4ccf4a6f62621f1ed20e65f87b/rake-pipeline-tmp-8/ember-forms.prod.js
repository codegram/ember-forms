(function() {
window.EF = Ember.Namespace.create();

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
EF.BaseComponent = Ember.View.extend({
  name: null,
  formBinding: 'parentView',
  objectBinding: 'form.object',
  tagName: 'div',
  classNames: ['input'],
  labelBinding: 'name',
  LabelView: EF.Label.extend(),
  InputView: null,
  template: Ember.Handlebars.compile(
    '{{view view.LabelView viewName="labelView"}}' +
    '{{view view.InputView viewName="inputView"}}'
  ),
  data: Ember.computed(function(){
    var data = {};
    data[this.get('name')] = this.get('value');
    return data;
  }).property('value'),
  init: function(){
    this._super();
    Ember.oneWay(this, 'value', 'object.' + this.get('name'));
  }
});

})();



(function() {
EF.TextComponent = EF.BaseComponent.extend({
  InputView: Ember.TextField.extend({
    componentBinding: 'parentView',
    valueBinding: 'component.value',
    attributeBindings: ['name'],
    name: 'component.name'
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
EF.Form = Ember.ContainerView.extend({
  tagName: 'form',
  attributeBindings: ['action'],
  fields: [],
  buttons: ['submit'],
  object: null,

  fieldViews: Ember.computed(function(){
    return this.get('fields').map(function(options){
      var componentName = Ember.String.camelize(options.type || 'text');
      delete(options.type);
      componentName = componentName.replace(/^./, componentName[0].toUpperCase());
      componentName = componentName + 'Component';
      var component = EF[componentName].create(options);
      return component;
    });
  }).property('fields'),

  childViews: Ember.computed(function(){
    return this.get('fieldViews').concat(this.get('buttonViews'));
  }).property('fields'),

  buttonViews: Ember.computed(function(){
    return this.get('buttons').map(function(buttonName){
      buttonName = buttonName.replace(/^./, buttonName[0].toUpperCase());
      buttonName = buttonName + 'Button';
      var button = EF[buttonName].create();
      return button;
    });
  }).property('buttons'),

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
    return false;
  }
});

})();



(function() {

})();

