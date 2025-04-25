// Middleware para autenticação com x-api-key
export const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res
      .status(403)
      .json({ error: 'Acesso negado: chave de API inválida' });
  }
  next();
};
