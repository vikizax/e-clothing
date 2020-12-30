import React from 'react';

import { CartItemContainer, ItemDetailsContainer, Image, Name } from './cart-item-style';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
    <CartItemContainer>
        <Image src={imageUrl} alt={"item-image-" + name} />
        <ItemDetailsContainer>
            <Name>{name}</Name>
            <span className="price">{quantity} x ${price}</span>
        </ItemDetailsContainer>
    </CartItemContainer>
);

export default CartItem;
