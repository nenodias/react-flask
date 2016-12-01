define(function(require, exports, module){
    var React = require('react')
    var ReactDOM = require('react-dom');

    var Teste = React.createClass({
        getInitialState:function(){
            return {nome:'Nenodias',mensagem:'Seja bem vindo'}
        },
        onChange:function(evt){
            this.setState({nome: evt.target.value});
        },
        render() {
            var nome = this.state.nome;
            var mensagem = this.state.mensagem;
            return (
                <div>
                    <span>Olá {nome}</span>
                    <h2>{mensagem}</h2>
                    <input type="text" onChange={this.onChange} defaultValue={nome} />
                </div>
            );
        }
    });
    module.exports = Teste;

});