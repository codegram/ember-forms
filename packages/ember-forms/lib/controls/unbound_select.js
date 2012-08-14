var fmt = Ember.String.fmt;

/**
  `Ember.Select` is meant to be bound to collections with a changing nature, 
  but with big collections, it comes with a big performance penalty. In order
  to address this issue, we've created a "static" one - meaning that won't
  change as the associated collection changes. This makes it perfect for things
  like date selectors, gender, numerical...

  The collection can be an array of values, or an array of Javascript objects
  with `value` and `label` keys.
*/
EF.UnboundSelect = Ember.View.extend({
  tagName: 'select',
  template: Ember.Handlebars.compile("{{unbound view.options}}"),

  /**
    @private

    Renders the options from the collection.
  */
  options: Ember.computed(function(){
    var output;
    if(!Ember.empty(this.get('prompt'))){
      output = '<option value="">' + this.get('prompt') + '</option>';
    }
    this.get('content').forEach(function(item){
      var value, label;
      if(!Ember.empty(item.value)){
        value = item.value;
        label = item.label;
      }else{ value = item; label = item; }
      var selected = "";
      if(value === this.get('value')){
        selected = ' selected="selected"';
      }
      output += fmt('<option value="' + value + '"' + selected + '>' + label + '</option>');
    }, this);
    return (new Handlebars.SafeString(output));
  }).property('value'),

  setValue: Ember.observer(function(){
    if(!this.$()) return;
    var value = this.get('value');
    var option = this.$('option[value=' + value + ']');
    option.siblings().attr('selected', null);
    option.attr('selected', 'selected');
  }, 'value'),

  didInsertElement: function(){
    var view = this;
    this.$().change(function(){
      view.change();
    });
  },

  change: function(){
    var value = this.$().val();
    this.set('value', value);
  }
});
