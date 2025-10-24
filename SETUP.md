# 🔧 Guia de Setup Completo

> Tudo que você precisa fazer para configurar o projeto localmente

---

## 📋 Pré-Requisitos

- ✅ Git instalado ([download](https://git-scm.com))
- ✅ Node.js 14+ instalado ([download](https://nodejs.org))
- ✅ Um editor de código (VS Code recomendado)
- ✅ Acesso à planilha Google Sheets do Hub CriCare
- ✅ Uma conta Google (para gerar API Key)

---

## 🚀 Passo 1: Clonar o Repositório

### No Terminal/PowerShell:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/escala-cafe.git

# Entre na pasta
cd escala-cafe

# Instale as dependências
npm install
```

**Pronto!** Você tem todos os arquivos localmente.

---

## 📊 Passo 2: Configurar Google Sheets

### 2.1 Obter Sheet ID

1. Abra a planilha no Google Sheets
2. Copie a URL:
   ```
   https://docs.google.com/spreadsheets/d/AQUI_VAI_O_ID/edit
   ```
3. O `AQUI_VAI_O_ID` é seu **Sheet ID**

### 2.2 Gerar API Key

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto (ou use existente)
3. Ative a API "Google Sheets API":
   - Menu > "APIs e Serviços"
   - Clique em "Ativar APIs e serviços"
   - Procure por "Google Sheets API"
   - Clique em "Ativar"

4. Crie uma chave de API:
   - Menu > "Credenciais"
   - Clique em "Criar credencial"
   - Escolha "Chave de API"
   - Copie a chave gerada

### 2.3 Compartilhar Planilha Publicamente

1. Abra a planilha
2. Clique em "Compartilhar" (canto superior direito)
3. Mude para "Qualquer pessoa com o link"
4. Permissão: "Visualizador"
5. Pronto!

---

## ⚙️ Passo 3: Atualizar Configurações

### Editar `js/data.js`

```bash
# Abra no editor
code js/data.js
```

Encontre estas linhas (início do arquivo):

```javascript
const GOOGLE_SHEET_ID = '1p6WnSKVdnI32nxgn_-FtjGdhg6WxBo9lZzWo6Kz9ESk';
const GOOGLE_SHEET_RANGE = 'Escala!A3:C25';
const GOOGLE_API_KEY = 'AIzaSyBQude-mTlGojEYxEgUED5gPQU4xX2R-xU';
```

Substitua pelos seus valores:

```javascript
const GOOGLE_SHEET_ID = 'SEU_SHEET_ID_AQUI';
const GOOGLE_SHEET_RANGE = 'Escala!A3:C25';  // Ajuste se necessário
const GOOGLE_API_KEY = 'SUA_API_KEY_AQUI';
```

**Exemplo real:**
```javascript
const GOOGLE_SHEET_ID = '1a2b3c4d5e6f7g8h9i0j';
const GOOGLE_SHEET_RANGE = 'Escala!A1:C50';
const GOOGLE_API_KEY = 'AIzaSyL8Zx9Y2W3V4U5T6S7R8Q9P0';
```

---

## 📱 Passo 4: Adicionar Contatos

### Editar `js/data.js` - Objeto `contacts`

Procure por:

```javascript
const contacts = {
    'Léo': '+5585987654321',
    'Beto': '+5585987654322',
    // ... etc
};
```

Atualize com os números reais:

```javascript
const contacts = {
    'Léo': '+5585988776655',
    'Beto': '+5585988776656',
    'Luis': '+5585988776657',
    'Angela': '+5585988776658',
    'Vitor': '+5585988776659',
    'Lucas': '+5585988776660',
    'Thais': '+5585988776661'
};
```

**Formato:** `+55` + DDD + número (com 9 dígitos para celular)

---

## 🧪 Passo 5: Testar Localmente

### Terminal:

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Saída esperada:
# Starting up http-server, serving .
# http-server version: 14.1.1
# http-server settings:
# CORS: disabled
# Cache: 3600 seconds
# Connection Timeout: 120 seconds
# ...
# Hit CTRL-C to stop the server
```

### Navegador:

Abra: `http://localhost:3000`

**Você deve ver:**
- ☕ Logo "Escala de Café"
- 📊 4 semanas exibidas em grid
- ⭐ Botões de filtro (Todas, Semana 1, 2, 3, 4)
- 👤 Seção "Próxima Escala"
- ⚙️ Botão de configurações

---

## ✅ Passo 6: Verificar Conexão com Google Sheets

### No Console do Navegador (F12 > Console tab):

```javascript
// Cole isto no console e veja se recebe dados:
const data = await loadGoogleSheetData();
console.table(data);
```

**Esperado:** Uma tabela com os dados da planilha

**Se receber erro 403:** Volte ao Passo 2.3 (compartilhe a planilha)

**Se receber erro 404:** Verifique Sheet ID em Passo 3

---

## 🎨 Passo 7: Customizar (Opcional)

### Mudar Cores

Abra `css/styles.css` e procure:

```css
:root {
    --primary-color: #8B4513;
    --secondary-color: #F4A460;
    --accent-color: #FFD700;
}
```

Altere para suas cores preferidas (hexadecimal).

### Mudar Horários Padrão

Abra `js/data.js` e procure:

```javascript
const defaultSettings = {
    morningTime: '08:00',
    afternoonTime: '14:00',
    notificationsEnabled: true
};
```

---

## 🚀 Passo 8: Deploy na Vercel

### 8.1 Preparar Git

```bash
# Adicione todos os arquivos
git add .

# Faça commit
git commit -m "Setup inicial do projeto"

# Push para GitHub
git push origin main
```

### 8.2 Conectar à Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login (ou crie conta)
3. Clique em "New Project"
4. Selecione seu repositório `escala-cafe`
5. Framework: **Other** (site estático)
6. Clique em **Deploy**

**Seu site estará em:** `https://escala-cafe.vercel.app`

### 8.3 Configurar Variáveis de Ambiente (Opcional)

Se quiser proteger sua API Key:

1. Vá para "Settings" do projeto na Vercel
2. Clique em "Environment Variables"
3. Adicione:
   - `GOOGLE_SHEET_ID` = seu ID
   - `GOOGLE_API_KEY` = sua chave

Depois atualize `js/data.js` para usar:
```javascript
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || 'fallback';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'fallback';
```

---

## 📝 Passo 9: Verificar Formato da Planilha

Sua planilha **DEVE** ter este formato:

| A | B | C |
|---|---|---|
| (cabeçalho vazio ou título) | | |
| (outro cabeçalho) | | |
| **Semana 1** | | |
| **MANHÃ** | | |
| Segunda/03 | Léo | Beto |
| Terça/04 | Luis | Angela |
| ... | ... | ... |
| **TARDE** | | |
| Semana 2 | | |
| ... | ... | ... |

**Pontos críticos:**
- ✅ Dados começam na **linha 3** (A3:C25)
- ✅ Formato da data: `Segunda/03` (não `segunda/03` ou `Segunda 03`)
- ✅ Nomes exatos conforme `contacts` em `js/data.js`
- ✅ As linhas "MANHÃ", "TARDE", "Semana X" serão puladas automaticamente

---

## 🔄 Passo 10: Fluxo de Desenvolvimento

### Fazer Mudanças:

```bash
# 1. Crie um branch
git checkout -b minha-feature

# 2. Faça alterações nos arquivos

# 3. Teste localmente
npm run dev

# 4. Adicione ao git
git add .

# 5. Faça commit
git commit -m "Descrição da mudança"

# 6. Push para GitHub
git push origin minha-feature

# 7. Abra Pull Request no GitHub
# (Para revisão antes de mesclar)

# 8. Vercel vai fazer deploy automático da PR
# Teste em https://escala-cafe-{nome-branch}.vercel.app

# 9. Quando aprovado, mescle para main
git checkout main
git merge minha-feature
git push origin main

# 10. Vercel vai fazer deploy do main automaticamente
```

---

## 🐛 Troubleshooting

### ❌ "Erro: Planilha não compartilhada"

**Solução:**
```
1. Abra a planilha no Google Sheets
2. Clique em "Compartilhar"
3. Mude para "Qualquer pessoa com o link"
4. Recarregue a página
```

### ❌ "Erro 404: Spreadsheet not found"

**Solução:**
```
1. Copie o Sheet ID novamente da URL
2. Atualize em js/data.js
3. Verifique se a planilha existe
```

### ❌ "Erro 403: Invalid API Key"

**Solução:**
```
1. Vá para Google Cloud Console
2. Verifique se "Google Sheets API" está ATIVADA
3. Gere uma nova chave de API
4. Atualize em js/data.js
```

### ❌ Dados não aparecem no site

**Debug:**
```javascript
// Console (F12):
const rows = await loadGoogleSheetData();
console.log('Status:', rows);  // Ver se recebeu dados

const parsed = parseGoogleSheetData(rows);
console.log('Parsed:', parsed);  // Ver se parseou corretamente
```

### ❌ Site está lento ou travando

**Causas possíveis:**
- Muitas linhas na planilha? Aumente `GOOGLE_SHEET_RANGE` limite
- Intervalo de atualização muito curto? (padrão: 5 min está ok)
- Conexão internet lenta? Verifique rede

---

## ✨ Próximos Passos

Depois de tudo configurado:

1. **Testar SMS** - Integrar com Twilio ou outro provedor
2. **Customizar Visual** - Ajustar cores e layout
3. **Adicionar Mais Features** - Histórico, relatórios, etc
4. **Backup de Dados** - Configurar auto-backup da planilha

---

## 📚 Comandos Úteis

```bash
# Inicia servidor de desenvolvimento
npm run dev

# Build (não necessário para site estático)
npm run build

# Ver estrutura do projeto
tree /F

# Verificar Git status
git status

# Ver histórico de commits
git log --oneline

# Resetar para versão anterior
git reset --hard HEAD~1
```

---

## 💡 Dicas

1. **Use VS Code Extensions:**
   - Live Server (para preview ao vivo)
   - GitHub Copilot (para ajuda com código)
   - Prettier (para formatar código)

2. **Chrome DevTools:**
   - F12 - Abre developer tools
   - Console - Execute JavaScript
   - Network - Veja requisições HTTP
   - Sources - Debug com breakpoints

3. **Google Sheets Tips:**
   - Use cores para destacar células
   - Bloqueie células para evitar edição acidental
   - Use validação de dados para dropdowns

---

## ❓ Perguntas?

Consulte:
- 📖 **README.md** - Visão geral do projeto
- 🛠️ **DESENVOLVIMENTO.md** - Como funciona o código
- 📊 **GOOGLE_SHEETS_SETUP.md** - Setup detalhado do Google Sheets

---

**Última atualização:** Outubro 2025
