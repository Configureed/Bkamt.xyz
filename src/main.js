// AVP Loader - Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Show login modal on startup
    showLoginModal();
    
    // Initialize login form
    initializeLoginForm();
    
    // Initialize navigation
    initializeNavigation();
}

// Login Modal Functions
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    const mainApp = document.getElementById('mainApp');
    
    if (modal && mainApp) {
        modal.style.display = 'flex';
        mainApp.style.display = 'none';
    }
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    const mainApp = document.getElementById('mainApp');
    
    if (modal && mainApp) {
        modal.style.display = 'none';
        mainApp.style.display = 'flex';
    }
}

// Login Form Functionality
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Authenticate with root/rootkit
    if (authenticateUser(username, password)) {
        // Store login state
        localStorage.setItem('avp_loader_logged_in', 'true');
        localStorage.setItem('avp_loader_username', username);
        
        // Show success notification
        showNotification('Login successful! Welcome to AVP Loader.', 'success');
        
        // Hide modal and show main app
        setTimeout(() => {
            hideLoginModal();
        }, 1000);
    } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
}

function authenticateUser(username, password) {
    // Simple authentication with root/rootkit
    return username === 'root' && password === 'rootkit';
}

// Check if user is already logged in (disabled - always show login)
function checkLoginStatus() {
    // Auto-login disabled - always show login modal
    showLoginModal();
}

// Navigation functionality
function initializeNavigation() {
    const navIcons = document.querySelectorAll('.nav-icon');
    
    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove active class from all icons
            navIcons.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked icon
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Handle navigation based on icon
            handleNavigation(this);
        });
    });
}

function handleNavigation(icon) {
    // Hide all tab content
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    // Hide load info tab when navigating away
    const loadInfoTab = document.getElementById('load-info-tab');
    if (loadInfoTab) {
        loadInfoTab.classList.remove('active');
    }
    
    // Show the selected tab based on icon class or data attribute
    let targetTab = '';
    
    // Check if it's the settings icon (cog icon)
    if (icon.querySelector('.fas.fa-cog')) {
        targetTab = 'settings-tab';
    } else {
        // For other icons, use the parent container to determine position
        const navIcons = document.querySelectorAll('.nav-icons .nav-icon');
        const iconIndex = Array.from(navIcons).indexOf(icon);
        
        switch(iconIndex) {
            case 0: // First icon (Apps)
                targetTab = 'apps-tab';
                break;
            case 1: // Second icon (Profile)
                targetTab = 'profile-tab';
                break;
            default:
                console.log('Unknown navigation item');
                return;
        }
    }
    
    // Show the selected tab
    const selectedTab = document.getElementById(targetTab);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

// Create Load Info Tab
function createLoadInfoTab(appName) {
    // Check if tab already exists
    let loadInfoTab = document.getElementById('load-info-tab');
    
    if (!loadInfoTab) {
        // Create load info tab
        loadInfoTab = document.createElement('div');
        loadInfoTab.id = 'load-info-tab';
        loadInfoTab.className = 'tab-content';
        
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.appendChild(loadInfoTab);
        }
    }
    
    // Update content
    loadInfoTab.innerHTML = `
        <div class="load-info-container">
            <div class="load-info-header">
                <i class="fas fa-rocket"></i>
                <h2>Loading Information</h2>
            </div>
            <div class="load-info-content">
                <div class="load-info-item">
                    <i class="fas fa-cube"></i>
                    <span class="load-info-label">Application:</span>
                    <span class="load-info-value">${appName}</span>
                </div>
                <div class="load-info-item">
                    <i class="fas fa-clock"></i>
                    <span class="load-info-label">Load Time:</span>
                    <span class="load-info-value" id="load-time">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="load-info-item">
                    <i class="fas fa-check-circle"></i>
                    <span class="load-info-label">Status:</span>
                    <span class="load-info-value status-success">Successfully Loaded</span>
                </div>
                <div class="load-info-item">
                    <i class="fas fa-code-branch"></i>
                    <span class="load-info-label">Version:</span>
                    <span class="load-info-value">v2.1.4</span>
                </div>
            </div>
            <div class="load-info-footer">
                <button class="load-info-close" onclick="closeLoadInfo()">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        </div>
    `;
    
    return loadInfoTab;
}

// Close Load Info Tab
function closeLoadInfo() {
    const loadInfoTab = document.getElementById('load-info-tab');
    const appsTab = document.getElementById('apps-tab');
    
    if (loadInfoTab) {
        loadInfoTab.classList.remove('active');
    }
    
    if (appsTab) {
        appsTab.classList.add('active');
    }
    
    // Update navigation
    const navIcons = document.querySelectorAll('.nav-icons .nav-icon');
    navIcons.forEach((icon, index) => {
        if (index === 0) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    const colors = {
        success: '#8b5cf6',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${colors[type] || colors.info};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        z-index: 1001;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        border-left: 4px solid #ffffff;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Logout functionality
function logout() {
    localStorage.removeItem('avp_loader_logged_in');
    localStorage.removeItem('avp_loader_username');
    showLoginModal();
    showNotification('Logged out successfully', 'info');
}

// Utility functions
function getCurrentUser() {
    return localStorage.getItem('avp_loader_username') || 'Guest';
}

function isLoggedIn() {
    return localStorage.getItem('avp_loader_logged_in') === 'true';
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const modal = document.getElementById('loginModal');
        if (modal && modal.style.display === 'flex') {
            // Don't allow closing login modal with escape
            return;
        }
    }
    
    // Ctrl+L to logout (when logged in)
    if (e.ctrlKey && e.key === 'l' && isLoggedIn()) {
        e.preventDefault();
        logout();
    }
});

// Auto-check login status on page load (disabled)
window.addEventListener('load', function() {
    // Always show login modal - no auto-login
    showLoginModal();
});

// App Launch Functionality
function launchApp(appName) {
    // Hide all tabs
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    // Create and show load info tab
    const loadInfoTab = createLoadInfoTab(appName);
    loadInfoTab.classList.add('active');
    
    // Update navigation to show no active icon
    const navIcons = document.querySelectorAll('.nav-icon');
    navIcons.forEach(icon => icon.classList.remove('active'));
    
    console.log(`Loading ${appName} application...`);
}

// Make functions globally available
window.launchApp = launchApp;
window.closeLoadInfo = closeLoadInfo;

// Export functions for external use
window.AVPLoader = {
    showLoginModal,
    hideLoginModal,
    logout,
    getCurrentUser,
    isLoggedIn,
    showNotification,
    launchApp,
    closeLoadInfo
};