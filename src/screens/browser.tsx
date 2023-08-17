import React from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import styled from 'styled-components/native';

const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My HTML Content</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f3f4f6;
          padding: 20px;
        }
      </style>
    </head>
    <body>
      <h1>Bem vindo ao Curso</h1>
      <p>React Native II</p>
    </body>
    </html>
  `;

const Container = styled.View`
  flex: 1;
`;

// const Label = styled.Text`
//   font-size: 28px;
//   color: #000;
//   font-weight: bold;
// `;

const Browser = () => {
  return (
    <Container>
      <SafeAreaView />
      {/* <Label>PRIMEIRO COMPONENTE COM SC</Label> */}
      <WebView
        source={{
          uri: 'https://www.npmjs.com/package/react-native-webview',
        }}
      />
      {/* <WebView source={{html: htmlContent}} /> */}
    </Container>
  );
};

export default Browser;
