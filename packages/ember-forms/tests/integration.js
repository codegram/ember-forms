test("it creates a form", function() {
  var form = EF.Form.create({
    fields: [{name: 'John'}, {name: 'email'}]
  });

  Ember.run(function(){
    form.appendTo("#qunit-fixture");
  });

  console.log(form.$().text());

  equal(form.$('.input input').length, 2, "it has two fields");

  Ember.run(function(){
    form.destroy();
  });
});
