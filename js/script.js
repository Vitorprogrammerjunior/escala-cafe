// ========================================
// INICIALIZAÇÃO E ESTADO
// ========================================
let currentFilter = 'all';
let settings = { ...defaultSettings };
let notificationSchedules = [];

// ========================================
// FUNÇÕES DE INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    await initializeApp();
});

async function initializeApp() {
    // Tentar carregar dados do Google Sheets
    const gsLoaded = await loadGoogleSheetData();
    if (gsLoaded) {
        await loadGoogleSheetContacts();
    }
    
    loadSettings();
    checkScheduleStatus();
    renderSchedule();
    updateCurrentDate();
    setupEventListeners();
    setInterval(updateCurrentDate, 60000); // Atualizar a cada minuto
    setInterval(async () => {
        // Recarregar dados do Google Sheets a cada 5 minutos
        await loadGoogleSheetData();
        renderSchedule();
    }, 300000);
}

function checkScheduleStatus() {
    const now = new Date();
    const startDate = new Date(2025, 10, 1); // 1º de Novembro de 2025
    
    const inactiveNotice = document.getElementById('inactiveNotice');
    const mainContent = document.querySelector('main');
    
    if (now < startDate) {
        // Escala inativa
        inactiveNotice.style.display = 'block';
        mainContent.style.opacity = '0.6';
        mainContent.style.pointerEvents = 'none';
        
        // Mostrar data de início
        const startDateStr = startDate.toLocaleDateString('pt-BR');
        document.getElementById('startDate').textContent = startDateStr;
        
        // Mostrar primeira pessoa
        if (scheduleData.length > 0 && scheduleData[0].days.length > 0) {
            const firstPerson = scheduleData[0].days[0].morning;
            document.getElementById('firstPerson').textContent = firstPerson || 'A ser definido';
        }
    } else {
        // Escala ativa
        inactiveNotice.style.display = 'none';
        mainContent.style.opacity = '1';
        mainContent.style.pointerEvents = 'auto';
    }
}

function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.filter-btn').classList.add('active');
            currentFilter = e.target.closest('.filter-btn').dataset.filter;
            filterSchedule();
        });
    });

    // Settings modal
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeModal = document.getElementById('closeModal');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');

    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });

    closeSettingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });

    // Close modal when clicking outside
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });
}

// ========================================
// RENDERIZAÇÃO DO CALENDÁRIO
// ========================================
function renderSchedule() {
    const container = document.getElementById('weeks-container');
    container.innerHTML = '';

    scheduleData.forEach((weekData, index) => {
        const weekCard = createWeekCard(weekData);
        weekCard.style.animationDelay = `${index * 0.1}s`;
        container.appendChild(weekCard);
    });

    updateTodaySection();
}

function createWeekCard(weekData) {
    const card = document.createElement('div');
    card.className = 'week-card';
    card.dataset.week = `week-${weekData.week}`;

    const header = document.createElement('div');
    header.className = 'week-header';
    header.innerHTML = `
        <div class="week-number">${weekData.week}</div>
        <span>${weekData.weekLabel}</span>
    `;

    const content = document.createElement('div');
    content.className = 'week-content';

    const table = document.createElement('table');
    table.className = 'days-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>DIA</th>
            <th>☀️ MANHÃ</th>
            <th>🌙 TARDE</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    weekData.days.forEach(day => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="day-cell">
                <div>${day.day}</div>
                <div class="day-number">${day.date}</div>
            </td>
            <td>
                <div class="person-cell">
                    <span class="person-badge morning-badge" data-person="${day.morning}" data-period="morning" data-date="${day.date}">
                        ${day.morning}
                    </span>
                </div>
            </td>
            <td>
                <div class="person-cell">
                    <span class="person-badge afternoon-badge" data-person="${day.afternoon}" data-period="afternoon" data-date="${day.date}">
                        ${day.afternoon}
                    </span>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    content.appendChild(table);
    card.appendChild(header);
    card.appendChild(content);

    return card;
}

function filterSchedule() {
    const cards = document.querySelectorAll('.week-card');
    cards.forEach(card => {
        if (currentFilter === 'all') {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.4s ease-out';
        } else {
            card.style.display = card.dataset.week === currentFilter ? 'block' : 'none';
        }
    });
}

// ========================================
// SEÇÃO "PRÓXIMA ESCALA"
// ========================================
function updateTodaySection() {
    const todayContent = document.querySelector('.today-content');
    const nextTask = getNextTask();

    if (nextTask) {
        const periodLabel = nextTask.period === 'morning' ? '☀️ MANHÃ' : '🌙 TARDE';
        const timeLabel = nextTask.period === 'morning' ? settings.morningTime : settings.afternoonTime;

        todayContent.innerHTML = `
            <p class="period-label">${periodLabel}</p>
            <p class="person-name">${nextTask.person}</p>
            <p style="opacity: 0.8;">📅 ${nextTask.date} (${nextTask.day})</p>
            <p style="opacity: 0.8;">🕐 ${timeLabel}</p>
        `;
    } else {
        todayContent.innerHTML = `
            <p class="loading-text">✅ Nenhuma escala para hoje!</p>
        `;
    }
}

function getNextTask() {
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let weekData of scheduleData) {
        for (let day of weekData.days) {
            const [date, month, year] = day.date.split('/');
            const dayDate = new Date(year, month - 1, date);
            dayDate.setHours(0, 0, 0, 0);

            if (dayDate >= today) {
                if (dayDate.getTime() === today.getTime()) {
                    // Se for hoje, verificar qual período vem primeiro
                    const [morningHours, morningMinutes] = settings.morningTime.split(':').map(Number);
                    const morningTime = new Date();
                    morningTime.setHours(morningHours, morningMinutes, 0, 0);

                    const [afternoonHours, afternoonMinutes] = settings.afternoonTime.split(':').map(Number);
                    const afternoonTime = new Date();
                    afternoonTime.setHours(afternoonHours, afternoonMinutes, 0, 0);

                    if (now <= morningTime) {
                        return { person: day.morning, date: day.date, day: day.day, period: 'morning' };
                    } else if (now <= afternoonTime) {
                        return { person: day.afternoon, date: day.date, day: day.day, period: 'afternoon' };
                    }
                } else {
                    // Se for amanhã ou depois, retornar a manhã
                    return { person: day.morning, date: day.date, day: day.day, period: 'morning' };
                }
            }
        }
    }

    return null;
}

// ========================================
// NOTIFICAÇÕES E SMS
// ========================================
function initializeSMSNotifications() {
    if (!settings.enableNotifications) {
        clearNotificationSchedules();
        return;
    }

    clearNotificationSchedules();

    for (let weekData of scheduleData) {
        for (let day of weekData.days) {
            const [date, month, year] = day.date.split('/');
            const dayDate = new Date(year, month - 1, date);

            // Notificação da manhã
            scheduleSMSNotification(
                dayDate,
                settings.morningTime,
                day.morning,
                'morning',
                day.date
            );

            // Notificação da tarde
            scheduleSMSNotification(
                dayDate,
                settings.afternoonTime,
                day.afternoon,
                'afternoon',
                day.date
            );
        }
    }

    console.log(`✅ ${notificationSchedules.length} notificações agendadas`);
}

function scheduleSMSNotification(taskDate, taskTime, person, period, dateStr) {
    const [hours, minutes] = taskTime.split(':').map(Number);
    const notificationTime = new Date(taskDate);
    notificationTime.setHours(hours, minutes, 0, 0);

    const now = new Date();
    const timeUntilNotification = notificationTime - now;

    if (timeUntilNotification > 0) {
        const timeout = setTimeout(() => {
            sendSMSNotification(person, period, dateStr, taskTime);
        }, timeUntilNotification);

        notificationSchedules.push({
            timeout,
            person,
            period,
            date: dateStr,
            time: taskTime
        });

        // Log para debug
        const debugTime = notificationTime.toLocaleString('pt-BR');
        console.log(`⏰ SMS agendado para ${person} em ${debugTime}`);
    }
}

function sendSMSNotification(person, period, date, time) {
    const phone = contacts[person];
    const periodLabel = period === 'morning' ? 'MANHÃ' : 'TARDE';

    // Simulação de envio de SMS
    const message = `
🌟 LEMBRETE DE ESCALA 🌟
─────────────────────
☕ Olá ${person}!

Você está escalado para fazer café:
📅 Data: ${date}
⏰ Horário: ${periodLabel} (${time})

Obrigado!
    `;

    console.log('📱 SMS ENVIADO:');
    console.log(message);

    // Aqui você integraria com uma API de SMS (Twilio, AWS SNS, etc)
    // exemplo:
    // await sendSMSViaAPI(phone, message);

    // Notificação visual no site
    showNotification(`📱 SMS enviado para ${person} (${periodLabel})`);
}

function clearNotificationSchedules() {
    notificationSchedules.forEach(schedule => {
        clearTimeout(schedule.timeout);
    });
    notificationSchedules = [];
}

function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 999;
        animation: slideInRight 0.4s ease-out;
        font-weight: 600;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ========================================
// LOCAL STORAGE
// ========================================
function saveSettingsToStorage() {
    localStorage.setItem('caffeScaleSettings', JSON.stringify(settings));
}

function loadSettings() {
    const stored = localStorage.getItem('caffeScaleSettings');
    if (stored) {
        settings = { ...defaultSettings, ...JSON.parse(stored) };
    }
}

// ========================================
// DATA E HORA
// ========================================
function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('pt-BR', options);
    const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    document.getElementById('current-date').textContent = capitalizedDate;
}

// ========================================
// ANIMAÇÃO DE FADEOUT
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
`;
document.head.appendChild(style);
