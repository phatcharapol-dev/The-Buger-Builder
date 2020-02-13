import React from 'react' ;
import Aux from '../../hoc/Auxily/Auxily';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const IngredientPrice = {
    Salad:0.5,
    Meat:1,
    Cheese:0.7,
    Bacon:1.2
}
class BurgerBuilder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            burgerIngredient:null,
            buildControls:[
            {label:'Salad',type:'Salad'},
            {label:'Bacon',type:'Bacon'},
            {label:'Chesse',type:'Cheese'},
            {label:'Meat',type:'Meat'}
            ],
            TotalPrice:1.2,
            purchaseFlag:false,
            purchaseModalFlag:false,
            spinnerFlag:false,
            error:false
        }    
    }
    componentDidMount(){
        axios.get('https://react-burger-builder-d5025.firebaseio.com/ingredients.json')
        .then(res => {
            console.log(res);
            this.setState({
                burgerIngredient:{...res.data}
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({
                error:true
            })
        })
    }
    updatePurchaseState = (updateIngredient) => {
   
        const sum = Object.keys(updateIngredient).map( ingredientKey => {
            return updateIngredient[ingredientKey]
        }).reduce( (sum,el) => {
            return sum+el ;
        },0)

        this.setState({
            purchaseFlag:(sum > 0)
        })
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
        let queryParams = [];
        for(let i in this.state.burgerIngredient){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.burgerIngredient[i]))
        }
        queryParams.push('TotalPrice='+encodeURIComponent(this.state.TotalPrice))
        const queryString=queryParams.join('&');
        console.log(queryParams);
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });
        // this.setState({spinnerFlag:true})
        // const order = {
        //     ingredient:this.state.burgerIngredient,
        //     price:this.state.TotalPrice.toFixed(2),
        //     customer:{
        //         name:'Phatcharapol Tridechee',
        //         address:{
        //             street:'Test Street',
        //             zipCode:'12344',
        //             country:'Bangkok'
        //         }
        //     },
        //     deliveryMethod:'fastest'
        // }
        // axios.post('/orders.json',order)
        // .then(res => {
        //     this.setState({spinnerFlag:false,purchaseModalFlag:false});
        //     console.log(res)
        // })
        // .catch(err =>{
        //     this.setState({spinnerFlag:false,purchaseModalFlag:false});
        //     console.log(err)
        // })
    }

    addIngredientHandler = (type) => {
        //Add Ingredient
        let updateburgerIngredient = {...this.state.burgerIngredient} ;
        let oldCount = updateburgerIngredient[type];
        let updateCount = oldCount+1;
        updateburgerIngredient[type] = updateCount;

        //Add Price
        let TotalPrice = this.state.TotalPrice;
        let updateTotalPrice = TotalPrice+IngredientPrice[type] ; 
        this.setState({
            burgerIngredient:{
                ...updateburgerIngredient
             },
            TotalPrice:updateTotalPrice,
        });
        this.updatePurchaseState(updateburgerIngredient);
    }
    removeIngredientHandler = (type) => {
        let updateburgerIngredient = {...this.state.burgerIngredient} ;
        let oldCount = updateburgerIngredient[type];
        let updateCount = null;

        //Remove Ingredient
        updateCount = oldCount-1;
        updateburgerIngredient[type] = updateCount;
      
        //Remove Price
        let TotalPrice = this.state.TotalPrice;
        let updateTotalPrice = TotalPrice-IngredientPrice[type] ; 

        this.setState({
            burgerIngredient:{
                ...updateburgerIngredient
            },
            TotalPrice:updateTotalPrice,
        });
        this.updatePurchaseState(updateburgerIngredient);
       
    }

    render(){
        const disableInfo = {
            ...this.state.burgerIngredient
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0 ;
        }
        
        let burger = this.state.error ? <p>Ingredients can't be loaded !</p> : <Spinner/> ;
        let ordersummary = null;
        if(this.state.burgerIngredient){
            burger = <Aux>
                <Burger ingredients={this.state.burgerIngredient}/>
                <BuildControls
                totalPrice={this.state.TotalPrice} 
                ingredientAdd={this.addIngredientHandler} 
                ingredientRemove={this.removeIngredientHandler}
                disableInfo={disableInfo}
                purchaseFlag={this.state.purchaseFlag}
                purchaseModal={this.purchaseHandler} 
                buildctrls={this.state.buildControls}/>
            </Aux> 

            ordersummary =  <OrderSummary
                totalPrice={this.state.TotalPrice} 
                listIngredient={this.state.burgerIngredient}
                cancelModal={this.cancelModalHandler}
                continueModal={this.continueModalHandler}
                />; 
        }
        if(this.state.spinnerFlag){
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

export default withErrorHandler(BurgerBuilder,axios) ;