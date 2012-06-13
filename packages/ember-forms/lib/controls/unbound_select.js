var fmt = Ember.String.fmt;

EF.UnboundSelect = Ember.View.extend({
  tagName: 'select',
  template: Ember.Handlebars.compile("{{unbound view.options}}"),

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
