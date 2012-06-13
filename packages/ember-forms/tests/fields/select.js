test("it creates a select", function() {
  var select = EF.SelectField.create({
    content: Ember.A([
      {id: 1, name: 'James'},
      {id: 2, name: 'John'}
    ]),
    optionValuePath: 'id',
    optionLabelPath: 'name'
  });

  Ember.run(function(){
    select.appendTo("#qunit-fixture");
  });

  equal(select.$("option").length, 2, "it is populated with two options");
  var firstOption = select.$("option:first");
  equal(firstOption.attr('value'), "1", "it assigns a value");
  equal(firstOption.text(), "James", "it assigns a name");

  Ember.run(function(){
    select.destroy();
  });
});

test("it uses an array as both value and label", function() {
  var select = EF.SelectField.create({
    content: Ember.A([1, 2, 3])
  });

  Ember.run(function(){
    select.appendTo("#qunit-fixture");
  });

  equal(select.$("option").length, 3, "it is populated with three options");
  var firstOption = select.$("option:first");
  equal(firstOption.attr('value'), "1", "it assigns a value");
  equal(firstOption.text(), "1", "it assigns a name");

  Ember.run(function(){
    select.destroy();
  });
});
