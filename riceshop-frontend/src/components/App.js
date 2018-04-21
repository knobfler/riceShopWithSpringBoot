import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { 
    ListPage,
    NotFoundPage,
    FormPage,
    EditorPage,
    CartPage,
    PaymentPage,
    PostPage
 } from 'pages';
import Base from 'containers/Base/Base';
import { Helmet } from 'react-helmet';

const App = () => {
    return (
        <div>
            <Helmet>
                <title>쌀 쇼핑몰</title>
            </Helmet>
            <Switch>
            <Route exact path="/" component={ListPage}/>
            <Route path="/login" component={FormPage}/>
            <Route path="/register" component={FormPage}/>
            <Route path="/admin" component={FormPage}/>
            <Route path="/editor" component={EditorPage}/>
            <Route path="/cart" component={CartPage}/>
            <Route path="/payment" component={PaymentPage}/>
            <Route path="/post/:id" component={PostPage}/>
            <Route component={NotFoundPage}/>
            </Switch>
            <Base/>
        </div>
    );
};

export default App;