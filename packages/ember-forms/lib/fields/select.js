require("ember-forms/fields/base");

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
