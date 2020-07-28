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

    // component display data by state
    const [displayBy, setDisplayBy] = useState('title');

    // component fetching data state
    const [isFetching, setIsFetching] = useState(false);
    
    // component error on fetching data state
    const [hasError, setHasError] = useState(false);

    // component should refresh state
    const [refresh, setRefresh] = useState(false);

    // component search value state
    const [searchValue, setSearchValue] = useState('');

    // instance of abort controller
    const controller = new window.AbortController();

    // fetch data from API when component is mounted and when refresh flag is set
    useEffect(() => {
        // set is fetching flag to show spinner
        setIsFetching(true);
        
        // API call
        fetch(url, {method: 'get',
                    headers: {'Accept': 'application/json'},
                    signal: controller.signal})
        .then(res => res.json())
        .then(res => {
            setData(res);
            setIsFetching(false);
        })
        .catch(() => setHasError(true));
        
        // turn off refresh flag
        setRefresh(false);

        // clean up function
        return function cleanUp() {
            controller.abort();
        };
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
    
    // order data according to display by state
    switch(displayBy) {
        case 'title':
            selectedRows.sort((a,b) => {return a.title.localeCompare(b.title)})
            break
        
        case 'brand':
            selectedRows.sort((a,b) => {return a.brand.localeCompare(b.brand)})
            break
        
        case 'price':
            selectedRows.sort((a,b) => {return Number(a.price) - Number(b.price)})
            break
    
        case 'age':
            selectedRows.sort((a,b) => {return a.age - b.age})
            break
    }

    return (
        <div className="display">
            {/* passing set search value function to child component */}
            <SearchBar dispatch={setSearchValue} refresh={setRefresh}></SearchBar>
            
            <DisplayHeader setDisplayBy={setDisplayBy}></DisplayHeader>
            
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
