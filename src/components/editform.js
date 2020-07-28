/**
 * IMPORTS
 */ 
import React from 'react';
import {useState} from 'react';
import {Button} from '@blueprintjs/core';
import {InputGroup} from '@blueprintjs/core';


/**
 * STYLE
 */
import '../styles/editform.css'


/**
 * CODE
 */

/**
 * CONSTANTS
 */
const url = 'http://157.230.213.199:3000/api/cars/';

function EditForm (props) {
    // component car state
    const [car, setCar] = useState({title: props.title,
                                    brand: props.brand,
                                    price: props.price,
                                    age: props.age});

    // component error on posting state
    const [hasError, setHasError] = useState(false);

    // component posting data state
    const [isPosting, setIsPosting] = useState(false);

    // function to update car state
    function handleInputChange(event) {
        const {id, value} = event.target;
        setCar({...car, [id]: value});
    }


    function cancel() {
        // car were not edited
        props.setEdited(false);

        // close dialog
        props.setDialog(false);    
    }

    // function to edit a car in database
    async function editCar () {
        // user deleted form information: do nothing
        if ((car.title === '') ||
            (car.brand === '') ||
            (car.price === '') ||
            (car.age === ''))
            return             

        // set is posting flag to show spinner
        setIsPosting(true);

        // API call to edit existing car
        fetch(url + props.id, {
            method: 'put',
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
            props.setEdited(true);
        }).catch(() => {
            setIsPosting(false);
            setHasError(true)
        });

        // close
        props.setDialog(false);
    }

    return ( 
        <div className="editform">
            <InputGroup className="input" 
                        id="title"
                        onChange={handleInputChange}
                        placeholder="Nome"
                        defaultValue={props.title}
                        />
            <InputGroup className="input"
                        id="brand"
                        onChange={handleInputChange}
                        placeholder="Marca"
                        defaultValue={props.brand}/>
            <InputGroup className="input"
                        id="price"
                        onChange={handleInputChange}
                        placeholder="Preço"
                        defaultValue={props.price}/>
            <InputGroup className="input"
                        id="age"
                        onChange={handleInputChange}
                        placeholder="Ano"
                        defaultValue={props.age}/>
            <Button className="editbutton" onClick={editCar}>Editar carro</Button>
            <Button className="cancelbutton" onClick={cancel}>Cancelar</Button>

        </div>
    );
}


/**
 * EXPORTS
 */
export {EditForm};
