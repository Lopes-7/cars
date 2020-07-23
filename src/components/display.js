/**
 * IMPORTS
 */ 
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Spinner} from '@blueprintjs/core';
import {DisplayHeader} from './displayheader.js';
import {Row} from './row.js';


/**
 * STYLE
 */
import '../styles/display.css'


/**
 * CODE
 */
function Display() {
    // defining API URL and headers
    const url = 'http://157.230.213.199:3000/api/cars';
    const headers = {method: 'get', accept: 'application/json'}

    // component data state
    const [data, setData] = useState(null);

    // component fetching data state
    const [isFetching, setIsFetching] = useState(false);
    
    // component error on fetching data state
    const [hasError, setHasError] = useState(false);

    // fetch data from API only when component is mounted
    useEffect(() => {
        // set is fetching flag to show spinner
        setIsFetching(true);
        
        // API call
        fetch(url, headers)
        .then(res => res.json())
        .then(res => {
            setData(res);
            setIsFetching(false);
        })
        .catch(() => setHasError(true));
    }, []);
    
    return (
        <div className="display">
            <DisplayHeader></DisplayHeader>
            <div className="content">
            {isFetching && <Spinner className="spin" intent="primary" />}
                {data !== null && data.map(row => {
                    return <Row age={row.age}
                                brand={row.brand}
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
