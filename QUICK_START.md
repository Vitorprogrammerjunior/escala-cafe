# 🚀 INÍCIO RÁPIDO - Escala de Café com Google Sheets

## 📋 O que você tem agora?

Um website COMPLETO e LINDO para gerenciar escala de café com integração com Google Sheets!

---

## ⚡ 3 Passos Rápidos para Começar

### ✅ Passo 1: Abrir o Website
```
Abra: index.html
```

### ✅ Passo 2: Criar Google Sheets
1. Vá para: https://docs.google.com/spreadsheets
2. Crie uma nova planilha
3. Crie 2 abas: **"Escala"** e **"Contatos"** (veja TEMPLATE_EXEMPLO.md)
4. Copie os dados conforme o exemplo

### ✅ Passo 3: Configurar Integração
1. Abra: **config-assistant.html** (assistente visual!)
2. Siga os passos
3. Cole o código gerado no arquivo **js/data.js**

**Pronto! 🎉**

---

## 📁 Estrutura do Projeto

```
Escala-cafe/
├── index.html                    ← ABRA AQUI (website principal)
├── config-assistant.html         ← Assistente de setup
├── test-integration.html         ← Testar integração
│
├── css/
│   └── styles.css               ← Estilos e animações
│
├── js/
│   ├── data.js                  ← EDITE AQUI (ID e Chave API)
│   └── script.js                ← Lógica da aplicação
│
├── README.md                    ← Documentação completa
├── GOOGLE_SHEETS_SETUP.md       ← Guia detalhado do Google Sheets
├── TEMPLATE_EXEMPLO.md          ← Template para copiar na planilha
└── QUICK_START.md              ← Este arquivo
```

---

## 🎯 Próximos Passos em Ordem

### Se está começando AGORA:

1. **Abra** `config-assistant.html` no navegador
   - Ele vai guiar você passo a passo
   - Será rápido (5 minutos)

2. **Prepare** sua planilha Google Sheets
   - Copie o template de `TEMPLATE_EXEMPLO.md`
   - Cole na aba "Escala"

3. **Configure** o website
   - Cole as credenciais do Google em `js/data.js`

4. **Teste** com `test-integration.html`
   - Valida se tudo está funcionando

5. **Abra** `index.html`
   - Seu website está pronto!

---

## 💡 Funcionalidades Principais

✨ **Website Bonito e Responsivo**
- Funciona perfeitamente em celular, tablet e desktop
- Animações suaves e modernas
- Design em tema de café (marrom, ouro)

📊 **Sincronizado com Google Sheets**
- Atualiza automaticamente a cada 5 minutos
- Basta editar a planilha que o site muda
- Sem necessidade de banco de dados

📱 **Notificações SMS**
- Envia SMS nos horários configurados
- Manhã e tarde
- Pode customizar horários

📅 **Escala Inteligente**
- Mostra próxima escala
- Filtros por semana
- Data e hora atual

---

## 🔧 Ferramentas Auxiliares

### 1. **config-assistant.html** 
   - Assistente visual para configurar Google Sheets
   - Gera código pronto para copiar
   - Testa a conexão

### 2. **test-integration.html**
   - Testa a conexão com Google Sheets
   - Valida dados da escala
   - Valida contatos
   - Mostra erros detalhados

### 3. **TEMPLATE_EXEMPLO.md**
   - Estrutura pronta para copiar
   - Exemplo com todos os dados
   - Formato correto

---

## ⚙️ Arquivos para Editar

### Arquivo 1: `js/data.js` (OBRIGATÓRIO)

Procure por:
```javascript
const GOOGLE_SHEET_ID = 'COLE_O_ID_DA_PLANILHA_AQUI';
const GOOGLE_API_KEY = 'COLE_SUA_CHAVE_API_DO_GOOGLE_AQUI';
```

E substitua pelos seus valores. Use o `config-assistant.html` para gerar!

### Arquivo 2: `js/data.js` (OPCIONAL - Contatos)

Se não usar Google Sheets para contatos, preencha manualmente:
```javascript
const contacts = {
    "Leo": "+55 (11) 99999-9999",
    "Beto": "+55 (11) 88888-8888",
    // ... etc
};
```

---

## 📊 Estrutura Google Sheets

### Aba "Escala" (OBRIGATÓRIA)

| SEMANA | DIA | DATA | MANHÃ | TARDE |
|--------|-----|------|-------|-------|
| Semana 1 | Segunda | 03/11/2025 | Léo | Beto |
| Semana 1 | Terça | 04/11/2025 | Luis | Angela |

### Aba "Contatos" (OPCIONAL)

| NOME | TELEFONE |
|------|----------|
| Léo | +55 (11) 99999-9999 |
| Beto | +55 (11) 88888-8888 |

---

## 🆘 Solução Rápida de Problemas

### "Dados não aparecem"
- ✅ Verificou se a planilha está compartilhada?
- ✅ Confirmou ID e Chave de API?
- ✅ Abra DevTools (F12) e veja o console

### "Google Sheets error"
- ✅ Use `test-integration.html` para diagnosticar
- ✅ Verifique se aba se chama exatamente "Escala"

### "SMS não funciona"
- ✅ Você precisa de um serviço de SMS (Twilio, AWS, etc)
- ✅ Veja README.md para integração

---

## 📞 Integração com SMS

Para receber SMS de verdade quando chegar a hora:

1. Crie conta em: **Twilio** (https://www.twilio.com/)
2. Copie suas credenciais
3. Edite a função `sendSMSNotification()` em `js/script.js`
4. Integre com a API do Twilio

Atualmente, o sistema **simula** o envio (aparece no console).

---

## 🎨 Personalizar Cores

Edite `css/styles.css`:
```css
:root {
    --primary-color: #8B4513;      /* Marrom café - CUSTOMIZE AQUI */
    --secondary-color: #F4A460;    /* Sandy brown - CUSTOMIZE AQUI */
    --accent-color: #FFD700;       /* Ouro - CUSTOMIZE AQUI */
}
```

---

## 📱 Testar em Celular

1. Coloque os arquivos em um servidor web (GitHub Pages, Netlify, etc)
2. Acesse via URL
3. O design é 100% responsivo

Ou teste localmente:
- Clique com botão direito → Inspetor
- Aperte Ctrl+Shift+M (responsive)

---

## ✅ Checklist Final

- [ ] Criei Google Sheet com abas "Escala" e "Contatos"
- [ ] Copiei o template de dados
- [ ] Compartilhei a planilha (qualquer pessoa com link)
- [ ] Obtive ID da planilha
- [ ] Obtive Chave de API do Google
- [ ] Usei config-assistant.html
- [ ] Editei js/data.js
- [ ] Testei com test-integration.html
- [ ] Abri index.html
- [ ] Website está funcionando!

---

## 🎓 Documentação Completa

- **README.md** - Documentação principal e completa
- **GOOGLE_SHEETS_SETUP.md** - Guia detalhado Google Sheets
- **TEMPLATE_EXEMPLO.md** - Template e estrutura de dados
- **QUICK_START.md** - Este arquivo!

---

## 🎉 Pronto!

Seu website está pronto para usar. Agora é só:

1. Abra `index.html`
2. Compartilhe o link
3. Edite a escala no Google Sheets quando quiser
4. O site atualiza automaticamente!

---

**Qualquer dúvida, consulte a documentação ou use os testes auxiliares! 🚀**

### Arquivos principais:
- 🌐 `index.html` - Website (abra aqui)
- ⚙️ `config-assistant.html` - Configuração
- 🧪 `test-integration.html` - Testes
- 📖 `README.md` - Documentação
