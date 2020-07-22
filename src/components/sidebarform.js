/**
 * IMPORTS
 */ 
import React from 'react';
import {Button} from '@blueprintjs/core';
import {InputGroup} from '@blueprintjs/core';


/**
 * STYLE
 */
import '../styles/sidebarform.css'

/**
 * CODE
 */
function SidebarForm() {
    return ( 
        <div>
            <InputGroup className="input" placeholder="Nome" />
            <InputGroup className="input" placeholder="Marca" />
            <InputGroup className="input" placeholder="Preço" />
            <InputGroup className="input" placeholder="Ano" />

            <Button className="button">Adicionar carro</Button>
        </div>
    );
}


/**
 * EXPORTS
 */
export {SidebarForm};
