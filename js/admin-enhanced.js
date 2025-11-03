// Enhanced Admin Module - Advanced Admin Features
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initAdminEnhancements();
    });

    function initAdminEnhancements() {
        const adminView = document.getElementById('admin-view');
        if (!adminView) return;

        // Add enhanced admin sections
        addAdminQuickActions();
    }

    function addAdminQuickActions() {
        const adminView = document.getElementById('admin-view');
        if (!adminView) return;

        const quickActions = document.createElement('div');
        quickActions.className = 'admin-quick-actions';
        quickActions.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                <button class="btn-primary" onclick="AdminEnhanced.importExport()">
                    <i class="fas fa-file-import"></i> Import/Export
                </button>
                <button class="btn-primary" onclick="AdminEnhanced.userRoleManagement()">
                    <i class="fas fa-users-cog"></i> User Roles
                </button>
                <button class="btn-primary" onclick="AdminEnhanced.auditLogs()">
                    <i class="fas fa-history"></i> Audit Logs
                </button>
                <button class="btn-primary" onclick="AdminEnhanced.grantTracking()">
                    <i class="fas fa-dollar-sign"></i> Grant Tracking
                </button>
                <button class="btn-primary" onclick="AdminEnhanced.volunteerPortal()">
                    <i class="fas fa-hands-helping"></i> Volunteer Portal
                </button>
                <button class="btn-primary" onclick="AdminEnhanced.donationPortal()">
                    <i class="fas fa-hand-holding-heart"></i> Donation Portal
                </button>
                <button class="btn-primary" onclick="AdminEnhanced.partnerManagement()">
                    <i class="fas fa-handshake"></i> Partners
                </button>
                <button class="btn-primary" onclick="AdminEnhanced.analyticsuite()">
                    <i class="fas fa-chart-line"></i> Analytics
                </button>
                <button class="btn-primary" onclick="AdminEnhanced.bulkMessaging()">
                    <i class="fas fa-bullhorn"></i> Bulk Messages
                </button>
                <button class="btn-primary" onclick="AdminEnhanced.backupRestore()">
                    <i class="fas fa-database"></i> Backup/Restore
                </button>
            </div>
        `;

        const title = adminView.querySelector('h2');
        if (title) {
            title.after(quickActions);
        }
    }

    // Import/Export
    window.AdminEnhanced = {
        importExport: function() {
            showModal('Resource Import/Export', `
                <div class="import-export">
                    <div class="ie-tabs">
                        <button class="tab-btn active" data-tab="import">Import</button>
                        <button class="tab-btn" data-tab="export">Export</button>
                    </div>
                    <div id="import-content" class="tab-content active">
                        <h4>Import Resources</h4>
                        <div class="form-group">
                            <label>Upload File:</label>
                            <input type="file" accept=".csv,.xlsx,.xls" id="import-file">
                            <small>Supported formats: CSV, Excel</small>
                        </div>
                        <div class="form-group">
                            <label>Data Type:</label>
                            <select>
                                <option>Resources/Services</option>
                                <option>Volunteers</option>
                                <option>Donations</option>
                                <option>Clients</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" checked>
                                Validate data before import
                            </label>
                            <label>
                                <input type="checkbox">
                                Skip duplicate entries
                            </label>
                        </div>
                        <button class="btn-primary" style="width: 100%;">
                            <i class="fas fa-upload"></i> Import Data
                        </button>
                        <div style="margin-top: 15px; padding: 15px; background: var(--background-color); border-radius: 5px;">
                            <p><strong>Template Downloads:</strong></p>
                            <a href="#" style="color: var(--secondary-color);"><i class="fas fa-download"></i> Resources Template</a><br>
                            <a href="#" style="color: var(--secondary-color);"><i class="fas fa-download"></i> Volunteers Template</a><br>
                            <a href="#" style="color: var(--secondary-color);"><i class="fas fa-download"></i> Donations Template</a>
                        </div>
                    </div>
                    <div id="export-content" class="tab-content" style="display: none;">
                        <h4>Export Data</h4>
                        <div class="form-group">
                            <label>Select Data:</label>
                            <label><input type="checkbox" checked> Resources</label>
                            <label><input type="checkbox" checked> Volunteers</label>
                            <label><input type="checkbox" checked> Donations</label>
                            <label><input type="checkbox"> Reports</label>
                            <label><input type="checkbox"> Audit Logs</label>
                        </div>
                        <div class="form-group">
                            <label>Date Range:</label>
                            <input type="date" id="export-start">
                            <span>to</span>
                            <input type="date" id="export-end">
                        </div>
                        <div class="form-group">
                            <label>Format:</label>
                            <select>
                                <option>CSV</option>
                                <option>Excel (XLSX)</option>
                                <option>PDF</option>
                                <option>JSON</option>
                            </select>
                        </div>
                        <button class="btn-primary" style="width: 100%;">
                            <i class="fas fa-download"></i> Export Data
                        </button>
                    </div>
                </div>
            `);

            setupTabSwitching('.ie-tabs');
        },

        userRoleManagement: function() {
            showModal('User Role Management', `
                <div class="user-roles">
                    <h4>Manage User Roles & Permissions</h4>
                    <button class="btn-primary" style="margin-bottom: 15px;">
                        <i class="fas fa-user-plus"></i> Add New User
                    </button>
                    <div class="user-list">
                        ${[
                            {name: 'Sarah Johnson', role: 'Staff', email: 'sarah.j@outsinc.org'},
                            {name: 'Mike Davis', role: 'Staff', email: 'mike.d@outsinc.org'},
                            {name: 'Admin User', role: 'Admin', email: 'admin@outsinc.org'}
                        ].map(user => `
                            <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h4 style="margin: 0;">${user.name}</h4>
                                        <p style="margin: 5px 0; color: var(--text-secondary);">${user.email}</p>
                                        <span class="role-badge" style="padding: 4px 12px; background: var(--secondary-color); color: white; border-radius: 12px; font-size: 12px;">
                                            ${user.role}
                                        </span>
                                    </div>
                                    <div>
                                        <button class="btn-secondary" style="margin-right: 5px;">
                                            <i class="fas fa-edit"></i> Edit
                                        </button>
                                        <button class="btn-secondary">
                                            <i class="fas fa-user-lock"></i> Suspend
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background: var(--background-color); border-radius: 5px;">
                        <h4>Custom Roles</h4>
                        <button class="btn-secondary">
                            <i class="fas fa-plus"></i> Create Custom Role
                        </button>
                        <p style="margin-top: 10px;">Available: Volunteer, Partner Org, Case Manager</p>
                    </div>
                </div>
            `);
        },

        auditLogs: function() {
            showModal('Audit Logs', `
                <div class="audit-logs">
                    <div class="form-group">
                        <label>Filter by:</label>
                        <select>
                            <option>All Actions</option>
                            <option>User Management</option>
                            <option>Resource Updates</option>
                            <option>Data Export</option>
                            <option>Permission Changes</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>User:</label>
                        <input type="text" placeholder="Search by user...">
                    </div>
                    <div class="form-group">
                        <label>Date Range:</label>
                        <input type="date">
                        <span>to</span>
                        <input type="date">
                    </div>
                    <button class="btn-primary" style="margin-bottom: 15px;">
                        <i class="fas fa-search"></i> Search Logs
                    </button>
                    <div class="log-entries" style="max-height: 400px; overflow-y: auto;">
                        ${generateAuditLogEntries()}
                    </div>
                    <button class="btn-secondary" style="width: 100%; margin-top: 15px;">
                        <i class="fas fa-download"></i> Export Audit Log
                    </button>
                </div>
            `);
        },

        grantTracking: function() {
            showModal('Grant & Funding Tracker', `
                <div class="grant-tracking">
                    <button class="btn-primary" style="margin-bottom: 15px;">
                        <i class="fas fa-plus"></i> Add New Grant
                    </button>
                    <div class="grant-summary" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
                        <div style="padding: 15px; background: var(--background-color); border-radius: 5px; text-align: center;">
                            <h4 style="margin: 0; color: var(--success-color);">$250,000</h4>
                            <p style="margin: 5px 0; font-size: 14px;">Total Grants</p>
                        </div>
                        <div style="padding: 15px; background: var(--background-color); border-radius: 5px; text-align: center;">
                            <h4 style="margin: 0; color: var(--warning-color);">$180,000</h4>
                            <p style="margin: 5px 0; font-size: 14px;">Expended</p>
                        </div>
                        <div style="padding: 15px; background: var(--background-color); border-radius: 5px; text-align: center;">
                            <h4 style="margin: 0; color: var(--secondary-color);">$70,000</h4>
                            <p style="margin: 5px 0; font-size: 14px;">Remaining</p>
                        </div>
                    </div>
                    <div class="grant-list">
                        ${[
                            {name: 'Community Foundation Grant', amount: '$100,000', spent: '$75,000', deadline: '2025-12-31'},
                            {name: 'Federal Housing Grant', amount: '$150,000', spent: '$105,000', deadline: '2026-06-30'}
                        ].map(grant => `
                            <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                                <h4 style="margin: 0 0 10px 0;">${grant.name}</h4>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                                    <div>
                                        <strong>Total:</strong><br>${grant.amount}
                                    </div>
                                    <div>
                                        <strong>Spent:</strong><br>${grant.spent}
                                    </div>
                                    <div>
                                        <strong>Deadline:</strong><br>${grant.deadline}
                                    </div>
                                </div>
                                <div style="margin-top: 10px;">
                                    <button class="btn-secondary">
                                        <i class="fas fa-chart-pie"></i> View Details
                                    </button>
                                    <button class="btn-secondary">
                                        <i class="fas fa-file-alt"></i> Generate Report
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `);
        },

        volunteerPortal: function() {
            showModal('Volunteer Portal', `
                <div class="volunteer-portal">
                    <div class="vp-tabs">
                        <button class="tab-btn active" data-tab="onboarding">Onboarding</button>
                        <button class="tab-btn" data-tab="training">Training</button>
                        <button class="tab-btn" data-tab="shifts">Shift Signup</button>
                    </div>
                    <div id="onboarding-content" class="tab-content active">
                        <h4>Self-Service Onboarding</h4>
                        <p>Volunteers can complete these steps independently:</p>
                        <div style="padding: 15px; background: var(--background-color); border-radius: 5px; margin: 10px 0;">
                            <p><i class="fas fa-check-circle" style="color: var(--success-color);"></i> Step 1: Complete Application</p>
                            <p><i class="fas fa-check-circle" style="color: var(--success-color);"></i> Step 2: Background Check</p>
                            <p><i class="fas fa-circle" style="color: var(--border-color);"></i> Step 3: Orientation Video</p>
                            <p><i class="fas fa-circle" style="color: var(--border-color);"></i> Step 4: Safety Training</p>
                        </div>
                        <button class="btn-primary">
                            <i class="fas fa-link"></i> Generate Onboarding Link
                        </button>
                    </div>
                    <div id="training-content" class="tab-content" style="display: none;">
                        <h4>Training Materials</h4>
                        <div class="training-list">
                            <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                                <h4>Orientation Training</h4>
                                <p>30-minute video introduction</p>
                                <button class="btn-secondary">
                                    <i class="fas fa-play"></i> View
                                </button>
                            </div>
                            <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                                <h4>Safety & Protocols</h4>
                                <p>PDF guide and quiz</p>
                                <button class="btn-secondary">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                        </div>
                        <button class="btn-primary">
                            <i class="fas fa-plus"></i> Upload New Training Material
                        </button>
                    </div>
                    <div id="shifts-content" class="tab-content" style="display: none;">
                        <h4>Available Shifts</h4>
                        <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                            <p><strong>Monday, Nov 4</strong></p>
                            <p>Meal Service: 11am-2pm (3 spots)</p>
                            <button class="btn-primary">Sign Up</button>
                        </div>
                        <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                            <p><strong>Wednesday, Nov 6</strong></p>
                            <p>Intake Support: 9am-1pm (2 spots)</p>
                            <button class="btn-primary">Sign Up</button>
                        </div>
                    </div>
                </div>
            `);

            setupTabSwitching('.vp-tabs');
        },

        donationPortal: function() {
            showModal('Donation Portal', `
                <div class="donation-portal">
                    <div class="dp-tabs">
                        <button class="tab-btn active" data-tab="online">Online Donations</button>
                        <button class="tab-btn" data-tab="donors">Donor Management</button>
                        <button class="tab-btn" data-tab="campaigns">Campaigns</button>
                    </div>
                    <div id="online-content" class="tab-content active">
                        <h4>Online Donation Settings</h4>
                        <div class="form-group">
                            <label>Payment Gateway:</label>
                            <select>
                                <option>Stripe</option>
                                <option>PayPal</option>
                                <option>Square</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" checked>
                                Enable recurring donations
                            </label>
                            <label>
                                <input type="checkbox" checked>
                                Send tax receipts automatically
                            </label>
                        </div>
                        <button class="btn-primary">
                            <i class="fas fa-save"></i> Save Settings
                        </button>
                        <div style="margin-top: 20px; padding: 15px; background: var(--background-color); border-radius: 5px;">
                            <p><strong>Donation Page URL:</strong></p>
                            <p style="color: var(--secondary-color);">https://outsinc.org/donate</p>
                            <button class="btn-secondary">
                                <i class="fas fa-copy"></i> Copy Link
                            </button>
                        </div>
                    </div>
                    <div id="donors-content" class="tab-content" style="display: none;">
                        <h4>Donor History</h4>
                        <input type="text" placeholder="Search donors..." style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid var(--border-color); border-radius: 5px;">
                        <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                            <h4>John Smith</h4>
                            <p>Total Donated: $5,000 (10 donations)</p>
                            <p>Last Donation: Oct 15, 2025</p>
                            <button class="btn-secondary">
                                <i class="fas fa-envelope"></i> Send Message
                            </button>
                        </div>
                    </div>
                    <div id="campaigns-content" class="tab-content" style="display: none;">
                        <h4>Fundraising Campaigns</h4>
                        <button class="btn-primary" style="margin-bottom: 15px;">
                            <i class="fas fa-plus"></i> Create New Campaign
                        </button>
                        <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                            <h4>Winter Shelter Fund 2025</h4>
                            <p>Goal: $50,000 | Raised: $32,000 (64%)</p>
                            <div style="background: var(--border-color); height: 10px; border-radius: 5px; margin: 10px 0;">
                                <div style="background: var(--success-color); height: 100%; width: 64%; border-radius: 5px;"></div>
                            </div>
                            <button class="btn-secondary">View Details</button>
                        </div>
                    </div>
                </div>
            `);

            setupTabSwitching('.dp-tabs');
        },

        partnerManagement: function() {
            showModal('Community Partner Management', `
                <div class="partner-mgmt">
                    <button class="btn-primary" style="margin-bottom: 15px;">
                        <i class="fas fa-plus"></i> Add Partner Organization
                    </button>
                    <div class="partner-list">
                        ${[
                            {name: 'City Health Clinic', type: 'Healthcare', mou: 'Active', contact: 'Dr. Smith'},
                            {name: 'Legal Aid Society', type: 'Legal Services', mou: 'Pending Renewal', contact: 'Attorney Jones'}
                        ].map(partner => `
                            <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                                <h4 style="margin: 0;">${partner.name}</h4>
                                <p><strong>Type:</strong> ${partner.type}</p>
                                <p><strong>MOU Status:</strong> <span style="color: ${partner.mou === 'Active' ? 'var(--success-color)' : 'var(--warning-color)'};">${partner.mou}</span></p>
                                <p><strong>Contact:</strong> ${partner.contact}</p>
                                <div style="display: flex; gap: 10px; margin-top: 10px;">
                                    <button class="btn-secondary">
                                        <i class="fas fa-file-contract"></i> View MOU
                                    </button>
                                    <button class="btn-secondary">
                                        <i class="fas fa-edit"></i> Edit
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `);
        },

        analyticsuite: function() {
            showModal('Analytics Suite', `
                <div class="analytics-suite">
                    <h4>Custom Reports & Data Visualization</h4>
                    <div class="analytics-tabs">
                        <button class="tab-btn active" data-tab="reports">Reports</button>
                        <button class="tab-btn" data-tab="charts">Charts</button>
                        <button class="tab-btn" data-tab="custom">Custom</button>
                    </div>
                    <div id="reports-content" class="tab-content active">
                        <button class="btn-primary" style="margin-bottom: 15px;">
                            <i class="fas fa-plus"></i> Create New Report
                        </button>
                        <div class="report-list">
                            <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                                <h4>Monthly Service Utilization</h4>
                                <p>Client check-ins, resource usage, outcomes</p>
                                <button class="btn-secondary">
                                    <i class="fas fa-file-pdf"></i> Export PDF
                                </button>
                                <button class="btn-secondary">
                                    <i class="fas fa-file-excel"></i> Export Excel
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="charts-content" class="tab-content" style="display: none;">
                        <h4>Data Visualizations</h4>
                        <div style="padding: 40px; background: var(--background-color); border-radius: 5px; text-align: center;">
                            <i class="fas fa-chart-bar fa-4x" style="color: var(--secondary-color);"></i>
                            <p style="margin-top: 15px;">Interactive charts would display here</p>
                            <p>Service trends, demographics, outcomes</p>
                        </div>
                    </div>
                    <div id="custom-content" class="tab-content" style="display: none;">
                        <h4>Custom Report Builder</h4>
                        <div class="form-group">
                            <label>Data Source:</label>
                            <select>
                                <option>Client Services</option>
                                <option>Resources</option>
                                <option>Staff Activity</option>
                                <option>Donations</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Metrics:</label>
                            <label><input type="checkbox"> Total Count</label>
                            <label><input type="checkbox"> By Location</label>
                            <label><input type="checkbox"> By Date Range</label>
                            <label><input type="checkbox"> Demographics</label>
                        </div>
                        <button class="btn-primary">
                            <i class="fas fa-play"></i> Generate Report
                        </button>
                    </div>
                </div>
            `);

            setupTabSwitching('.analytics-tabs');
        },

        bulkMessaging: function() {
            showModal('Bulk Messaging', `
                <form id="bulk-message-form">
                    <h4>Send Announcements</h4>
                    <div class="form-group">
                        <label>Recipients:</label>
                        <label><input type="checkbox" checked> All Users</label>
                        <label><input type="checkbox"> Clients Only</label>
                        <label><input type="checkbox"> Staff Only</label>
                        <label><input type="checkbox"> Volunteers Only</label>
                    </div>
                    <div class="form-group">
                        <label>Filter by:</label>
                        <select>
                            <option value="">No filter</option>
                            <option>Location</option>
                            <option>Role/Group</option>
                            <option>Program Enrollment</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="bulk-subject">Subject:</label>
                        <input type="text" id="bulk-subject" required placeholder="Message subject...">
                    </div>
                    <div class="form-group">
                        <label for="bulk-message">Message:</label>
                        <textarea id="bulk-message" rows="6" required placeholder="Enter your announcement..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Delivery Method:</label>
                        <label><input type="checkbox" checked> In-App</label>
                        <label><input type="checkbox"> Email</label>
                        <label><input type="checkbox"> SMS</label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox">
                            Schedule for later
                        </label>
                    </div>
                    <button type="submit" class="btn-primary" style="width: 100%;">
                        <i class="fas fa-paper-plane"></i> Send Announcement
                    </button>
                </form>
            `);

            document.getElementById('bulk-message-form').addEventListener('submit', function(e) {
                e.preventDefault();
                closeModal();
                alert('Bulk message sent successfully!');
            });
        },

        backupRestore: function() {
            showModal('Backup & Restore', `
                <div class="backup-restore">
                    <div class="br-tabs">
                        <button class="tab-btn active" data-tab="backup">Backup</button>
                        <button class="tab-btn" data-tab="restore">Restore</button>
                        <button class="tab-btn" data-tab="schedule">Schedule</button>
                    </div>
                    <div id="backup-content" class="tab-content active">
                        <h4>Create Backup</h4>
                        <div class="form-group">
                            <label>Include:</label>
                            <label><input type="checkbox" checked> Resources & Services</label>
                            <label><input type="checkbox" checked> User Data</label>
                            <label><input type="checkbox" checked> Case Notes</label>
                            <label><input type="checkbox" checked> Donations</label>
                            <label><input type="checkbox"> System Settings</label>
                        </div>
                        <button class="btn-primary" style="width: 100%;">
                            <i class="fas fa-save"></i> Create Backup Now
                        </button>
                        <div style="margin-top: 20px;">
                            <h4>Recent Backups</h4>
                            <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                                <p><strong>Backup_2025-11-01.zip</strong></p>
                                <p>Size: 45.2 MB | Date: Nov 1, 2025 3:00 PM</p>
                                <button class="btn-secondary">
                                    <i class="fas fa-download"></i> Download
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="restore-content" class="tab-content" style="display: none;">
                        <h4>Restore from Backup</h4>
                        <div class="form-group">
                            <label>Select Backup File:</label>
                            <input type="file" accept=".zip,.bak">
                        </div>
                        <div style="padding: 15px; background: var(--warning-color); color: white; border-radius: 5px; margin: 15px 0;">
                            <strong><i class="fas fa-exclamation-triangle"></i> Warning:</strong> Restoring will overwrite current data. Create a backup first!
                        </div>
                        <button class="btn-primary" style="width: 100%;">
                            <i class="fas fa-upload"></i> Restore Data
                        </button>
                    </div>
                    <div id="schedule-content" class="tab-content" style="display: none;">
                        <h4>Automatic Backup Schedule</h4>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" checked>
                                Enable automatic backups
                            </label>
                        </div>
                        <div class="form-group">
                            <label>Frequency:</label>
                            <select>
                                <option>Daily</option>
                                <option selected>Weekly</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Time:</label>
                            <input type="time" value="02:00">
                        </div>
                        <div class="form-group">
                            <label>Retention:</label>
                            <select>
                                <option>Keep last 7 backups</option>
                                <option selected>Keep last 30 backups</option>
                                <option>Keep all backups</option>
                            </select>
                        </div>
                        <button class="btn-primary" style="width: 100%;">
                            <i class="fas fa-save"></i> Save Schedule
                        </button>
                    </div>
                </div>
            `);

            setupTabSwitching('.br-tabs');
        }
    };

    // Helper Functions
    function generateAuditLogEntries() {
        const actions = [
            {user: 'Admin User', action: 'Updated resource', target: 'Hope Haven Shelter', time: '10 minutes ago'},
            {user: 'Sarah Johnson', action: 'Exported data', target: 'Client list', time: '1 hour ago'},
            {user: 'Admin User', action: 'Changed user role', target: 'Mike Davis', time: '2 hours ago'},
            {user: 'System', action: 'Automatic backup', target: 'All data', time: '3 hours ago'}
        ];

        return actions.map(log => `
            <div style="border-left: 3px solid var(--secondary-color); padding: 10px 15px; margin: 10px 0; background: var(--background-color);">
                <p style="margin: 0;"><strong>${log.user}</strong> - ${log.action}</p>
                <p style="margin: 5px 0; font-size: 14px; color: var(--text-secondary);">Target: ${log.target}</p>
                <p style="margin: 0; font-size: 12px; color: var(--text-secondary);">${log.time}</p>
            </div>
        `).join('');
    }

    function setupTabSwitching(tabsSelector) {
        const tabBtns = document.querySelectorAll(`${tabsSelector} .tab-btn`);
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const parent = this.closest('.import-export, .volunteer-portal, .donation-portal, .analytics-suite, .backup-restore');
                if (!parent) return;

                parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                parent.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = 'none';
                });

                const tabName = this.getAttribute('data-tab');
                const content = parent.querySelector(`#${tabName}-content`);
                if (content) content.style.display = 'block';
            });
        });
    }

    function showModal(title, content) {
        const existingModal = document.getElementById('dynamic-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'dynamic-modal';
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeModal()"></div>
            <div class="modal-content glass-effect" style="max-width: 700px;">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    window.closeModal = function() {
        const modal = document.getElementById('dynamic-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    };

})();
