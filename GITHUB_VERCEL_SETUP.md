# 🚀 Escala de Café - Deploy no GitHub + Vercel

> Guia passo a passo para fazer deploy do seu projeto na Vercel usando GitHub

---

## 📋 Pré-Requisitos

- ✅ Conta GitHub (grátis em [github.com](https://github.com))
- ✅ Conta Vercel (grátis em [vercel.com](https://vercel.com))
- ✅ Git instalado ([download](https://git-scm.com))
- ✅ Seu projeto Escala de Café pronto

---

## 📁 Passo 1: Preparar Seu Computador

### 1.1 Instalar Git

Se ainda não tem Git:
```bash
# Windows: Baixe em https://git-scm.com
# Ou use: choco install git (se tem Chocolatey)
```

Verifique se instalou corretamente:
```bash
git --version
# Deve mostrar: git version X.XX.X
```

### 1.2 Configurar Git (Primeira vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

---

## 🔧 Passo 2: Criar Repositório Local

### 2.1 Abra Terminal/PowerShell

```bash
# Navegue até a pasta do projeto
cd c:\Users\vitor\OneDrive\Documentos\Projects\Escala-cafe

# Verifique se está no lugar certo
ls
# Deve ver: index.html, css/, js/, package.json, etc
```

### 2.2 Inicializar Git

```bash
# Inicialize repositório local
git init

# Veja arquivos
git status
```

**Pronto!** Agora seu projeto é um repositório Git.

---

## 🌍 Passo 3: Criar Repositório no GitHub

### 3.1 Criar Novo Repositório

1. Acesse [github.com/new](https://github.com/new)
2. Faça login (ou crie conta se não tiver)

### 3.2 Preencher Informações

**Repository name:** `escala-cafe`

**Description:** "Website responsivo para escala de café do Hub CriCare"

**Public:** ✅ Selecione (é preciso ser público para Vercel)

**Adicione README.md:** ❌ Deixe desmarcado (usaremos o nosso)

**Clique:** "Create repository"

### 3.3 Copiar URL

Após criar, você verá uma URL como:
```
https://github.com/seu-usuario/escala-cafe.git
```

**Copie essa URL!**

---

## 📤 Passo 4: Fazer Upload Local → GitHub

### 4.1 No Terminal

```bash
# Esteja na pasta do projeto
cd c:\Users\vitor\OneDrive\Documentos\Projects\Escala-cafe

# Adicione todos os arquivos
git add .

# Verifique o que vai fazer upload
git status
# Deve mostrar arquivos em verde (staged)
```

### 4.2 Fazer Commit

```bash
# Crie um "snapshot" dos seus arquivos
git commit -m "Initial commit - Escala de Café"

# Verá uma mensagem como:
# [main 1a2b3c4] Initial commit - Escala de Café
#  15 files changed, 3500 insertions(+)
```

### 4.3 Adicionar Remoto

```bash
# Conectar seu repositório local ao GitHub
git remote add origin https://github.com/seu-usuario/escala-cafe.git

# Verifique
git remote -v
# Deve mostrar a URL que copiou
```

### 4.4 Fazer Push

```bash
# Enviar para GitHub
git push -u origin main

# Primeira vez pode pedir autenticação
# Escolha: "Authorize with GitHub"
# Ou copie token de acesso pessoal

# Se tudo correu bem, verá:
# [new branch]      main -> main
# Branch 'main' set up to track remote tracking branch 'main' from 'origin'.
```

**Pronto!** Seu código agora está no GitHub! 🎉

Verifique em: `https://github.com/seu-usuario/escala-cafe`

---

## 🚀 Passo 5: Deploy na Vercel

### 5.1 Acessar Vercel

1. Vá para [vercel.com](https://vercel.com)
2. Clique em "Sign Up" (ou faça login se tiver conta)
3. Escolha "GitHub" como método de login
4. Autorize Vercel a acessar seus repositórios

### 5.2 Criar Novo Projeto

1. Clique em "New Project"
2. Procure por **`escala-cafe`** na lista
3. Clique em **"Import"**

### 5.3 Configurar Projeto

**Project Name:** `escala-cafe` (ou outro nome)

**Framework Preset:** `Other` (site estático)

**Root Directory:** `./` (deixe como está)

**Build Command:** Deixe em branco ou remova

**Output Directory:** Deixe em branco ou `.`

**Clique:** "Deploy"

⏳ **Aguarde 1-2 minutos...**

### 5.4 Deploy Concluído! 🎉

Vercel vai exibir uma URL como:
```
https://escala-cafe.vercel.app
```

**Seu site está ONLINE!** 🚀

---

## ✨ Próximas Vezes (Mais Fácil)

Sempre que quiser fazer mudanças:

```bash
# 1. Faça alteração nos arquivos

# 2. Adicione ao Git
git add .

# 3. Faça commit
git commit -m "Descrição da mudança"

# 4. Envie para GitHub
git push

# 5. Vercel automaticamente faz novo deploy
# Veja em: https://vercel.com/your-account/escala-cafe
```

**Automático!** Não precisa fazer nada mais. Vercel detecta push no GitHub e redeploy automaticamente.

---

## 🌐 Usar Domínio Personalizado (Opcional)

Se quiser um domínio próprio como `escala.cricare.com.br`:

### Na Vercel:

1. Vá em **Settings** → **Domains**
2. Clique em **"Add Domain"**
3. Digite seu domínio
4. Clique em **"Add"**
5. Vercel mostrará registros DNS

### No seu provedor de domínio (GoDaddy, Namecheap, etc):

1. Acesse painel de controle
2. Vá em **DNS Settings**
3. Adicione os registros conforme Vercel indicou
4. Aguarde 15-30 minutos para propagação

**Pronto!** Seu domínio personalizado funciona! 🎉

---

## 🔄 Atualizar Dados (Google Sheets)

Se mudou dados na planilha Google Sheets:

1. Não precisa fazer nada no código!
2. O site **automaticamente atualiza a cada 5 minutos**
3. Para forçar atualização imediata: `Ctrl+Shift+R` (força refresh)

---

## 🐛 Troubleshooting

### ❌ "git command not found"
**Solução:** Git não está instalado. Instale em [git-scm.com](https://git-scm.com)

### ❌ "Permission denied (publickey)"
**Solução:** 
```bash
# Gere uma chave SSH
ssh-keygen -t ed25519 -C "seu.email@example.com"

# Adicione no GitHub:
# Settings → SSH and GPG keys → New SSH key
```

### ❌ "Vercel deployment failed"
**Solução:**
1. Verifique se repositório é público
2. Verifique se `index.html` está na raiz
3. Veja logs na Vercel para mais detalhes

### ❌ "Site mostra branco"
**Solução:**
1. Abra Console (F12)
2. Procure por erros
3. Verifique caminhos de arquivos (css/, js/)

---

## 📊 Monitorar Deploy

Na Vercel Dashboard:
- Ver histórico de deploys
- Ver logs
- Ver analytics (visitors, etc)
- Revert para versão anterior se quebrou algo

---

## 🎓 Resumo Rápido dos Comandos

```bash
# Primeira vez:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/escala-cafe.git
git push -u origin main

# Próximas vezes:
git add .
git commit -m "Descrição da mudança"
git push
```

---

## ✅ Checklist Final

- [ ] Git instalado e configurado
- [ ] Repositório criado no GitHub
- [ ] Arquivos fazem push para GitHub com sucesso
- [ ] Conta Vercel criada
- [ ] Projeto importado na Vercel
- [ ] Deploy concluído
- [ ] Site acessível em `escala-cafe.vercel.app`
- [ ] Favicon de café aparece no browser
- [ ] Banner de "Inativo" mostra corretamente (até 01/11)

---

## 🎉 Pronto!

Seu site está online e sincronizado com GitHub! 🚀

Qualquer dúvida, volte aos passos acima!

---

**Última atualização:** Outubro 2025
