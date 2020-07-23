/**
 * IMPORTS
 */ 
import React from 'react';


/**
 * STYLE
 */
import '../styles/row.css';


/**
 * CODE
 */
function Row(props) { 
    return ( 
        <div className="row">
            <div className="title">{props.title}</div>
            <div className="brand">{props.brand}</div>
            <div className="price">{props.price}</div>
            <div className="age">{props.age}</div>
        </div>
    );
}


/**
 * EXPORTS
 */
export {Row};
