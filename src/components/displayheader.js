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
function DisplayHeader(props) {

    // function to handle click
    function handleClick (event) {
        // set displayBy state in father component
        props.setDisplayBy(event.target.id);
    }

    return ( 
        <div className="header">
            <div className="headertitle" id="title" onClick={handleClick}>Nome</div>
            <div className="headerbrand" id="brand" onClick={handleClick}>Marca</div>
            <div className="headerprice" id="price" onClick={handleClick}>Preço</div>
            <div className="headerage" id="age" onClick={handleClick}>Ano</div>
        </div>
    );
}


/**
 * EXPORTS
 */
export {DisplayHeader};
