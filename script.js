document.getElementById('nomeDeputado').addEventListener('change', function () {
  const nome = this.value.trim();
  if (!nome) return;

  const url = `https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${nome}&ordem=ASC&ordenarPor=nome`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.dados.length === 0) {
        alert("Deputado não encontrado!");
        document.getElementById('formDeputado').style.display = 'none';
        return;
      }

      const deputado = data.dados[0];

      // Consultar detalhes do deputado
      fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}`)
        .then(res => res.json())
        .then(detalhes => {
          const info = detalhes.dados;

          document.getElementById('formDeputado').style.display = 'block';
          document.getElementById('foto').src = info.ultimoStatus.urlFoto;
          document.getElementById('nomeCivil').value = info.nomeCivil;
          document.getElementById('partido').value = info.ultimoStatus.siglaPartido;
          document.getElementById('uf').value = info.ultimoStatus.siglaUf;
          document.getElementById('email').value = info.ultimoStatus.email || 'Não informado';
        });
    })
    .catch(error => {
      console.error("Erro ao buscar dados:", error);
      alert("Ocorreu um erro ao buscar os dados.");
    });
});
