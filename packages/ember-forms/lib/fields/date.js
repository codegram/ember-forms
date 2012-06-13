require("ember-forms/fields/base");

EF.DateComponent = Ember.ContainerView.extend({
  childViews: ['dayView', 'monthView', 'yearView'],

  value: Ember.computed(function(key, value){
    var day, month, year;
    if (arguments.length === 1){
      day   = this.getPath('dayView.value');
      month = this.getPath('monthView.value');
      year = this.getPath('yearView.value');
      var e = Ember.empty;
      if(!e(day) && !e(month) && !e(year)){
        return new Date(year, month, day);
      }
    }else if(value){
      day = value.getDay() + '';
      month = value.getMonth() + '';
      year = value.getFullYear() + '';
      this.setPath('dayView.value', day);
      this.setPath('monthView.value', month);
      this.setPath('yearView.value', year);
    }
    return value;
  }).volatile(),

  dayView: Ember.Select.create({
    prompt: "Day",
    content: Ember.computed(function(){
      var days = [];
      for(var i=1; i<=31; i++){
        days.push(i + '');
      }
      return Ember.A(days);
    })
  }),

  monthView: Ember.Select.create({
    optionLabelPath: 'content.name',
    optionValuePath: 'content.id',
    prompt: "Month",
    content: Ember.computed(function(){
      var months = Ember.A(["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", 
        "December"]);
      return Ember.A(months.map(function(month, index){
        return {id: (index + ''), name: month};
      }));
    })
  }),

  yearView: Ember.Select.create({
    prompt: "Year",
    content: Ember.computed(function(){
      var years = [],
          currentDate = new Date(),
          currentYear = currentDate.getFullYear();
      for(var i=1920; i<=currentYear; i++){
        years.push(i + "");
      }
      return Ember.A(years);
    })
  })
});

EF.DateField = EF.BaseField.extend({
  InputView: EF.DateComponent.extend({}),
  value: Ember.computed(function(key, value){
    if(arguments.length === 1){
      return this.getPath('inputView.value');
    }else{
      this.setPath('inputView.value', value);
      return value;
    }
  })
});
