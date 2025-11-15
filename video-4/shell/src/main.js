import './style.css'
import { eventBus } from './eventBus'

// State management (preparado para event bus)
const state = {
  isAuthenticated: false,
  user: null
}

// DOM Elements (será inicializado quando o DOM estiver pronto)
let loginScreen, appScreen, loginForm, navbarContainer, container

// Store navbar module reference
let navbarModule = null

// Routes mapping
const routes = {
  '/': 'mf-search',
  '/order': 'mf-order',
}

// Navigation function
async function navigateTo(path) {
  const mf = routes[path]
  if (mf) {
    try {
      const { render } = await import(/* @vite-ignore */ mf)
      render(container)
      
      // Update active link in navbar
      if (navbarModule && navbarModule.updateActiveLink) {
        navbarModule.updateActiveLink(navbarContainer, path)
      }
    } catch (error) {
      console.error(`Erro ao carregar micro-frontend: ${mf}`, error)
      container.innerHTML = `
        <div class="text-center py-12">
          <p class="text-red-600 text-lg">Erro ao carregar o módulo ${mf}</p>
          <p class="text-gray-600 mt-2">Verifique se todos os micro-frontends estão rodando</p>
        </div>
      `
    }
  }
}

// Show login screen
function showLogin() {
  loginScreen.classList.remove('hidden')
  appScreen.classList.add('hidden')
  state.isAuthenticated = false
  state.user = null
  
  // Publicar evento de logout
  eventBus.emit('mf:auth:logout')
  
  // Update navbar to show login button
  if (navbarModule && navbarContainer) {
    renderNavbar()
  }
}

// Render navbar
async function renderNavbar() {
  try {
    // Load navbar module and store reference (only once)
    if (!navbarModule) {
      const navbarUrl = 'http://localhost:8002/src/main.js'
      navbarModule = await import(/* @vite-ignore */ navbarUrl)
    }
    
    const currentPath = window.location.pathname === '' ? '/' : window.location.pathname
    
    navbarModule.render(navbarContainer, {
      userEmail: state.user?.email,
      currentPath,
      isAuthenticated: state.isAuthenticated,
      onNavigate: (path) => {
        console.log(`Navegando para: ${path}`)
        navigateTo(path)
      },
      onLogout: () => {
        // TODO: Aqui será implementado o event bus para logout
        console.log('Logout')
        showLogin()
      },
      onLogin: () => {
        // TODO: Aqui será implementado o event bus para exibir login
        console.log('Mostrando tela de login')
        showLogin()
      }
    })
  } catch (error) {
    console.error('Erro ao carregar navbar:', error)
  }
}

// Show app screen
function showApp(user) {
  loginScreen.classList.add('hidden')
  appScreen.classList.remove('hidden')
  state.isAuthenticated = true
  state.user = user
  
  // Publicar evento de login
  eventBus.emit('mf:auth:login', { email: user.email })
  
  // Render navbar with user info
  renderNavbar()
  
  // Navigate to initial route
  const currentPath = window.location.pathname === '' ? '/' : window.location.pathname
  navigateTo(currentPath)
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize DOM elements
  loginScreen = document.querySelector('#login-screen')
  appScreen = document.querySelector('#app-screen')
  loginForm = document.querySelector('#login-form')
  navbarContainer = document.querySelector('#navbar')
  container = document.querySelector('#app')

  // Login handler (sem lógica real, apenas simulação)
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    
    // TODO: Aqui será implementado o event bus para autenticação
    console.log('Login attempt:', { email, password })
    
    // Simula login bem-sucedido
    const user = { email, name: email.split('@')[0] }
    showApp(user)
  })

  // Initialize - render navbar and start app (não autenticado por padrão)
  await renderNavbar()
  
  // Show app screen and navigate to initial route
  appScreen.classList.remove('hidden')
  loginScreen.classList.add('hidden')
  
  const currentPath = window.location.pathname === '' ? '/' : window.location.pathname
  navigateTo(currentPath)
})

// Export for event bus integration (preparado para implementação futura)
export { state, showLogin, showApp }
