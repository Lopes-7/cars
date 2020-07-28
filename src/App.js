/**
 * IMPORTS
 */
import React from 'react';
import {Display} from './components/display';
import {Sidebar} from './components/sidebar';


/**
 * STYLE
 */
import '@blueprintjs/core/lib/css/blueprint.css';
import 'normalize.css';
import './App.css';


/**
 * CODE
 */
function App() { 
    return (
      <div className="App">
          <Sidebar></Sidebar>
          <Display></Display>
      </div>
    );
}

/**
 * EXPORTS
 */
export default App;
