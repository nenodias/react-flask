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
            if(history.pushState) {
                history.pushState(null, null, url);
                var evento = new Event('hashchange');
                window.dispatchEvent(evento);
            }else {
                location.href = url;
            }
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
                                <CustomNavItem eventKey={1} href="#/teste">Teste</CustomNavItem>
                                <CustomNavItem eventKey={2} href="#/">Link</CustomNavItem>
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

    var routes = {
        '/':{
            component:Index
        },
        '/teste':{
            component:Teste
        }
    }

    var router = function(e) {
        // Current route url (getting rid of '#' in hash as well):
        var url = location.hash.slice(1) || '/';
        // Get route by url:
        var chaves_url = Object.keys(routes);
        var data = {};
        var route = undefined;
        for (var i = 0; i < chaves_url.length; i++) {
            var pattern = new RegExp(chaves_url[i]);
            var result = url.match(pattern);
            if (result != null) {
                route = routes[chaves_url[i]];
                var parts = url.split('?');
                if(parts.length > 1){
                    var params = parts[1].split('&');
                    var val = "";
                    for ( var i = 0; i < params.length; i++) {
                        var paramNameVal = params[i].split('=');
                        val = paramNameVal[1];
                        data[ paramNameVal[0] ] = val;
                    }
                    data = val;
                }
            }
        }
        if(route !== undefined){
            AppDispatcher.dispatch({
              type: 'page',
              component: route.component,
              params:data
            });
        }else{
            AppDispatcher.dispatch({
              type: 'page',
              component: NoMatch,
              params:data
            });
        }
    };

    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
    //window.addEventListener('popstate', router);

    var MenuApp = React.createClass({
        getInitialState:function(){
            return {'root': routes['/']}
        },
        componentDidMount: function() {
            RouterStore.addChangeListener(this.dispatchPage);
        },
        dispatchPage: function(signal) {
            this.setState({'root':signal});
        },
        render:function(){
            var Component = this.state.root.component;
            var params = this.state.root.params;
            return <App><Component params={params} /></App>;
        }
    });

    ReactDOM.render(
        <MenuApp />,
        document.getElementById('root')
    );

});