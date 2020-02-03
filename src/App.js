import React from 'react';
import './App.css';
import Aux from './hoc/Auxily';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  return (
      <Aux>
      <Layout>
        <BurgerBuilder/>
      </Layout>
      </Aux>
    
  );
}

export default App;
