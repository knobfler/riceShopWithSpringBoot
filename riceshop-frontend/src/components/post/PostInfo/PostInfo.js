import React, {Component} from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';
import Button from '../../common/Button/Button';

const cx = classNames.bind(styles);

class PostInfo extends Component {

  state = {
    isInitial: true,
    initialPrice: 0
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("hey");
  //   if(prevProps.prices !== this.props.prices) {
  //     console.log(this.props.prices);
  //     this.setState({
  //       priceList: 
  //     });
  //     console.log(this.state.priceList);
  //   }
  // }
  componentDidMount() {
    const { initialize } = this.props;
    if(this.props.prices !== undefined) {
      const priceList = this.props.prices.split(',').map(price => price.trim());
      initialize({initialPrice: priceList[0]});
    }
  }

  handleSelectionChanged = (e) => {
    const { value } = e.target;
    const { onSelectorChange } = this.props;
    onSelectorChange({value});
    this.setState({
      isInitial: false
    });
  }

  handleNumberChange = (e) => {
    const { value } = e.target;
    const { onNumberChange } = this.props;

    onNumberChange({value});
  }
  render() {
    const {title, prices, options, totalPrice, eachPrice, number, onAddCart, goToPay} = this.props;
    const { isInitial } = this.state;
    const { handleSelectionChanged, handleNumberChange } = this;
    if(prices !== undefined) {
      const priceList = this.props.prices.split(',').map(price => price.trim());
      const optionList = this.props.options.split(',').map(option => option.trim());

      const optionSelector = optionList.map(
        (option, i) => {
          return (
            <option value={priceList[i]} key={i}>{optionList[i]}</option>
          )
        }
      );


      return (
        <div className={cx('post-info')}>
          <div className={cx('post-title')}>
            {title}
          </div>
          <div className={cx('info-wrapper')}>
            <div className={cx('thumbnail')}>
              <img className={cx('image')} src="https://images.unsplash.com/photo-1490806230066-f7e6f7bf5052?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ca889535ea01f912f94ac4ddf0034e0&auto=format&fit=crop&w=1466&q=80"/>
            </div>
            <div className={cx('infos')}>
            <div className={cx('info-box')}>
              <div className={cx('options')}>
                <div className={cx('label')}>
                  상품 옵션 선택
                </div>
                <select className={cx('option-selector')} onChange={handleSelectionChanged}>
                  {
                    optionSelector
                  }
                </select>
                <div className={cx('label')}>
                  상품 개수 선택
                </div>
                <input type="number" value={number} onChange={handleNumberChange} className={cx('number-selector')}/>
              </div>
            
              <div className={cx('price')}>
            
                개당 가격: {eachPrice}
              </div>
              <div className={cx('total-price')}>
                총 가격: {totalPrice}
              </div>
              </div>
              <div className={cx('buttons')}>
                <div className={cx('cart-button')}>
                  <Button onClick={onAddCart} theme="cart">카트에 담기</Button>
                </div>
                <div className={cx('pay-button')}>
                  <Button theme="pay" onClick={goToPay}>결제하기</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
    
    
  }
  
}
export default PostInfo;