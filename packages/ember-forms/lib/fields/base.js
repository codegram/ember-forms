var findFormRecursively = EF.findFormRecursively;

EF.BaseField = Ember.View.extend({
  name: null,
  formView: null,
  objectBinding: 'formView.object',
  tagName: 'div',
  classNames: ['input'],
  labelBinding: 'name',
  LabelView: EF.Label.extend(),
  InputView: null,

  template: Ember.Handlebars.compile(
    '{{view view.LabelView viewName="labelView"}}' +
    '{{view view.InputView viewName="inputView" fieldBinding="view" ' +
    ' valueBinding="field.value" nameBinding="field.name"}}'
  ),

  setFormView: function(){
    var formView = findFormRecursively(this.get('parentView'));
    formView.get('fieldViews').pushObject(this);
    this.set('formView', formView);
  },

  bindValue: function(){
    Ember.oneWay(this, 'value', 'object.' + this.get('name'));
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
