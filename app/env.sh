#!/bin/bash

# Recriar o arquivo de configuração
rm -rf ./src/env-config.ts
touch ./src/env-config.ts

# Adicionar a abertura do objeto JSON
echo "{" >> ./src/env-config.ts

# Ler cada linha no arquivo .env
# Cada linha representa pares chave-valor
while IFS= read -r line || [[ -n "$line" ]];
do
  # Ignorar linhas vazias ou comentadas no arquivo .env
  if [[ -z "$line" || "$line" =~ ^\s*# ]]; then
    continue
  fi

  # Dividir as variáveis env pelo caractere `=`
  varname=$(echo "$line" | cut -d '=' -f 1)
  varvalue=$(echo "$line" | cut -d '=' -f 2-)

  # Verificar se a variável está definida no ambiente
  value_from_env=$(printenv "$varname")

  # Usar o valor da variável de ambiente, se estiver definida
  if [ -n "$value_from_env" ]; then
    value="$value_from_env"
  else
    # Remover as aspas extras, se estiverem presentes
    value=$(echo "$varvalue" | sed 's/^"\(.*\)"$/\1/')
  fi

  # Associar a propriedade de configuração ao arquivo JSON
  echo "  \"$varname\": \"$value\"," >> ./src/env-config.ts
done < .env

# Remover a vírgula da última linha
sed -i '$ s/,$//' ./src/env-config.ts

# Adicionar o fechamento do objeto JSON
echo "}" >> ./src/env-config.ts
