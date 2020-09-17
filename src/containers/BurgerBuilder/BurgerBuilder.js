import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES ={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7,
}
class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }
    updatepurchaseState (ingredients){
    
        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchasable:sum>0});
    }
    addIngredientHandler = (type) =>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice=this.state.totalPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
        this.updatepurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) =>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount=oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice=this.state.totalPrice-priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients})        
        this.updatepurchaseState(updatedIngredients);
    }
    purchaseHandler = ()=>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () =>{
        alert('You can continue!');
    }
    render () {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0    
        }
        return (
            <Aux>
                <Model show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}/>
                </Model>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                ordered={this.purchaseHandler}
                purchasable={this.state.purchasable}
                price ={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;