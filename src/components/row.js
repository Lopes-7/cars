/**
 * IMPORTS
 */ 
import React from 'react';
import {useState} from 'react';
import {Alert} from '@blueprintjs/core';
import {Button} from '@blueprintjs/core';
import {Toaster} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';


/**
 * STYLE
 */
import '../styles/row.css';


/**
 * CODE
 */

/**
 * CONSTANTS
 */
const url = 'http://157.230.213.199:3000/api/cars/';
const toaster = Toaster.create({position: "top"});

function Row (props) {
    // alert is open state
    const [alert, setAlert] = useState(false);

    // component error on deleting data state
    const [hasError, setHasError] = useState(false);
   
    // function to close delete alert
    function closeAlert() {
        setAlert(false);
    }

    // function to handle the click on delete button
    function handleClickDelete () {
        setAlert(true);
    }

    // function to delete car in the database
    async function deleteCar() {
        // API call
        fetch(url + props.id, {method: 'delete', headers: {'Accept': 'application/json'}})
        .then(res => res.json())
        .then(res => {
            console.log('Objected deleted:')
            console.log(res);
        })
        .catch(() => setHasError(true));

        // close alert
        setAlert(false);

        // show toast
        toaster.show({className: "toast", message: "Carro excluído, convém atualizar a lista"});
    }

    return ( 
        <div className="row">
            <div className="car-row">{props.title}</div>
            <div className="brand-row">{props.brand}</div>
            <div className="price-row">{props.price}</div>
            <div className="age-row">{props.age}</div>
            <Button className="delete"
                    icon={IconNames.TRASH}
                    minimal={true}
                    onClick={handleClickDelete} />
            <Alert className="deletealert"
                   cancelButtonText="Cancelar"
                   confirmButtonText="Excluir"
                   icon="trash"
                   intent="danger"
                   isOpen={alert}
                   onCancel={closeAlert}
                   onConfirm={deleteCar}
                   >
                 <p>Tem certeza que quer excluir <b>{props.title}</b>?</p>
            </Alert>
        </div>
    );
}


/**
 * EXPORTS
 */
export {Row};
