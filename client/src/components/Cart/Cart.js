import React, { useState } from 'react'
import '../../css/Cart/Cart.css'
import Checkout from '../CheckoutForm/Checkout';
import Bounce from 'react-reveal/Bounce';


function Cart(props) {
    const [showForm, setshowForm] = useState(false)
    const [value, setsValue] = useState('');
    const submitOrder = (e) => {
        e.preventDefault();
        const order = {
            name: value.name,
            email: value.email,
        }
        console.log(order);
    }
    const handleChange = (e) => {
        setsValue((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    return (
        <div className="cart-wrapper">

            <div className="cart-title">{props.cartItems.length > 0 ? `there is ${props.cartItems.length} item cart` : 'Empty Cart'}</div>
            <Bounce bottom cascade>
                <div className="cart-items">
                    {props.cartItems.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.imageUrl} alt={item.title} />
                            <div className="cart-info">
                                <div>
                                    <p>title :  {item.title} </p>
                                    <p>  qty : {item.qty}</p>
                                    <p>  price : ${item.price} </p>
                                </div>
                                <button onClick={() => props.removeFromCart(item)}>
                                    Remove
                        </button>
                            </div>
                        </div>

                    ))}
                </div>

            </Bounce>
            {props.cartItems.length !== 0 && (
                <div className="cart-footer">
                    <div className="total">Total : ${props.cartItems.reduce((acc, p) => {
                        return acc + p.price
                    }, 0)}</div>
                    <button onClick={() => setshowForm(true)}>Select Prodcuts</button>
                </div>

            )}
            <Checkout
                showForm={showForm}
                setshowForm={setshowForm}
                submitOrder={submitOrder}
                handleChange={handleChange}
            />

        </div>
    )
}
export default Cart
