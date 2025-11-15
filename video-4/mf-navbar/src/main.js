import './style.css'

export function render(container, options = {}) {
  const { userEmail = null, currentPath = '/', onNavigate, onLogout, onLogin, isAuthenticated = false } = options

  // Decide what to show based on authentication
  const userSection = isAuthenticated && userEmail ? `
    <div class="flex items-center space-x-4">
      <div class="text-sm text-gray-700">
        <span class="font-medium" id="user-email">${userEmail}</span>
      </div>
      <button 
        id="logout-btn" 
        class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition"
      >
        Sair
      </button>
    </div>
  ` : `
    <button 
      id="login-btn" 
      class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
    >
      Entrar
    </button>
  `

  container.innerHTML = `
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <h1 class="text-xl font-bold text-gray-800">MicroFrontends</h1>
            ${isAuthenticated ? `
              <div class="flex space-x-4">
                <a 
                  href="/" 
                  data-nav-link 
                  class="nav-link px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition ${currentPath === '/' ? 'bg-blue-100 text-blue-600' : ''}"
                >
                  Busca
                </a>
                <a 
                  href="/order" 
                  data-nav-link 
                  class="nav-link px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition ${currentPath === '/order' ? 'bg-blue-100 text-blue-600' : ''}"
                >
                  Pedidos
                </a>
              </div>
            ` : ''}
          </div>
          
          ${userSection}
        </div>
      </div>
    </nav>
  `

  // Event listeners for navigation links
  const navLinks = container.querySelectorAll('[data-nav-link]')
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const path = link.getAttribute('href')
      
      // Update active state
      navLinks.forEach(l => {
        l.classList.remove('bg-blue-100', 'text-blue-600')
      })
      link.classList.add('bg-blue-100', 'text-blue-600')
      
      // Call navigation callback if provided
      if (onNavigate) {
        onNavigate(path)
      }
    })
  })

  // Event listener for logout button
  const logoutBtn = container.querySelector('#logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Call logout callback if provided
      if (onLogout) {
        onLogout()
      }
    })
  }

  // Event listener for login button
  const loginBtn = container.querySelector('#login-btn')
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      // Call login callback if provided
      if (onLogin) {
        onLogin()
      }
    })
  }
}

// Method to update active link (can be called from outside)
export function updateActiveLink(container, path) {
  const navLinks = container.querySelectorAll('[data-nav-link]')
  navLinks.forEach(link => {
    const href = link.getAttribute('href')
    if (href === path) {
      link.classList.add('bg-blue-100', 'text-blue-600')
    } else {
      link.classList.remove('bg-blue-100', 'text-blue-600')
    }
  })
}

// Method to update user email (can be called from outside)
export function updateUserEmail(container, email) {
  const userEmailEl = container.querySelector('#user-email')
  if (userEmailEl) {
    userEmailEl.textContent = email
  }
}

