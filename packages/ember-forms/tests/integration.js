test("it creates a form", function() {
  var form = EF.Form.create({
    template: Ember.Handlebars.compile(
      '{{ field name }}'+
      '{{ field email type="textarea"}}'
    )
  });

  Ember.run(function(){
    form.appendTo("#qunit-fixture");
  });

  equal(form.$('.input input').length, 1, "it has a text field");
  equal(form.$('.input textarea').length, 1, "it has a text area");

  Ember.run(function(){
    form.destroy();
  });
});
