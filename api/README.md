# concierge

## Rotas HTTP:

O serviço possui 9 rotas HTTP, descritas abaixo:

### GET - /feature-flagger/rollouts/:id

- Esta rota recebe o ID da empresa (company) como parâmetro.

```
/feature-flagger/rollouts/5e32e8c7578025070d6be064
```

- É responsável por verificar todos os rollouts que a company está e retornar em um array os nomes das flaggers. (Caso a flagger esteja em full rollout ela irá conter no array)

```
{
    "rollouts": [
        "rdchat:fila_sequencial",
        "rdchat:socket_notifications"
    ]
}
```

- Caso a company não esteja em nenhum rollout terá o seguinte retono.

```
{
    "rollouts": []
}
```

### GET - /feature-flagger/rollout/:flagger/:id

- Esta rota recebe o flagger e o ID da empresa (company) do rollout como parâmetros.

```
/feature-flagger/rollout/rdchat:socket-management-api/5e32e8c7578025070d6be064
```

- É responsável por validar se a company está na lista de empresas do rollout.
- Em casos de full rollout, o retorno será sempre “true”.

### GET - /feature-flagger/all

- Retorna as chaves de rollout registradas no redis.

```
{
    "flaggers": [
        "rdchat:fila_sequencial",
        "rdchat:socket_notifications"
    ]
}
```

### GET - /feature-flagger/:flagger

- Recebe o flagger do rollout como parâmetro.

```
/feature-flagger/rdchat:socket-management-api
```

- Retorna as informações do flagger de rollout com todos os seus dados.

```
{
    "payload": {
        "flagger": "rdchat:socket-management-api",
        "expiration_at": "25/05/2024",
        "full_rollout": false,
        "description": "Rollout do novo serviço de socket",
        "ids": [
        "5e32e8c7578025070d6be064",
        "5ea184c3f6788526aa8d5271",
        "5e94cdc970288c0b04ebb54b",
        "5dea7b4f5398f61a067f0ce9",
        "65687c7b9a92b192f48d1472",
        "5fd0c201d9a4bc033612bec1",
        ]
    }
}
```

### PUT - /feature-flagger/release/:flagger

- Recebe o flagger como parâmetro e, no corpo (body), um array de IDs.

```
/feature-flagger/release/rdchat:socket-management-api
```

```
{
    "ids": [
        "5e32e8c7578025070d6be064",
        "5ea184c3f6788526aa8d5271",
        "5e94cdc970288c0b04ebb54b",
        "5dea7b4f5398f61a067f0ce9",
        "65687c7b9a92b192f48d1472",
        "5fd0c201d9a4bc033612bec1",
    ]
}
```

- Responsável por incluir as empresas no rollout.

### PUT - /feature-flagger/unrelease/:flagger

- Recebe o flagger como parâmetro e, no corpo (body), um array de IDs.

```
/feature-flagger/unrelease/rdchat:socket-management-api
```

```
{
    "ids": [
        "5e32e8c7578025070d6be064",
        "5ea184c3f6788526aa8d5271",
        "5e94cdc970288c0b04ebb54b",
        "5dea7b4f5398f61a067f0ce9",
        "65687c7b9a92b192f48d1472",
        "5fd0c201d9a4bc033612bec1",
    ]
}
```

- Responsável por remover as empresas no rollout.

### PUT - /feature-flagger/full-rollout/:flagger

- Recebe o flagger como parâmetro e, no corpo (body), um objeto com o campo “full_rollout”.

```
/feature-flagger/full-rollout/rdchat:socket-management-api
```

```
{
    "full_rollout": false
}
```

- O campo “full_rollout” recebe “true” ou “false”.
- Se definido como “true”, todas as empresas entrarão no rollout.
- Se definido como “false”, apenas as empresas incluídas na rota "PUT - /feature-flagger/release/:flagger" entrarão no rollout.

### POST - /feature-flagger/create

- Recebe um objeto com os dados para registro de um novo rollout.

```
{
    "flagger": "rdchat:socket-management-api",
    "expiration_at": "25/05/2024",
    "full_rollout": false,
    "description": "Rollout do novo serviço de socket"
}
```

- Responsável por criar novos flaggers para rollout.
- É possível já informar os IDs na criação, bastando passar um array com os IDs conforme a rota "PUT - /feature-flagger/release/:flagger".

### DELETE - /feature-flagger/:flagger

- Recebe o flagger como parâmetro.

```
/feature-flagger/rdchat:socket-management-api
```

- Responsável por remover a flagger de rollout do Redis.

## Rota gRPC:

- O serviço dispõe de conexão gRPC para validar internamente se as features estão em rollout ou não.
- Recebe dois parâmetros, sendo eles o “flagger” e o “id”.

```
{
    "flagger": "rdchat:socket-management-api",
    "id": "5dea7b4f5398f61a067f0ce9"
}
```

- Retorna um objeto com o campo “rollout” sendo “true” ou “false”.

```
{
    "rollout": true
}
```
