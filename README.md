# Ember Forms

Ember forms is a library for Ember.js to assist in the creation of forms and
binding them to objects.

**Disclaimer: Under hard development!**

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
