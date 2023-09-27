import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './bottles.css'
import { addToLs, getStoredCart } from "../../Utilities/localStorages";
import Cart from "../Cart/Cart";


const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        fetch('bottle.json')
        .then(res => res.json())
        .then(data => setBottles(data));
    }, [])

    // load card from local storage
    useEffect(()=>{
       if(bottles.length > 0){
        const stroedCard = getStoredCart();
        console.log(stroedCard, bottles);
        const saveCart = [];
        for (const id of stroedCard){
            console.log(id);
            const bottle = bottles.find(bottle => bottle.id === id);
            if(bottle){
                saveCart.push(bottle)
            }
        }
        console.log('saved cart', saveCart);
        setCart(saveCart);
       }
    },[bottles])

    const handleAddToCart = bottle =>{
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLs(bottle.id);
    }

    return (
        <div>
            <h2>Bottles Available:{bottles.length}</h2>
            <Cart cart={cart}></Cart>
            <div className="bottle-container">
            {
                bottles.map(bottle => <Bottle
                key={bottle.id}
                bottle={bottle}
                handleAddToCart = {handleAddToCart}
                ></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;