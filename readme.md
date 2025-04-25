# Node Scraping Webpage API

Esta é uma API simples para extrair o texto de páginas HTML, removendo tags HTML, elementos desnecessários como `iframe`, `script`, `style`, e `noscript`, e normalizando o texto para facilitar o uso.

## Como usar

### 1. Instalar dependências

Certifique-se de que você tenha o Node.js instalado. Em seguida, instale as dependências do projeto:

```bash
npm install
```

### 2. Iniciar o servidor

Inicie o servidor localmente:

```bash
node index.js
```

O servidor será iniciado em `http://localhost:3000`.

### 3. Endpoint disponível

#### `POST /scrape`

Este endpoint aceita uma URL no corpo da requisição e retorna o texto extraído da página.

**Corpo da requisição:**

- `url` (obrigatório): A URL da página que você deseja extrair o texto.

**Exemplo de requisição:**

```bash
curl -X POST http://localhost:3000/scrape -H "Content-Type: application/json" -d '{"url": "https://exemplo.com"}'
```

**Exemplo de resposta:**

```json
{
  "text": "Texto extraído da página sem tags HTML."
}
```

### 4. Deploy

Você pode fazer o deploy desta aplicação em plataformas gratuitas como Render, Railway ou Vercel. Certifique-se de configurar a porta dinamicamente com `process.env.PORT` para compatibilidade com essas plataformas.

### 5. Observações

- Certifique-se de que a URL fornecida seja acessível publicamente.
- A API remove elementos como `iframe`, `script`, `style` e `noscript` para garantir que apenas o texto relevante seja retornado.
