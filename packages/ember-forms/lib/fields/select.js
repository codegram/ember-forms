require("ember-forms/fields/base");

EF.SelectField = EF.BaseField.extend({
  InputView: Ember.Select.extend({
    init: function(){
      var labelPath = this.get('field.optionLabelPath'),
          promptValue = this.get('field.prompt'),
          valuePath = this.get('field.optionValuePath');

      if(labelPath){ this.set('optionLabelPath', 'content.' + labelPath); }
      if(valuePath){ this.set('optionValuePath', 'content.' + valuePath); }
      if(promptValue){ this.set('prompt', this.get('field.prompt')); }

      this._super();
    },
    content: Ember.computed(function(){
      return this.get('field.content') || Ember.A([]);
    }).property('field.content')
  })
});
