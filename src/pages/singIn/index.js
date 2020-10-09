import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/api'

//Import of styles.js
/* import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
} from './styles'; */

export default class SignIn extends Component {
    static navigationOptions = {
        header: null,
    }

    //PropTypes Validation
    static propTypes = {
        navigation: PropTypes.shape({
            navigate : PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    //Save input of users 
    state = {
        email: '',
        password: '',
        error: ''
    };

    //View login
    render() {
        return (
            <Container>
                <StatusBar hidden />
                <Logo source={require('../../images/motoRoubada_logo.png')} resizeMode="contain" />
                <Input
                    placeholder="Endereço de e-mail"
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    placeholder="Senha"
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                />
                {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
                <Button onPress={this.handleSingInPress}>
                    <ButtonText>Entrar</ButtonText>
                </Button>
                <SingUpLink onPress={this.handleCreateAccontPress}>
                    <SingUpLinkText>Criar conta </SingUpLinkText>
                </SingUpLink>
            </Container>
        );
    }

    //Set the email to object stage
    handleEmailChange = (email) => {
        this.setState({ email });
    }

    //Set the password to object stage
    handlePasswordChange = (password) => {
        this.setState({ password })
    }
    //Navegation to register
    handleCreateAccontPress = () => {
        this.props.navigation.navigate('SingUp')
    }

    //Communicate with API, check mensagem message erro or success  
    handleSingInPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Prencha o usuário e senha para continuar' }, () => false);
        } else {
            try {
                const response = await api.post('/sessions', {
                    email: this.state.email,
                    password: this.state.password,
                });

                // Save the User's token JWT in Asycn Storage 
                await AsyncStorage.setItem('@MotoRoubadaCompartilhaAiApp:token', response.data.token);

                //Reset of application to dont have button login in home 
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Main' }),
                    ],
                });

                this.props.navigation.dispatch(resetAction);

            } catch (_err) {
                this.setState({ error: 'Houve um problema com o login, verifique suas credencias!' });
            }
        }
    };

};

