#App

Gympass style app.

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil do usuário autenticado;
- [ ] Deve ser possível obter o número de check-ins do usuário autenticado;
- [ ] Deve ser possível obter o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [ ] O usuário não deve poder se cadastrar com um email duplicado;
- [ ] O usuário não pode fazer dois check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validade até 20 minutos depois de criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] Academias somente podem ser cadastradas por administradores;

## RNFs (Requisitos Não Funcionais)
- [ ] A senha do usuário deve estar criptografada;
- [ ] Os dados da aplicação devem ser persistidos em um banco de dados PostgreSQL;
- [ ] Todas as listagens devem ser paginadas com 20 itens por página;
- [ ] O usuário deve ser identifcado por um JWT (JSON Web Token);
