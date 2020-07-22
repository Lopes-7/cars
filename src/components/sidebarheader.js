/**
 * IMPORTS
 */
import {Component} from 'react';  
import React from 'react';
import {Icon} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';


/**
 * STYLE
 */
import '../styles/sidebarheader.css';


/**
 * CODE
 */
export class SidebarHeader extends Component{
    render() { 
        return ( 
            <div className='sidebarheader'>
                <Icon className='icon' icon={IconNames.DRIVE_TIME}></Icon>
                <h1 className='title'>Registrar novo carro</h1>
            </div>
         );
    }
}
