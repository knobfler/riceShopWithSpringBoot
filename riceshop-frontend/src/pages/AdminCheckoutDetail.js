import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import AdminCheckoutDetailContainer from 'containers/AdminCheckoutDetail/AdminCheckoutDetailContainer';


const AdminCheckoutDetail = ({match}) => {
    const { id } = match.params;
    return (
        <PageTemplate>
            <AdminCheckoutDetailContainer id={id}/>
        </PageTemplate>
    );
};

export default AdminCheckoutDetail;