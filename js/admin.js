// Admin Module
(function() {
    'use strict';

    const sampleVolunteers = [
        {
            id: 1,
            name: 'Alice Thompson',
            role: 'Meal Service',
            schedule: 'Mon, Wed, Fri: 11am-2pm',
            contact: 'alice.t@email.com',
            hoursThisMonth: 36
        },
        {
            id: 2,
            name: 'Bob Martinez',
            role: 'Intake Coordinator',
            schedule: 'Tue, Thu: 9am-5pm',
            contact: 'bob.m@email.com',
            hoursThisMonth: 64
        },
        {
            id: 3,
            name: 'Carol Chen',
            role: 'Case Management Support',
            schedule: 'Weekends: 10am-4pm',
            contact: 'carol.c@email.com',
            hoursThisMonth: 48
        }
    ];

    const sampleDonations = [
        {
            id: 1,
            donor: 'Community Foundation',
            type: 'Monetary',
            amount: '$5,000',
            date: new Date(Date.now() - 86400000 * 2),
            purpose: 'General Operations'
        },
        {
            id: 2,
            donor: 'Local Business Group',
            type: 'In-Kind',
            amount: '200 blankets',
            date: new Date(Date.now() - 86400000 * 5),
            purpose: 'Winter Shelter Supplies'
        },
        {
            id: 3,
            donor: 'Anonymous',
            type: 'Monetary',
            amount: '$1,000',
            date: new Date(Date.now() - 86400000 * 7),
            purpose: 'Food Program'
        }
    ];

    const sampleReports = [
        {
            id: 1,
            name: 'Monthly Service Report',
            type: 'Service Statistics',
            period: 'October 2025',
            generated: new Date(Date.now() - 86400000 * 3)
        },
        {
            id: 2,
            name: 'Quarterly Financial Report',
            type: 'Financial',
            period: 'Q3 2025',
            generated: new Date(Date.now() - 86400000 * 10)
        },
        {
            id: 3,
            name: 'Annual Impact Report',
            type: 'Impact Assessment',
            period: '2024',
            generated: new Date(Date.now() - 86400000 * 30)
        }
    ];

    document.addEventListener('DOMContentLoaded', function() {
        loadVolunteers();
        loadDonations();
        loadReports();
        loadResourceManagement();
        initAdminButtons();
    });

    function loadVolunteers() {
        let volunteers = window.loadData('volunteers');
        if (!volunteers || volunteers.length === 0) {
            volunteers = sampleVolunteers;
            window.saveData('volunteers', volunteers);
        }
        displayVolunteers(volunteers);
    }

    function displayVolunteers(volunteers) {
        const volunteerContainer = document.getElementById('volunteer-schedule');
        if (!volunteerContainer) return;

        if (volunteers.length === 0) {
            volunteerContainer.innerHTML = '<p>No volunteers registered.</p>';
            return;
        }

        volunteerContainer.innerHTML = `
            <div style="display: grid; gap: 15px; margin-bottom: 15px;">
                ${volunteers.map(vol => `
                    <div style="border: 1px solid var(--border-color); border-radius: 5px; padding: 15px;">
                        <h4 style="margin: 0 0 10px 0;">${vol.name}</h4>
                        <p><strong>Role:</strong> ${vol.role}</p>
                        <p><strong>Schedule:</strong> ${vol.schedule}</p>
                        <p><strong>Contact:</strong> ${vol.contact}</p>
                        <p><strong>Hours This Month:</strong> ${vol.hoursThisMonth}</p>
                        <div style="margin-top: 10px;">
                            <button class="btn-secondary" onclick="editVolunteer(${vol.id})">Edit</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    window.editVolunteer = function(id) {
        alert('In a full implementation, this would open a form to edit volunteer information.');
    };

    function loadDonations() {
        let donations = window.loadData('donations');
        if (!donations || donations.length === 0) {
            donations = sampleDonations;
            window.saveData('donations', donations);
        }
        displayDonations(donations);
    }

    function displayDonations(donations) {
        const donationsContainer = document.getElementById('donations-list');
        if (!donationsContainer) return;

        if (donations.length === 0) {
            donationsContainer.innerHTML = '<p>No donations recorded.</p>';
            return;
        }

        donationsContainer.innerHTML = `
            <div style="display: grid; gap: 15px; margin-bottom: 15px;">
                ${donations.map(donation => `
                    <div style="background: var(--background-color); padding: 15px; border-radius: 5px; border-left: 4px solid var(--success-color);">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <p><strong>${donation.donor}</strong></p>
                                <p>${donation.type}: ${donation.amount}</p>
                                <p style="font-size: 14px;">${window.formatDate(donation.date)}</p>
                            </div>
                            <span style="background: var(--success-color); color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                                ${donation.type}
                            </span>
                        </div>
                        <p style="margin-top: 10px;"><em>Purpose: ${donation.purpose}</em></p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function loadReports() {
        let reports = window.loadData('reports');
        if (!reports || reports.length === 0) {
            reports = sampleReports;
            window.saveData('reports', reports);
        }
        displayReports(reports);
    }

    function displayReports(reports) {
        const reportsContainer = document.getElementById('reports');
        if (!reportsContainer) return;

        if (reports.length === 0) {
            reportsContainer.innerHTML = '<p>No reports available.</p>';
            return;
        }

        reportsContainer.innerHTML = `
            <div style="display: grid; gap: 15px; margin-bottom: 15px;">
                ${reports.map(report => `
                    <div style="border: 1px solid var(--border-color); border-radius: 5px; padding: 15px;">
                        <h4 style="margin: 0 0 10px 0;">${report.name}</h4>
                        <p><strong>Type:</strong> ${report.type}</p>
                        <p><strong>Period:</strong> ${report.period}</p>
                        <p><strong>Generated:</strong> ${window.formatDate(report.generated)}</p>
                        <div style="margin-top: 10px; display: flex; gap: 10px;">
                            <button class="btn-primary" onclick="viewReport(${report.id})">View</button>
                            <button class="btn-secondary" onclick="downloadReport(${report.id})">Download</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    window.viewReport = function(id) {
        alert('In a full implementation, this would display the report in a viewer.');
    };

    window.downloadReport = function(id) {
        alert('In a full implementation, this would download the report as PDF.');
    };

    function loadResourceManagement() {
        const resources = window.loadData('resources') || [];
        displayResourceManagement(resources);
    }

    function displayResourceManagement(resources) {
        const resourceMgmtContainer = document.getElementById('resource-management');
        if (!resourceMgmtContainer) return;

        if (resources.length === 0) {
            resourceMgmtContainer.innerHTML = '<p>No resources to manage.</p>';
            return;
        }

        resourceMgmtContainer.innerHTML = `
            <div style="display: grid; gap: 15px; margin-bottom: 15px;">
                ${resources.map(resource => `
                    <div style="border: 1px solid var(--border-color); border-radius: 5px; padding: 15px;">
                        <h4 style="margin: 0 0 10px 0;">${resource.name}</h4>
                        <p><strong>Type:</strong> ${resource.type}</p>
                        <p><strong>Address:</strong> ${resource.address}</p>
                        <p><strong>Phone:</strong> ${resource.phone}</p>
                        ${resource.beds ? `<p><strong>Beds:</strong> ${resource.beds.available} / ${resource.beds.total}</p>` : ''}
                        <div style="margin-top: 10px; display: flex; gap: 10px;">
                            <button class="btn-primary" onclick="editResource(${resource.id})">Edit</button>
                            <button class="btn-secondary" onclick="deleteResource(${resource.id})">Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    window.editResource = function(id) {
        alert('In a full implementation, this would open a form to edit resource details including:\n- Name and contact info\n- Hours of operation\n- Available capacity\n- Services offered');
    };

    window.deleteResource = function(id) {
        if (confirm('Are you sure you want to delete this resource?')) {
            let resources = window.loadData('resources') || [];
            resources = resources.filter(r => r.id !== id);
            window.saveData('resources', resources);
            displayResourceManagement(resources);
            alert('Resource deleted successfully.');
        }
    };

    function initAdminButtons() {
        const buttons = {
            'add-volunteer': () => {
                alert('In a full implementation, this would open a form to add a new volunteer with:\n- Personal information\n- Role selection\n- Schedule preferences\n- Background check status');
            },
            'record-donation': () => {
                alert('In a full implementation, this would open a form to record a new donation with:\n- Donor information\n- Donation type (monetary/in-kind)\n- Amount/items\n- Purpose/designation');
            },
            'generate-report': () => {
                alert('In a full implementation, this would open a report generator with:\n- Report type selection\n- Date range selection\n- Custom filters\n- Export options');
            },
            'update-resource': () => {
                alert('In a full implementation, this would open a form to add a new resource or update existing ones.');
            }
        };

        Object.entries(buttons).forEach(([id, handler]) => {
            const button = document.getElementById(id);
            if (button) {
                button.addEventListener('click', handler);
            }
        });
    }

    // Export for use in other modules
    window.AdminModule = {
        loadVolunteers,
        loadDonations,
        loadReports,
        loadResourceManagement
    };

})();
