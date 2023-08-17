import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import styled from 'styled-components/native';

import WelcomeImage from '../../assets/images/welcome-image.png';
import { fetchUsers } from '../services/user-service';

type ButtonProps = {
  color: string;
};

const Image = styled.Image`
  width: 320px;
  height: 240px;
  align-self: center;
  margin-top: 16px;
`;

const InputContainer = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
`;

const Input = styled.TextInput`
  height: 60px;
  padding: 8px;
  background-color: #1a182b;
  margin-bottom: 8px;
  color: #fff;
  border-radius: 16px;
`;

const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${props => props.color};
  height: 50px;
  border-radius: 16px;
  justify-content: center;
  margin-top: 32px;
`;

const Label = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

const FooterContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const Login = () => {
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        console.log(`Users: ${JSON.stringify(users)}`);
      } catch (error) {
        console.log(`error: ${error}`);
      }
    };
    loadUsers();
  });

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, backgroundColor: '#242238'}}>
      <SafeAreaView />
      <StatusBar barStyle={'light-content'} />
      <Image source={WelcomeImage} />
      <InputContainer>
        <Input
          placeholder="e-mail"
          placeholderTextColor={'#fefefe'}
          autoCapitalize="none"
        />
        <Input
          placeholder="senha"
          placeholderTextColor={'#fefefe'}
          autoCapitalize="none"
          secureTextEntry
        />
        <Button color="#e77a6c" activeOpacity={0.7}>
          <Label>LOGIN</Label>
        </Button>
      </InputContainer>
      <FooterContainer>
        <Button color="#1a182b" activeOpacity={0.7}>
          <Label>QUERO ME CADASTRAR</Label>
        </Button>
      </FooterContainer>
    </ScrollView>
  );
};

export default Login;
