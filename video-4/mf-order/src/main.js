import './style.css'

export function render(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Meus Pedidos</h1>
        <p class="text-gray-600">Acompanhe o status dos seus pedidos</p>
      </div>

      <!-- Filter Tabs -->
      <div class="bg-white p-4 rounded-lg shadow-md">
        <div class="flex gap-4 border-b">
          <button class="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600">
            Todos
          </button>
          <button class="px-4 py-2 font-medium text-gray-600 hover:text-blue-600">
            Em Processamento
          </button>
          <button class="px-4 py-2 font-medium text-gray-600 hover:text-blue-600">
            Enviados
          </button>
          <button class="px-4 py-2 font-medium text-gray-600 hover:text-blue-600">
            Entregues
          </button>
        </div>
      </div>

      <!-- Orders List -->
      <div class="space-y-4">
        ${generateOrderCards()}
      </div>
    </div>
  `
}

function generateOrderCards() {
  const orders = [
    {
      id: '12345',
      date: '10/11/2025',
      status: 'Em trânsito',
      statusColor: 'blue',
      total: 'R$ 4.999,00',
      items: ['Notebook Gamer', 'Mouse Wireless'],
      estimatedDelivery: '20/11/2025'
    },
    {
      id: '12344',
      date: '05/11/2025',
      status: 'Entregue',
      statusColor: 'green',
      total: 'R$ 1.898,00',
      items: ['Cadeira Gamer'],
      estimatedDelivery: '15/11/2025'
    },
    {
      id: '12343',
      date: '01/11/2025',
      status: 'Processando',
      statusColor: 'yellow',
      total: 'R$ 689,90',
      items: ['Teclado Mecânico', 'Livro: Clean Code'],
      estimatedDelivery: '25/11/2025'
    },
  ]

  return orders.map(order => `
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">Pedido #${order.id}</h3>
          <p class="text-sm text-gray-600">Realizado em ${order.date}</p>
        </div>
        <span class="px-3 py-1 bg-${order.statusColor}-100 text-${order.statusColor}-700 rounded-full text-sm font-medium">
          ${order.status}
        </span>
      </div>

      <div class="border-t border-gray-200 pt-4 mb-4">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Itens do pedido:</h4>
        <ul class="space-y-1">
          ${order.items.map(item => `
            <li class="text-gray-600 text-sm">• ${item}</li>
          `).join('')}
        </ul>
      </div>

      <div class="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <p class="text-sm text-gray-600">Previsão de entrega:</p>
          <p class="font-medium text-gray-800">${order.estimatedDelivery}</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600">Total:</p>
          <p class="text-xl font-bold text-gray-900">${order.total}</p>
        </div>
      </div>

      <div class="mt-4 flex gap-2">
        <button class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
          Ver Detalhes
        </button>
        <button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Rastrear Pedido
        </button>
      </div>
    </div>
  `).join('')
}

