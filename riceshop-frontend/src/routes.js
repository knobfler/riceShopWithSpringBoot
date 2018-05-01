import { CartPage, EditorPage, FormPage, ListPage, PaymentPage, PostPage, ItemPage, CheckoutPage } from 'pages';

export default [
    {
      path: '/',
      exact: true,
      component: ItemPage
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
      exact: true,
      component: FormPage
    },
    {
      path: '/admin/list',
      exact: true,
      component: CheckoutPage
    },
    {
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
    {
      path: '/item',
      component: ListPage
    }

];