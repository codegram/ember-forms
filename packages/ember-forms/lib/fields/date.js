require("ember-forms/fields/base");
require("ember-forms/controls/unbound_select");
require("ember-forms/labels");

var e = Ember.isEmpty;

EF.DateComponent = Ember.ContainerView.extend({
  childViews: ['dayView', 'monthView', 'yearView'],
  tagName: 'span',
  classNames: ['date'],

  value: Ember.computed(function(key, value){
    var day, month, year;
    if (arguments.length === 1){
      day   = this.get('dayView.value');
      month = this.get('monthView.value');
      year = this.get('yearView.value');
      if(!e(day) && !e(month) && !e(year)){
        return new Date(year, month, day, 12, 0, 0);
      }
    }else if(value){
      day = value.getDate() + '';
      month = value.getMonth() + '';
      year = value.getFullYear() + '';
      this.set('dayView.value', day);
      this.set('monthView.value', month);
      this.set('yearView.value', year);
    }
    return value;
  }).property('dayView.value', 'monthView.value', 'yearView.value'),

  dayView: EF.UnboundSelect.extend({
    attributeBindings: ['name'],
    name: Ember.computed(function(){
      return this.get('parentView').get('name') + '_day';
    }),
    promptBinding: 'EF.Labels.dayPrompt',
    content: Ember.computed(function(){
      var days = [];
      for(var i=1; i<=31; i++){
        days.push(i + '');
      }
      return Ember.A(days);
    })
  }),

  monthView: EF.UnboundSelect.extend({
    promptBinding: 'EF.Labels.monthPrompt',
    attributeBindings: ['name'],
    name: Ember.computed(function(){
      return this.get('parentView').get('name') + '_month';
    }),
    content: Ember.computed(function(){
      var months = EF.Labels.get('months');
      return months.map(function(month, index){
        return {value: (index + ''), label: month};
      });
    })
  }),

  yearView: EF.UnboundSelect.extend({
    promptBinding: 'EF.Labels.yearPrompt',
    attributeBindings: ['name'],
    name: Ember.computed(function(){
      return this.get('parentView').get('name') + '_year';
    }),
    startYear: function(){
      return this.get('parentView.parentView.startYear') || new Date().getFullYear();
    },
    endYear: function(){
      return this.get('parentView.parentView.endYear') || (this.startYear() - 100);
    },
    content: Ember.computed(function(){
      var years = [];
      for(var i=this.startYear(); i>=this.endYear(); i--){
        years.push(i + "");
      }
      return Ember.A(years);
    })
  })
});

EF.DateField = EF.BaseField.extend({
  InputView: EF.DateComponent.extend({
    init: function(){
      this._super();
    },
  }),
  value: Ember.computed(function(key, value){
    if(arguments.length === 1){
      return this.get('inputView.value');
    }else{
      this.set('inputView.value', value);
      return value;
    }
  })
});
