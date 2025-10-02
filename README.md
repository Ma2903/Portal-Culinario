# 🍽️ Portal de Bate-Papo Culinário

![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📖 Sobre o Projeto

O **Portal de Bate-Papo Culinário** é uma aplicação full-stack de chat em tempo real, onde entusiastas da culinária podem conversar em salas temáticas. O projeto foi desenvolvido como um exercício prático para aprofundar conhecimentos em comunicação com **WebSockets** usando Node.js no backend e a construção de interfaces reativas e dinâmicas com **React**.

## 📋 Tabela de Conteúdos
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [⚙️ Como Executar o Projeto](#️-como-executar-o-projeto)
- [👤 Autor](#-autor)
- [📜 Licença](#-licença)

## ✨ Funcionalidades

- **💬 Chat em Tempo Real:** Comunicação instantânea entre múltiplos usuários com Socket.IO.
- **🚪 Múltiplas Salas:** Escolha entre 3 salas temáticas sobre culinária para interagir.
- **⚛️ Interface Reativa:** Interface moderna e fluida construída com React e Vite.
- **📑 Sistema de Abas:** Navegue facilmente entre as salas que você entrou, similar ao WhatsApp.
- **🌓 Modo Dark & Light:** Tema customizável com um clique para melhor conforto visual.
- **🎨 Mensagens Estilizadas:** Balões de mensagem diferenciados, com avatar e timestamp.
- **🧭 Navegação Intuitiva:** Fluxo de usuário simples para entrar, escolher salas e conversar.

## 🛠️ Tecnologias Utilizadas

As ferramentas e tecnologias que deram vida a este projeto:

| Categoria  | Tecnologia                                                                                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white) |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) |
| **Linguagem**| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)                                                      |

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para rodar o projeto em sua máquina local.

#### **Pré-requisitos**
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

#### **Instalação e Execução**
1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Ma2903/Portal-Culinario.git
    cd Portal-Culinario
    ```

2.  **Configure e inicie o Backend (abra um terminal):**
    ```bash
    cd backend
    npm install
    npm start 
    # ou 'node server.js'
    ```
    *O servidor estará rodando em `http://localhost:3001`.*

3.  **Configure e inicie o Frontend (abra um segundo terminal):**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    *A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).*

4.  **Teste!** Abra duas ou mais abas do navegador no endereço do frontend para simular uma conversa.

## 👤 Autor

Criado por **Manoela Pinheiro da Silva**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/SEU_LINKEDIN_AQUI/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ma2903)

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
