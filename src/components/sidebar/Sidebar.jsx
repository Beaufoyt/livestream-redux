import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { toggleSidebar } from '../../actions/sidebar';
import PureComponent from '../PureComponent';
import SidebarLink from './SidebarLink';
import SidebarSubMenu from './SidebarSubMenu';

class Sidebar extends PureComponent {

    state = {
        subMenus: {
            tools: false,
            canvas: false,
        },
    }

    componentWillMount() {
        if (this.props.isMobile && this.props.isSidebarOpen) {
            this.props.toggleSidebar(false);
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.location.pathname !== newProps.location.pathname) {
            if (this.props.isMobile && this.props.isSidebarOpen) {
                this.props.toggleSidebar(false);
            }

            Object.keys(this.state.subMenus).forEach((key) => {
                if (this.state.subMenus[key] && !this.isSubMenuLinkActive(key, newProps.location.pathname)) {
                    this.setState({ subMenus: Object.assign({}, this.state.subMenus, { [key]: false }) });
                }
            });
        }

        if (!this.props.isMobile && newProps.isMobile) {
            this.props.toggleSidebar(false);
        } else if (this.props.isMobile && !newProps.isMobile) {
            this.props.toggleSidebar(true);
        }
    }

    expandSubMenu = (e) => {
        const { id } = e.target;

        this.setState({
            subMenus: Object.assign({}, this.state.subMenus, {
                [id]: this.isSubMenuLinkActive(id) ? true : !this.state.subMenus[id],
            }),
        });
    }

    isOpen = (id) => {
        return this.isSubMenuLinkActive(id) || this.state.subMenus[id];
    }

    isSubMenuLinkActive = (id, location = this.props.location.pathname) => {
        return location.split('/').find(pathBit => pathBit === id);
    }

    render = () => {
        return (
            <div className={`sidebar ${this.props.isSidebarOpen ? '' : 'closed'}`}>
                <ul className="sidebar-links">
                    <div className="sidebar-section">
                        <SidebarLink label="Home" icon="home" to="/welcome" />
                        <SidebarSubMenu
                            label="Tools"
                            id="tools"
                            expandSubMenu={this.expandSubMenu}
                            isSubMenuLinkActive={this.isSubMenuLinkActive}
                            isOpen={this.isOpen}
                            icon="wrench">
                            <SidebarLink label="Workbench" icon="pencil" to="/tools/workbench" />
                            <SidebarLink label="Palette" icon="paint-brush" to="/tools/palette" />
                        </SidebarSubMenu>
                    </div>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isSidebarOpen: state.sidebar.isOpen,
    isMobile: state.ui.isMobile,
    screenWidth: state.ui.screenWidth,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({ toggleSidebar }, dispatch)
);

Sidebar.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
