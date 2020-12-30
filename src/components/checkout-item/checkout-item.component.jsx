import React from 'react';

import { connect } from 'react-redux';

import { addItem, clearItemFromCart, removeItem } from '../../redux/cart/cart.action';


import { CheckOutItemContainer, ImageContainer, Image, Text, QuantityContainer, Arrow, Value, RemoveButton } from './checkout-item.style';


const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CheckOutItemContainer>
            <ImageContainer>
                <Image src={imageUrl} alt="item" />
            </ImageContainer>
            <Text>{name}</Text>
            <QuantityContainer>
                <Arrow onClick={() => removeItem(cartItem)}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={() => addItem(cartItem)}>&#10095;</Arrow>
            </QuantityContainer>
            <Text>{price}</Text>
            <RemoveButton onClick={() =>
                clearItem(cartItem)
            }>&#10005;</RemoveButton>
        </CheckOutItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);