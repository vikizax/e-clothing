import React from 'react';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I0qxCJ1UdtQYk7MZPuNnW4XOGVJ1jTa9GyRlL3Dtt9em8ay8KHHv6a3ipf8U8ukK4xCw1PLOv5MJrhmimQf3ann00Xu0gLbwC';

    const onToken = token => {
        // console.log(token);
        // alert('Payment Successful')
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then((res) => {
            alert('Payment Successfull');
        }).catch(error => {
            console.log('Payment error:', error);
            alert(
                'There was an issur with your payment. Please try again.'
            );
        })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='EClothing Ltd.'
            billingAddress
            shippingAddress
            // image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );

};

export default StripeCheckoutButton;