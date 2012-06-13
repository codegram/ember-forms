require("ember-forms/fields/base");

EF.SelectField = EF.BaseField.extend({
  InputView: Ember.Select.extend({
    init: function(){
      var labelPath = this.getPath('field.optionLabelPath'),
          valuePath = this.getPath('field.optionValuePath');

      if(labelPath){ this.set('optionLabelPath', 'content.' + labelPath); }
      if(valuePath){ this.set('optionValuePath', 'content.' + valuePath); }

      this._super();
    },
    content: Ember.computed(function(){
      return this.getPath('field.content') || Ember.A([]);
    }).property('field.content')
  })
});
