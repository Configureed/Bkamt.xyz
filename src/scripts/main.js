// TZ Loader - Main JavaScript functionality

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
    
    // Simple authentication (in a real app, this would be server-side)
    if (authenticateUser(username, password)) {
        // Store login state
        localStorage.setItem('tz_loader_logged_in', 'true');
        localStorage.setItem('tz_loader_username', username);
        
        // Show success notification
        showNotification('Login successful! Welcome to TZ Loader.', 'success');
        
        // Hide modal and show main app
        setTimeout(() => {
            hideLoginModal();
        }, 1000);
    } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
}

function authenticateUser(username, password) {
    // Simple authentication logic (replace with real authentication)
    const validCredentials = [
        { username: 'admin', password: 'admin' },
        { username: 'user', password: 'password' },
        { username: 'tz', password: 'tz' },
        { username: 'test', password: 'test' }
    ];
    
    return validCredentials.some(cred => 
        cred.username === username && cred.password === password
    );
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
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#8b5cf6'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${colors[type] || colors.info};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
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
    localStorage.removeItem('tz_loader_logged_in');
    localStorage.removeItem('tz_loader_username');
    showLoginModal();
    showNotification('Logged out successfully', 'info');
}

// Utility functions
function getCurrentUser() {
    return localStorage.getItem('tz_loader_username') || 'Guest';
}

function isLoggedIn() {
    return localStorage.getItem('tz_loader_logged_in') === 'true';
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
    showNotification(`Launching ${appName}...`, 'info');
    
    // Simulate app launch (replace with actual app launch logic)
    setTimeout(() => {
        showNotification(`${appName} launched successfully!`, 'success');
        
        // Here you would add actual app launch logic
        // For example: spawn a new process, open a file, etc.
        console.log(`Launching ${appName} application...`);
        
        // Example: You could use Electron's shell to open external apps
        // const { shell } = require('electron');
        // shell.openExternal(`path/to/${appName.toLowerCase()}.exe`);
    }, 1000);
}

// Make functions globally available
window.launchApp = launchApp;

// Export functions for external use
window.TZLoader = {
    showLoginModal,
    hideLoginModal,
    logout,
    getCurrentUser,
    isLoggedIn,
    showNotification,
    launchApp
};