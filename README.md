# Missão Prática 5 - Mundo 4

Este repositório tem como objetivo demonstrar a visualização em tempo real de dados de sensores conectados ao **Azure IoT Hub**, utilizando um aplicativo web hospedado no **Azure App Service**.

## Estrutura

- Código fonte: aplicação Node.js que consome mensagens do IoT Hub e exibe visualmente os dados.
- `server.js`: arquivo principal que se conecta ao IoT Hub e inicia o servidor.
- `public/`: contém os arquivos estáticos para a interface web.
- `views/`: contém os arquivos de visualização usando o template engine.
- `package.json`: gerenciador de dependências da aplicação.
- `iot.py`: enviar ou receber mensagens para dispositivos IoT.

## Tecnologias

- Node.js
- Azure IoT Hub
- Azure App Service (Linux)
- Express.js
- Socket.IO

## Objetivo

Demonstrar a integração entre sensores IoT e uma aplicação web em tempo real no Azure, proporcionando uma experiência visual e informativa do fluxo de dados capturados por dispositivos conectados.
