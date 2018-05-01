import asyncComponent from 'lib/asyncComponent';

export const CartPage = asyncComponent(() => import('./CartPage'));
export const EditorPage = asyncComponent(() => import('./EditorPage'));
export const FormPage = asyncComponent(() => import('./FormPage'));
export const ListPage = asyncComponent(() => import('./ListPage'));
export const NotFoundPage = asyncComponent(() => import('./NotFoundPage'));
export const PaymentPage = asyncComponent(() => import('./PaymentPage'));
export const PostPage = asyncComponent(() => import('./PostPage'));
export const ItemPage = asyncComponent(() => import('./ItemPage'));
export const CheckoutPage = asyncComponent(() => import('./CheckoutPage'));
export const AdminCheckoutDetail = asyncComponent(() => import('./AdminCheckoutDetail'));