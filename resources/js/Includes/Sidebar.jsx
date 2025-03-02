import { Link, usePage } from '@inertiajs/react'
import AdminLTELogo from "admin-lte/dist/img/AdminLTELogo.png"
import userLogo from "admin-lte/dist/img/user1-128x128.jpg"
import React from 'react';

const Sidebar = React.memo(() => {
    const page = usePage();
    const currentURL = page.url;
    const user = page.props.auth.user;
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                <img src={AdminLTELogo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={userLogo} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <Link href={route('profile.edit')} className="d-block">{user.name}</Link>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item">
                            <Link href={route('dashboard')} className={`nav-link ${currentURL.includes('dashboard') ? 'active' : ''}`}>
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className={`nav-item ${currentURL.includes('/users') ? 'menu-is-opening menu-open' : ''}`}>
                            <a href="#" className={`nav-link ${currentURL.includes('/users') ? 'active' : ''}`}>
                                <i className="nav-icon fas fa-users"></i>
                                <p>Users <i className="right fas fa-angle-left"></i></p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link href={route('users.index')} className={`nav-link ${currentURL.includes('/users') ? 'active' : ''}`}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Users List</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </nav>
            </div>
        </aside>
    )
});

export default Sidebar