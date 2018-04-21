import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import CartContainer from 'containers/Cart/CartContainer';

const CartPage = (props) => {
    return (
        <PageTemplate>
            <CartContainer/>
        </PageTemplate>
    );
};

export default CartPage;