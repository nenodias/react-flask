define(function(require, exports, module){
    var React = require('react');
    var ReactDOM = require('react-dom')
    var Teste = require('./teste');
    
    var Dispatcher = require('flux').Dispatcher;
    var AppDispatcher = new Dispatcher();

    var Jumbotron = require('react-bootstrap').Jumbotron;
    var Button = require('react-bootstrap').Button;
    var Navbar = require('react-bootstrap').Navbar;
    var Nav = require('react-bootstrap').Nav;
    var NavItem = require('react-bootstrap').NavItem;
    var NavDropdown = require('react-bootstrap').NavDropdown;
    var MenuItem = require('react-bootstrap').MenuItem;

    var MicroEvent = require('microevent');

    var RouterStore = Object.assign(MicroEvent.prototype, {
        addChangeListener: function(callback) {
            this.bind('change', callback);
        },
        removeChangeListener: function(callback) {
            this.unbind('change', callback);
        },
        emitChange: function(page) {
            this.trigger('change', page);
        },
        dispatcherIndex: AppDispatcher.register(function(payload) {
            switch(payload.type) {
                case 'page':
                    RouterStore.emitChange(payload.page);
                    break;
                case 'delete-item':
                    //lógica para deletar
                    break;
            }
        })
    });

    var Index = React.createClass({
        goTo:function(evt){
            var page = evt.target.getAttribute('data-page');
            AppDispatcher.dispatch({
              type: 'page',
              page: page
            });
        },
        render:function(){
            return (<div>
                        <span data-page="teste" onClick={this.goTo}>Eita Giovana</span>
                        <span data-page="vish" onClick={this.goTo}>Teste 404</span>
                    </div>)
        }
    });

    var MenuApp = React.createClass({
        getInitialState:function(){
            return {'page':'index'}
        },
        componentDidMount: function() {
            RouterStore.addChangeListener(this.dispatchPage);
        },
        dispatchPage: function(page) {
            this.setState({'page':page});
        },
        render:function(){
            switch(this.state.page){
                case 'index':
                    return <App><Index /></App>
                case 'teste':
                    return <App><Teste /></App>
                default:
                    return <App><NoMatch /></App>
            }
        }
    });

    var App = React.createClass({

        render:function(){
            return (<div>
                        <Navbar inverse collapseOnSelect>
                            <Navbar.Header>
                              <Navbar.Brand>
                                <a href="#">React-Bootstrap</a>
                              </Navbar.Brand>
                              <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                              <Nav>
                                <NavItem eventKey={1} href="teste">Teste</NavItem>
                                <NavItem eventKey={2} href="#">Link</NavItem>
                                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                  <MenuItem eventKey={3.1}>Action</MenuItem>
                                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                  <MenuItem divider />
                                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                                </NavDropdown>
                              </Nav>
                              <Nav pullRight>
                                <NavItem eventKey={1} href="#">Link Right</NavItem>
                                <NavItem eventKey={2} href="#">Link Right</NavItem>
                              </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <div>
                        {this.props.children}
                        </div>
                    </div>);
        }
    });

    var NoMatch = React.createClass({
        render:function(){
            return <h1>Not Found</h1>;
        }
    });

    ReactDOM.render(
        <MenuApp />,
        document.getElementById('root')
    );

});