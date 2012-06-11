test("it creates a form", function() {
  var form = EF.Form.create({
    template: Ember.Handlebars.compile(
      '{{ field name }}'+
      '{{ field email as="textarea"}}' +
      '{{ form buttons }}'
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

test("it populates a form with content's values", function() {
  var content = Ember.Object.create({
    name: 'Rafael Nadal',
    email: 'rafa@capybara.com'
  });

  var form = EF.Form.create({
    content: content,
    template: Ember.Handlebars.compile(
      '{{ field name }}'+
      '{{ field email as="textarea"}}' +
      '{{ form buttons }}'
    )
  });

  Ember.run(function(){
    form.appendTo("#qunit-fixture");
  });

  var data = form.get('data');
  equal(form.$("input:first").val(), "Rafael Nadal");
  equal(data.name, 'Rafael Nadal');
  equal(form.$("textarea").val(), "rafa@capybara.com");
  equal(data.email, 'rafa@capybara.com');
});
