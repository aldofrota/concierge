#!/bin/bash

# Ler o valor da variável de ambiente API
api_url=$API

# Substituir o valor de API no arquivo env-config.ts
sed -i "s|http://localhost:9989|$api_url|g" /app/src/env-config.ts
