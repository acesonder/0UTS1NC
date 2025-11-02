// Resources Module
(function() {
    'use strict';

    const sampleResources = [
        {
            id: 1,
            name: 'Hope Haven Shelter',
            type: 'shelter',
            address: '123 Main St, Downtown',
            phone: '555-0101',
            hours: '24/7',
            beds: { available: 15, total: 50 },
            services: ['Beds', 'Meals', 'Showers'],
            notes: 'Family-friendly shelter with case management services'
        },
        {
            id: 2,
            name: 'Community Kitchen',
            type: 'food',
            address: '456 Oak Ave, Central',
            phone: '555-0102',
            hours: 'Mon-Fri: 11am-2pm, 5pm-7pm',
            capacity: 'Available',
            services: ['Hot Meals', 'Food Pantry'],
            notes: 'No ID required. Breakfast on weekends 8am-10am'
        },
        {
            id: 3,
            name: 'Fresh Start Hygiene Center',
            type: 'hygiene',
            address: '789 Pine Rd, Northside',
            phone: '555-0103',
            hours: 'Daily: 9am-5pm',
            services: ['Showers', 'Laundry', 'Toiletries', 'Haircuts'],
            notes: 'Free laundry tokens available. Bring your own toiletries or use provided items'
        },
        {
            id: 4,
            name: 'City Health Clinic',
            type: 'medical',
            address: '321 Elm St, Medical District',
            phone: '555-0104',
            hours: 'Mon-Fri: 8am-6pm, Sat: 9am-1pm',
            services: ['Walk-ins Welcome', 'Primary Care', 'Mental Health', 'Dental'],
            notes: 'Sliding scale fees. No one turned away for inability to pay'
        },
        {
            id: 5,
            name: 'Safe Harbor Emergency Shelter',
            type: 'shelter',
            address: '555 Harbor Blvd, Waterfront',
            phone: '555-0105',
            hours: '24/7 Emergency',
            beds: { available: 8, total: 30 },
            services: ['Emergency Beds', 'Crisis Support', 'Referrals'],
            notes: 'Emergency shelter for immediate needs. Call ahead for bed availability'
        },
        {
            id: 6,
            name: 'Helping Hands Food Bank',
            type: 'food',
            address: '234 Community Way, Southside',
            phone: '555-0106',
            hours: 'Tue, Thu, Sat: 10am-4pm',
            capacity: 'Available',
            services: ['Food Boxes', 'Fresh Produce', 'Diapers'],
            notes: 'Monthly food boxes available. Bring ID and proof of address'
        },
        {
            id: 7,
            name: 'Wellness Mobile Clinic',
            type: 'medical',
            address: 'Various Locations (See Schedule)',
            phone: '555-0107',
            hours: 'See online schedule',
            services: ['Basic Health Screening', 'Vaccinations', 'Prescriptions'],
            notes: 'Mobile clinic visits different neighborhoods. Check schedule for locations'
        },
        {
            id: 8,
            name: 'New Day Transitional Housing',
            type: 'shelter',
            address: '678 Hope Street, Eastside',
            phone: '555-0108',
            hours: 'Office: Mon-Fri 9am-5pm',
            beds: { available: 3, total: 20 },
            services: ['Transitional Housing', 'Job Training', 'Case Management'],
            notes: 'Application and interview required. Up to 6 months stay'
        }
    ];

    // Initialize resources when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        loadResources();
        initializeFilters();
    });

    function loadResources() {
        // Load from localStorage or use sample data
        let resources = window.loadData('resources');
        if (!resources || resources.length === 0) {
            resources = sampleResources;
            window.saveData('resources', resources);
        }
        displayResources(resources);
    }

    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');
                filterResources(filter);
            });
        });
    }

    function filterResources(filter) {
        const resources = window.loadData('resources') || sampleResources;
        if (filter === 'all') {
            displayResources(resources);
        } else {
            const filtered = resources.filter(r => r.type === filter);
            displayResources(filtered);
        }
    }

    function displayResources(resources) {
        const resourcesList = document.getElementById('resources-list');
        if (!resourcesList) return;

        if (resources.length === 0) {
            resourcesList.innerHTML = '<p>No resources found.</p>';
            return;
        }

        resourcesList.innerHTML = resources.map(resource => createResourceCard(resource)).join('');
    }

    function createResourceCard(resource) {
        let availabilityHtml = '';
        if (resource.beds) {
            const availablePercent = (resource.beds.available / resource.beds.total) * 100;
            let availabilityClass = 'available';
            if (availablePercent < 20) {
                availabilityClass = 'limited';
            }
            if (resource.beds.available === 0) {
                availabilityClass = 'unavailable';
            }
            availabilityHtml = `
                <div class="availability ${availabilityClass}">
                    ${resource.beds.available} of ${resource.beds.total} beds available
                </div>
            `;
        } else if (resource.capacity) {
            availabilityHtml = `
                <div class="availability available">
                    ${resource.capacity}
                </div>
            `;
        }

        const typeLabels = {
            shelter: 'Shelter',
            food: 'Food',
            hygiene: 'Hygiene',
            medical: 'Medical'
        };

        return `
            <div class="resource-card" data-id="${resource.id}">
                <span class="resource-badge">${typeLabels[resource.type] || resource.type}</span>
                <h3>${resource.name}</h3>
                <div class="resource-info">
                    <p><strong>Address:</strong> ${resource.address}</p>
                    <p><strong>Phone:</strong> ${resource.phone}</p>
                    <p><strong>Hours:</strong> ${resource.hours}</p>
                    ${resource.services ? `<p><strong>Services:</strong> ${resource.services.join(', ')}</p>` : ''}
                    ${resource.notes ? `<p><em>${resource.notes}</em></p>` : ''}
                </div>
                ${availabilityHtml}
                <button class="btn-primary" onclick="getDirections('${resource.address}')" style="margin-top: 10px; width: 100%;">
                    Get Directions
                </button>
            </div>
        `;
    }

    // Get directions function (will integrate with map module)
    function getDirectionsFromResources(address) {
        // Switch to map view
        const mapLink = document.querySelector('[data-view="map"]');
        if (mapLink) {
            mapLink.click();
        }
        
        // Set the search location
        const searchInput = document.getElementById('search-location');
        if (searchInput) {
            searchInput.value = address;
        }

        // Call the map module's getDirections if available
        if (window.MapModule && window.MapModule.getDirections) {
            window.MapModule.getDirections(address);
        } else {
            alert(`Getting directions to: ${address}\n\nIn a full implementation, this would open navigation to the location.`);
        }
    }
    
    // Expose as global for use in HTML onclick
    window.getDirections = getDirectionsFromResources;

    // Export for use in other modules
    window.ResourcesModule = {
        loadResources,
        filterResources,
        displayResources
    };

})();
