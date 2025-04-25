# Node Scraping Webpage API

Este projeto é uma API para realizar scraping de páginas web. Ele inclui autenticação por chave de API e suporte para testes automatizados.

## Alterações Recentes

### 1. Test para o Middleware `authenticateApiKey`

Foi adicionado um novo arquivo de teste para o middleware `authenticateApiKey`. Este middleware é responsável por validar a chave de API enviada no cabeçalho da requisição. Os testes cobrem os seguintes cenários:

- Retorna **403** se a chave de API estiver ausente.
- Retorna **403** se a chave de API for inválida.
- Permite a continuação da requisição se a chave de API for válida.

### 2. Testes do `scrapeController`

Os testes existentes para o `scrapeController` foram revisados e mantidos. Eles cobrem os seguintes cenários:

- Retorna **400** se a URL não for fornecida no corpo da requisição.
- Retorna **200** e o texto extraído se o scraping for bem-sucedido.
- Retorna **500** se o serviço de scraping (`scrapeService`) lançar um erro.
- Retorna **403** se a chave de API estiver ausente ou inválida.

### 3. Mock do Serviço de Scraping

O serviço de scraping (`scrapeService`) foi mockado nos testes para simular diferentes cenários sem realizar chamadas reais.

### 4. Configuração Local com `.env`

Agora é possível configurar a chave de API localmente utilizando um arquivo `.env`. Para isso, crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
API_KEY=your-local-api-key
```

Substitua `your-local-api-key` pela chave de API desejada. Isso facilita o teste local da aplicação sem a necessidade de configurar variáveis de ambiente manualmente.

## Como Executar os Testes

Certifique-se de que todas as dependências estão instaladas:

```bash
npm install
```

Para executar os testes, utilize o comando:

```bash
npm test
```

Os testes cobrem tanto o middleware quanto o controlador, garantindo a confiabilidade da aplicação.

## Estrutura do Projeto

- **controllers/**: Contém o `scrapeController` responsável por lidar com as requisições de scraping.
- **middleware/**: Contém o middleware `authenticateApiKey` para validação da chave de API.
- **services/**: Contém o serviço de scraping (`scrapeService`).
- **tests/**: Contém os testes automatizados para o middleware e o controlador.

## Configuração da Chave de API

A chave de API deve ser configurada como uma variável de ambiente:

```bash
export API_KEY=your-api-key
```

Certifique-se de definir a chave de API antes de executar a aplicação ou os testes.

## Endpoints Disponíveis

### 1. `/scrape`

- **Método**: POST
- **Descrição**: Realiza o scraping de uma página web com base na URL fornecida.
- **Cabeçalhos**:
  - `x-api-key`: Chave de API para autenticação.
- **Body**:
  ```json
  {
    "url": "https://exemplo.com"
  }
  ```
- **Respostas**:
  - **200**: Retorna o texto extraído da página.
    ```json
    {
      "data": "Texto extraído da página"
    }
    ```
  - **400**: URL não fornecida ou inválida.
    ```json
    {
      "error": "URL é obrigatória"
    }
    ```
  - **403**: Chave de API ausente ou inválida.
    ```json
    {
      "error": "Acesso negado: chave de API inválida"
    }
    ```
  - **500**: Erro interno no servidor.
    ```json
    {
      "error": "Erro ao processar a requisição"
    }
    ```

---

Se precisar de mais informações ou ajuda, sinta-se à vontade para abrir uma issue no repositório.
