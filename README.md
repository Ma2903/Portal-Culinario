# 🍽️ Portal de Bate-Papo Culinário

![License](https://img.shields.io/badge/license-MIT-blue.svg)

Um portal de bate-papo em tempo real com tema de culinária, permitindo que usuários conversem em diferentes salas temáticas. Este projeto foi desenvolvido para praticar o uso de WebSockets com Node.js e a criação de interfaces dinâmicas com React.

## ✨ Funcionalidades

- **Chat em Tempo Real:** Comunicação instantânea entre múltiplos usuários usando Socket.IO.
- **Múltiplas Salas:** 3 salas temáticas sobre culinária para os usuários escolherem.
- **Interface Reativa:** Interface moderna construída com React e Vite.
- **Sistema de Abas:** Navegue entre as salas que você entrou, similar a aplicativos de mensagem como o WhatsApp.
- **Modo Dark & Light:** Tema customizável com um clique para melhor conforto visual.
- **Mensagens Estilizadas:** Balões de mensagem diferenciados para mensagens enviadas e recebidas, com avatar e timestamp.
- **Navegação Intuitiva:** Fluxo de usuário simples para entrar, escolher salas e interagir.

## 🚀 Tecnologias Utilizadas

Este projeto é dividido em duas partes principais: o backend e o frontend.

### Backend
- **Node.js:** Ambiente de execução para o servidor.
- **Express:** Framework para gerenciar o servidor HTTP.
- **Socket.IO:** Biblioteca para comunicação bidirecional e em tempo real baseada em eventos.
- **CORS:** Middleware para permitir requisições de diferentes origens (Cross-Origin Resource Sharing).

### Frontend
- **React:** Biblioteca para construir a interface do usuário.
- **Vite:** Ferramenta de build moderna para um desenvolvimento frontend rápido.
- **Socket.IO Client:** Para conectar a aplicação React ao servidor Socket.IO.
- **React Icons:** Biblioteca para incluir ícones populares no projeto.
- **CSS Moderno:** Estilização com variáveis, Flexbox, e animações para uma UI polida.

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para rodar o projeto em sua máquina local.

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [link-para-seu-repositorio-github]
    cd [nome-da-pasta-do-projeto]
    ```

2.  **Configure e inicie o Backend:**
    (Abra um terminal)
    ```bash
    cd backend
    npm install
    node server.js
    ```
    O servidor estará rodando em `http://localhost:3001`.

3.  **Configure e inicie o Frontend:**
    (Abra um **segundo** terminal)
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

4.  Abra duas ou mais abas do navegador no endereço do frontend para simular uma conversa entre diferentes usuários.

## 🖼️ Telas da Aplicação

É altamente recomendável adicionar screenshots da sua aplicação aqui para demonstrar o visual e as funcionalidades!

*(Exemplo de como adicionar uma imagem no Markdown)*
`![Tela de Login](caminho/para/sua/imagem.png)`

## 👤 Autor

Criado por **[Seu Nome]**.

- GitHub: `[link-do-seu-github]`
- LinkedIn: `[link-do-seu-linkedin]`

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.