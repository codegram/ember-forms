# Ember Forms

Ember forms is a library for Ember.js to assist in the creation of forms and
binding them to objects.

**Disclaimer: Ultra-alpha shit!**

## Usage

Just declare your form as a view extending EF.Form:

```Javascript
App.PostForm = EF.Form.extend({
  objectBinding: 'App.someObject',
  template: Ember.Handlebars.compile(
    '{{field title}}{{field body type=textarea}}' +
    '{{form buttons}}'
  ),
  save: function(data){
    this.get('object').setProperties(data);
  }
});
```
