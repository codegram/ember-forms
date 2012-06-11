# Ember Forms

Ember forms is a library for Ember.js to assist in the creation of forms and
binding them to objects.

*Disclaimer: Ultra-alpha shit!*

## Usage

Just declare your form as a view extending EF.Form:

```Javascript
App.PostForm = EF.Form.extend({
  objectBinding: 'App.someObject',
  save: function(data){
    this.get('object').setProperties(data);
    // If you're using ember-data
    App.store.commit();
  }
});
```

