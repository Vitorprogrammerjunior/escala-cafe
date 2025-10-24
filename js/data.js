// ========================================
// CONFIGURAÇÃO DO GOOGLE SHEETS
// ========================================
// 1. Acesse: https://docs.google.com/spreadsheets
// 2. Crie uma planilha ou use a existente
// 3. Vá em: Arquivo → Configurações de publicação → Compartilhar
// 4. Copie o ID da planilha da URL:
//    https://docs.google.com/spreadsheets/d/AQUI_ESTA_O_ID/edit
// 5. Cole o ID abaixo:

const GOOGLE_SHEET_ID = '1p6WnSKVdnI32nxgn_-FtjGdhg6WxBo9lZzWo6Kz9ESk';
const GOOGLE_SHEET_RANGE = 'Escala!A3:C25'; // Range da sua planilha (de Segunda/03 até Sexta/28)
const GOOGLE_API_KEY = 'AIzaSyBQude-mTlGojEYxEgUED5gPQU4xX2R-xU';

// Dados padrão (será sobrescrito pelos dados do Google Sheets)
let scheduleData = [
    {
        week: 1,
        weekLabel: "Semana 1",
        days: [
            {
                date: "03/11/2025",
                day: "Segunda",
                morning: "Léo",
                afternoon: "Beto"
            },
            {
                date: "04/11/2025",
                day: "Terça",
                morning: "Luis",
                afternoon: "Angela"
            },
            {
                date: "05/11/2025",
                day: "Quarta",
                morning: "Vitor",
                afternoon: "Luis"
            },
            {
                date: "06/11/2025",
                day: "Quinta",
                morning: "Lucas",
                afternoon: "Beto"
            },
            {
                date: "07/11/2025",
                day: "Sexta",
                morning: "Thais",
                afternoon: "Vitor"
            }
        ]
    },
    {
        week: 2,
        weekLabel: "Semana 2",
        days: [
            {
                date: "10/11/2025",
                day: "Segunda",
                morning: "Leo",
                afternoon: "Vitor"
            },
            {
                date: "11/11/2025",
                day: "Terça",
                morning: "Beto",
                afternoon: "Angela"
            },
            {
                date: "12/11/2025",
                day: "Quarta",
                morning: "Luis",
                afternoon: "Lucas"
            },
            {
                date: "13/11/2025",
                day: "Quinta",
                morning: "Thais",
                afternoon: "Vitor"
            },
            {
                date: "14/11/2025",
                day: "Sexta",
                morning: "Lucas",
                afternoon: "Angela"
            }
        ]
    },
    {
        week: 3,
        weekLabel: "Semana 3",
        days: [
            {
                date: "17/11/2025",
                day: "Segunda",
                morning: "Leo",
                afternoon: "Angela"
            },
            {
                date: "18/11/2025",
                day: "Terça",
                morning: "Lucas",
                afternoon: "Vitor"
            },
            {
                date: "19/11/2025",
                day: "Quarta",
                morning: "Beto",
                afternoon: "Thais"
            },
            {
                date: "20/11/2025",
                day: "Quinta",
                morning: "Vitor",
                afternoon: "Lucas"
            },
            {
                date: "21/11/2025",
                day: "Sexta",
                morning: "Angela",
                afternoon: "Beto"
            }
        ]
    },
    {
        week: 4,
        weekLabel: "Semana 4",
        days: [
            {
                date: "24/11/2025",
                day: "Segunda",
                morning: "Leo",
                afternoon: "Angela"
            },
            {
                date: "25/11/2025",
                day: "Terça",
                morning: "Lucas",
                afternoon: "Thais"
            },
            {
                date: "26/11/2025",
                day: "Quarta",
                morning: "Beto",
                afternoon: "Luis"
            },
            {
                date: "27/11/2025",
                day: "Quinta",
                morning: "Thais",
                afternoon: "Vitor"
            },
            {
                date: "28/11/2025",
                day: "Sexta",
                morning: "Angela",
                afternoon: "Luis"
            }
        ]
    }
];

// Mapa de contatos (você irá preencher os números)
let contacts = {
    "Leo": "+55 (27) 99885-2393",
    "Beto": "+55 (27) 99917-0676",
    "Luis": "+55 (27)  99772-5842",
    "Angela": "+55 (27) 99795-4336",
    "Vitor": "+55 (27) 99517-9542",
    "Lucas": "+55 (27) 99849-8671",
    "Thais": "+55 (27) 99515-6607"
};

// Configurações padrão de SMS
const defaultSettings = {
    morningTime: "08:00",
    afternoonTime: "14:00",
    enableNotifications: true
};

// ========================================
// FUNÇÕES PARA GOOGLE SHEETS
// ========================================

/**
 * Carrega dados do Google Sheets
 * @async
 * @returns {Promise<boolean>} True se carregou com sucesso, False caso contrário
 */
async function loadGoogleSheetData() {
    try {
        // Validar se as configurações estão preenchidas
        if (GOOGLE_SHEET_ID === 'COLE_O_ID_DA_PLANILHA_AQUI' || 
            GOOGLE_API_KEY === 'COLE_SUA_CHAVE_API_DO_GOOGLE_AQUI') {
            console.warn('⚠️ Google Sheets não configurado. Usando dados padrão.');
            return false;
        }

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${GOOGLE_SHEET_RANGE}?key=${GOOGLE_API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.values || data.values.length === 0) {
            console.warn('⚠️ Planilha vazia ou mal formatada.');
            return false;
        }

        // Processar os dados da planilha
        const rows = data.values;
        scheduleData = parseGoogleSheetData(rows);
        
        console.log('✅ Dados carregados do Google Sheets com sucesso!');
        return true;

    } catch (error) {
        console.error('❌ Erro ao carregar Google Sheets:', error);
        return false;
    }
}

/**
 * Parse dos dados do Google Sheets para o formato esperado
 * @param {Array<Array>} rows - Linhas da planilha
 * @returns {Array} Dados formatados
 */
function parseGoogleSheetData(rows) {
    const weeks = {};
    let currentWeek = 1;
    
    console.log('📊 Iniciando parse dos dados...');
    console.log(`Total de linhas recebidas: ${rows.length}`);
    
    // Processar dados
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        
        if (!row || row.length < 3) continue;
        
        const [dayInfo, morning, afternoon] = row;
        
        // Ignorar linhas vazias
        if (!dayInfo || !dayInfo.trim()) continue;
        
        // Ignorar linhas com cabeçalhos "MANHÃ" e "TARDE"
        if (dayInfo.toUpperCase().includes('MANHÃ') || dayInfo.toUpperCase().includes('TARDE')) {
            console.log(`⏭️  Pulando linha de cabeçalho: ${dayInfo}`);
            continue;
        }
        
        // Verificar se é linha de semana (ex: "Semana 2")
        if (dayInfo.includes('Semana')) {
            const weekMatch = dayInfo.match(/\d+/);
            if (weekMatch) {
                currentWeek = parseInt(weekMatch[0]);
                console.log(`📅 Semana ${currentWeek} encontrada`);
            }
            continue;
        }
        
        // Processar linha de dia (ex: "Segunda/03")
        if (dayInfo.includes('/')) {
            const parts = dayInfo.split('/');
            if (parts.length >= 2) {
                const dayName = parts[0].trim();
                const dayNum = parts[1].trim();
                
                // Construir data completa (2025 é o ano da escala)
                const fullDate = `${dayNum}/11/2025`;
                
                // Inicializar semana se não existe
                if (!weeks[currentWeek]) {
                    weeks[currentWeek] = {
                        week: currentWeek,
                        weekLabel: `Semana ${currentWeek}`,
                        days: []
                    };
                }
                
                // Adicionar dia à semana
                const dayEntry = {
                    date: fullDate,
                    day: dayName,
                    morning: (morning || '').trim() || 'N/A',
                    afternoon: (afternoon || '').trim() || 'N/A'
                };
                
                weeks[currentWeek].days.push(dayEntry);
                
                console.log(`  ✓ ${dayName} ${fullDate}: Manhã=${dayEntry.morning}, Tarde=${dayEntry.afternoon}`);
            }
        }
    }
    
    // Converter para array ordenado
    return Object.values(weeks).sort((a, b) => a.week - b.week);
}

/**
 * Carrega contatos do Google Sheets (aba separada)
 * @async
 */
async function loadGoogleSheetContacts() {
    try {
        if (GOOGLE_SHEET_ID === 'COLE_O_ID_DA_PLANILHA_AQUI' || 
            GOOGLE_API_KEY === 'COLE_SUA_CHAVE_API_DO_GOOGLE_AQUI') {
            return false;
        }

        const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/Contatos!A1:B50?key=${GOOGLE_API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) return false;

        const data = await response.json();
        
        if (!data.values || data.values.length < 2) return false;

        // Processar contatos (pular cabeçalho)
        const rows = data.values;
        for (let i = 1; i < rows.length; i++) {
            const [name, phone] = rows[i] || [];
            if (name && phone) {
                contacts[name.trim()] = phone.trim();
            }
        }
        
        console.log('✅ Contatos carregados do Google Sheets');
        return true;

    } catch (error) {
        console.warn('⚠️ Erro ao carregar contatos:', error);
        return false;
    }
}
