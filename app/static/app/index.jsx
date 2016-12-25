define(function(require, exports, module){
    var React = require('react');
    var ReactDOM = require('react-dom')
    var Teste = require('./teste');

    var Router = require('react-router').Router;
    var Redirect = require('react-router').Redirect;
    var Route = require('react-router').Route;
    var Link = require('react-router').Link;
    var browserHistory = require('react-router').browserHistory;

    
    var Dispatcher = require('flux').Dispatcher;
    var AppDispatcher = new Dispatcher();

    var Jumbotron = require('react-bootstrap').Jumbotron;
    var Button = require('react-bootstrap').Button;
    var Navbar = require('react-bootstrap').Navbar;
    var Nav = require('react-bootstrap').Nav;
    var NavItem = require('react-bootstrap').NavItem;
    var NavDropdown = require('react-bootstrap').NavDropdown;
    var MenuItem = require('react-bootstrap').MenuItem;

    var EventEmitter = require('events').EventEmitter

    var RouterStore = Object.assign(EventEmitter.prototype, {
        addChangeListener: function(callback) {
            this.addListener('change', callback);
        },
        removeChangeListener: function(callback) {
            this.removeListener('change', callback);
        },
        emitChange: function(page) {
            this.emit('change', page);
        },
        dispatcherIndex: AppDispatcher.register(function(payload) {
            switch(payload.type) {
                case 'page':
                    RouterStore.emitChange(payload);
                    break;
                case 'delete-item':
                    //lógica para deletar
                    break;
            }
        })
    });    

    var Index = React.createClass({
        render:function(){
            return (<div>
                        <span data-page="teste">Eita Giovana</span>
                        <span data-page="vish">Teste 404</span>
                    </div>)
        }
    });

    var HrefClickMixin = {
        onClick:function(e){
            var url = e.target.getAttribute('href');
            routes.transitionTo(url);
        }
    };

    var CustomNavItem = React.createClass({
        mixins: [HrefClickMixin],
        render:function(){
            this.props.eventKey;
            return <NavItem eventKey={this.props.eventKey} onClick={this.onClick} href={this.props.href}>{this.props.children}</NavItem>
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

                                <CustomNavItem eventKey={1} href="teste">Teste</CustomNavItem>
                                <CustomNavItem eventKey={2} href="home">Link</CustomNavItem>
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
    var routes = (
        <Router history={browserHistory}>
            <Redirect from="/" to="home" />
            <Route path="/" component={App}>
                <Route path="home" component={Index}/>
                <Route path="teste" component={Teste}>
            </Route>
            <Route path="*" component={NoMatch}/>
            </Route>
        </Router>);

    ReactDOM.render(
        routes,
        document.getElementById('root')
    );

});