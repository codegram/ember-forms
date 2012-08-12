/**
  @class

  EF.Form is a view that contains several fields and can respond to its events,
  providing the field's normalized data. 
  
  It will automatically bind to the values of an object, if provided.

    myForm = EF.Form.create({
      objectBinding: 'App.someObject',
      template: Ember.Handlebars.compile(
        '{{field title }}' +
        '{{field body as="textarea"}}' +
        '{{form buttons}}'
      ),
      save: function(data){ this.get('object').setProperties(data); }
    });

  @extends Ember.View
*/
EF.Form = Ember.View.extend({
  tagName: 'form',
  classNameBindings: ['name'],
  classNames: ['ember-form'],
  attributeBindings: ['action'],
  fieldViews: Ember.A(),
  buttons: ['submit'],
  content: null,
  isForm: true,
  submitName: 'Save',
  name: Ember.computed(function(){
    var constructor = this.get('content.constructor');
    if(constructor && constructor.isClass){
      var className = constructor.toString().split('.').pop();
      return Ember.String.decamelize(className);
    }
  }).property('content'),

  /**
    It returns this form fields data in an object.

      myForm.data();

    Would return:

      {
        title: 'Some post title',
        content: 'The post content'
      }
  */
  data: Ember.computed(function(){
    var data = {};
    this.get('fieldViews').forEach(function(field){
      var fieldData = field.get('data');
      for(var key in fieldData){
        data[key] = fieldData[key];
      }
    });
    return data;
  }).volatile(),

  submit: function(){
    this.save(this.get('data'));
    return false;
  },

  /**
    This event will be fired when the form is sent, and will receive the form
    data as argument. Override it to perform some operation like setting the
    properties of an object.

    myForm = EF.Form.create({
      [...]
      save: function(data){
        this.get('object').setProperties(data);
      }
    });
  */
  save: function(data){ }
});
