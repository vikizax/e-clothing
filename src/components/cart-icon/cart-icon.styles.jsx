import styled from 'styled-components';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

export const CartIconContainer = styled.div`
    width: 45px;
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const ShoppingIconContainer = styled(ShoppingIcon)`
    width: 24px;
    height: 24px;
`;

export const ItemCount = styled.span`
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    bottom: 12px;

    &.noselect {
    -webkit-touch-callout: none; 
        -webkit-user-select: none; 
        -khtml-user-select: none; 
        -moz-user-select: none; 
            -ms-user-select: none; 
                user-select: none;                         
    }
`;