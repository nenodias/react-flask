define(function(require, exports, module){
    var React = require('react')
    var ReactDOM = require('react-dom');

    var Teste = React.createClass({
        render() {
            var nome = this.props.mensagem;
            var mensagem = this.props.mensagem;
            return (
                <div>
                    <span>Olá {nome}</span>
                    <h2>{mensagem}</h2>
                </div>
            );
        }
    });
    module.exports = Teste;

});