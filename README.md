## IDEIAS PARA MELHORIAS POTERIORES

- MUDAR ESTRUTURA DE PASTAS, EX: USO DE FEATURE QUEBRA DE COMPONENTS, ETC
- MELHORAR RESPONSIVIDADE, POSSIVEL USO DE DETECÇÃO SERVERSIDE

- APLICAR DIVERSOS TIPOS DE TESTES

## Fluxo da aplicação

### Home

    Guarda um component chamado claimUsernameForm que permite a definição do nome de usuário e redireciona para rota de registro, usando como parametro de rota o  username

### Register

    Pega o username do parametro de rota
    ao dar submit no form faz uma requisição que verifica a existência do username, caso não exista ele cria  o usuário por requisição a api e seta o userId nos cookies, depois redireciona para página de conectar calendário

### Connect Calendar

    Tem um botão de conexão com o google atraves do nextAuth e outro que redireciona par próxima página do form

    o botão de conectar com o google atuliza o usuário com os dados da conexão OAuth, pois o usuário é criado na tela passada, o adapter personalizado permite atribuit a função de create um update no prisma

### Time Intervals

    Tela que registra os intervalos de disponibilidade

## Aprendizados

- quando temos um botão que não tem texto apenas ícone é necessário resetar o fontSize ou lineHeight, pois o tamanho do botão é definido com base neles logo o tamanho pode ficar desproporcional
