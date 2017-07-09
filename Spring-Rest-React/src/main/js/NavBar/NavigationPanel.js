const React = require('react');
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

class NavigationPanel extends React.Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Sweden Painting</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    	<LinkContainer to="/paintings">
                    		<NavItem >PaintingsTable</NavItem>
                    	</LinkContainer>
                        <LinkContainer to="/paintingalbum">
                            <NavItem >PaintingsAlbum</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/paintinginfo">
                            <NavItem >Painting Info</NavItem>
                        </LinkContainer>



                        <NavDropdown eventKey={3} title="Others" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Api</MenuItem>
                            <LinkContainer to="/paintinginfo">
                            <MenuItem eventKey={3.2}>Painting</MenuItem>
                            </LinkContainer>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

module.exports = NavigationPanel;