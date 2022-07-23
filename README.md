# Cadastro de Carro
**Requisitos Funcionais**
- Deve ser possível cadastrar um novo carro.

**Regras de Negócio**
- Não deve ser possível cadastrar um carro com a placa já existente.
- O carro deve ser cadastrado por padrão com disponibilidade.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de Carros
**Requisitos Funcionais**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regras de Negócio**
- O usuário não precisa estar logado no sistema

# Cadastro de Especificação no Carro
**Requisitos Funcionais**
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todas as carros.

**Regras de Negócio**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de Imagens do Carro
**Requisitos Funcionais**
- Deve ser possível cadastrar a imagem do carrro.
- Deve ser possível listar todos os carros.

**Requisitos Nao Funcionais**
- Utilizar o multer para uploads dos arquivos.

**Regras de Negócio**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de Carro
**Requisitos Funcionais**
- Deve ser possível cadastrar um aluguel.

**Regras de Negócio**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação.
- Ao realizar um aluguel o status do carro deverá ser alterado pra indisponível.

# Devolução do Carro
**Requisitos Funcionais**
- Deve ser possível realizar a devolução de um carro.

**Regras de Negócio**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa
  proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deve estar logado na aplicação.

# Listagem de aluguel para usuários
**Requisitos Funcionais**
- Deve ser possível realizar a busca de todos os alugueis para o usuário. 

**Regras de Negócio**
- O usuário deve estar logado na aplicação.

# Recuperar Senha
**Requisitos Funcionais**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**Regras de Negócio**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas