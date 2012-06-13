# Ember Forms [![Build Status](https://secure.travis-ci.org/codegram/ember-forms.png?branch=master)](http://travis-ci.org/codegram/ember-forms)

Ember forms is a library for Ember.js to assist in the creation of forms,
binding them to objects and extracting their data.

## Usage

### Simple example

Just declare your form as a view extending EF.Form:

```Javascript
App.PostForm = EF.Form.extend({
  objectBinding: 'App.someObject',
  gender: Ember.A([{id: 'm', name: 'Male'}, {id: 'f', name: 'Female'}]),
  template: Ember.Handlebars.compile(
    '{{field title label="Post title"}}' +
    '{{field body as="textarea"}}' +
    '{{field gender as="select" optionsBinding="formView.gender"}}' +
    '{{form buttons name="Save post"}}'
  ),
  save: function(data){
    this.get('object').setProperties(data);
  }
});
```

### More complex example

Just declare your form as a view extending EF.Form:

```Javascript
App.PostForm = EF.Form.extend({
  objectBinding: 'App.someObject',
  save: function(data){
    this.get('object').setProperties(data);
  }
});
```

Then create a handlebars layout more complex than that:

```Handlebars
<fieldset>
  <legend>User data</legend>
  {{field name}}
  {{field gender}}
</fieldset>
<fieldset>
  <legend>Other data</legend>
  {{field comments as="textarea"}}
</fieldset>
{{form buttons}}
```

## Field types

Right now only three field types are supported:

### text
`<input type='text' />`

### textarea
`<textarea/>`

### select
`<select/>` tag with options. Accepts:

* **content**: An array following [ember's conventions](http://docs.emberjs.com/#doc=Ember.Select&method=content&src=false)
* **optionValuePath**: The name of the `property` that should be used as value.
* **optionLabelPath**: The name of the `property` that should be used as label.

### date
Three `<select/>` tags representing day, month and year.

### All the fields

All the fields also accept the following options:
* **name**: Overrides the `name` attribute.
* **label**: Overrides the label name

## Contributing

* Fork the project.
* Make your feature addition or bug fix.
* Add specs for it. This is important so we don't break it in a future
  version unintentionally.
* Commit, do not mess with rakefile, version, or history.
  If you want to have your own version, that is fine but bump version
  in a commit by itself I can ignore when I pull.
* Send me a pull request. Bonus points for topic branches.

## License

MIT License. Copyright 2011 [Codegram Technologies](http://codegram.com)
