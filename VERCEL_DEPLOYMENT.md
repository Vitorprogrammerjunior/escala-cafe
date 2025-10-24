# 🚀 Deploy Vercel - Guia Completo

> Como hospedar o Escala de Café gratuitamente na Vercel

---

## ✨ Por Que Vercel?

| Aspecto | Vercel | Alternativas |
|--------|--------|-------------|
| **Preço** | Gratuito | GitHub Pages (grátis), Netlify (grátis) |
| **Facilidade** | Ultra simples | Requer git |
| **Performance** | CDN global | Muito rápida |
| **Deploy Automático** | Sim (git push) | Sim |
| **Suporte** | Excelente | Bom |
| **SSL/HTTPS** | Incluído | Incluído |
| **Domínio** | vercel.app | Seu domínio |

---

## 📋 Pré-Requisitos

- ✅ Conta GitHub
- ✅ Código no repositório
- ✅ Conta Google (grátis)

---

## 🔧 Passo 1: Preparar o Código

### Estrutura esperada pela Vercel:

```
/escala-cafe
├── index.html          ← Arquivo raiz
├── css/
│   └── styles.css
├── js/
│   ├── data.js
│   └── script.js
├── package.json        ← Especifica que é site estático
└── vercel.json         ← Config Vercel (opcional)
```

**Verifique:**
```bash
cd escala-cafe
ls -la
# Deve ver: index.html, css/, js/, package.json, vercel.json
```

### Seu `package.json` deve ter:

```json
{
  "name": "escala-cafe",
  "version": "1.0.0",
  "description": "Escala de Café - Hub CriCare",
  "scripts": {
    "build": "echo 'Static site - no build needed'"
  }
}
```

Vercel vai reconhecer como site estático automaticamente.

---

## 📤 Passo 2: Upload para GitHub

### Se ainda não fez:

```bash
# Inicialize git
git init

# Adicione arquivos
git add .

# Faça commit
git commit -m "Initial commit - Escala de Café"

# Crie repositório no GitHub (via site)
# Depois:

git remote add origin https://github.com/SEU_USUARIO/escala-cafe.git
git branch -M main
git push -u origin main
```

### Agora seu código está em:
```
https://github.com/SEU_USUARIO/escala-cafe
```

---

## 🚀 Passo 3: Deploy na Vercel

### Opção A: Via Site (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com)

2. Clique em **"Sign Up"** (ou faça login se já tiver conta)

3. Selecione **"GitHub"** como método de login
   - Autorize Vercel a acessar seus repositórios

4. Clique em **"New Project"**

5. Procure por **`escala-cafe`** na lista

6. Clique em **"Import"**

7. Configurações (deixe padrão):
   - **Project Name:** `escala-cafe`
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`
   - **Build Command:** `echo 'Static'` (ou deixe em branco)
   - **Output Directory:** `./`

8. Clique em **"Deploy"**

9. ⏳ Aguarde (~1-2 minutos)

10. ✅ Seu site está online!

**URL:** `https://escala-cafe.vercel.app`

---

### Opção B: Via CLI (Alternativa)

```bash
# Instale Vercel CLI
npm install -g vercel

# No diretório do projeto
cd escala-cafe

# Deploy
vercel

# Siga as instruções no terminal
# - Login com GitHub
# - Escolha "escala-cafe" como project name
# - Confirme settings

# Pronto! URL será exibida
```

---

## ⚙️ Passo 4: Configurar Variáveis de Ambiente (Opcional)

Se quiser **proteger sua API Key** (recomendado em produção):

### Na Vercel:

1. Acesse seu projeto em [vercel.com/dashboard](https://vercel.com/dashboard)

2. Selecione **`escala-cafe`**

3. Vá em **Settings** → **Environment Variables**

4. Adicione:
   - **Name:** `GOOGLE_SHEET_ID`
   - **Value:** seu Sheet ID
   - Clique em **"Add"**

5. Repita para:
   - **Name:** `GOOGLE_API_KEY`
   - **Value:** sua chave API

### No seu código (`js/data.js`):

```javascript
// Usar variáveis de ambiente se disponível, senão fallback
const GOOGLE_SHEET_ID = 
    window.location.hostname === 'localhost' 
    ? 'LOCAL_ID_HERE'
    : process.env.GOOGLE_SHEET_ID || '1p6WnSKVdnI32nxgn_-FtjGdhg6WxBo9lZzWo6Kz9ESk';

const GOOGLE_API_KEY = 
    window.location.hostname === 'localhost'
    ? 'LOCAL_KEY_HERE'
    : process.env.GOOGLE_API_KEY || 'AIzaSyBQude-mTlGojEYxEgUED5gPQU4xX2R-xU';
```

⚠️ **Nota:** Variáveis de ambiente em `process.env` não funcionam em frontend (browser). Para proteger de verdade, você precisaria de um backend.

---

## 🔄 Passo 5: Deploy Automático

### Agora, sempre que você fizer push no GitHub:

```bash
# Faça mudança no código
# Exemplo: edite css/styles.css

# Adicione ao git
git add css/styles.css

# Faça commit
git commit -m "Alterar cor principal para azul"

# Push para GitHub
git push origin main

# 🎉 Vercel detecta o push automaticamente
# Novo deploy inicia (~2 minutos)
# Seu site é atualizado em produção
```

**Seu site está sempre sincronizado com o GitHub!**

---

## 🌐 Domínio Personalizado (Opcional)

Se quiser usar um domínio próprio (ex: `escala.cricare.com.br`):

### Na Vercel:

1. Vá em **Settings** → **Domains**

2. Clique em **"Add Domain"**

3. Digite seu domínio: `escala.cricare.com.br`

4. Clique em **"Add"**

5. Vercel vai mostrar registros DNS para configurar

### No seu provedor de DNS:

1. Acesse seu painel (ex: GoDaddy, Namecheap)

2. Adicione os registros DNS conforme Vercel indicou

3. Aguarde 15-30 minutos para propagação

4. Seu domínio agora aponta para Vercel!

---

## 🧪 Testar o Deploy

### Depois do deploy:

```bash
# Acesse seu site
https://escala-cafe.vercel.app

# Ou com domínio personalizado
https://escala.cricare.com.br

# Verifique:
✅ Página carrega
✅ Estilos aparecem corretamente
✅ Dados do Google Sheets carregam
✅ Responsividade funciona (teste em mobile)
✅ Filtros funcionam
✅ Configurações salvam
```

### Se algo não funcionar:

1. Abra Console (F12)
2. Procure por erros vermelhos
3. Verifique se:
   - Sheet ID está correto
   - Planilha está compartilhada
   - API Key está correta
   - Internet está conectada

---

## 📊 Monitorar Deploy

### Na Vercel Dashboard:

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Veja histórico de deploys
4. Clique em qualquer deploy para ver detalhes
5. Acesse logs se houver problemas

---

## ⬆️ Fazer Rollback (Voltar Versão Anterior)

Se o novo deploy quebrou:

### Na Vercel:

1. Vá em **Deployments**
2. Clique em um deploy anterior (⚠️ status "Ready")
3. Clique em **"Promote to Production"**
4. ✅ Seu site volta para aquela versão

### Ou pelo Git:

```bash
# Ver histórico
git log --oneline

# Voltar para commit anterior
git revert HEAD

# Push
git push origin main
```

---

## 🔒 Segurança

### ✅ Boas Práticas:

1. **Nunca commite chaves de API** em arquivos que vão para GitHub
   ```bash
   # Use .gitignore
   echo ".env" >> .gitignore
   echo ".env.local" >> .gitignore
   ```

2. **Use Variáveis de Ambiente** para dados sensíveis

3. **Regenere chaves periodicamente** no Google Cloud Console

4. **Mantenha Vercel atualizado** (webhooks automáticos)

---

## 📈 Performance

### Seu site na Vercel será **muito rápido**:

- ⚡ **CDN Global** - Distribuído em vários servidores
- 🗜️ **Compressão automática** - GZIP, Brotli
- ⏱️ **Cache otimizado** - Headers HTTP corretos
- 🔐 **HTTPS/SSL** - Incluído e automático
- 📱 **Otimizado para mobile** - Vercel detecta device

**Velocidade típica:**
- Page Load: < 1 segundo
- Time to Interactive: < 500ms
- Lighthouse Score: 90+

---

## 💰 Plano Gratuito vs. Pago

### Grátis (Suficiente para este projeto):

- ✅ Deployments ilimitados
- ✅ 1 GB bandwidth/mês
- ✅ 1 projeto production
- ✅ Git integration
- ✅ Certificado SSL
- ✅ Domínio vercel.app
- ✅ Analytics básico

### Pro ($20/mês):

- ✅ Mais bandwidth
- ✅ Domínios personalizados
- ✅ Edge Functions
- ✅ Priority support

**Para este projeto, grátis é mais que suficiente!**

---

## 🆘 Troubleshooting

### ❌ "Build failed"

**Solução:**
- Verifique se `package.json` existe
- Verifique se `index.html` está na raiz
- Veja logs do deploy na Vercel

### ❌ "Erro 403 - Acesso negado"

**Solução:**
- Planilha não compartilhada
- Volte a Passo 2.3 em SETUP.md

### ❌ "Página branca"

**Solução:**
- F12 Console para ver erros
- Verifique caminhos de arquivos (css/, js/)
- Verifique se caminhos são relativos corretamente

### ❌ "Dados não carregam"

**Solução:**
```javascript
// Console (F12):
const rows = await loadGoogleSheetData();
console.log(rows);
```

Se retorna null ou erro, volte ao SETUP.md

---

## 🎉 Próximas Etapas

Depois do deploy:

1. **Compartilhe URL** com o time
2. **Monitore performance** - Vercel Analytics
3. **Configure domínio personalizado** (se tiver)
4. **Automatize SMS** (integração Twilio)
5. **Adicione mais features** conforme necessário

---

## 📚 Referências

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/learn/basics/deploying-nextjs-app)
- [Static Site Hosting](https://vercel.com/guides/deploying-static-sites)

---

## 💡 Dicas Extras

### Receber notificações de novo deploy:
1. Settings → Notifications
2. Ative "Failed Deployments" e "Production Deployments"

### Ver métricas do site:
1. Analytics tab
2. Veja visits, bandwidth, performance

### Integrar com Slack (opcional):
1. Settings → Integrations
2. Conecte Slack
3. Receba notificações lá

---

**Seu site está online! 🚀**

Compartilhe a URL com seu time e aproveite!

---

**Última atualização:** Outubro 2025
