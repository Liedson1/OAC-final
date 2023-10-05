// api/receber-dados.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log('Dados recebidos no Vercel:', data);
    // Faça o que desejar com os dados recebidos, como armazená-los em um banco de dados.

    res.status(200).json({ message: 'Dados recebidos com sucesso.' });
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
