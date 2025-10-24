# 📊 Exemplo de Planilha Google Sheets

## Como preparar sua planilha

### Estrutura Recomendada

Crie uma planilha com **2 abas**:

---

## 🗂️ ABA 1: "Escala"

Cabeçalhos (linha 1):

| SEMANA | DIA | DATA | MANHÃ | TARDE |
|--------|-----|------|-------|-------|

### Dados de Exemplo (começando na linha 2):

| SEMANA | DIA | DATA | MANHÃ | TARDE |
|--------|-----|------|-------|-------|
| Semana 1 | Segunda | 03/11/2025 | Léo | Beto |
| Semana 1 | Terça | 04/11/2025 | Luis | Angela |
| Semana 1 | Quarta | 05/11/2025 | Vitor | Luis |
| Semana 1 | Quinta | 06/11/2025 | Lucas | Beto |
| Semana 1 | Sexta | 07/11/2025 | Thais | Vitor |
| Semana 2 | Segunda | 10/11/2025 | Leo | Vitor |
| Semana 2 | Terça | 11/11/2025 | Beto | Angela |
| Semana 2 | Quarta | 12/11/2025 | Luis | Lucas |
| Semana 2 | Quinta | 13/11/2025 | Thais | Vitor |
| Semana 2 | Sexta | 14/11/2025 | Lucas | Angela |
| Semana 3 | Segunda | 17/11/2025 | Leo | Angela |
| Semana 3 | Terça | 18/11/2025 | Lucas | Vitor |
| Semana 3 | Quarta | 19/11/2025 | Beto | Thais |
| Semana 3 | Quinta | 20/11/2025 | Vitor | Lucas |
| Semana 3 | Sexta | 21/11/2025 | Angela | Beto |
| Semana 4 | Segunda | 24/11/2025 | Leo | Angela |
| Semana 4 | Terça | 25/11/2025 | Lucas | Thais |
| Semana 4 | Quarta | 26/11/2025 | Beto | Luis |
| Semana 4 | Quinta | 27/11/2025 | Thais | Vitor |
| Semana 4 | Sexta | 28/11/2025 | Angela | Luis |

---

## 📱 ABA 2: "Contatos" (Opcional)

**Importante:** Esta aba é completamente opcional. Se você não criar, o website usará os contatos do arquivo `js/data.js`.

Cabeçalhos (linha 1):

| NOME | TELEFONE |
|------|----------|

### Dados de Exemplo (começando na linha 2):

| NOME | TELEFONE |
|------|----------|
| Léo | +55 (11) 99999-9999 |
| Beto | +55 (11) 88888-8888 |
| Luis | +55 (11) 77777-7777 |
| Angela | +55 (11) 66666-6666 |
| Vitor | +55 (11) 55555-5555 |
| Lucas | +55 (11) 44444-4444 |
| Thais | +55 (11) 33333-3333 |

---

## ⚙️ Copiar Template

Você pode copiar este template e colar no Google Sheets:

```
SEMANA	DIA	DATA	MANHÃ	TARDE
Semana 1	Segunda	03/11/2025	Léo	Beto
Semana 1	Terça	04/11/2025	Luis	Angela
Semana 1	Quarta	05/11/2025	Vitor	Luis
Semana 1	Quinta	06/11/2025	Lucas	Beto
Semana 1	Sexta	07/11/2025	Thais	Vitor
Semana 2	Segunda	10/11/2025	Leo	Vitor
Semana 2	Terça	11/11/2025	Beto	Angela
Semana 2	Quarta	12/11/2025	Luis	Lucas
Semana 2	Quinta	13/11/2025	Thais	Vitor
Semana 2	Sexta	14/11/2025	Lucas	Angela
Semana 3	Segunda	17/11/2025	Leo	Angela
Semana 3	Terça	18/11/2025	Lucas	Vitor
Semana 3	Quarta	19/11/2025	Beto	Thais
Semana 3	Quinta	20/11/2025	Vitor	Lucas
Semana 3	Sexta	21/11/2025	Angela	Beto
Semana 4	Segunda	24/11/2025	Leo	Angela
Semana 4	Terça	25/11/2025	Lucas	Thais
Semana 4	Quarta	26/11/2025	Beto	Luis
Semana 4	Quinta	27/11/2025	Thais	Vitor
Semana 4	Sexta	28/11/2025	Angela	Luis
```

### Como Colar:

1. Abra Google Sheets: https://docs.google.com/spreadsheets
2. Crie uma nova planilha ou abra a existente
3. Renomeie a aba para "Escala"
4. Selecione a célula A1
5. Ctrl+V (colar)
6. Os dados serão importados com abas

---

## 🔄 Como Editar

A qualquer momento, você pode:

1. **Mudar um nome**: Clique na célula e digite o novo nome
2. **Adicionar uma linha**: Clique com botão direito e insira uma linha
3. **Remover uma linha**: Clique com botão direito e delete
4. **Reordenar**: Corte (Ctrl+X) e cole em outro lugar

**O website atualiza automaticamente a cada 5 minutos!**

---

## ✅ Dicas Importantes

✅ **Nomes idênticos**: Use exatamente o mesmo nome em "Escala" e "Contatos"
- Se em "Escala" tem "Leo", em "Contatos" deve ter "Leo" (não "Léo")

✅ **Sem linhas vazias**: Não deixe linhas em branco no meio dos dados

✅ **Data no formato correto**: Use DD/MM/YYYY

✅ **Compartilhar**: Não esqueça de compartilhar a planilha!

---

## 🎯 Próximos Passos

1. Crie sua planilha com esta estrutura
2. Compartilhe a planilha (Arquivo → Compartilhar)
3. Copie o ID e a chave de API
4. Configure no arquivo `js/data.js`
5. Recarregue o website

**Pronto! 🎉**
