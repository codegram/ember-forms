test("adds the proper options to an unbound select", function(){

  var unboundSelect = EF.UnboundSelect.create({
    prompt: 'Hola',
    content: [1, 2, 3]
  });

  Ember.run(function(){
    unboundSelect.appendTo("#qunit-fixture");
    unboundSelect.set('value', 2);
  });

  equal(unboundSelect.$("option").length, 4, "renders three options");
  var selectedOption = unboundSelect.$("option[selected]");
  equal(selectedOption.text(), "2", "it selects an element");

  Ember.run(function(){
    unboundSelect.destroy();
  });
});
