Execute um dos códigos abaixo para inicar a aplicação:
    -> npm run challenge
    -> node --watch src/server.js

Insomnia ↓
    • Inserir em formato JSON↓
    → http://localhost:3333/tasks (Método POST)
        {
        "title": "Task com todos os dados",
        "description": "Task com todos os dados, incluindo as dadas"
        }

    • Listar
    → http://localhost:3333/tasks (Método GET)

    • Apagar Task
    → http://localhost:3333/tasks (Método DELETE, Colocar id da
    task que quer excluir no final da url)

    • Para inserir o arquivo csv o server.js precisa estar rodando
    • Para executar o import.csv -> node src/import-csv.js   