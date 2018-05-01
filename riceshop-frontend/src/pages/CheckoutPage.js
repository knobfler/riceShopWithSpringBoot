import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import CheckoutContainer from 'containers/Checkout/CheckoutContainer';

const CheckoutPage = () => {
    return (
        <PageTemplate>
            <CheckoutContainer/>
        </PageTemplate>
    );
};

export default CheckoutPage;