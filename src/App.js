import React from 'react';
import './App.css';
import Aux from './hoc/Auxily/Auxily';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Route,Switch} from 'react-router-dom';
function App() {
  return (
      <Aux>
      <Layout>
        <Switch>
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/order' component={Orders}/>
        </Switch>
      </Layout>
      </Aux>
    
  );
}

export default App;
