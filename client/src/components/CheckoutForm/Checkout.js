import React from 'react'
import '../../css/CheckoutForm/Checkout.css'
import Input from '../Input/Input'
import Zoom from 'react-reveal/Zoom';

function Checkout(props) {
    return (
        <>
            {props.showForm && (
                <div className="checkout-form">
                    <Zoom  >

                    
                    <span className="close-icon" onClick={() => props.setshowForm(false)}>&times;</span>
                    <form onSubmit={props.submitOrder}>
                        <Input
                            label="Name"
                            type="text"
                            name="name"
                            handleChange={props.handleChange}
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            handleChange={props.handleChange}
                        />

                        <div>
                            <button type="submit">Checkout</button>
                        </div>
                    </form>
                    </Zoom>
                </div>
            )}
        </>
    )
}
export default Checkout
