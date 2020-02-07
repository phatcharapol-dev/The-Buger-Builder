import React from 'react';
import classes from "./Modal.module.css";
import BackDrop from '../BackDrop/BackDrop';
import Aux from '../../../hoc/Auxily/Auxily'

class Modal extends React.Component {
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    componentWillUpdate(){
        console.log('[Modal] will update');
    }
    render(){
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.click}/>
                <div className={classes.Modal} 
                style={this.props.show ? {
                    display:"block",
                    } :{
                    display:'none',
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
    
}

export default Modal ;