import React from 'react';
import './App.css';
import Aux from './hoc/Auxily/Auxily';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';



class App extends React.Component{
  componentDidMount(){
    this.props.onAuthCheckState();
  }
  render(){
      let route = (
        <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
        </Switch>
      )
      if(this.props.isAuth){
        route = (
          <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/order' component={Orders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to='/'/>
          </Switch>
        )
      }
      return (
        <Aux>
        <Layout>
          {route}
        </Layout>
        </Aux>
      
      );
  }
  
}
const mapStateToProps = state => {
  return {
    isAuth:state.auth.token != null,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState:()=>dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
