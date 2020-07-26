/**
 * IMPORTS
 */ 
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Spinner} from '@blueprintjs/core';
import {DisplayHeader} from './displayheader.js';
import {Row} from './row.js';
import {SearchBar} from './searchbar.js';


/**
 * STYLE
 */
import '../styles/display.css'


/**
 * CODE
 */

/**
 * CONSTANTS
 */
const url = 'http://157.230.213.199:3000/api/cars';

function Display() {
    // component data state
    const [data, setData] = useState(null);

    // component fetching data state
    const [isFetching, setIsFetching] = useState(false);
    
    // component error on fetching data state
    const [hasError, setHasError] = useState(false);

    // component should refresh state
    const [refresh, setRefresh] = useState(false);

    // component search value state
    const [searchValue, setSearchValue] = useState('');

    
    // fetch data from API when component is mounted and when refresh flag is set
    useEffect(() => {
        // set is fetching flag to show spinner
        setIsFetching(true);
        
        // API call
        fetch(url, {method: 'get', headers: {'Accept': 'application/json'}})
        .then(res => res.json())
        .then(res => {
            setData(res);
            setIsFetching(false);
        })
        .catch(() => setHasError(true));
        
        // turn off refresh flag
        setRefresh(false);
    }, [refresh]);

    // verifying which data should be rendered
    // initialize selected rows
    const selectedRows = [];
    
    // data is available: select data to show
    if (data !== null)

        for (const row of data) {
            // title is a substring of search value: select that row
            if (row.title.toLowerCase().indexOf(searchValue.trim().toLowerCase()) !== -1){
                selectedRows.push(row);
            }
        }
    
    return (
        <div className="display">
            {/* passing set search value function to child component */}
            <SearchBar dispatch={setSearchValue} refresh={setRefresh}></SearchBar>
            
            <DisplayHeader></DisplayHeader>
            
            <div className="content">
                {/* render a spinner when fetching data */}
                {isFetching && <Spinner className="spin" intent="primary" />}
    
                {/* render only the selected rows when not fetching*/}
                {!isFetching && selectedRows.map(row => {
                    return <Row age={row.age}
                                brand={row.brand}
                                id={row._id}
                                key={row._id}
                                price={row.price}
                                title={row.title} />
                    })
                }
            </div>
        </div>
    );
}


/**
 * EXPORTS
 */
export {Display};
