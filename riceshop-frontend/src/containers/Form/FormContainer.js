import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AuthWrapper from 'components/auth/AuthWrapper';
import AuthContent from 'components/auth/AuthContent';
import InputWithLabel from 'components/auth/InputWithLabel';
import Button from 'components/common/Button';
import * as authActions from 'store/modules/auth';
import * as baseActions from 'store/modules/base';
import { withRouter } from 'react-router-dom';

class FormContainer extends Component {

    initialize = () => {
        const { AuthActions } = this.props;
        AuthActions.initialize();
    }

    componentDidMount() {
        this.initialize();
    }

    handleChangeInput = (e) => {
        const { name, value } = e.target;
        const { AuthActions } = this.props;
        AuthActions.changeInput({name, value});
    }

    adminLogin = async () => {
        const { BaseActions, history } = this.props;
        const { userID, userPassword } = this.props.input.toJS();

        try {
            await BaseActions.adminLogin({adminID: userID, password: userPassword});
            localStorage.adminLogged = "true";
            this.initialize();
            history.push('/');
        } catch(e) {
            console.log(e);
        }
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.adminLogin();
        }
    }

    handleRegister = async () => {
        const { AuthActions, history } = this.props;
        const { userID, userEmail, userPassword, userPasswordConfirm, userName } = this.props.input.toJS();

        if(userPassword !== userPasswordConfirm) {
            alert("두 비밀번호가 같지 않습니다.");
            return;
        }
        try {
            await AuthActions.register({userID, userPassword, userEmail, userName});
            this.initialize();
            history.push('/login');
        } catch(e) {
            console.log(e);
        }
    }

    handleKeyPressRegister = (e) => {
        if(e.key === "Enter") {
            this.handleRegister();
        }
    }

    handleMemberLogin = async () => {
        const { AuthActions, history } = this.props;
        const { userID, userPassword } = this.props.input.toJS();

        try {
            await AuthActions.login({userID, userPassword});
            localStorage.memberLogged = "true";
            document.location.href = "/";
        } catch(e){
            console.log(e);
        }
    }

    handleKeyPressMemberLogin = (e) => {
        if(e.key === "Enter") {
            this.handleMemberLogin();
        }
    }
    render() {
        const {title} = this.props;
        const { handleChangeInput, adminLogin, handleKeyPress, handleRegister, handleKeyPressRegister, handleMemberLogin, handleKeyPressMemberLogin } = this;
        const { userID, userPassword, userPasswordConfirm, userEmail, userName } = this.props.input.toJS();
        // const title = ""; if(category === "/login") {     title = "로그인"; } else {
        // title = "회원가입"; }
        if (title === "로그인") {
            return (
                <AuthWrapper>
                    <AuthContent title={title} onButtonClick={handleMemberLogin} buttonText={title}>
                        <InputWithLabel onChange={handleChangeInput} label="아이디" value={userID} name="userID" placeholder="아이디"/>
                        <InputWithLabel onChange={handleChangeInput} type="password" label="비밀번호" value={userPassword} name="userPassword" placeholder="비밀번호" onKeyPress={handleKeyPressMemberLogin} />
                    </AuthContent>
                </AuthWrapper>
            );
        }
        if(title === "회원가입") {
            return (
                <AuthWrapper>
                    <AuthContent title={title} onButtonClick={handleRegister} buttonText={title}>
                        <InputWithLabel onChange={handleChangeInput} label="아이디" value={userID} name="userID" placeholder="아이디"/>
                        <InputWithLabel onChange={handleChangeInput} type="password" label="비밀번호" value={userPassword} name="userPassword" placeholder="비밀번호"/>
                        <InputWithLabel
                            onChange={handleChangeInput}
                            label="비밀번호 확인"
                            value={userPasswordConfirm}
                            type="password"
                            name="userPasswordConfirm"
                            placeholder="비밀번호 확인"/>
                        <InputWithLabel onChange={handleChangeInput} label="이메일" value={userEmail} name="userEmail" placeholder="이메일"/>
                        <InputWithLabel onChange={handleChangeInput} label="이름" value={userName} name="userName" placeholder="이름" onKeyPress={handleKeyPressRegister}/>
                    </AuthContent>
                </AuthWrapper>
            );
        }
        if(title === "관리자 로그인") {
            return (
                <AuthWrapper>
                    <AuthContent title={title} onButtonClick={adminLogin} buttonText={title}>
                        <InputWithLabel onChange={handleChangeInput} label="아이디" value={userID} name="userID" placeholder="아이디"/>
                        <InputWithLabel onKeyPress={handleKeyPress} onChange={handleChangeInput} type="password" label="비밀번호" value={userPassword} name="userPassword" placeholder="비밀번호"/>
                    </AuthContent>
                </AuthWrapper>
            );
        }

    }
}

export default connect((state) => ({
    input: state.auth.get('input'),
    adminLogged: state.base.get('adminLogged')
}), (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
}))(withRouter(FormContainer));