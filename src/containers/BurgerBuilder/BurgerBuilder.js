import React from 'react' ;
import Aux from '../../hoc/Auxily/Auxily';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            buildControls:[
            {label:'Salad',type:'Salad'},
            {label:'Bacon',type:'Bacon'},
            {label:'Chesse',type:'Cheese'},
            {label:'Meat',type:'Meat'}
            ],
        }    
    }
    componentDidMount(){
        this.props.onIngredientInitail();
    }

    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({
                purchaseModalFlag:true
            })
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    cancelModalHandler = () => {
        this.setState({
            purchaseModalFlag:false
        })
    }
    continueModalHandler = () =>{
        this.props.onPurchaseInit();
        this.props.history.push({pathname:'/checkout'})
    }

    addIngredientHandler = (type) => {
        //Add Ingredient
        let updateburgerIngredient = {...this.props.ing} ;
        let oldCount = updateburgerIngredient[type];
        let updateCount = oldCount+1;
        updateburgerIngredient[type] = updateCount;

        //Add Price
        let TotalPrice = this.props.price;
       
        this.setState({
            burgerIngredient:{
                ...updateburgerIngredient
             },
            TotalPrice:TotalPrice,
        });
        this.updatePurchaseState(updateburgerIngredient);
    }
    removeIngredientHandler = (type) => {
        let updateburgerIngredient = {...this.props.ing} ;
        let oldCount = updateburgerIngredient[type];
        let updateCount = null;

        //Remove Ingredient
        updateCount = oldCount-1;
        updateburgerIngredient[type] = updateCount;
      
        //Remove Price
        let TotalPrice = this.props.price;
       
        this.setState({
            burgerIngredient:{
                ...updateburgerIngredient
            },
            TotalPrice:TotalPrice,
        });
        this.updatePurchaseState(updateburgerIngredient);
       
    }

    render(){
        const disableInfo = {
            ...this.props.ing
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0 ;
        }
        
        let burger = this.props.error ? <p>Ingredients can't be loaded !</p> : <Spinner/> ;
        let ordersummary = null;
        if(this.props.ing){
            burger = <Aux>
                <Burger ingredients={this.props.ing}/>
                <BuildControls
                totalPrice={this.props.price} 
                ingredientAdd={this.props.onIngredientAdd} 
                ingredientRemove={this.props.onIngredientRemove}
                disableInfo={disableInfo}
                purchaseFlag={this.props.purchaseFlag}
                purchaseModal={this.purchaseHandler} 
                buildctrls={this.state.buildControls}
                isAuth={this.props.isAuth}/>
            </Aux> 

            ordersummary =  <OrderSummary
                totalPrice={this.props.price} 
                listIngredient={this.props.ing}
                cancelModal={this.cancelModalHandler}
                continueModal={this.continueModalHandler}
                />; 
        }
        if(this.props.spinnerFlag){
            ordersummary = (<Spinner/>);
        }
        return (
            <Aux>
               <Modal show={this.state.purchaseModalFlag} click={this.cancelModalHandler}>
                {ordersummary}
               </Modal>
               {burger}
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        ing:state.burgerBuilder.burgerIngredient,
        price:state.burgerBuilder.TotalPrice,
        purchaseFlag:state.burgerBuilder.purchaseFlag,
        spinnerFlag:state.burgerBuilder.spinnerFlag,
        error:state.burgerBuilder.error,
        isAuth:state.auth.token != null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd:(ingredientType) => dispatch(actions.addIngredient(ingredientType)),
        onIngredientRemove:(ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
        onIngredientInitail:() => dispatch(actions.initialIngredient()),
        onPurchaseInit:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=> dispatch(actions.SetAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios)) ;