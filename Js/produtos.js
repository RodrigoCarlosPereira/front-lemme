
document.addEventListener("DOMContentLoaded", function() {
    const produtosContainer = document.getElementById("produtosContainer");
  
    // Fetch para buscar os produtos da API
    fetch('http://localhost:3000/produtos')
      .then(response => response.json())
      .then(data => {
        data.forEach(produto => {
          const produtoDiv = document.createElement("div");
          produtoDiv.className = "produto";
          produtoDiv.innerHTML = `
            <h3>${produto.nome_produto}</h3>
            <p>${produto.descricao_produto}</p>
            <span>R$ ${produto.preco_produto}</span>
            <img src="http://localhost:3000/produtos/imagens${produto.produto_imagens}" alt="${produto.nome_produto}" />
            <button onclick="verDetalhes(${produto.produto_id})">Ver Detalhes</button>
          `;
          produtosContainer.appendChild(produtoDiv);
        });
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  });
  
// Função para mostrar os detalhes do produto em um modal
function verDetalhes(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const produtoDetalhe = document.getElementById('produtoDetalhe');

    if (produto) {
        const tamanhosDisponiveis = produto.tamanhos.map(tamanho => `<option value="${tamanho}">${tamanho}</option>`).join('');
        const coresDisponiveis = produto.cores.map(cor => `<option value="${cor}">${cor}</option>`).join('');

        produtoDetalhe.innerHTML = `
            <h2>${produto.nome_produtonome}</h2>
            <img src="${produto.produto_imagens}" alt="${produto.nome_produto}">
            <p>${produto.descricao_produto}</p>
            <span>${produto.preco_produto}</span>
            <div>
                <label for="tamanhos">Tamanho:</label>
                <select id="tamanhos">
                    ${tamanhosDisponiveis}
                </select>
            </div>
            <div>
                <label for="cores">Cor:</label>
                <select id="cores">
                    ${coresDisponiveis}
                </select>
            </div>
            <div>
                <label for="quantidade">Quantidade:</label>
                <input type="number" id="quantidade" value="1" min="1" max="10">
            </div>
            <button onclick="adicionarAoCarrinho(${produto.pr})">Adicionar ao Carrinho</button>
        `;

        abrirModal();
    }
}


// Supondo que a função adicionarAoCarrinho e as outras funções abrirModal e fecharModal já estejam definidas corretamente.


// Função para adicionar ao carrinho (exemplo simples)
function adicionarAoCarrinho(produtoId) {
    const tamanho = document.getElementById('tamanhos').value;
    const cor = document.getElementById('cores').value;
    const quantidade = document.getElementById('quantidade').value;

    alert(`Produto ID: ${produtoId}, Tamanho: ${tamanho}, Cor: ${cor}, Quantidade: ${quantidade} adicionado ao carrinho!`);
}

// Função para abrir o modal
function abrirModal() {
    const modal = document.getElementById('detalheModal');
    modal.style.display = "block";
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById('detalheModal');
    modal.style.display = "none";
}

// Chama a função para exibir os produtos ao carregar a página
window.onload = exibirProdutos();

