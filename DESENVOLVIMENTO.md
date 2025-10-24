# 🛠️ Guia Técnico de Desenvolvimento

> Para programadores que querem entender ou modificar o projeto Escala de Café

## 📋 Índice
1. [Arquitetura Geral](#arquitetura-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Fluxo de Dados](#fluxo-de-dados)
4. [Descrição de Funções](#descrição-de-funções)
5. [Como Modificar](#como-modificar)
6. [Boas Práticas](#boas-práticas)

---

## 🏗️ Arquitetura Geral

O projeto segue uma arquitetura **MVC Leve** com separação clara de responsabilidades:

```
┌─────────────────────────────────────────────────────┐
│                   HTML/DOM                          │
│              (index.html - Apresentação)            │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   ┌────▼──────┐           ┌──────▼────┐
   │ CSS        │           │ JavaScript │
   │ (Styling)  │           │ (Lógica)   │
   │styles.css  │           │script.js   │
   └────────────┘           └──────┬─────┘
                                   │
        ┌──────────────────────────┴───────────────────┐
        │                                              │
   ┌────▼──────────────┐                ┌─────────────▼──┐
   │  DATA LAYER       │                │  GOOGLE SHEETS  │
   │  (data.js)        │                │  API (v4)       │
   │                   │                │                 │
   │ • scheduleData    │                │ • Fetch data    │
   │ • contacts        │◄───────────────┤ • Parse values  │
   │ • config          │  Sincroniza    │ • Error handle  │
   │ • Parsing logic   │                │                 │
   └───────────────────┘                └─────────────────┘
```

### **3 Camadas Principais:**

| Camada | Arquivo | Responsabilidade |
|--------|---------|------------------|
| **Apresentação** | `index.html` | DOM, estrutura, eventos do usuário |
| **Estilo** | `css/styles.css` | Visual, animações, responsividade |
| **Lógica & Dados** | `js/data.js` | Dados, API, parsing, configuração |
| **Comportamento** | `js/script.js` | Event handlers, renderização, notificações |

---

## 📂 Estrutura do Projeto

```
escala-cafe/
│
├── 📄 index.html                    # Página principal
├── 📄 package.json                  # Metadados & scripts npm
├── 📄 vercel.json                   # Config Vercel
├── 📄 .gitignore                    # Arquivos ignorados pelo git
│
├── 🎨 css/
│   └── styles.css                   # Estilos (1200+ linhas)
│
├── ⚙️ js/
│   ├── data.js                      # Dados & Google Sheets API
│   └── script.js                    # Lógica da aplicação
│
└── 📚 Documentação/
    ├── README.md                    # Visão geral do projeto
    ├── DESENVOLVIMENTO.md           # Este arquivo
    ├── SETUP.md                     # Configuração inicial
    └── GOOGLE_SHEETS_SETUP.md       # Setup Google Sheets
```

### **Tamanho dos Arquivos:**

- `index.html` - ~150 linhas (HTML + inline CSS/JS)
- `css/styles.css` - ~1200 linhas (estilos + animações)
- `js/data.js` - ~280 linhas (dados + API)
- `js/script.js` - ~400 linhas (lógica + eventos)

---

## 🔄 Fluxo de Dados

### **Inicialização (Page Load)**

```
1. Browser carrega index.html
        ↓
2. HTML é renderizado (vazio ou com fallback data)
        ↓
3. Scripts são carregados (data.js, script.js)
        ↓
4. DOMContentLoaded event
        ↓
5. initializeApp() é chamado
        ↓
6. loadGoogleSheetData() faz requisição HTTP GET
        ↓
7. Google Sheets API retorna JSON
        ↓
8. parseGoogleSheetData() processa as linhas
        ↓
9. scheduleData é atualizado
        ↓
10. renderSchedule() gera o HTML
        ↓
11. DOM é atualizado (com animações)
        ↓
12. initializeSMSNotifications() agenda notificações
        ↓
✅ App pronto para usar!
```

### **Quando Usuário Muda Dados na Planilha:**

```
User edita célula no Google Sheets
        ↓
        (nenhuma ação imediata no website)
        ↓
[Espera 5 minutos - intervalo de auto-refresh]
        ↓
loadGoogleSheetData() executa novamente
        ↓
Dados são atualizados
        ↓
✅ Website reflete as mudanças
```

---

## 🔑 Descrição de Funções

### **js/data.js - Camada de Dados**

#### **1. `loadGoogleSheetData()`**

```javascript
async function loadGoogleSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${GOOGLE_SHEET_RANGE}?key=${GOOGLE_API_KEY}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            // Tratamento de erro
            if (response.status === 403) {
                console.error('❌ Permissão negada - planilha não compartilhada');
            } else if (response.status === 404) {
                console.error('❌ Planilha não encontrada');
            }
            return null;
        }
        
        const data = await response.json();
        return data.values || [];
    } catch (error) {
        console.error('❌ Erro ao carregar:', error);
        return null;
    }
}
```

**O que faz:**
- Faz requisição GET para Google Sheets API
- Retorna array de linhas (values)
- Trata erros 403 (permissão) e 404 (não encontrado)

**Pontos importantes:**
- ⚠️ É uma função `async` - usa `await`
- 📡 Requisição HTTP real - pode falhar se offline
- 🔑 Requer Sheet ID, Range e API Key corretos
- ✅ Retorna `null` em caso de erro

---

#### **2. `parseGoogleSheetData(rows)`**

```javascript
function parseGoogleSheetData(rows) {
    const weeks = {};
    let currentWeek = 1;
    
    console.log('📊 Iniciando parse dos dados...');
    console.log(`Total de linhas recebidas: ${rows.length}`);
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length < 3) continue;
        
        const [dayInfo, morning, afternoon] = row;
        if (!dayInfo || !dayInfo.trim()) continue;
        
        // ❌ Pula linhas de cabeçalho
        if (dayInfo.toUpperCase().includes('MANHÃ') || 
            dayInfo.toUpperCase().includes('TARDE')) {
            console.log(`⏭️  Pulando cabeçalho: ${dayInfo}`);
            continue;
        }
        
        // 📅 Processa linhas "Semana X"
        if (dayInfo.includes('Semana')) {
            const weekMatch = dayInfo.match(/\d+/);
            if (weekMatch) {
                currentWeek = parseInt(weekMatch[0]);
                console.log(`📅 Semana ${currentWeek} encontrada`);
            }
            continue;
        }
        
        // ✅ Processa linhas de dia (ex: "Segunda/03")
        if (dayInfo.includes('/')) {
            const parts = dayInfo.split('/');
            if (parts.length >= 2) {
                const dayName = parts[0].trim();
                const dayNum = parts[1].trim();
                const fullDate = `${dayNum}/11/2025`;
                
                if (!weeks[currentWeek]) {
                    weeks[currentWeek] = {
                        week: currentWeek,
                        weekLabel: `Semana ${currentWeek}`,
                        days: []
                    };
                }
                
                const dayEntry = {
                    date: fullDate,
                    day: dayName,
                    morning: (morning || '').trim() || 'N/A',
                    afternoon: (afternoon || '').trim() || 'N/A'
                };
                weeks[currentWeek].days.push(dayEntry);
            }
        }
    }
    
    return Object.values(weeks).sort((a, b) => a.week - b.week);
}
```

**O que faz:**
- Transforma dados brutos do Google Sheets em estrutura organizada
- Agrupa dias por semana
- Pula linhas de cabeçalho ("Semana", "MANHÃ", "TARDE")
- Extrai número da semana de "Semana X"
- Formata datas de "Segunda/03" para "03/11/2025"

**Lógica crucial:**
```javascript
// Exemplo de entrada (rows):
[
  ["Semana 1", "", ""],
  ["MANHÃ", "", ""],
  ["Segunda/03", "Léo", "Beto"],
  ["Terça/04", "Luis", "Angela"]
]

// Exemplo de saída:
[
  {
    week: 1,
    weekLabel: "Semana 1",
    days: [
      { date: "03/11/2025", day: "Segunda", morning: "Léo", afternoon: "Beto" },
      { date: "04/11/2025", day: "Terça", morning: "Luis", afternoon: "Angela" }
    ]
  }
]
```

**Ponto crucial:** 
- ⚠️ Se a planilha mudar de formato, ESSA função precisa ser ajustada
- 📝 Adiciona console.log() para debug

---

#### **3. Constantes de Configuração**

```javascript
const GOOGLE_SHEET_ID = '1p6WnSKVdnI32nxgn_-FtjGdhg6WxBo9lZzWo6Kz9ESk';
const GOOGLE_SHEET_RANGE = 'Escala!A3:C25';
const GOOGLE_API_KEY = 'AIzaSyBQude-mTlGojEYxEgUED5gPQU4xX2R-xU';
```

**Onde alterar:**
- `GOOGLE_SHEET_ID` - Copiar da URL da planilha
- `GOOGLE_SHEET_RANGE` - Ajustar conforme localização dos dados
- `GOOGLE_API_KEY` - Gerar em Google Cloud Console

---

#### **4. Objeto `contacts`**

```javascript
const contacts = {
    'Léo': '+5585987654321',
    'Beto': '+5585987654322',
    // ... mais contatos
};
```

**Para que serve:**
- Mapeia nome da pessoa → número de telefone
- Usado para enviar SMS

**Como manter atualizado:**
- Sempre que houver novo responsável, adicione aqui
- Formato: `'Nome Exato': '+55XXXXXXXXXXXX'`

---

### **js/script.js - Lógica da Aplicação**

#### **1. `initializeApp()`**

```javascript
async function initializeApp() {
    try {
        console.log('🚀 Inicializando aplicação...');
        
        // Carrega dados do Google Sheets
        const rows = await loadGoogleSheetData();
        
        if (rows && rows.length > 0) {
            scheduleData = parseGoogleSheetData(rows);
            console.log('✅ Dados carregados do Google Sheets');
        } else {
            console.log('⚠️ Usando dados locais de fallback');
            // scheduleData já existe como padrão
        }
        
        // Inicializa interface
        renderSchedule();
        updateTodaySection();
        updateCurrentDate();
        initializeSMSNotifications();
        setupEventListeners();
        
        // Atualiza dados a cada 5 minutos
        setInterval(async () => {
            const rows = await loadGoogleSheetData();
            if (rows) {
                scheduleData = parseGoogleSheetData(rows);
                renderSchedule();
            }
        }, 5 * 60 * 1000); // 5 minutos
        
        console.log('✅ App inicializada com sucesso');
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
    }
}
```

**Fluxo:**
1. Tenta carregar do Google Sheets
2. Se falhar, usa dados locais de fallback
3. Renderiza a interface
4. Agenda atualização a cada 5 minutos
5. Log de sucesso/erro

---

#### **2. `renderSchedule()`**

```javascript
function renderSchedule() {
    const container = document.getElementById('weeks-container');
    container.innerHTML = ''; // Limpa conteúdo anterior
    
    scheduleData.forEach(week => {
        const weekCard = document.createElement('div');
        weekCard.className = 'week-card';
        weekCard.id = `week-${week.week}`;
        
        let html = `
            <h2>${week.weekLabel}</h2>
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>Dia</th>
                        <th>Manhã</th>
                        <th>Tarde</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        week.days.forEach(day => {
            html += `
                <tr>
                    <td>${day.day} (${day.date.split('/')[0]})</td>
                    <td>${day.morning}</td>
                    <td>${day.afternoon}</td>
                </tr>
            `;
        });
        
        html += `</tbody></table>`;
        weekCard.innerHTML = html;
        container.appendChild(weekCard);
    });
}
```

**O que faz:**
- Limpa container anterior
- Cria uma `<div>` para cada semana
- Gera tabela HTML com dias/manhã/tarde
- Insere no DOM

**Performance:**
- ⚠️ Regenera todo o DOM (não é incrementalista)
- ✅ Simples e funcional para este tamanho de dados

---

#### **3. `updateTodaySection()`**

```javascript
function updateTodaySection() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=domingo, 1=segunda...
    const dateNum = today.getDate();
    
    let nextPerson = 'Ninguém escalado';
    let nextShift = '';
    let nextTime = '';
    
    // Busca próxima pessoa escalada
    for (let week of scheduleData) {
        for (let day of week.days) {
            const dayDate = parseInt(day.date.split('/')[0]);
            
            if (dayDate === dateNum) {
                const now = new Date();
                const currentHour = now.getHours();
                
                // Se não passou das 14:00, mostra manhã
                if (currentHour < 14 && day.morning !== 'N/A') {
                    nextPerson = day.morning;
                    nextShift = '☀️ Manhã';
                    nextTime = settings.morningTime;
                }
                // Caso contrário, mostra tarde
                else if (day.afternoon !== 'N/A') {
                    nextPerson = day.afternoon;
                    nextShift = '🌙 Tarde';
                    nextTime = settings.afternoonTime;
                }
            }
        }
    }
    
    document.getElementById('today-person').textContent = nextPerson;
    document.getElementById('today-shift').textContent = nextShift;
    document.getElementById('today-time').textContent = nextTime;
}
```

**Lógica:**
- Pega data de hoje
- Procura na escala se tem alguém hoje
- Decide se mostra manhã ou tarde baseado na hora atual
- Atualiza DOM

---

#### **4. `initializeSMSNotifications()`**

```javascript
function initializeSMSNotifications() {
    if (!settings.notificationsEnabled) return;
    
    setInterval(() => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        // Verifica se é hora de mandar SMS da manhã
        if (currentTime === settings.morningTime) {
            const today = new Date();
            const dateNum = today.getDate();
            
            for (let week of scheduleData) {
                for (let day of week.days) {
                    if (parseInt(day.date.split('/')[0]) === dateNum && day.morning !== 'N/A') {
                        sendSMSNotification(day.morning, 'Manhã');
                    }
                }
            }
        }
        
        // Verifica se é hora de mandar SMS da tarde
        if (currentTime === settings.afternoonTime) {
            const today = new Date();
            const dateNum = today.getDate();
            
            for (let week of scheduleData) {
                for (let day of week.days) {
                    if (parseInt(day.date.split('/')[0]) === dateNum && day.afternoon !== 'N/A') {
                        sendSMSNotification(day.afternoon, 'Tarde');
                    }
                }
            }
        }
    }, 60 * 1000); // Verifica a cada minuto
}
```

**Funcionamento:**
- Verifica a hora a cada minuto
- Quando horário coincide com `settings.morningTime` ou `settings.afternoonTime`
- Encontra pessoa escalada para hoje
- Chama `sendSMSNotification()`

**⚠️ Limitações:**
- Só funciona enquanto página está aberta
- Não persiste entre sessões

---

#### **5. `sendSMSNotification(person, shift)`**

```javascript
function sendSMSNotification(person, shift) {
    const phone = contacts[person];
    
    if (!phone) {
        console.warn(`⚠️ Telefone não encontrado para ${person}`);
        return;
    }
    
    // 📱 Atualmente: apenas log (simulação)
    console.log(`📱 SMS enviado para ${person} (${shift})`);
    console.log(`   Telefone: ${phone}`);
    console.log(`   Mensagem: ☕ ${person}, é sua vez de fazer café! (${shift})`);
    
    // TODO: Integrar com Twilio/AWS/outro serviço
    // exemplo abaixo:
    /*
    fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            phone: phone,
            message: `☕ ${person}, é sua vez de fazer café! (${shift})`
        })
    }).then(r => r.json())
      .then(data => console.log('✅ SMS enviado:', data))
      .catch(e => console.error('❌ Erro:', e));
    */
}
```

**Estado atual:**
- ✅ Apenas console.log (simulação)
- 📝 TODO comentado para Twilio

**Para ativar SMS real:**
- Remover comentário do `fetch()`
- Criar endpoint `/api/send-sms` no backend
- Backend chamará provedor de SMS (Twilio, AWS, etc)

---

### **css/styles.css - Estilos e Animações**

#### **Variáveis CSS (Raíz)**

```css
:root {
    --primary-color: #8B4513;        /* Marrom café */
    --secondary-color: #F4A460;      /* Sandy brown */
    --accent-color: #FFD700;         /* Ouro */
    --light-bg: #F5F5DC;             /* Bege claro */
    --dark-text: #3E2723;            /* Marrom escuro */
    --border-color: #DDB892;         /* Marrom claro */
    
    --animation-duration: 0.3s;
}
```

**Para alterar tema:**
- Modificar aqui uma vez e tudo muda
- Exemplo: `--primary-color: #2C3E50` (azul)

---

#### **Animações Principais**

```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
```

**Onde usar:**
```css
.week-card {
    animation: slideIn 0.6s ease-out;
}

.today-highlight {
    animation: pulse 3s infinite;
}
```

---

#### **Responsividade**

```css
/* Desktop padrão: > 1024px */
.weeks-container {
    grid-template-columns: repeat(4, 1fr);
}

/* Tablet: 768px - 1024px */
@media (max-width: 1024px) {
    .weeks-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Celular: < 768px */
@media (max-width: 768px) {
    .weeks-container {
        grid-template-columns: 1fr;
    }
}

/* Celular muito pequeno: < 480px */
@media (max-width: 480px) {
    .header h1 {
        font-size: 1.2em;
    }
    
    .schedule-table {
        font-size: 0.85em;
    }
}
```

---

## 🔧 Como Modificar

### **Cenário 1: Mudar as Cores do Tema**

**Passo 1:** Abra `css/styles.css`
```css
:root {
    --primary-color: #2C3E50;        /* Novo azul */
    --secondary-color: #3498DB;      /* Novo azul claro */
    --accent-color: #E74C3C;         /* Novo vermelho */
}
```

**Passo 2:** Salve e recarregue o navegador

**Pronto!** Todas as cores foram atualizadas automaticamente.

---

### **Cenário 2: Ajustar Horários Padrão**

**Passo 1:** Abra `js/data.js`

**Passo 2:** Encontre:
```javascript
const defaultSettings = {
    morningTime: '08:00',
    afternoonTime: '14:00',
    notificationsEnabled: true
};
```

**Passo 3:** Altere os horários:
```javascript
const defaultSettings = {
    morningTime: '07:00',      // Mudou para 7:00
    afternoonTime: '15:00',    // Mudou para 15:00
    notificationsEnabled: true
};
```

**Passo 4:** Salve e teste

---

### **Cenário 3: Adicionar Novo Contato**

**Passo 1:** Abra `js/data.js`

**Passo 2:** Localize:
```javascript
const contacts = {
    'Léo': '+5585987654321',
    'Beto': '+5585987654322',
};
```

**Passo 3:** Adicione:
```javascript
const contacts = {
    'Léo': '+5585987654321',
    'Beto': '+5585987654322',
    'Maria': '+5585987654323',    // ← Novo!
};
```

**Passo 4:** Na planilha Google Sheets, use "Maria" na escala

---

### **Cenário 4: Mudar Range da Planilha**

**Se sua planilha tem dados em outro local:**

**Passo 1:** Abra `js/data.js`

**Passo 2:** Encontre:
```javascript
const GOOGLE_SHEET_RANGE = 'Escala!A3:C25';
```

**Passo 3:** Ajuste conforme sua planilha:
```javascript
// Se dados começam em linha 5:
const GOOGLE_SHEET_RANGE = 'Escala!A5:C30';

// Se tem 6 colunas:
const GOOGLE_SHEET_RANGE = 'Escala!A3:F25';

// Se em outra aba:
const GOOGLE_SHEET_RANGE = 'MinhaAba!A1:C50';
```

**Passo 4:** Salve e teste

---

### **Cenário 5: Integrar SMS Real (Twilio)**

**Passo 1:** Crie conta em [twilio.com](https://twilio.com)

**Passo 2:** Obtenha credenciais:
- Account SID
- Auth Token
- Número Twilio

**Passo 3:** Crie backend endpoint (exemplo Node.js/Express):

```javascript
// backend/routes/sms.js
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

app.post('/api/send-sms', async (req, res) => {
    const { phone, message } = req.body;
    
    try {
        const result = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE,
            to: phone
        });
        
        res.json({ success: true, sid: result.sid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
```

**Passo 4:** Descomente em `js/script.js`:
```javascript
function sendSMSNotification(person, shift) {
    const phone = contacts[person];
    
    if (!phone) {
        console.warn(`⚠️ Telefone não encontrado para ${person}`);
        return;
    }
    
    // 📱 SMS Real - Twilio
    fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            phone: phone,
            message: `☕ ${person}, é sua vez de fazer café! (${shift})`
        })
    }).then(r => r.json())
      .then(data => console.log('✅ SMS enviado:', data))
      .catch(e => console.error('❌ Erro:', e));
}
```

---

## ✅ Boas Práticas

### **1. Console Logging para Debug**

```javascript
// ✅ BOM: Logs descritivos e fáceis de encontrar
console.log('📊 Iniciando parse dos dados...');
console.log(`✅ Total de linhas: ${rows.length}`);
console.error('❌ Erro: Planilha não compartilhada');

// ❌ RUIM: Logs genéricos
console.log('error');
console.log(data);
```

### **2. Error Handling**

```javascript
// ✅ BOM: Verifica o erro específico
if (response.status === 403) {
    console.error('Planilha não compartilhada publicamente');
} else if (response.status === 404) {
    console.error('Planilha não encontrada');
}

// ❌ RUIM: Ignora erro
const data = response.json();
```

### **3. Variáveis Descritivas**

```javascript
// ✅ BOM
const morningShiftPerson = 'Léo';
const notificationTime = '08:00';

// ❌ RUIM
const mp = 'Léo';
const t = '08:00';
```

### **4. Funções Pequenas e Focadas**

```javascript
// ✅ BOM: Cada função tem uma responsabilidade
function getCurrentDate() { /* ... */ }
function renderSchedule() { /* ... */ }
function sendSMSNotification() { /* ... */ }

// ❌ RUIM: Função gigante que faz tudo
function doEverything() { /* 500 linhas */ }
```

### **5. Comentários Claros**

```javascript
// ✅ BOM: Explica o "por quê", não o "o quê"
// Pula linhas de cabeçalho pois o Google Sheets inclui no response
if (dayInfo.includes('MANHÃ')) continue;

// ❌ RUIM: Comentário óbvio
// Se dayInfo contém MANHÃ, pula
if (dayInfo.includes('MANHÃ')) continue;
```

### **6. Responsividade Mobile-First**

```css
/* ✅ BOM: Começa com mobile, incrementa para desktop */
.week-card {
    grid-template-columns: 1fr;  /* Mobile: 1 coluna */
}

@media (min-width: 768px) {
    .week-card {
        grid-template-columns: repeat(2, 1fr);  /* Tablet: 2 colunas */
    }
}

/* ❌ RUIM: Começa com desktop */
.week-card {
    grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
    .week-card {
        grid-template-columns: 1fr;
    }
}
```

---

## 🐛 Debug Tips

### **Verificar Dados do Google Sheets**

Abra Console (F12) e rode:
```javascript
const rows = await loadGoogleSheetData();
console.table(rows);  // Mostra em tabela
```

### **Verificar Parsing**

```javascript
const rows = await loadGoogleSheetData();
const parsed = parseGoogleSheetData(rows);
console.log(parsed);  // Vê estrutura final
```

### **Testar Notificações**

```javascript
// Simula notificação
sendSMSNotification('Léo', 'Manhã');

// Veja o console.log
```

---

## 📚 Referências

- [Google Sheets API](https://developers.google.com/sheets/api)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Twilio SMS API](https://www.twilio.com/docs/sms)

---

**Última atualização:** Outubro 2025
