import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import UnivCatalog from './components/university/UnivCatalog';
import CreateUniv from './components/university/CreateUniv'
import EditUniv from './components/university/EditUniv'
import ShowUniv from './components/university/ShowUniv'

function App() {  
  return (     
    <Router>
      <Switch>
        <Route
          exact path='/' component={ () => ( <UnivCatalog /> ) } />
        <Route
          path='/create' component={ () => ( <CreateUniv /> ) } />
        <Route
          path='/edit/:id' component={ () => ( <EditUniv /> ) } />
        <Route
          path='/show/:id' component={ () => ( <ShowUniv /> ) } />
      </Switch>
    </Router> 
  )
}

export default App;
