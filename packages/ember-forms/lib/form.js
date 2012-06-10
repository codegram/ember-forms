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
