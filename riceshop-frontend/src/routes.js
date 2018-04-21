import { CartPage, EditorPage, FormPage, ListPage, PaymentPage, PostPage } from 'pages';

export default [
    {
      path: '/',
      exact: true,
      component: ListPage
    },
    {
        path: '/post/:id',
        component: PostPage
    },
    {
      path: '/login',
      component: FormPage
    },
    {
      path: '/register',
      component: FormPage
    },
    {
      path: '/admin',
      component: FormPage
    },{
      path: '/editor',
      component: EditorPage
    },
    {
        path: '/cart',
        component: CartPage
    },
    {
        path: '/payment',
        component: PaymentPage
    },

];