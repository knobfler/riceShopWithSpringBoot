import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostWrapper from 'components/post/PostWrapper';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import * as postActions from 'store/modules/post';
import * as cartActions from 'store/modules/cart';
import { Helmet } from 'react-helmet';
import removeMd from 'remove-markdown';
class PostContainer extends Component {

    initialize = async () => {
        const { PostActions, id } = this.props;
        try {
            await PostActions.getPostItemById(id);

        } catch(e) {
            console.log(e);
        }
    }

    initializeItems = ({initialPrice}) => {
        const { PostActions } = this.props;
        PostActions.initialize({initialPrice});
    }

    componentDidMount() {
        this.initialize();
    }

    handleSelectionChanged = ({value}) => {
        const { PostActions } = this.props;
        PostActions.selectorChanged({value});
    }

    handleNumberChanged = ({value}) => {
        const { PostActions } = this.props;
        PostActions.numberChanged({value});
    }

    addCart = async () => {
        const { CartActions, totalPrice, number } = this.props;
        const { id, title, markdown } = this.props.item.toJS();
        const thumbnailImage = markdown.split("/api/uploads/")[1].split(")")[0];
        try {
            await CartActions.addCart({id, title, amount: number, thumbnailImage, totalPrice});
            if(this.props.errorCode) {
                const { CartActions } = this.props;
                alert(this.props.errorLog);
                CartActions.initialize();
            }
            if(this.props.cartLog) {
                const { CartActions } = this.props;
                alert(this.props.cartLog);
                CartActions.initialize();
            }
        } catch(e) {
            console.log(e);
        }
    }

 render() {
     const { loading, eachPrice, totalPrice, number, cartLog, errorCode, errorLog } = this.props;
     if(loading) return null;
     const { title, markdown, options, prices } = this.props.item.toJS();
     const { handleSelectionChanged, handleNumberChanged, initializeItems, addCart } = this;
    
   return (
       <div>
           { /* body 값이 있을 때만 Helmet 설정 */ markdown && (
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={removeMd(markdown).slice(0, 200)}/>
          </Helmet>)
        }
    <PostWrapper
        postInfo={<PostInfo
                    initialize={initializeItems}  
                    title={title}
                    prices={prices}
                    number={number}
                    options={options}
                    eachPrice={eachPrice}
                    onSelectorChange={handleSelectionChanged}
                    onNumberChange={handleNumberChanged}
                    totalPrice={totalPrice}
                    onAddCart={addCart}
                        />}
        postBody={<PostBody
                        markdown={markdown}/>}
        />
        </div>
        
   );
 }
}

export default connect(
  (state) => ({
      item: state.post.get('item'),
      loading: state.pender.pending['post/GET_POST_ITEM_BY_ID'],
      eachPrice: state.post.get('eachPrice'),
      totalPrice: state.post.get('totalPrice'),
      number: state.post.get('number'),
      errorLog: state.cart.getIn(['cartError', 'errorLog']),
      errorCode: state.cart.getIn(['cartError', 'errorCode']),
      cartLog: state.cart.get('cartLog')
  }),
  (dispatch) => ({
      PostActions: bindActionCreators(postActions, dispatch),
      CartActions: bindActionCreators(cartActions, dispatch)
  })
)(PostContainer);