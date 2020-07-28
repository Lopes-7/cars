/**
 * IMPORTS
 */ 
import React from 'react';
import {Button} from '@blueprintjs/core';
import {InputGroup} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';


/**
 * STYLE
 */
import '../styles/searchbar.css';


/**
 * CODE
 */
function SearchBar(props) {
    // function to handle input text change
    function handleChange (event) {
        // dispatch update in search value to father component
        props.dispatch(event.target.value);
    }

    // function to handle press in refresh button
    function handleRefresh () {
        // dispatch press in refresh button to father component
        props.refresh(true);
    }

    return ( 
        <div className="searchbar">
            <InputGroup className="searchinput"
                        leftIcon="search"
                        onChange={handleChange}
                        small="true"
                        type="search" />
            <Button className="refresh"
                    icon={IconNames.REFRESH}
                    minimal="true"
                    onClick={handleRefresh}>Atualizar</Button>
        </div>
    );
}


/**
 * EXPORTS
 */
export {SearchBar};
