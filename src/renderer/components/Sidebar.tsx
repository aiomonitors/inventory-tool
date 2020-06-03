import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Traffic from './Traffic';
import '../styles/Sidebar.scss';

export type SidebarProps = {
    routes: SidebarItemProps[];
}

/**
 * # Sidebar
 * Sidebar on the app
 */
export const Sidebar = (props: SidebarProps) => {
    const { routes } = props;
    const loc = useLocation();

    return (
        <sidebar>
            <Traffic />
            <div className="routes">
                {
                    routes.map((r) => {
                        return <SidebarItem {...r} isActive={loc.pathname === r.route ? true : false} />
                    })
                }
            </div>
            <div className="sync-button">
                
            </div>
        </sidebar>
    )
}

export type SidebarItemProps = {
    name: string;
    route: string;
    image: string;
    isActive?: boolean;
}


const SidebarItem = (props: SidebarItemProps) => {
    const {
        name,
        route,
        image,
        isActive
    } = props;
    const c = `sidebar-item${isActive ? ' active' : ''}`;

    return (
        <Link to={route} className={c} >
            <img src={image} />
            <div className="text">{ name }</div>
        </Link>
    )
};
