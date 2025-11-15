import './style.css'

export function render(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Buscar Produtos</h1>
        <p class="text-gray-600">Encontre os melhores produtos para você</p>
      </div>

      <!-- Search Bar -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex gap-4">
          <input 
            type="text" 
            placeholder="O que você está procurando?"
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            Buscar
          </button>
        </div>
        
        <!-- Filters -->
        <div class="mt-4 flex gap-2 flex-wrap">
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">
            Eletrônicos
          </button>
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">
            Livros
          </button>
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">
            Roupas
          </button>
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition text-sm">
            Casa e Jardim
          </button>
        </div>
      </div>

      <!-- Results Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${generateProductCards()}
      </div>
    </div>
  `
}

function generateProductCards() {
  const products = [
    { name: 'Notebook Gamer', price: 'R$ 4.999,00', category: 'Eletrônicos' },
    { name: 'Livro: Clean Code', price: 'R$ 89,90', category: 'Livros' },
    { name: 'Camiseta Premium', price: 'R$ 159,90', category: 'Roupas' },
    { name: 'Mouse Wireless', price: 'R$ 149,90', category: 'Eletrônicos' },
    { name: 'Cadeira Gamer', price: 'R$ 1.299,00', category: 'Casa e Jardim' },
    { name: 'Teclado Mecânico', price: 'R$ 599,00', category: 'Eletrônicos' },
  ]

  return products.map(product => `
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
      <div class="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
        <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
        </svg>
      </div>
      <div class="space-y-2">
        <span class="text-xs font-medium text-blue-600 uppercase">${product.category}</span>
        <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
        <p class="text-2xl font-bold text-gray-900">${product.price}</p>
        <button class="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `).join('')
}

