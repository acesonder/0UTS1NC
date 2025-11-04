// UI/UX Enhancements JavaScript
// Handles all interactive modern UI features

(function() {
    'use strict';

    // Initialize all UI enhancements when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initNotificationSystem();
        initSearchBar();
        initFAB();
        initChatBubble();
        initButtonEffects();
        initTooltips();
        initProfileSidebar();
        initSettingsDrawer();
        initTabAnimations();
        initDraggableWidgets();
        initFormValidation();
        initModalSystem();
        initProgressIndicators();
    });

    // ==========================================
    // NOTIFICATION SYSTEM (TOAST)
    // ==========================================
    function initNotificationSystem() {
        // Create notification container if it doesn't exist
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }

        // Expose global function to show notifications
        window.showNotification = function(title, message, type = 'info', duration = 5000) {
            const container = document.querySelector('.notification-container');
            const notification = document.createElement('div');
            notification.className = `toast-notification ${type}`;

            const iconMap = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                warning: 'fa-exclamation-triangle',
                info: 'fa-info-circle'
            };

            notification.innerHTML = `
                <i class="fas ${iconMap[type] || iconMap.info} toast-icon"></i>
                <div class="toast-content">
                    <div class="toast-title">${title}</div>
                    <div class="toast-message">${message}</div>
                </div>
                <button class="toast-close"><i class="fas fa-times"></i></button>
            `;

            container.appendChild(notification);

            // Close button functionality
            notification.querySelector('.toast-close').addEventListener('click', function() {
                removeNotification(notification);
            });

            // Auto remove after duration
            setTimeout(() => {
                removeNotification(notification);
            }, duration);
        };

        function removeNotification(notification) {
            notification.classList.add('removing');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }

        // Test notification on page load (can be removed in production)
        setTimeout(() => {
            window.showNotification('Welcome!', 'All UI enhancements are now active', 'success', 4000);
        }, 1000);
    }

    // ==========================================
    // SEARCH BAR WITH SUGGESTIONS
    // ==========================================
    function initSearchBar() {
        const searchInputs = document.querySelectorAll('.search-bar');
        
        searchInputs.forEach(searchBar => {
            const container = searchBar.parentElement;
            
            // Create suggestions dropdown if it doesn't exist
            if (!container.querySelector('.search-suggestions')) {
                const suggestions = document.createElement('div');
                suggestions.className = 'search-suggestions';
                container.appendChild(suggestions);
            }

            const suggestionsEl = container.querySelector('.search-suggestions');

            searchBar.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase();
                
                if (query.length > 1) {
                    // Mock suggestions - in production, fetch from API
                    const allSuggestions = [
                        'Hope Haven Shelter',
                        'Community Kitchen',
                        'Fresh Start Hygiene Center',
                        'City Health Clinic',
                        'Job Training Programs',
                        'Legal Aid Services',
                        'Mental Health Support',
                        'Food Pantry Locations'
                    ];

                    const filtered = allSuggestions.filter(s => 
                        s.toLowerCase().includes(query)
                    );

                    if (filtered.length > 0) {
                        suggestionsEl.innerHTML = filtered.map(s => 
                            `<div class="suggestion-item">${s}</div>`
                        ).join('');
                        suggestionsEl.classList.add('active');

                        // Add click handlers to suggestions
                        suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
                            item.addEventListener('click', function() {
                                searchBar.value = this.textContent;
                                suggestionsEl.classList.remove('active');
                                // Trigger search or filter
                            });
                        });
                    } else {
                        suggestionsEl.classList.remove('active');
                    }
                } else {
                    suggestionsEl.classList.remove('active');
                }
            });

            // Close suggestions when clicking outside
            document.addEventListener('click', function(e) {
                if (!container.contains(e.target)) {
                    suggestionsEl.classList.remove('active');
                }
            });
        });
    }

    // ==========================================
    // FLOATING ACTION BUTTON (FAB)
    // ==========================================
    function initFAB() {
        // Create FAB if it doesn't exist
        if (!document.querySelector('.fab')) {
            const fab = document.createElement('button');
            fab.className = 'fab';
            fab.setAttribute('aria-label', 'Quick actions');
            fab.innerHTML = '<i class="fas fa-plus"></i>';
            document.body.appendChild(fab);

            // Create FAB menu
            const fabMenu = document.createElement('div');
            fabMenu.className = 'fab-menu';
            fabMenu.innerHTML = `
                <div class="fab-item">
                    <span class="fab-label">New Message</span>
                    <button class="fab-item-button" onclick="openNewMessage()">
                        <i class="fas fa-envelope"></i>
                    </button>
                </div>
                <div class="fab-item">
                    <span class="fab-label">Schedule Appointment</span>
                    <button class="fab-item-button" onclick="openScheduleAppointment()">
                        <i class="fas fa-calendar"></i>
                    </button>
                </div>
                <div class="fab-item">
                    <span class="fab-label">Upload Document</span>
                    <button class="fab-item-button" onclick="openDocumentUpload()">
                        <i class="fas fa-file-upload"></i>
                    </button>
                </div>
                <div class="fab-item">
                    <span class="fab-label">Emergency Contact</span>
                    <button class="fab-item-button" onclick="openEmergencyContact()">
                        <i class="fas fa-phone"></i>
                    </button>
                </div>
            `;
            document.body.appendChild(fabMenu);

            // Toggle menu
            fab.addEventListener('click', function() {
                fabMenu.classList.toggle('active');
                fab.querySelector('i').classList.toggle('fa-plus');
                fab.querySelector('i').classList.toggle('fa-times');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!fab.contains(e.target) && !fabMenu.contains(e.target)) {
                    fabMenu.classList.remove('active');
                    fab.querySelector('i').classList.remove('fa-times');
                    fab.querySelector('i').classList.add('fa-plus');
                }
            });
        }
    }

    // ==========================================
    // CHAT BUBBLE
    // ==========================================
    function initChatBubble() {
        // Create chat bubble if it doesn't exist
        if (!document.querySelector('.chat-bubble')) {
            const chatBubble = document.createElement('div');
            chatBubble.className = 'chat-bubble';
            chatBubble.innerHTML = '<i class="fas fa-comments"></i>';
            document.body.appendChild(chatBubble);

            // Create chat window
            const chatWindow = document.createElement('div');
            chatWindow.className = 'chat-window';
            chatWindow.innerHTML = `
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="user-avatar">
                            <div style="width: 40px; height: 40px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-user-tie" style="color: #25d366;"></i>
                            </div>
                            <span class="presence-indicator"></span>
                        </div>
                        <div>
                            <div style="font-weight: 600;">Case Worker</div>
                            <div style="font-size: 12px;">Online</div>
                        </div>
                    </div>
                    <button class="modal-close" style="position: static; color: white;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chat-messages" id="chat-messages">
                    <div class="chat-message incoming">
                        <div class="chat-message-bubble">
                            Hello! How can I help you today?
                        </div>
                    </div>
                </div>
                <div class="chat-input-container">
                    <input type="text" class="chat-input" placeholder="Type a message..." id="chat-input">
                    <button class="chat-send-btn" id="chat-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            `;
            document.body.appendChild(chatWindow);

            // Toggle chat window
            chatBubble.addEventListener('click', function() {
                chatWindow.classList.toggle('active');
            });

            // Close chat window
            chatWindow.querySelector('.modal-close').addEventListener('click', function() {
                chatWindow.classList.remove('active');
            });

            // Send message functionality
            const sendMessage = function() {
                const input = document.getElementById('chat-input');
                const message = input.value.trim();
                if (message) {
                    const messagesContainer = document.getElementById('chat-messages');
                    const messageEl = document.createElement('div');
                    messageEl.className = 'chat-message outgoing';
                    messageEl.innerHTML = `<div class="chat-message-bubble">${message}</div>`;
                    messagesContainer.appendChild(messageEl);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    input.value = '';

                    // Mock response after delay
                    setTimeout(() => {
                        const responseEl = document.createElement('div');
                        responseEl.className = 'chat-message incoming';
                        responseEl.innerHTML = `<div class="chat-message-bubble">Thank you for your message. A case worker will respond shortly.</div>`;
                        messagesContainer.appendChild(responseEl);
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }, 1000);
                }
            };

            document.getElementById('chat-send').addEventListener('click', sendMessage);
            document.getElementById('chat-input').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    // ==========================================
    // BUTTON RIPPLE EFFECTS
    // ==========================================
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-emergency');
        
        buttons.forEach(button => {
            // Add shimmer class
            button.classList.add('btn-shimmer');

            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // ==========================================
    // TOOLTIPS
    // ==========================================
    function initTooltips() {
        // Add tooltips to elements with data-tooltip attribute
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            if (!element.querySelector('.tooltip-text')) {
                element.classList.add('tooltip');
                const tooltipText = document.createElement('span');
                tooltipText.className = 'tooltip-text';
                tooltipText.textContent = element.getAttribute('data-tooltip');
                element.appendChild(tooltipText);
            }
        });
    }

    // ==========================================
    // PROFILE SIDEBAR
    // ==========================================
    function initProfileSidebar() {
        // Create profile sidebar toggle if it doesn't exist
        const header = document.querySelector('.app-header .header-content');
        if (header && !document.getElementById('profile-sidebar-toggle')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'profile-sidebar-toggle';
            toggleBtn.className = 'btn-secondary';
            toggleBtn.style.cssText = 'position: absolute; left: 20px;';
            toggleBtn.innerHTML = '<i class="fas fa-user-circle"></i>';
            toggleBtn.setAttribute('data-tooltip', 'Profile');
            header.insertBefore(toggleBtn, header.firstChild);

            // Create sidebar if it doesn't exist
            if (!document.querySelector('.profile-sidebar')) {
                const sidebar = document.createElement('div');
                sidebar.className = 'profile-sidebar';
                sidebar.innerHTML = `
                    <div class="profile-widget">
                        <div class="user-avatar">
                            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3498db, #9b59b6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">
                                <i class="fas fa-user"></i>
                            </div>
                            <span class="presence-indicator"></span>
                        </div>
                        <h3>Welcome Back</h3>
                        <p class="user-status">Client Account</p>
                    </div>
                    <ul class="quick-links">
                        <li><a href="#profile"><i class="fas fa-user"></i> My Profile</a></li>
                        <li><a href="#services"><i class="fas fa-concierge-bell"></i> Services</a></li>
                        <li><a href="#communication"><i class="fas fa-comments"></i> Messages</a></li>
                        <li><a href="#map"><i class="fas fa-map-marked-alt"></i> Find Resources</a></li>
                    </ul>
                `;
                document.body.appendChild(sidebar);
            }

            const sidebar = document.querySelector('.profile-sidebar');
            toggleBtn.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });

            // Close sidebar when clicking outside
            document.addEventListener('click', function(e) {
                if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    }

    // ==========================================
    // SETTINGS DRAWER
    // ==========================================
    function initSettingsDrawer() {
        // Use existing theme panel or create settings drawer
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const themePanel = document.getElementById('theme-panel');
        
        if (themePanel) {
            // Enhance existing theme panel with drawer functionality
            themePanel.classList.add('settings-drawer');
            
            // Add backdrop
            const backdrop = document.createElement('div');
            backdrop.className = 'drawer-backdrop';
            backdrop.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 9997;
                display: none;
            `;
            document.body.appendChild(backdrop);

            themeToggleBtn.addEventListener('click', function() {
                themePanel.classList.toggle('active');
                backdrop.style.display = themePanel.classList.contains('active') ? 'block' : 'none';
            });

            backdrop.addEventListener('click', function() {
                themePanel.classList.remove('active');
                backdrop.style.display = 'none';
            });
        }
    }

    // ==========================================
    // TAB ANIMATIONS
    // ==========================================
    function initTabAnimations() {
        const tabContainers = document.querySelectorAll('.admin-tabs, .communication-tabs');
        
        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('.tab-btn');
            
            // Create tab indicator if it doesn't exist
            if (!container.querySelector('.tab-indicator') && tabs.length > 0) {
                const indicator = document.createElement('div');
                indicator.className = 'tab-indicator';
                container.appendChild(indicator);
                
                // Position indicator under active tab
                const activeTab = container.querySelector('.tab-btn.active');
                if (activeTab) {
                    updateIndicator(indicator, activeTab);
                }
                
                tabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                        updateIndicator(indicator, this);
                    });
                });
            }
        });

        function updateIndicator(indicator, tab) {
            indicator.style.width = tab.offsetWidth + 'px';
            indicator.style.left = tab.offsetLeft + 'px';
        }
    }

    // ==========================================
    // DRAGGABLE WIDGETS
    // ==========================================
    function initDraggableWidgets() {
        const widgets = document.querySelectorAll('.widget');
        let draggedWidget = null;

        widgets.forEach(widget => {
            widget.setAttribute('draggable', 'true');

            widget.addEventListener('dragstart', function(e) {
                draggedWidget = this;
                this.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });

            widget.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });

            widget.addEventListener('dragover', function(e) {
                e.preventDefault();
                const afterElement = getDragAfterElement(this.parentElement, e.clientY);
                if (afterElement == null) {
                    this.parentElement.appendChild(draggedWidget);
                } else {
                    this.parentElement.insertBefore(draggedWidget, afterElement);
                }
            });
        });

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.widget:not(.dragging)')];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }
    }

    // ==========================================
    // FORM VALIDATION
    // ==========================================
    function initFormValidation() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateInput(this);
                });

                input.addEventListener('input', function() {
                    if (this.parentElement.classList.contains('error')) {
                        validateInput(this);
                    }
                });
            });

            form.addEventListener('submit', function(e) {
                let isValid = true;
                inputs.forEach(input => {
                    if (!validateInput(input)) {
                        isValid = false;
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    window.showNotification('Validation Error', 'Please fill in all required fields correctly', 'error');
                }
            });
        });

        function validateInput(input) {
            const formGroup = input.parentElement;
            const value = input.value.trim();

            formGroup.classList.remove('error', 'success');

            if (!value) {
                formGroup.classList.add('error');
                setValidationMessage(formGroup, 'This field is required');
                return false;
            }

            // Email validation
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    formGroup.classList.add('error');
                    setValidationMessage(formGroup, 'Please enter a valid email');
                    return false;
                }
            }

            formGroup.classList.add('success');
            setValidationMessage(formGroup, '');
            return true;
        }

        function setValidationMessage(formGroup, message) {
            let msgEl = formGroup.querySelector('.validation-message');
            if (!msgEl) {
                msgEl = document.createElement('div');
                msgEl.className = 'validation-message';
                formGroup.appendChild(msgEl);
            }
            msgEl.textContent = message;
        }
    }

    // ==========================================
    // MODAL SYSTEM
    // ==========================================
    function initModalSystem() {
        // Expose global function to open modals
        window.openModal = function(content, options = {}) {
            const modal = document.createElement('div');
            modal.className = 'modal active';
            
            const modalContent = document.createElement('div');
            modalContent.className = options.flipAnimation ? 'modal-content flip-enter' : 'modal-content';
            
            modalContent.innerHTML = `
                <button class="modal-close"><i class="fas fa-times"></i></button>
                <div class="modal-body">${content}</div>
            `;
            
            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // Close modal
            const closeModal = function() {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            };

            modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });

            return modal;
        };
    }

    // ==========================================
    // PROGRESS INDICATORS
    // ==========================================
    function initProgressIndicators() {
        // Expose global function to show loading
        window.showLoading = function(message = 'Loading...') {
            const loader = document.createElement('div');
            loader.className = 'modal active';
            loader.id = 'global-loader';
            loader.innerHTML = `
                <div style="text-align: center; color: white;">
                    <div class="spinner-3d"></div>
                    <p style="margin-top: 20px;">${message}</p>
                </div>
            `;
            document.body.appendChild(loader);
        };

        window.hideLoading = function() {
            const loader = document.getElementById('global-loader');
            if (loader) {
                loader.classList.remove('active');
                setTimeout(() => loader.remove(), 300);
            }
        };

        // Update existing progress bars
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const fill = bar.querySelector('.progress-fill');
            if (fill && !fill.querySelector('::after')) {
                // Shimmer effect is handled by CSS
            }
        });
    }

    // ==========================================
    // HELPER FUNCTIONS FOR BUTTONS
    // ==========================================
    
    // These are placeholder functions that can be customized
    window.openNewMessage = function() {
        window.showNotification('New Message', 'Opening message composer...', 'info');
        // Navigate to communication view
        const commLink = document.querySelector('[data-view="communication"]');
        if (commLink) commLink.click();
    };

    window.openScheduleAppointment = function() {
        window.showNotification('Schedule', 'Opening appointment scheduler...', 'info');
        const content = `
            <h2>Schedule Appointment</h2>
            <form class="form-wizard">
                <div class="form-group">
                    <input type="text" class="floating-label-input" placeholder=" " required>
                    <label class="floating-label">Full Name</label>
                </div>
                <div class="form-group">
                    <input type="date" class="floating-label-input" required>
                    <label class="floating-label">Preferred Date</label>
                </div>
                <div class="form-group">
                    <input type="time" class="floating-label-input" required>
                    <label class="floating-label">Preferred Time</label>
                </div>
                <button type="submit" class="btn-primary" style="width: 100%;">Schedule Appointment</button>
            </form>
        `;
        window.openModal(content);
    };

    window.openDocumentUpload = function() {
        window.showNotification('Upload', 'Opening document uploader...', 'info');
        const profileLink = document.querySelector('[data-view="profile"]');
        if (profileLink) profileLink.click();
    };

    window.openEmergencyContact = function() {
        window.showNotification('Emergency', 'Opening emergency contacts...', 'warning');
        const commLink = document.querySelector('[data-view="communication"]');
        if (commLink) {
            commLink.click();
            setTimeout(() => {
                const emergencyTab = document.querySelector('[data-tab="emergency"]');
                if (emergencyTab) emergencyTab.click();
            }, 100);
        }
    };

    // Parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.05;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            el.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // ==========================================
    // IMAGE GALLERY WITH MODAL VIEWER
    // ==========================================
    function initImageGallery() {
        window.openImageGallery = function(images, startIndex = 0) {
            let currentIndex = startIndex;
            
            const modal = document.createElement('div');
            modal.className = 'image-modal active';
            modal.innerHTML = `
                <button class="image-nav prev"><i class="fas fa-chevron-left"></i></button>
                <img src="${images[currentIndex]}" alt="Gallery Image">
                <button class="image-nav next"><i class="fas fa-chevron-right"></i></button>
                <div class="image-modal-controls">
                    <button class="image-modal-btn" id="download-image"><i class="fas fa-download"></i></button>
                    <button class="image-modal-btn" id="close-gallery"><i class="fas fa-times"></i></button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            const img = modal.querySelector('img');
            const prevBtn = modal.querySelector('.prev');
            const nextBtn = modal.querySelector('.next');
            
            function updateImage() {
                img.style.animation = 'none';
                setTimeout(() => {
                    img.src = images[currentIndex];
                    img.style.animation = 'zoomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }, 10);
            }
            
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateImage();
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateImage();
            });
            
            modal.querySelector('#close-gallery').addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            });
            
            modal.querySelector('#download-image').addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = images[currentIndex];
                link.download = 'image.jpg';
                link.click();
            });
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => modal.remove(), 300);
                }
            });
            
            // Keyboard navigation
            const keyHandler = (e) => {
                if (e.key === 'ArrowLeft') prevBtn.click();
                if (e.key === 'ArrowRight') nextBtn.click();
                if (e.key === 'Escape') modal.querySelector('#close-gallery').click();
            };
            document.addEventListener('keydown', keyHandler);
            
            modal.addEventListener('remove', () => {
                document.removeEventListener('keydown', keyHandler);
            });
        };
        
        // Auto-initialize galleries
        document.querySelectorAll('.image-gallery').forEach(gallery => {
            const items = gallery.querySelectorAll('.gallery-item');
            const images = Array.from(items).map(item => item.querySelector('img').src);
            
            items.forEach((item, index) => {
                item.addEventListener('click', () => {
                    window.openImageGallery(images, index);
                });
            });
        });
    }

    // ==========================================
    // DYNAMIC CHARTS RENDERER
    // ==========================================
    function initCharts() {
        window.createBarChart = function(container, data) {
            const chartHTML = data.map(item => `
                <div class="chart-bar">
                    <div class="chart-label">${item.label}</div>
                    <div class="chart-bar-fill" style="width: ${item.value}%"></div>
                    <div class="chart-value">${item.value}%</div>
                </div>
            `).join('');
            
            if (typeof container === 'string') {
                container = document.querySelector(container);
            }
            
            if (container) {
                container.innerHTML = chartHTML;
            }
        };
        
        window.createDonutChart = function(container, data) {
            const total = data.reduce((sum, item) => sum + item.value, 0);
            let currentPercent = 0;
            
            const gradientStops = data.map(item => {
                const percent = (item.value / total) * 100;
                const start = currentPercent;
                const end = currentPercent + percent;
                currentPercent = end;
                return `${item.color} ${start}% ${end}%`;
            }).join(', ');
            
            const legendHTML = data.map(item => `
                <div class="legend-item">
                    <div class="legend-color" style="background: ${item.color}"></div>
                    <span>${item.label}: ${item.value}</span>
                </div>
            `).join('');
            
            if (typeof container === 'string') {
                container = document.querySelector(container);
            }
            
            if (container) {
                container.innerHTML = `
                    <div class="donut-chart" style="background: conic-gradient(${gradientStops})"></div>
                    <div class="chart-legend">${legendHTML}</div>
                `;
            }
        };
    }

    // ==========================================
    // ANIMATED LIST UTILITIES
    // ==========================================
    function initAnimatedLists() {
        window.animateListAdd = function(list, item) {
            if (typeof list === 'string') {
                list = document.querySelector(list);
            }
            list.appendChild(item);
            item.classList.add('list-item');
        };
        
        window.animateListRemove = function(item) {
            item.classList.add('removing');
            setTimeout(() => item.remove(), 300);
        };
        
        window.animateListSort = function(list) {
            if (typeof list === 'string') {
                list = document.querySelector(list);
            }
            const items = Array.from(list.children);
            items.forEach(item => item.classList.add('sorting'));
            setTimeout(() => {
                items.forEach(item => item.classList.remove('sorting'));
            }, 500);
        };
    }

    // Initialize new features
    initImageGallery();
    initCharts();
    initAnimatedLists();

})();
