export default function handler(req, res) {
  if (req.method === 'POST') {
    const { participantes } = req.body;

    if (!participantes || participantes.length < 2) {
      return res.status(400).json({ error: 'Precisa de pelo menos 2 participantes.' });
    }

    let sorteados = [...participantes];
    let resultado = {};

    for (let nome of participantes) {
      let opcoes = sorteados.filter(p => p !== nome);

      if (opcoes.length === 0) {
        return res.status(500).json({ error: 'Erro no sorteio. Tente novamente.' });
      }

      let escolhido = opcoes[Math.floor(Math.random() * opcoes.length)];
      resultado[nome] = escolhido;
      sorteados = sorteados.filter(p => p !== escolhido);
    }

    return res.status(200).json({ resultado });
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
