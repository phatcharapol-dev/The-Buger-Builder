import React from 'react';
import Aux from '../Auxily/Auxily';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigaiton/Toolbar/Toolbar';
import SideDraw from '../../components/Navigaiton/SideDraw/SideDraw';
class Layouts extends React.Component{
   constructor(props){
    super(props);
    this.state = {
        showSideDraw:false,
    }
   }

   cancelSideDrawHandler = () => {
       this.setState({
           showSideDraw:false
       })
   }
   drawerToggleHandler = () => {
        this.setState({
            showSideDraw:!this.state.showSideDraw
        })
   }
   render(){
    return (
        <Aux>
        <Toolbar drawerToggle={this.drawerToggleHandler}/>
        <SideDraw show={this.state.showSideDraw} cancelSideDraw={this.cancelSideDrawHandler}/>
        <main className={classes.main}>
            {this.props.children}
        </main>
        </Aux>
    )
   }
}

export default Layouts ;


