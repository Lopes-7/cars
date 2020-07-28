/**
 * IMPORTS
 */ 
import React from 'react';
import {useState} from 'react';
import {Alert} from '@blueprintjs/core';
import {Button} from '@blueprintjs/core';
import {InputGroup} from '@blueprintjs/core';
import {Spinner} from '@blueprintjs/core';


/**
 * STYLE
 */
import '../styles/sidebarform.css'

/**
 * CODE
 */

/**
 * CONSTANTS
 */
const url = 'http://157.230.213.199:3000/api/cars';
const successMsg = 'Carro adicionado, convém atualizar a lista';
const failMsg = 'Não foi possivel registrar o carro.';

function SidebarForm() {
    // alert is open state
    const [alert, setAlert] = useState(false);

    // new car state
    const [car, setCar] = useState({title: '', brand: '', price: '', age: ''});

    // component error on posting state
    const [hasError, setHasError] = useState(false);

    // component posting data state
    const [isPosting, setIsPosting] = useState(false);

    // function to post a new car in database
    function addCar() {
        // form is missing information: do nothing
        if ((car.title === '') ||
            (car.brand === '') ||
            (car.price === '') ||
            (car.age === ''))
            return             

        // set alert flag to open it
        setAlert(true);

        // set is posting flag to show spinner
        setIsPosting(true);

        // API call to add new car
        fetch(url, {
            method: 'post',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => {
            res.json();
            if (res.status === 400)
                setHasError(true);
        }).then(() => {
            setIsPosting(false);
        }).catch(() => {
            setIsPosting(false);
            setHasError(true)
        });

        // clear text inputs
        resetInputs();
        
        // reset internal car state
        setCar({title: '', brand: '', price: '', age: ''});
    }

    // function to update car state
    function handleInputChange(event) {
        const {id, value} = event.target;
        setCar({...car, [id]: value});
    }

    // function to reset all inputs
    function resetInputs() {
        document.getElementById("title").value = '';
        document.getElementById("brand").value = '';
        document.getElementById("price").value = '';
        document.getElementById("age").value = '';
    }

    return ( 
        <div>
            <InputGroup className="input" 
                        id="title"
                        onChange={handleInputChange}
                        placeholder="Nome" />
            <InputGroup className="input"
                        id="brand"
                        onChange={handleInputChange}
                        placeholder="Marca" />
            <InputGroup className="input"
                        id="price"
                        onChange={handleInputChange}
                        placeholder="Preço" />
            <InputGroup className="input"
                        id="age"
                        onChange={handleInputChange}
                        placeholder="Ano" />
            <Button className="button" onClick={addCar} >Adicionar carro</Button>
            <Alert
                intent="primary"
                className="alert"
                canOutsideClickCancel="true"
                isOpen={alert}
                onClose={() => setAlert(false)}>
                    {/*render spinner when posting data*/}
                    {isPosting && <Spinner className="spinner"/>}
                    {/*render message according to result */}
                    {!isPosting &&
                        (hasError ? <span>{failMsg}</span> :
                                    <span>{successMsg}</span>)}
            </Alert>
        </div>
    );
}


/**
 * EXPORTS
 */
export {SidebarForm};
