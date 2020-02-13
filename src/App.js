import React from 'react';
import './App.css';
import Aux from './hoc/Auxily/Auxily';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
function App() {
  return (
      <Aux>
      <Layout>
        <Switch>
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/checkout' component={Checkout}/>
        </Switch>
      </Layout>
      </Aux>
    
  );
}

export default App;
