# 📊 Configurar Google Sheets - Guia Completo

## 🚀 Passo 1: Criar/Preparar sua Planilha no Google Sheets

### 1.1 Acesse Google Sheets
- Vá para: https://docs.google.com/spreadsheets
- Crie uma nova planilha ou use uma existente

### 1.2 Estruturar os Dados

Crie **duas abas** na sua planilha:

#### **ABA 1: "Escala"**
Cabeçalho (linha 1):
```
SEMANA | DIA | DATA | MANHÃ | TARDE
```

Dados (começando na linha 2):
```
Semana 1 | Segunda | 03/11/2025 | Léo | Beto
Semana 1 | Terça | 04/11/2025 | Luis | Angela
Semana 1 | Quarta | 05/11/2025 | Vitor | Luis
Semana 1 | Quinta | 06/11/2025 | Lucas | Beto
Semana 1 | Sexta | 07/11/2025 | Thais | Vitor
Semana 2 | Segunda | 10/11/2025 | Leo | Vitor
...e assim por diante
```

#### **ABA 2: "Contatos"** (Opcional)
Cabeçalho (linha 1):
```
NOME | TELEFONE
```

Dados (começando na linha 2):
```
Léo | +55 (11) 99999-9999
Beto | +55 (11) 88888-8888
Luis | +55 (11) 77777-7777
Angela | +55 (11) 66666-6666
Vitor | +55 (11) 55555-5555
Lucas | +55 (11) 44444-4444
Thais | +55 (11) 33333-3333
```

---

## 🔑 Passo 2: Obter Credenciais do Google

### 2.1 Copiar ID da Planilha
1. Na URL da sua planilha, localize o ID:
   ```
   https://docs.google.com/spreadsheets/d/AQUI_ESTA_O_ID/edit
   ```
2. Copie a parte destacada

### 2.2 Criar Chave de API do Google

#### Opção A: Usando Google Cloud Console (Recomendado)

1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto:
   - Clique em "Selecionar um projeto" → "Novo projeto"
   - Nome: "Escala Café" ou similar
   - Clique em "Criar"

3. Ative a API do Sheets:
   - Vá para "APIs e Serviços" → "Biblioteca"
   - Procure por "Google Sheets API"
   - Clique em "Ativar"

4. Crie uma credencial:
   - Vá para "Credenciais" → "Criar Credencial"
   - Selecione "Chave de API"
   - Copie a chave gerada

#### Opção B: Usar Google Apps Script (Mais Simples)

Se não quiser usar Google Cloud, você pode usar Apps Script:

1. Na sua planilha, vá em: **Extensões** → **Apps Script**
2. Na aba **Publicação**, escolha "Fazer com que apps script execute"
3. Isso cria um endpoint que pode ser usado

---

## 📝 Passo 3: Configurar o Website

### 3.1 Edite o arquivo `js/data.js`

Procure pelas linhas:
```javascript
const GOOGLE_SHEET_ID = 'COLE_O_ID_DA_PLANILHA_AQUI';
const GOOGLE_API_KEY = 'COLE_SUA_CHAVE_API_DO_GOOGLE_AQUI';
```

E substitua:
```javascript
const GOOGLE_SHEET_ID = 'COLA_O_ID_AQUI_SEM_ASPAS_ADICIONAIS';
const GOOGLE_API_KEY = 'COLA_A_CHAVE_API_AQUI';
```

**Exemplo:**
```javascript
const GOOGLE_SHEET_ID = '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p';
const GOOGLE_API_KEY = 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

### 3.2 Compartilhar a Planilha (Importante!)

1. Abra sua planilha no Google Sheets
2. Clique em "Compartilhar"
3. Mude para "Qualquer pessoa com o link"
4. Selecione "Visualizador"
5. Clique em "Compartilhar"

---

## ✅ Passo 4: Testar a Integração

1. Abra o arquivo `index.html` no navegador
2. Abra o **Console** (F12)
3. Você deve ver:
   ```
   ✅ Dados carregados do Google Sheets com sucesso!
   ✅ Contatos carregados do Google Sheets
   ```

Se ver erros, verifique:
- ✔️ ID da planilha está correto?
- ✔️ Chave de API está correta?
- ✔️ Planilha está compartilhada?
- ✔️ Aba "Escala" existe?

---

## 🔄 Passo 5: Editar a Escala

Agora é fácil! Apenas:

1. Abra sua planilha no Google Sheets
2. **Edite os nomes** conforme necessário
3. **Recarregue** o website (Ctrl + F5 para forçar recarga)
4. Os dados aparecem automaticamente!

**Atenção:** O website recarrega os dados automaticamente a cada 5 minutos.

---

## 🐛 Solução de Problemas

### Erro: "CORS error" ou "403 Forbidden"

**Solução:**
1. Verifique se a planilha está compartilhada
2. Confirme que o link está como "Qualquer pessoa com o link"
3. Teste se a chave de API está ativa

### Dados não aparecem

**Solução:**
1. Verifique o console (F12) para ver mensagens de erro
2. Confirme que os nomes das abas estão exatamente: "Escala" e "Contatos"
3. Verifique o formato dos dados (sem linhas vazias entre registros)

### Dados muito lentos para carregar

**Solução:**
1. A API do Google leva alguns segundos
2. Primeira vez leva mais tempo
3. Dados são cacheados após primeira carga

---

## 🎯 Exemplos de Formatos Aceitos

### Formato Correto ✅
```
Semana 1 | Segunda | 03/11/2025 | Léo | Beto
Semana 2 | Terça | 10/11/2025 | Luis | Angela
```

### Formato Incorreto ❌
```
S1 | 2ª | 03/11 | Léo | Beto           ← Usar nomes completos
Semana 1 | | 03/11/2025 | Léo | Beto   ← Dia não pode ficar vazio
```

---

## 💡 Dicas Pro

1. **Backup**: Sempre mantenha um backup local da escala
2. **Revisão**: Revise os dados antes de grandes mudanças
3. **Permissões**: Você pode restringir quem pode editar
4. **Histórico**: Google Sheets mantém histórico de alterações

---

## 📱 Integração com SMS Continua!

A integração com SMS funciona normalmente:
1. Os dados vêm do Google Sheets
2. O sistema agendará SMS baseado nesses dados
3. Tudo funciona como antes, mas com dados dinâmicos!

---

## ❓ Precisa de Ajuda?

Se tiver dúvidas sobre:
- **Google Sheets API**: https://developers.google.com/sheets/api
- **Google Cloud Console**: https://console.cloud.google.com
- **Este projeto**: Verifique o README.md principal

---

**Pronto! Agora seu website está sincronizado com Google Sheets! 🎉**
