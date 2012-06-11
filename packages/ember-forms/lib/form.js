/*
 * Usage:
 */
EF.Form = Ember.View.extend({
  tagName: 'form',
  attributeBindings: ['action'],
  fieldViews: Ember.A(),
  buttons: ['submit'],
  object: null,
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
    return false;
  }
});
