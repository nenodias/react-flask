define(function(require, exports, module){
    var React = require('react');
    var ReactDOM = require('react-dom')
    var Teste = require('./teste');

    ReactDOM.render(
      <h1>Hello, world!<Teste nome="LOL" mensagem="Seje menos nervosa"/></h1>,
      document.getElementById('root')
    );
});