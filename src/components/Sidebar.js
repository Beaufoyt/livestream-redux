import React, { PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import Classnames from 'classnames';
import PureComponent from './PureComponent';

export default class Sidebar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showBurgerNav: false,
    };
  }

  static propTypes = {
    size: PropTypes.string.isRequired,
  }

  getSiteTitle() {
    return this.props.size === 'expanded' ? 'React Live' : 'R';
  }

  getSidebarClass() {
    return `sidebar ${this.props.size}`;
  }

  toggleNav() {
    this.setState({
      showBurgerNav: !this.state.showBurgerNav,
    });
  }

  getNavClassName() {
    const navclass = Classnames('burger-nav', {
      'show-burger-nav': this.state.showBurgerNav,
    });

    return navclass;
  }

  getNavBar() {
    return (
      <div>
        <button className="btn btn-success burger-menu" onClick={() => this.toggleNav()}>Menu</button>
        <Nav className={this.getNavClassName()} bsStyle="pills" stacked activeKey={1}>
          <NavItem eventKey={1} href="#">NavItem 1 content</NavItem>
          <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
        </Nav>
      </div>
    );
  }

  render() {
    return (
      <div className={ this.getSidebarClass() }>
        <div className="sidebar-logo">
          <h2 className="sidebar-title">{this.getSiteTitle()}</h2>
        </div>
        { this.getNavBar() }
      </div>
    );
  }
}
