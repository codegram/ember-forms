require("ember-forms/label");

var findFormRecursively = EF.findFormRecursively;

EF.BaseField = Ember.ContainerView.extend({
  name: null,
  formView: null,
  tagName: 'div',
  classNames: ['input'],
  childViews: ['labelView', 'inputView'],
  InputView: null,
  value: null,
  isField: true,

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
    data[this.get('name')] = this.getPath('inputView.value');
    return data;
  }).volatile(),

  init: function(){
    this._super();
    this.setFormView();
    this.bindValue();
  },

  labelView: Ember.computed(function(){
    return EF.Label.create({});
  }),

  inputView: Ember.computed(function(){
    return this.get('InputView').create({
      field: this,
      valueBinding: 'field.value',
      name: this.get('name')
    });
  })
});
