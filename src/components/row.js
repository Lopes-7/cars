/**
 * IMPORTS
 */ 
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Alert} from '@blueprintjs/core';
import {Button} from '@blueprintjs/core';
import {Dialog} from '@blueprintjs/core';
import {Toaster} from '@blueprintjs/core';
import {IconNames} from '@blueprintjs/icons';
import {EditForm} from './editform.js';


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

    // dialog is open state
    const [dialog, setDialog] = useState(false);

    // child edited item state
    const [edited, setEdited] = useState(false);
    
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

    // show toast for edited car
    useEffect(() => {
        if (edited) {
            toaster.show({className: "toast", message: "Carro editado, convém atualizar a lista"});
        }
        setEdited(false);
    }, [edited]);

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
            <Button className="edit"
                    icon={IconNames.EDIT}
                    minimal={true}
                    onClick={() => setDialog(true)} />
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
            <Dialog className="editdialog"
                    icon={IconNames.EDIT}
                    title="Editar carro"
                    isCloseButtonShown={false}
                    isOpen={dialog}>
                    <EditForm age={props.age} 
                              brand={props.brand}
                              id={props.id}
                              price={props.price}
                              title={props.title}
                              setDialog={setDialog}
                              setEdited={setEdited} />
            </Dialog>
        </div>
    );
}


/**
 * EXPORTS
 */
export {Row};
