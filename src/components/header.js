import { Link } from "gatsby";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";
import logo from "../images/favicon400.png";
import "../style/layout.scss";

const Header = ({ siteTitle }) => (
  <Navbar className="navBg fixed-top" bg="light" variant="light" expand="lg">
    <Navbar.Brand as={Link} href="/" className="siteTitle">
      <img src={logo} alt="Home" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavItem>
          <Nav.Link
            as={Link}
            activeClassName="active"
            to="/information"
          >
            記事一覧
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link
            as={Link}
            activeClassName="active"
            to="/contact"
          >
            お問い合わせ
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link
            as={Link}
            activeClassName="active"
            to="/abouthis"
          >
            DevpediaCodeについて
          </Nav.Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: `DevpediaCode`,
};

export default Header;
