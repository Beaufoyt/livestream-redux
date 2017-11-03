import React from 'react';
import { withRouter } from 'react-router-dom';

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

    isSubMenuLinkActive = (id) => {
        return window.location.pathname.split('/').find(pathBit => pathBit === id);
    }

    resetSubMenus = () => {
        const newSubMenus = Object.assign({}, this.state.subMenus);

        Object.keys(newSubMenus).forEach((key) => {
            newSubMenus[key] = false;
        });

        this.setState({ subMenus: newSubMenus });
    }

    render = () => {
        return (
            <div className="sidebar">
                <div className="logo-holder" />
                <ul className="sidebar-links">
                    <SidebarLink label="Dashboard" onClick={this.resetSubMenus} icon="dashboard" to="/dashboard" />
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
                </ul>
            </div>
        );
    }
}

export default withRouter(Sidebar);
