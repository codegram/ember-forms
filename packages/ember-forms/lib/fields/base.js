require("ember-forms/label");

var findFormRecursively = EF.findFormRecursively;

EF.BaseField = Ember.ContainerView.extend({
  name: null,
  formView: null,
  tagName: 'div',
  classNames: ['input'],
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
    var name = this.get('name');
    var path = 'content.' + name;
    var value = this.get(path);
    this.set('value', this.get(path));
  },

  data: Ember.computed(function(){
    var data = {};
    data[this.get('name')] = this.get('inputView.value');
    return data;
  }).volatile(),

  init: function(){
    this._super();
    var labelView = EF.Label.create(),
        inputView = this.get('InputView').create({
          field: this,
          valueBinding: 'field.value',
          name: this.get('name'),
          placeholder: this.get('placeholder')
        });
    
    this.set('labelView', labelView);
    this.set('inputView', inputView);
    this.pushObject(labelView);
    this.pushObject(inputView);
    this.setFormView();
    this.bindValue();
  }
});
