// Map Module
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initMapControls();
        loadNearbyServices();
    });

    function initMapControls() {
        const getDirectionsBtn = document.getElementById('get-directions');
        const useLocationBtn = document.getElementById('use-location');
        const searchInput = document.getElementById('search-location');

        if (getDirectionsBtn) {
            getDirectionsBtn.addEventListener('click', function() {
                const location = searchInput.value.trim();
                if (location) {
                    getDirections(location);
                } else {
                    alert('Please enter a location to get directions.');
                }
            });
        }

        if (useLocationBtn) {
            useLocationBtn.addEventListener('click', function() {
                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            const { latitude, longitude } = position.coords;
                            alert(`Your location: ${latitude}, ${longitude}\n\nIn a full implementation, this would center the map on your location and show nearby services.`);
                            loadNearbyServices(latitude, longitude);
                        },
                        error => {
                            alert('Unable to get your location. Please check location permissions.');
                            console.error('Geolocation error:', error);
                        }
                    );
                } else {
                    alert('Geolocation is not supported by your browser.');
                }
            });
        }
    }

    function getDirections(location) {
        alert(`Getting directions to: ${location}\n\nIn a full implementation, this would:\n- Show route on map\n- Provide turn-by-turn directions\n- Estimate travel time\n- Offer multiple transportation options`);
        
        // Update map placeholder
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            const placeholder = mapContainer.querySelector('.map-placeholder');
            if (placeholder) {
                placeholder.innerHTML = `
                    <p>Directions to: <strong>${location}</strong></p>
                    <p>This would display an interactive map with your route.</p>
                    <p>Offline maps are available for areas you've previously visited.</p>
                `;
            }
        }
    }

    function loadNearbyServices(lat, lng) {
        const nearbyContainer = document.getElementById('nearby-services');
        if (!nearbyContainer) return;

        // In a full implementation, this would query nearby services based on location
        // For now, we'll use the resources from the resources module
        const resources = window.loadData('resources') || [];
        
        if (resources.length === 0) {
            nearbyContainer.innerHTML = '<h3>Nearby Services</h3><p>No services found nearby.</p>';
            return;
        }

        // Simulate sorting by distance (in reality, would calculate actual distance)
        const sortedResources = [...resources].sort(() => Math.random() - 0.5).slice(0, 5);

        nearbyContainer.innerHTML = `
            <h3>Nearby Services</h3>
            <div style="display: grid; gap: 15px; margin-top: 15px;">
                ${sortedResources.map((resource, index) => `
                    <div class="resource-card" style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin: 0 0 5px 0;">${resource.name}</h4>
                            <p style="margin: 0; font-size: 14px;">${resource.address}</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; color: var(--secondary-color);">
                                ~${(Math.random() * 2 + 0.1).toFixed(1)} miles away
                            </p>
                        </div>
                        <button class="btn-primary" onclick="getDirections('${resource.address}')">
                            Go
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Make getDirections available globally
    window.getDirections = getDirections;

    // Export for use in other modules
    window.MapModule = {
        getDirections,
        loadNearbyServices
    };

})();
