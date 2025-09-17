// Enhanced NEON HUB JavaScript with Advanced Features

// Configurações globais
const CONFIG = {
  stats: {
    updateInterval: 10000, // 10 segundos
    animationDuration: 500
  },
  particles: {
    count: 50,
    speed: 0.5,
    size: 2
  }
};

// Estado global da aplicação
const AppState = {
  currentTheme: 'neon',
  isLoggedIn: false,
  loadingComplete: false,
  particlesInitialized: false,
  stats: {
    whatsappMembers: 1245,
    discordMembers: 3886,
    onlineCount: 42,
    dailyActive: 888,
    messagesToday: 3284
  }
};

// Sistema de Partículas
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.init();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < CONFIG.particles.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.particles.speed,
        vy: (Math.random() - 0.5) * CONFIG.particles.speed,
        size: Math.random() * CONFIG.particles.size + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.getRandomNeonColor()
      });
    }
  }

  getRandomNeonColor() {
    const colors = ['#00FFFF', '#8A2BE2', '#FF1493', '#00FF00'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      // Atualizar posição
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce nas bordas
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      // Desenhar partícula
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fill();

      // Efeito de brilho
      this.ctx.shadowColor = particle.color;
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    this.ctx.globalAlpha = 1;
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Sistema de Loading
class LoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.loadingText = document.querySelector('.loading-text');
    this.messages = [
      'INICIANDO NEON HUB...',
      'CONECTANDO SERVIDORES...',
      'CARREGANDO INTERFACE...',
      'VERIFICANDO SISTEMAS...',
      'HUB PRONTO!'
    ];
    this.currentMessage = 0;
  }

  start() {
    this.cycleMessages();

    setTimeout(() => {
      this.complete();
    }, 3000);
  }

  cycleMessages() {
    const interval = setInterval(() => {
      this.currentMessage++;
      if (this.currentMessage < this.messages.length) {
        this.loadingText.textContent = this.messages[this.currentMessage];
      } else {
        clearInterval(interval);
      }
    }, 600);
  }

  complete() {
    AppState.loadingComplete = true;
    this.loadingScreen.style.display = 'none';

    // Ir direto para o conteúdo principal
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.style.display = 'block';
      DashboardManager.init('Visitante');
    }

    // Inicializar partículas após loading
    if (!AppState.particlesInitialized) {
      new ParticleSystem();
      AppState.particlesInitialized = true;
    }
  }
}

// Sistema de Autenticação removido - acesso direto

// Dashboard Manager
class DashboardManager {
  static init(username = 'Visitante') {
    // Atualizar texto de boas-vindas
    const welcomeText = document.querySelector('.welcome-text');
    if (welcomeText) {
      welcomeText.textContent = `Bem-vindo ao NEON HUB!`;
    }

    // Inicializar outros componentes do dashboard
    this.initializeStats();
    this.initializeActions();
  }

  static startStatsUpdates() {
    // Atualizar stats periodicamente
    this.updateStats();
    this.statsInterval = setInterval(() => {
      this.updateStats();
    }, CONFIG.stats.updateInterval);
  }

  static updateStats() {
    // Simular flutuações realistas nos números
    AppState.stats.whatsappMembers += Math.floor(Math.random() * 3) - 1;
    AppState.stats.discordMembers += Math.floor(Math.random() * 5) - 2;
    AppState.stats.onlineCount += Math.floor(Math.random() * 5) - 2;
    AppState.stats.dailyActive += Math.floor(Math.random() * 10) - 5;
    AppState.stats.messagesToday += Math.floor(Math.random() * 50);

    // Manter números em ranges realistas
    AppState.stats.whatsappMembers = Math.max(1240, Math.min(1250, AppState.stats.whatsappMembers));
    AppState.stats.discordMembers = Math.max(3880, Math.min(3890, AppState.stats.discordMembers));
    AppState.stats.onlineCount = Math.max(35, Math.min(50, AppState.stats.onlineCount));
    AppState.stats.dailyActive = Math.max(880, Math.min(900, AppState.stats.dailyActive));
    AppState.stats.messagesToday = Math.max(3200, Math.min(3400, AppState.stats.messagesToday));

    // Atualizar UI com animação
    this.animateCounter('whatsapp-members', AppState.stats.whatsappMembers);
    this.animateCounter('discord-members', AppState.stats.discordMembers);
    this.animateCounter('online-count', AppState.stats.onlineCount);
    this.animateCounter('daily-active', AppState.stats.dailyActive);
    this.animateCounter('messages-today', AppState.stats.messagesToday);
  }

  static animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const increment = (targetValue - currentValue) / 10;
    let current = currentValue;

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
        current = targetValue;
        clearInterval(timer);
      }

      element.textContent = Math.floor(current).toLocaleString();

      // Efeito de brilho durante atualização
      element.style.textShadow = '0 0 20px #00FFFF';
      setTimeout(() => {
        element.style.textShadow = '0 0 15px #00FFFF';
      }, 200);
    }, 50);
  }

  static initializeCounters() {
    // Animação inicial dos contadores
    Object.keys(AppState.stats).forEach((key, index) => {
      setTimeout(() => {
        const elementId = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        this.animateCounter(elementId, AppState.stats[key]);
      }, index * 200);
    });
  }

  static setupEventListeners() {
    // Event listeners para botões de ação
    window.refreshStats = () => this.refreshStats();
    window.toggleTheme = () => this.toggleTheme();
    window.trackClick = (platform) => this.trackClick(platform);

    // Adicionar event listeners para elementos do DOM
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (globalAuthManager) {
          globalAuthManager.logout();
        }
      });
    }

    const refreshBtn = document.getElementById('refresh-stats-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.refreshStats());
    }

    const themeBtn = document.getElementById('toggle-theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Event listeners para os cards de comunidade
    const whatsappCard = document.querySelector('[data-platform="whatsapp"]');
    if (whatsappCard) {
      whatsappCard.addEventListener('click', () => this.trackClick('whatsapp'));
    }

    const discordCard = document.querySelector('[data-platform="discord"]');
    if (discordCard) {
      discordCard.addEventListener('click', () => this.trackClick('discord'));
    }
  }

  static refreshStats() {
    // Mostrar feedback visual
    const refreshBtn = document.querySelector('.action-btn');
    const originalText = refreshBtn.innerHTML;

    refreshBtn.innerHTML = '<span>🔄 Atualizando...</span>';
    refreshBtn.disabled = true;

    // Simular carregamento
    setTimeout(() => {
      this.updateStats();
      refreshBtn.innerHTML = originalText;
      refreshBtn.disabled = false;

      // Mostrar notificação
      this.showNotification('📊 Estatísticas atualizadas!', 'success');
    }, 1500);
  }

  static toggleTheme() {
    const root = document.documentElement;

    if (AppState.currentTheme === 'neon') {
      // Mudar para tema escuro
      root.style.setProperty('--neon-blue', '#4A90E2');
      root.style.setProperty('--neon-purple', '#6A4C93');
      root.style.setProperty('--neon-pink', '#E91E63');
      AppState.currentTheme = 'dark';
      this.showNotification('🌙 Tema escuro ativado!', 'info');
    } else {
      // Voltar para tema neon
      root.style.setProperty('--neon-blue', '#00FFFF');
      root.style.setProperty('--neon-purple', '#8A2BE2');
      root.style.setProperty('--neon-pink', '#FF1493');
      AppState.currentTheme = 'neon';
      this.showNotification('⚡ Tema neon ativado!', 'info');
    }
  }

  static trackClick(platform) {
    console.log(`Clique registrado: ${platform} às ${new Date().toLocaleTimeString()}`);

    // Incrementar contador de cliques
    const clickCount = parseInt(localStorage.getItem(`${platform}_clicks`) || '0') + 1;
    localStorage.setItem(`${platform}_clicks`, clickCount.toString());

    // Mostrar feedback
    this.showNotification(`🔗 Redirecionando para ${platform.toUpperCase()}...`, 'info');
  }

  static showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Estilos
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '10px',
      color: 'white',
      fontWeight: 'bold',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      background: type === 'success' ? 'rgba(0, 255, 0, 0.8)' : 
                 type === 'error' ? 'rgba(255, 0, 0, 0.8)' : 
                 'rgba(0, 255, 255, 0.8)',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
      backdropFilter: 'blur(10px)'
    });

    document.body.appendChild(notification);

    // Animação de entrada
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  static cleanup() {
    if (this.statsInterval) {
      clearInterval(this.statsInterval);
    }
  }
}

// Gerenciador Principal da Aplicação
class AppManager {
  constructor() {
    this.loadingManager = new LoadingManager();
  }

  init() {
    console.log('🚀 Inicializando NEON HUB...');

    // Inicializar sistema de loading
    this.loadingManager.start();
  }
}

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  globalApp = new App();

  // Esperar um pouco para garantir que todas as instâncias foram criadas
  setTimeout(() => {
    globalLoadingManager = globalApp.loadingManager;

    // Expor funções globais para compatibilidade
    // Funções de login/logout foram removidas
  }, 100);
});

// Adicionar service worker para PWA (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered:', registration))
      .catch(error => console.log('SW registration failed:', error));
  });
}