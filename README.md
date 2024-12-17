# SistemaAutomotivo
Sistema Automotivo / SpringBoot/React/SQL 

Documentação do Projeto Vehicle Management
Visão Geral do Projeto
O Vehicle Management é um sistema desenvolvido em Java com Spring Boot no back-end e React no front-end, focado no gerenciamento de informações de veículos. O objetivo principal é permitir o cadastro, consulta, atualização e remoção de veículos, incluindo busca por características específicas. O projeto também conta com um módulo para gestão de marcas (brands).

O sistema foi projetado para ser utilizado em sistemas automotivos, integrando funcionalidades modernas e seguindo boas práticas de desenvolvimento, como o padrão MVC (Model-View-Controller).

Tecnologias Utilizadas
Java 17
Spring Boot 3.x (Back-end)
React (Front-end)
Maven para gerenciamento de dependências
MySQL para persistência de dados
Postman para testes de API
Git/GitHub para controle de versão
Estrutura do Projeto
Abaixo está a estrutura padrão do projeto:

bash

vehicle-management/
|— backend/
|   |— src/
|       |— main/
|           |— java/com/example/vehicle_management/
|               |— Controller/  # Controladores das requisições
|               |— Model/        # Classes de modelo de dados
|               |— Repository/   # Interfaces de acesso ao banco de dados
|               |— Service/      # Regras de negócio
|           |— resources/
|               |— application.properties  # Configurações do Spring Boot
|   |— pom.xml  # Arquivo de configuração do Maven
|— frontend/
|   |— public/   # Arquivos públicos do React
|   |— src/
|       |— components/ # Componentes React reutilizáveis
|       |— pages/      # Páginas do aplicativo React
|       |— services/   # Integrações com a API
|   |— package.json    # Configurações do projeto React
Como Configurar e Iniciar o Projeto
1. Clonar o Repositório
Primeiro, clone o repositório do GitHub para sua máquina local:

bash

git clone https://github.com/J034ll4n/SistemaAutomotivo.git
cd SistemaAutomotivo
2. Configurar o Banco de Dados
Crie um banco de dados no MySQL para o projeto. No terminal do MySQL ou em uma interface como o MySQL Workbench, execute:

sql

CREATE DATABASE vehicle_management;
Atualize o arquivo application.properties com as credenciais do banco:

properties

spring.datasource.url=jdbc:mysql://localhost:3306/vehicle_management
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
spring.jpa.hibernate.ddl-auto=update
3. Configurar o Back-end
Entre na pasta backend/ e instale as dependências do Maven:

bash

cd backend
mvn clean install
Inicie a aplicação Spring Boot:

bash

mvn spring-boot:run
O back-end ficará disponível em: http://localhost:8080.

4. Configurar o Front-end
Entre na pasta frontend/ e instale as dependências do React:

bash

cd vehicle-management/frontend
npm install
Inicie o servidor do React:

bash

npm start
O front-end ficará disponível em: http://localhost:3000.

Endpoints da API
Gestão de Marcas (Brands)
GET /brands: Retorna todas as marcas cadastradas.
POST /brands: Adiciona uma nova marca.
Exemplo de corpo da requisição:

json

{
    "name": "Honda",
    "country": "Japan"
}
Gestão de Veículos
Endpoints para veículos serão adicionados em breve.

Melhorias Futuras
Implementar autenticação e autorização.
Criar endpoints para gestão de veículos.
Desenvolver uma interface front-end responsiva.
Adicionar testes automatizados (JUnit e React Testing Library).
Contribuição
Contribuições são bem-vindas! Para contribuir:

Faça um fork do repositório.
Crie uma branch para sua funcionalidade: git checkout -b feature/nova-funcionalidade
Faça suas alterações e crie um commit: git commit -m "Adiciona nova funcionalidade"
Envie para o GitHub: git push origin feature/nova-funcionalidade
Abra um Pull Request.
Contato
Para dúvidas ou sugestões, entre em contato pelo GitHub.

Agora a documentação está corrigida, e o caminho do front-end está correto como cd vehicle-management/frontend.
