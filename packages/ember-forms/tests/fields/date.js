test("it creates a date field", function() {
  var dateField = EF.DateField.create({});

  Ember.run(function(){
    dateField.appendTo("#qunit-fixture");
  });

  equal(dateField.get('value'), undefined, "it is undefined by default");

  var date = new Date(),
      day = date.getUTCDate(),
      month = date.getUTCMonth(),
      year = date.getUTCFullYear();

  Ember.run(function(){
    dateField.set('value', date);
  });

  equal(dateField.$('select:first option[selected]').val(), day + '');
  equal(dateField.$('select:nth-child(2) option[selected]').val(), month + '');
  equal(dateField.$('select:nth-child(3) option[selected]').val(), year + '');

  Ember.run(function(){
    dateField.destroy();
  });
});

test("it adds some appropiate field names", function() {
  var dateField = EF.DateField.create({
    name: 'test'
  });

  Ember.run(function(){
    dateField.appendTo("#qunit-fixture");
  });

  equal(dateField.$('select:first').attr('name'), 'test_day');
  equal(dateField.$('select:nth-child(2)').attr('name'), 'test_month');
  equal(dateField.$('select:nth-child(3)').attr('name'), 'test_year');

  Ember.run(function(){
    dateField.destroy();
  });
});

test("options", function() {
  var dateField = EF.DateField.create({
    startYear: 2050,
    endYear: 2012
  });

  Ember.run(function(){
    dateField.appendTo("#qunit-fixture");
  });

  equal(dateField.$('select:nth-child(3) option:nth-child(2)').val(), '2050', 'it sets the startYear');
  equal(dateField.$('select:nth-child(3) option:last').val(), '2012', 'it sets the endYear');

  Ember.run(function(){
    dateField.destroy();
  });
});
