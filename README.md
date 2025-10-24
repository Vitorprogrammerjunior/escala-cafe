# ☕ Escala de Café - Hub CriCare

> Website responsivo e animado para gerenciar a escala de café do Hub CriCare de forma elegante, moderna e intuitiva.

## � Objetivo

Este projeto foi desenvolvido para **organizar e exibir a escala de café do Hub CriCare** de forma visual e agradável. A principal funcionalidade é:

- 📊 **Exibição visual** da escala de café por semanas
- 🔄 **Sincronização automática** com Google Sheets (atualiza a cada 5 minutos)
- 📱 **Design responsivo** (funciona perfeitamente em celular, tablet e desktop)
- ✨ **Animações e transições** para melhor experiência do usuário
- 🔔 **Sistema de notificações SMS** (framework pronto para integração)
- ⚙️ **Configuração de horários** (manhã e tarde personalizáveis)

## 🚀 Deploy na Vercel

Este é um **site estático puro** (HTML, CSS, JavaScript) - perfeito para Vercel com deploy automático gratuito!

### ✅ Como fazer deploy:

1. **Crie um repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/SEU_USUARIO/escala-cafe.git
   git push -u origin main
   ```

2. **Conecte o repositório à Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Selecione seu repositório `escala-cafe`
   - Framework: **Other** (site estático)
   - Clique em **Deploy**

3. **Seu site estará em produção em ~1 minuto!** 🚀
   - URL: `https://escala-cafe.vercel.app` (ou seu domínio personalizado)

## 📁 Estrutura do Projeto

```
escala-cafe/
├── index.html                 # Página principal
├── css/
│   └── styles.css            # Estilos com animações
├── js/
│   ├── data.js               # Integração com Google Sheets e dados
│   └── script.js             # Lógica da aplicação
├── README.md                 # Este arquivo (visão geral)
├── DESENVOLVIMENTO.md        # Guia técnico detalhado
├── SETUP.md                  # Configuração para novo desenvolvedor
├── package.json              # Metadados do projeto
├── vercel.json              # Configuração do Vercel
└── GOOGLE_SHEETS_SETUP.md   # Guia para configurar Google Sheets
```

## ⚙️ Configuração Rápida

### 1️⃣ Pré-requisitos
- Um navegador moderno (Chrome, Firefox, Safari, Edge)
- Acesso a uma planilha Google Sheets com a escala de café

### 2️⃣ Abrir o Website

```bash
# Opção 1: Duplo clique em index.html
# Opção 2: Servir localmente
npm install
npm run dev
```

### 3️⃣ Configurar Google Sheets

**a) Copiar Sheet ID:**
- Abra sua planilha no Google Sheets
- Copie o ID da URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`

**b) Gerar API Key:**
- Acesse [Google Cloud Console](https://console.cloud.google.com)
- Crie um novo projeto
- Ative a API "Google Sheets API"
- Crie uma chave de API (tipo "Pública")

**c) Compartilhar a planilha:**
- Clique em "Compartilhar"
- Mude para "Qualquer pessoa com o link"
- Permissão: "Visualizador"

### 4️⃣ Configurar o projeto

Edite `js/data.js` e atualize estas constantes:

```javascript
const GOOGLE_SHEET_ID = 'SEU_SHEET_ID_AQUI';
const GOOGLE_SHEET_RANGE = 'Escala!A3:C25';  // Ajuste conforme sua planilha
const GOOGLE_API_KEY = 'SUA_API_KEY_AQUI';
```

### 5️⃣ Configurar Contatos (para SMS)

Em `js/data.js`, preencha o objeto `contacts`:

```javascript
const contacts = {
    'Léo': '+5585987654321',
    'Beto': '+5585987654322',
    'Luis': '+5585987654323',
    'Angela': '+5585987654324',
    // ... adicione mais conforme necessário
};
```

## 📊 Formato da Planilha

Sua planilha Google Sheets deve ter este formato **exato**:

| Semana/Dia | Manhã | Tarde |
|-----------|-------|-------|
| Semana 1 | | |
| MANHÃ | | |
| Segunda/03 | Léo | Beto |
| Terça/04 | Luis | Angela |
| ... | ... | ... |
| TARDE | | |
| Semana 2 | | |
| ... | ... | ... |

**Importante:**
- O script pula automaticamente linhas de cabeçalho ("Semana", "MANHÃ", "TARDE")
- Data deve estar no formato: `DIA_SEMANA/DD` (ex: `Segunda/03`)
- Comece os dados na **linha 3** (deixe 2 linhas de cabeçalho)

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: `#8B4513` (Marrom café)
- **Secundária**: `#F4A460` (Sandy Brown)
- **Destaque**: `#FFD700` (Ouro)
- **Neutra**: `#F5F5DC` (Bege)

### Animações
- **slideIn**: Slides suaves de entrada (0.6s)
- **fadeIn**: Fade in suave (0.3s)
- **pulse**: Efeito de pulsação para destaque (3s)
- **bounce**: Efeito de movimento (2s)

### Responsividade
```css
/* Desktop (> 768px) */
Grid com 4 semanas lado a lado

/* Tablet (768px - 480px) */
Grid com 2 semanas

/* Mobile (< 480px) */
Grid com 1 semana
```

## 🔔 Sistema de Notificações SMS

O sistema está **pronto para integração** com qualquer provedor de SMS:

### Como funciona:
1. Horários configuráveis na modal de settings (⚙️)
2. Relógio sincronizado com sistema operacional
3. Ao atingir o horário, envia SMS para o responsável

### Framework de SMS

No arquivo `js/script.js`, função `sendSMSNotification()`:

```javascript
function sendSMSNotification(person, phone, shift) {
    // Atualmente: console.log (simulado)
    // Para ativar: integre com Twilio, AWS SNS, ou similar
    
    console.log(`📱 SMS: ${person} (${shift}) - ${phone}`);
}
```

### Integração com Twilio (exemplo)

```javascript
async function sendSMSNotification(person, phone, shift) {
    const message = `☕ ${person}, é sua vez de fazer café! (${shift})`;
    
    try {
        const response = await fetch('/api/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, message })
        });
        console.log('✅ SMS enviado');
    } catch (error) {
        console.error('❌ Erro ao enviar SMS:', error);
    }
}
```

## �️ Desenvolvimento

Para entender melhor como o projeto funciona e como modificá-lo, leia:

- **[DESENVOLVIMENTO.md](./DESENVOLVIMENTO.md)** - Arquitetura, funções importantes, fluxo de dados
- **[SETUP.md](./SETUP.md)** - Guia passo a passo para configuração completa

## 🐛 Troubleshooting

### ❌ Erro 403 (Permission Denied)
**Problema:** Site mostra erro de permissão ao carregar dados
**Solução:**
1. Abra sua planilha no Google Sheets
2. Clique em "Compartilhar"
3. Mude para "Qualquer pessoa com o link"
4. Recarregue a página

### ❌ Dados não aparecem
**Problema:** Página carrega mas não mostra a escala
**Solução:**
1. Abra o Console do navegador (F12)
2. Procure por mensagens de erro
3. Verifique se Sheet ID e API Key estão corretos em `js/data.js`
4. Confirme se a planilha está compartilhada publicamente

### ⏱️ Dados não atualizam
**Problema:** Dados na planilha mudaram mas site não atualizou
**Solução:**
- O site atualiza **automaticamente a cada 5 minutos**
- Para atualizar imediatamente: pressione `Ctrl+F5` (força refresh)

## 📱 Browser Support

| Browser | Versão | Status |
|---------|--------|--------|
| Chrome | 90+ | ✅ Total |
| Firefox | 88+ | ✅ Total |
| Safari | 14+ | ✅ Total |
| Edge | 90+ | ✅ Total |
| IE | - | ❌ Não suportado |

## 📝 Licença

MIT - Livre para usar, modificar e distribuir.

## 👥 Autor

Desenvolvido para Hub CriCare

---

## 📚 Documentação Adicional

- 📖 [DESENVOLVIMENTO.md](./DESENVOLVIMENTO.md) - Guia técnico completo
- 🔧 [SETUP.md](./SETUP.md) - Configuração para novo desenvolvedor
- 📊 [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) - Integração com Google Sheets

---

**Última atualização:** Outubro 2025

1. **Verificação em Tempo Real**: O sistema verifica constantemente a hora atual
2. **Agendamento**: Quando inicia, agenda notificações para todos os dias/períodos
3. **Disparo Automático**: No horário configurado, dispara o SMS
4. **Log**: Todas as ações são registradas no console do navegador

Para verificar no navegador:
- Pressione `F12`
- Vá até a aba "Console"
- Verá todas as ações de SMS

## 💡 Dicas

- As configurações são salvas no navegador, não perdem ao recarregar
- Se quiser resetar, abra DevTools (F12) → Application → LocalStorage → Limpar
- O site funciona offline (sem internet) para visualização
- Para SMS real, você precisa integrar com um serviço externo
- Teste os horários em modo "Desenvolvimento" antes de usar em produção

## 🛠️ Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para notificações SMS reais)
- Conta em um serviço de SMS (Twilio, AWS SNS, etc)

## 📞 Integrações de SMS Recomendadas

- **Twilio**: https://www.twilio.com/
- **AWS SNS**: https://aws.amazon.com/sns/
- **ClickSend**: https://www.clicksend.com/
- **MessageBird**: https://www.messagebird.com/

## 📝 Notas

- Este é um site estático, não requer servidor
- Pode ser hospedado em qualquer lugar (GitHub Pages, Netlify, etc)
- As notificações SMS requerem backend próprio ou terceiros
- O design é 100% responsivo

---

**Desenvolvido com ❤️ para a Escala de Café**
