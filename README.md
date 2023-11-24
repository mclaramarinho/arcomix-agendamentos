
# Sistema de Agendamentos - Arcomix

Repositório com o front-end desenvolvido para o sistema de agendamentos de entregas de fornecedores para a empresa Arcomix.

Deploy URL: agenda-arcomix.netlify.app

## Instalação

1. Clone o repositório

2. Se você não tiver o Node instalado, instale-o diretamente do [site oficial](https://nodejs.org/en/) para poder prosseguir com a instalação dos packages.

3. No terminal, no local em que foi clonado o repositório, instale todos os packages com o npm.
```node
npm install
```

## Servindo Localmente
No terminal, no local em que foi clonado o repositório, execute:
```node
npm start
```
Isso iniciará um localhost para que você possa utilizar o sistema localmente.

## Utilizando
Para logar, observe as informações de login presentes em .\src\users\colaboradores.js (para informações sobre colaboradores) ou .\src\users\fornecedores.js (para informações sobre fornecedores)


## Testes
O sistema inicia sem nenhum agendamento.

Se desejar testar o sistema com alguns agendamentos já prontos (caso contrário, ignore esse passo-a-passo):

1. Copie o json do arquivo test-data.json (localizado em ./test-data.json)

2. Inspecione a página (F12 ou Ctrl+Shift+C - Windows e Linux /// Command+Shift+C - macOS)

![passo-2](https://github.com/mclaramarinho/arcomix-agendamentos/assets/119897667/37a25bdf-6e63-48c5-afcc-d7dc1f3fdadb)

4. Siga para a aba "Application"

![passo-3](https://github.com/mclaramarinho/arcomix-agendamentos/assets/119897667/c5f46053-a7e4-4e06-a921-88f38cde93f6)

6. Abra o Local Storage e clique na primeira opção dentro dessa página (ou a opção que indicar o URL da página)

![passo-4](https://github.com/mclaramarinho/arcomix-agendamentos/assets/119897667/be61d14e-4614-42e3-a977-360f7aaafd14)

8. Clique 2x no campo Value da key Agendamentos

![passo-5](https://github.com/mclaramarinho/arcomix-agendamentos/assets/119897667/12447036-ab66-44de-a5bf-91b7c8a4dfd3)

10. Cole o json que foi copiado

![passo-6](https://github.com/mclaramarinho/arcomix-agendamentos/assets/119897667/ecf2aef4-fbb4-4559-ba73-e5c6c78d14af)

12. Aperte Enter para salvar. Esse deve ser o resultado:

![passo-7](https://github.com/mclaramarinho/arcomix-agendamentos/assets/119897667/e108e6b6-a7d3-4c28-a07a-eca9eea13ac5)

## INFORMAÇÕES DE LOGIN

1. FORNECEDOR
id_fornecedor: vitarella_0765,
senha: 1357910,

id_fornecedor: perdigao_8640,
senha: 544321,

id_fornecedor: masterboi_0378,
senha: 12345,

2. COLABORADOR
matricula: 01277902,
senha: clara_marinho,

matricula:01277804,
senha: lohhan_gui

matricula: 123456,
senha: alexandre


O sistema já apresentará agendamentos passados e futuros para ser testado.
