// Theme Customization Module
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initThemeToggle();
        initColorPicker();
        initAccessibilityToggles();
        loadSavedTheme();
        initAccessibilityButton();
    });

    function initThemeToggle() {
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const themePanel = document.getElementById('theme-panel');
        const themeModeInputs = document.querySelectorAll('input[name="theme-mode"]');

        if (themeToggleBtn && themePanel) {
            themeToggleBtn.addEventListener('click', function() {
                themePanel.classList.toggle('open');
            });

            // Close panel when clicking outside
            document.addEventListener('click', function(e) {
                if (!themePanel.contains(e.target) && !themeToggleBtn.contains(e.target)) {
                    themePanel.classList.remove('open');
                }
            });
        }

        themeModeInputs.forEach(input => {
            input.addEventListener('change', function() {
                if (this.value === 'dark') {
                    document.body.classList.add('dark-mode');
                    saveThemeSetting('mode', 'dark');
                } else {
                    document.body.classList.remove('dark-mode');
                    saveThemeSetting('mode', 'light');
                }
            });
        });
    }

    function initColorPicker() {
        const colorOptions = document.querySelectorAll('.color-option');
        
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all
                colorOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Get the color
                const color = this.getAttribute('data-color');
                
                // Remove all accent color classes
                document.body.className = document.body.className.replace(/accent-\w+/g, '');
                
                // Add new accent color class
                if (document.body.classList.contains('dark-mode')) {
                    document.body.className = 'dark-mode accent-' + color;
                } else {
                    document.body.className = 'accent-' + color;
                }
                
                // Preserve other settings
                const settings = loadThemeSettings();
                if (settings.highContrast) document.body.classList.add('high-contrast');
                if (settings.largeText) document.body.classList.add('large-text');
                
                saveThemeSetting('accentColor', color);
            });
        });
    }

    function initAccessibilityToggles() {
        const highContrastToggle = document.getElementById('high-contrast-toggle');
        const largeTextToggle = document.getElementById('large-text-toggle');
        const reduceMotionToggle = document.getElementById('reduce-motion-toggle');
        const resetThemeBtn = document.getElementById('reset-theme');

        if (highContrastToggle) {
            highContrastToggle.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('high-contrast');
                    saveThemeSetting('highContrast', true);
                } else {
                    document.body.classList.remove('high-contrast');
                    saveThemeSetting('highContrast', false);
                }
            });
        }

        if (largeTextToggle) {
            largeTextToggle.addEventListener('change', function() {
                if (this.checked) {
                    document.body.classList.add('large-text');
                    saveThemeSetting('largeText', true);
                } else {
                    document.body.classList.remove('large-text');
                    saveThemeSetting('largeText', false);
                }
            });
        }

        if (reduceMotionToggle) {
            reduceMotionToggle.addEventListener('change', function() {
                if (this.checked) {
                    document.documentElement.style.setProperty('--animation-duration', '0s');
                    saveThemeSetting('reduceMotion', true);
                } else {
                    document.documentElement.style.setProperty('--animation-duration', '0.3s');
                    saveThemeSetting('reduceMotion', false);
                }
            });
        }

        if (resetThemeBtn) {
            resetThemeBtn.addEventListener('click', function() {
                // Reset to defaults
                localStorage.removeItem('themeSettings');
                
                // Reset body classes
                document.body.className = '';
                document.body.classList.add('accent-blue');
                
                // Reset form inputs
                document.querySelector('input[name="theme-mode"][value="light"]').checked = true;
                if (highContrastToggle) highContrastToggle.checked = false;
                if (largeTextToggle) largeTextToggle.checked = false;
                if (reduceMotionToggle) reduceMotionToggle.checked = false;
                
                // Reset color picker
                document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
                document.querySelector('.color-option[data-color="blue"]').classList.add('active');
                
                // Reset animations
                document.documentElement.style.setProperty('--animation-duration', '0.3s');
                
                alert('Theme reset to default settings');
            });
        }
    }

    function initAccessibilityButton() {
        const accessibilityBtn = document.getElementById('accessibility-btn');
        
        if (accessibilityBtn) {
            accessibilityBtn.addEventListener('click', function() {
                const themePanel = document.getElementById('theme-panel');
                if (themePanel) {
                    themePanel.classList.add('open');
                }
            });
        }
    }

    function saveThemeSetting(key, value) {
        const settings = loadThemeSettings();
        settings[key] = value;
        localStorage.setItem('themeSettings', JSON.stringify(settings));
    }

    function loadThemeSettings() {
        const saved = localStorage.getItem('themeSettings');
        return saved ? JSON.parse(saved) : {};
    }

    function loadSavedTheme() {
        const settings = loadThemeSettings();
        
        // Apply saved mode
        if (settings.mode === 'dark') {
            document.body.classList.add('dark-mode');
            const darkInput = document.querySelector('input[name="theme-mode"][value="dark"]');
            if (darkInput) darkInput.checked = true;
        }
        
        // Apply saved accent color
        if (settings.accentColor) {
            document.body.classList.add('accent-' + settings.accentColor);
            const colorOption = document.querySelector(`.color-option[data-color="${settings.accentColor}"]`);
            if (colorOption) {
                document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
                colorOption.classList.add('active');
            }
        } else {
            // Default to blue
            document.body.classList.add('accent-blue');
        }
        
        // Apply saved accessibility settings
        const highContrastToggle = document.getElementById('high-contrast-toggle');
        if (settings.highContrast && highContrastToggle) {
            document.body.classList.add('high-contrast');
            highContrastToggle.checked = true;
        }
        
        const largeTextToggle = document.getElementById('large-text-toggle');
        if (settings.largeText && largeTextToggle) {
            document.body.classList.add('large-text');
            largeTextToggle.checked = true;
        }
        
        const reduceMotionToggle = document.getElementById('reduce-motion-toggle');
        if (settings.reduceMotion && reduceMotionToggle) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
            reduceMotionToggle.checked = true;
        }
    }

    // Export for use in other modules
    window.ThemeModule = {
        saveThemeSetting,
        loadThemeSettings
    };

})();
