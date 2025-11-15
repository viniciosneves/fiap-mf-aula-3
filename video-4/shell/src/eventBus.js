// Lista de eventos permitidos (segurança básica)
const ALLOWED_EVENTS = [
  'mf:auth:login',
  'mf:auth:logout'
]

export const eventBus = {
  // Publicar evento
  emit(eventName, data = {}) {
    // Validar se evento é permitido
    if (!ALLOWED_EVENTS.includes(eventName)) {
      console.error('❌ Evento bloqueado:', eventName)
      return false
    }
    
    console.log('✅ Publicando:', eventName, data)
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
    return true
  },

  // Escutar evento
  on(eventName, callback) {
    const handler = (e) => callback(e.detail)
    window.addEventListener(eventName, handler)
    
    // Retorna função para parar de escutar
    return () => window.removeEventListener(eventName, handler)
  }
}

// Disponível globalmente para todos os MFs
window.__eventBus = eventBus

