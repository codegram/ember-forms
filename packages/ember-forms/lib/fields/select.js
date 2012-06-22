require("ember-forms/fields/base");

EF.SelectField = EF.BaseField.extend({
  InputView: Ember.Select.extend({
    init: function(){
      var labelPath = this.getPath('field.optionLabelPath'),
          promptValue = this.getPath('field.prompt'),
          valuePath = this.getPath('field.optionValuePath');

      if(labelPath){ this.set('optionLabelPath', 'content.' + labelPath); }
      if(valuePath){ this.set('optionValuePath', 'content.' + valuePath); }
      if(promptValue){ this.set('prompt', this.getPath('field.prompt')); }

      this._super();
    },
    content: Ember.computed(function(){
      return this.getPath('field.content') || Ember.A([]);
    }).property('field.content')
  })
});
