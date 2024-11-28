# Teia Cultural

Este projeto utiliza o Docker Compose para configurar o ambiente de desenvolvimento, incluindo o LocalStack para emulação de serviços AWS e MySQL como banco de dados. Siga as instruções abaixo para configurar e executar o ambiente.

## Requisitos

Antes de iniciar, verifique se você tem os seguintes requisitos instalados:

- [Java 21](https://adoptopenjdk.net/)
- [Maven](https://maven.apache.org/install.html)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [LocalStack](https://localstack.cloud/)

## Passos para Execução

### 1. Criar o bucket S3 no LocalStack

LocalStack é utilizado para emular serviços AWS localmente, como o S3. Após iniciar o LocalStack com Docker, crie um bucket S3 chamado `s3teiacultural`.

Execute o seguinte comando para criar o bucket no LocalStack:

```bash
docker exec -it localstack awslocal s3 mb s3://s3teiacultural
```

### 2. Executar o Mysql no Docker
Agora, vamos configurar o MySQL utilizando o Docker Compose.

1.Navegue até o diretório onde o arquivo `docker-compose.yml` do MySQL está localizado (caso ainda não tenha esse arquivo, consulte o exemplo abaixo).

```bash
cd docker
```
2. Execute o Docker Compose para iniciar o MySQL:

```bash
docker compose up
```

### 3. Gerar o Par de Chaves (Privada e Pública)
Você precisa gerar um par de chaves RSA usando o OpenSSL. Se não tiver o OpenSSL instalado, você pode baixar a versão apropriada para o seu sistema operacional aqui.

Execute os seguintes comandos no terminal para gerar a chave privada (app.key) e a chave pública

```
src/
 └── main/
      └── resources/
           ├── app.key
           └── app.pub
```

Gerar a chave privada (app.key):
```bash
openssl genpkey -algorithm RSA -out app.key -pkeyopt rsa_keygen_bits:2048
```

Gerar a chave pública (app.pub) a partir da chave privada:
```bash
openssl rsa -pubout -in app.key -out app.pub
```

### 4. Executar o Projeto Spring Boot
Agora que o MySQL e o LocalStack estão em execução, é hora de rodar o projeto Spring Boot.

1- Certifique-se de que todas as dependências do projeto estão baixadas e configuradas corretamente com Maven.

```bash
mvn clean install
```

2- No diretório raiz do projeto, execute os seguintes comandos para compilar e executar o Spring Boot:

```bash
mvn spring-boot:run
```

### 4. Acessar a Aplicação
Após o Spring Boot ser iniciado, a aplicação estará disponível em http://localhost:8080.


### Documentação das Requisições
Se você precisar de detalhes sobre as requisições da API, pode acessar a documentação que está disponível a importação em Postman ou Bruno, na pasta documentação.
