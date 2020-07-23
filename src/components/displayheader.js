/**
 * IMPORTS
 */ 
import React from 'react';


/**
 * STYLE
 */
import '../styles/displayheader.css';


/**
 * CODE
 */
function DisplayHeader() { 
    return ( 
        <div className="header">
            <div className="headertitle">Nome</div>
            <div className="headerbrand">Marca</div>
            <div className="headerprice">Preço</div>
            <div className="headerage">Ano</div>
        </div>
    );
}


/**
 * EXPORTS
 */
export {DisplayHeader};
