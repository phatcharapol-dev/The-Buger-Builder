import React from 'react' ;
import classes from './BurgerIngredient.module.css' ;
import PropTypes from 'prop-types';
class BurgerIngredient extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        
        }
    }
    render(){
        let ingredient = null
        switch(this.props.type){
            case('BreadBottom'):
                ingredient=<div className={classes.BreadBottom}></div>
                break;
            case('BreadTop'):
                ingredient= (<div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>)
                break;
            case('Meat'):
                ingredient=<div className={classes.Meat}></div>
                break;
            case('Cheese'):
                ingredient=<div className={classes.Cheese}></div>
                break;
            case('Salad'):
                ingredient=<div className={classes.Salad}></div>
                break;
            case('Bacon'):
                ingredient=<div className={classes.Bacon}></div>
                break;
            default:
                ingredient=null;
        }
        return ingredient ;
    }
    
  
}
BurgerIngredient.propType = {
    type:PropTypes.string.isRequired
}
export default BurgerIngredient ;