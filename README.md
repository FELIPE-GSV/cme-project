# CMETrack

Controle e gerenciamento de CME e seus usuários, desenvolvido com Next Js para o frontend e Django Rest Framework para o backend.

## Índice

- [Sobre](#sobre)
- [Recomendações](#recomendações)
- [Instalação](#instalação)
- [Variáveis](#variáveis)
- [Inicialização](#inicialização)
- [Usuários](#usuários)
- [Documentação](#documentação)
- [Figma](#figma)
- [Funcionalidades](#funcionalidades)
- [Contato](#contato)

## Sobre

O CMETrack é um plataforma destinada ao controle total de um processo CME, incluindo
as etapas de cadastro, recebimento, tratamento e distruibuição de materiais hospitalares. O
sistema conta também com o gerenciamento de usuários internos, sendo eles Administrativo, Enfermeiro e Técnico.

## Recomendações

1. É recomendado que esteja com um chave ssh configurada na sua máquina para facilitar o processo de clonagem.
2. O next js 14 trabalha com um arquitetura cliente/servider, é recomendado que ao iniciar a aplicação,
 reiniciar a página para que a aplicação seja compilada no cliente.

## Instalação

Passos para instalar e configurar o ambiente:

1. Clone o repositório (https)
   ```bash
   git clone https://github.com/FELIPE-GSV/cme-project.git

2. Clone o repositório (ssh)
   ```bash
   git clone git@github.com:FELIPE-GSV/cme-project.git

3. Crie e ative um virtual environment:
    ```bash
    python -m venv .venv
    ```
    - Unix ou MacOS:
        ```bash
        source .venv/bin/activate
        ```
    - Windows:
        ```bash
        .venv\Scripts\activate


## Variáveis

1. As variáveis de configuração do postgres já estão no arquivo `.env`.

## Inicialização

1. Execute o comando abaixo para iniciar os containers Docker:
    ```bash
    docker-compose up --build

2. Na aplicação já existe uma migration (`0002_autodata.py`) para inicialização dos dados.

3. Ainda assim pode executar pelo container do Docker do backend:
    ```bash
    - python manage.py makemigrations
    - py manage.py migrate


## Usuários

A migration `0002_autodata.py` cria o seguintes usuário:

- **Administrador**
  - Usuário: `administrador`
  - Senha: `290916`

1. Este usuário tem acesso à uma aba destinada a criação de demais usuários como enfermeiro 
e técnico que por sua vez podem efetuar o login na aplicação.

2. O frontend armazena um token JWT gerado pela api para mantê-lo logado e fazer requisições
para a mesma.


## Documentação

1. Acesse a documentação da API nos seguintes links após iniciar a aplicação:
    - [Swagger](http://localhost:8000/swagger/)
    - [ReDoc](http://localhost:8000/redoc/)


## Figma

1. Vale ressaltar que o autor desde projeto não é um designer profissional, apenas utilizou do 
figma para ter um passo inicial e posteriomente usar a estratégia de padronização de sistema
para a criação visual do frontend.

2. link: https://www.figma.com/design/KvmuAhde1xXo7wuQJk7iBD/CMETrack-figma?node-id=0-1&p=f&t=ZWv2JSwGQ6f6dDEF-0

## Funcionalidades

### Usuários
- Listagem, criação, edição e exclusão de usuários.

### Materiais
- Listagem, criação, edição e exclusão de materiais

### Recebimento de materiais
- Gera um registro para os materiais recebidos, assim como disponibiliza
criação, edição, listagem e exclusão

### Tratamentos

- Gera um registro de tratamento para um material recebido, não é possível tratar materiais 
em estado danificado e com necessidade de descarte. Disponibiliza criação, listagem e conclusão 
dos tratamentos requisitados (lavagem ou esterilização, podendo ocorrer os dois).

### Distribuição

- Gera um registro de um material distribuido ou não, só é possível distribuir um material se
a etapa de tratagem do mesmo for concluída. Disponibiliza listagem e opção de distribuição.

## Contato

Para mais informações ou quaisquer dúvidas, entre em contato pelo email: felipefeltz232@gmail.com





   
