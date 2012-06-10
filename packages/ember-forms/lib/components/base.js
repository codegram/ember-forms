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
