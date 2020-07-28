/**
 * IMPORTS
 */ 
import React from 'react';
import {SidebarHeader} from './sidebarheader.js'
import {SidebarForm} from './sidebarform.js'


/**
 * STYLE
 */
import '../styles/sidebar.css'


/**
 * CODE
 */
function Sidebar() { 
    return ( 
        <div className="sidebar">
            <SidebarHeader />
            <SidebarForm />
        </div>
    );
}


/**
 * EXPORTS
 */
export {Sidebar};
