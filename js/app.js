// Main App JavaScript
(function() {
    'use strict';

    // Initialize app when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initOfflineDetection();
        initServiceWorker();
        checkUserRole();
    });

    // Navigation
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const views = document.querySelectorAll('.view');
        const menuToggle = document.getElementById('menu-toggle');
        const mainNav = document.getElementById('main-nav');

        // Handle navigation clicks
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetView = this.getAttribute('data-view');

                // Remove active class from all links and views
                navLinks.forEach(l => l.classList.remove('active'));
                views.forEach(v => v.classList.remove('active'));

                // Add active class to clicked link and corresponding view
                this.classList.add('active');
                document.getElementById(targetView + '-view').classList.add('active');

                // Close mobile menu
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                }

                // Update URL hash without scrolling
                history.pushState(null, null, '#' + targetView);
            });
        });

        // Mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
            });
        }

        // Handle browser back/forward
        window.addEventListener('popstate', function() {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const link = document.querySelector(`[data-view="${hash}"]`);
                if (link) {
                    link.click();
                }
            }
        });

        // Load initial view from URL hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            const initialLink = document.querySelector(`[data-view="${initialHash}"]`);
            if (initialLink) {
                initialLink.click();
            }
        }
    }

    // Offline Detection
    function initOfflineDetection() {
        const offlineIndicator = document.getElementById('offline-indicator');

        function updateOnlineStatus() {
            if (navigator.onLine) {
                offlineIndicator.style.display = 'none';
            } else {
                offlineIndicator.style.display = 'block';
            }
        }

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // Initial check
        updateOnlineStatus();
    }

    // Service Worker for offline capability
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    // Check user role and show/hide appropriate sections
    function checkUserRole() {
        // This would normally check authentication and role from backend
        // For now, we'll use localStorage as a demo
        const userRole = localStorage.getItem('userRole') || 'client';
        
        const staffElements = document.querySelectorAll('.staff-only');
        const adminElements = document.querySelectorAll('.admin-only');

        if (userRole === 'client') {
            staffElements.forEach(el => el.style.display = 'none');
            adminElements.forEach(el => el.style.display = 'none');
        } else if (userRole === 'staff') {
            adminElements.forEach(el => el.style.display = 'none');
        }
    }

    // Tab switching helper function
    window.switchTab = function(tabGroup, tabName) {
        const tabButtons = document.querySelectorAll(`.${tabGroup} .tab-btn`);
        const tabContents = document.querySelectorAll(`.tab-content`);

        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === tabName + '-tab') {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    };

    // Initialize tabs
    document.addEventListener('DOMContentLoaded', function() {
        const allTabButtons = document.querySelectorAll('.tab-btn');
        allTabButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabGroup = this.closest('.communication-tabs, .admin-tabs');
                const tabName = this.getAttribute('data-tab');
                
                // Get all tab buttons in this group
                const groupButtons = tabGroup.querySelectorAll('.tab-btn');
                groupButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Get parent section
                const parentSection = tabGroup.closest('section');
                const tabContents = parentSection.querySelectorAll('.tab-content');
                
                tabContents.forEach(content => {
                    if (content.id === tabName + '-tab') {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    });

    // Utility: Save data to localStorage
    window.saveData = function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Failed to save data:', e);
            return false;
        }
    };

    // Utility: Load data from localStorage
    window.loadData = function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Failed to load data:', e);
            return null;
        }
    };

    // Utility: Format date
    window.formatDate = function(date) {
        const d = new Date(date);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    };

})();
