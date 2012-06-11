# Ember Forms

Ember forms is a library for Ember.js to assist in the creation of forms and
binding them to objects.

**Disclaimer: Ultra-alpha shit!**

## Usage

### Simple example

Just declare your form as a view extending EF.Form:

```Javascript
App.PostForm = EF.Form.extend({
  objectBinding: 'App.someObject',
  template: Ember.Handlebars.compile(
    '{{field title label="Post title"}}' +
    '{{field body as="textarea"}}' +
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
