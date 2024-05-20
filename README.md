# Concierge

Concierge é uma aplicação robusta desenvolvida para gerenciar rollouts de forma eficiente e segura. A aplicação é composta por uma API construída em Go utilizando tanto HTTP quanto gRPC, oferecendo alta performance e flexibilidade na comunicação entre serviços. O front-end é desenvolvido em React, proporcionando uma interface de usuário moderna e responsiva. Para armazenamento de dados, a aplicação utiliza Redis e MongoDB, garantindo rapidez no acesso e persistência de dados. A aplicação é totalmente dockerizada, facilitando o processo de deployment e escalabilidade utilizando Docker e Docker Compose.

## Tecnologias Utilizadas

- **Backend:**
  - **Go:** Linguagem utilizada para a construção da API, escolhida pela sua eficiência e suporte para concorrência.
  - **HTTP e gRPC:** Protocolos de comunicação implementados para flexibilidade e performance.
- **Frontend:**
  - **React:** Biblioteca JavaScript para construção de interfaces de usuário, conhecida por sua eficiência e modularidade.
- **Banco de Dados:**
  - **Redis:** Utilizado para armazenamento em cache e gerenciamento de sessões, devido à sua alta performance.
  - **MongoDB:** Banco de dados NoSQL utilizado para armazenamento persistente de dados, oferecendo flexibilidade e escalabilidade.
- **Containerização:**
  - **Docker:** Usado para containerização da aplicação, garantindo ambientes consistentes para desenvolvimento, teste e produção.
  - **Docker Compose:** Ferramenta para definir e gerenciar multi-containers de aplicações Docker.

## Funcionalidades

- **Gerenciamento de Rollouts:** Permite a implementação de novas versões de software de maneira controlada e gradual.
- **Integração com Múltiplos Bancos de Dados:** Utilização de Redis para caching e MongoDB para armazenamento de dados.
- **API Flexível:** Suporte a comunicação via HTTP e gRPC, facilitando a integração com diferentes serviços.
- **Interface de Usuário Intuitiva:** Front-end em React, oferecendo uma experiência de usuário fluida e moderna.

## Estrutura do Projeto

- **/backend:** Contém o código-fonte da API em Go.
- **/frontend:** Contém o código-fonte do front-end em React.
- **/config:** Arquivos de configuração para a aplicação.
- **/scripts:** Scripts para automação de tarefas e gerenciamento de rollouts.
- **/docker:** Arquivos Docker e configuração do Docker Compose.

## Como Executar

### Pré-requisitos

- Docker
- Docker Compose

### Instruções

1. Clone o repositório:
   ```sh
   git clone https://github.com/seuusuario/concierge.git
   cd concierge
   ```
