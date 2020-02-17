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
import * as actionType from '../../store/action';

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
            spinnerFlag:false,
            error:false
        }    
    }
    componentDidMount(){
        // axios.get('https://react-burger-builder-d5025.firebaseio.com/ingredients.json')
        // .then(res => {
        //     console.log(res);
        //     this.setState({
        //         burgerIngredient:{...res.data}
        //     })
        // })
        // .catch(err => {
        //     console.log(err)
        //     this.setState({
        //         error:true
        //     })
        // })
    }

    purchaseHandler = () => {
        this.setState({
            purchaseModalFlag:true
        })
    }

    cancelModalHandler = () => {
        this.setState({
            purchaseModalFlag:false
        })
    }
    continueModalHandler = () =>{
        // let queryParams = [];
        // for(let i in this.props.ing){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ing[i]))
        // }
        // queryParams.push('TotalPrice='+encodeURIComponent(this.props.price))
        // const queryString=queryParams.join('&');
        // console.log(queryParams);
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+queryString
        // });
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
        
        let burger = this.state.error ? <p>Ingredients can't be loaded !</p> : <Spinner/> ;
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
                buildctrls={this.state.buildControls}/>
            </Aux> 

            ordersummary =  <OrderSummary
                totalPrice={this.props.price} 
                listIngredient={this.props.ing}
                cancelModal={this.cancelModalHandler}
                continueModal={this.continueModalHandler}
                />; 
        }
        if(this.state.spinnerFlag){
            ordersummary = (<Spinner/>);
        }
        console.log(this.state);
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
        ing:state.burgerIngredient,
        price:state.TotalPrice,
        purchaseFlag:state.PurchaseFlag
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd:(ingredientType) => dispatch({type:actionType.AddIngredient,ingredientType:ingredientType}),
        onIngredientRemove:(ingredientType) => dispatch({type:actionType.RemoveIngredient,ingredientType:ingredientType})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios)) ;