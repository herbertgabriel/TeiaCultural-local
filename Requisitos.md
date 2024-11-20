## **RN1 - Login por E-mail e Senha**  
**Descrição:** Permitir que os usuários façam login no sistema utilizando seu e-mail e senha. <br>
**Requisitos:**
Interface de login com campos para e-mail e senha.  

**Validação de credenciais:**
- Verificação do e-mail e senha no banco de dados.
- Mensagem de erro em caso de falha na autenticação ("E-mail ou senha incorretos").

**Feedback adequado:**
- Exibição de mensagens de erro específicas para e-mail não registrado ou senha incorreta.
- Sistema de recuperação de senha via e-mail.
- Opção de “Lembrar-me” para manter o usuário autenticado em sessões futuras.

**Opcional - Requisitos de segurança:**
- Proteção contra ataques de força bruta (limitação de tentativas de login).

---
## **RN2 - Cadastro de Usuário**
**Descrição:** Permitir o cadastro de novos usuários no sistema. <br>
**Requisitos:**
**Interface de cadastro com campos para:**
- Nome completo
- CPF (Cadastro de Pessoas Físicas)
- E-mail
- Senha
- Data de nascimento

**Validação de campos:**
- Verificação de CPF único (não registrado anteriormente).
- Validação do formato de data de nascimento (formato dd/mm/aaaa).
- Validação de e-mail (formato correto e não registrado anteriormente).
- Requisitos de senha (comprimento mínimo).

**Opcional - Armazenamento seguro de senhas:**
- Uso de hashing para armazenar senhas (bcrypt, Argon2 ou outros).
- Envio de e-mail de confirmação com link de ativação.
- Captcha ou sistema de verificação para prevenir bots durante o cadastro.

---
## **RN3 - Recuperação de Senha** 
**Descrição:** Permitir que os usuários recuperem suas senhas caso as esqueçam. <br>
**Requisitos:**
- Interface para solicitar recuperação de senha.
- Envio de e-mail com instruções para redefinir a senha.
- Link para redefinir a senha.
- Interface para inserir nova senha e confirmação de senha.
- Mensagens de feedback para sucesso ou falha na redefinição.

---
## **RN4 - Configurações de Conta**
**Descrição:** Permitir que os usuários visualizem e editem suas informações pessoais e ajustarem suas preferências e configurações de conta. <br>
**Requisitos:**
- Informações adicionais (opcional, como foto de perfil e biografia)
- Funcionalidade para alterar e atualizar e-mail, senha e outras informações pessoais.
- Validação de e-mail e senha durante a edição.
**Interface de perfil com campos para:**
- Nome
- CPF
- E-mail
- Data de nascimento

---
## **RN5 - Perfil do Usuário**
**Descrição:** Permitir que os usuários criem e gerenciem seus portfólios de trabalho. <br>
**Requisitos:**
- Interface para criar e editar portfólio/perfil
- Upload de imagens e descrições dos trabalhos.
- Funcionalidade para visualizar portfólios de outros usuários.
- Opcional: Sistema de comentários ou avaliações.

---
## **RN6 - Sistema de busca**
**Descrição:** Encontrar perfis de usuário conforme os filtros. <br>
**Requisitos:**
- Interface para aparecer perfis em destaque conforme as categorias selecionadas.
- Sistema de busca e filtragem de usuários por área de atuação, localização, etc.

---
## **Opcional - RN7 - Segurança e Privacidade**
**Descrição:** Garantir a proteção dos dados dos usuários e a integridade do sistema. <br>
**Requisitos:**
- Criptografia de dados sensíveis.
- Implementação de protocolos de segurança (HTTPS).
- Políticas de privacidade e conformidade LGPD.

---
## **RN0 - Template
Descrição: <br>
Requisitos: <br>

---
