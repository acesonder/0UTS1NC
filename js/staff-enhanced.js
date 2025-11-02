// Enhanced Staff Module - Advanced Features
(function() {
    'use strict';

    // Enhanced data structures
    const sampleClients = [
        {
            id: 'CL-2025-001',
            name: 'John D.',
            risk: 'medium',
            location: 'Downtown',
            lastContact: new Date(Date.now() - 86400000),
            needs: ['housing', 'employment'],
            caseWorker: 'Sarah Johnson'
        },
        {
            id: 'CL-2025-015',
            name: 'Sarah M.',
            risk: 'high',
            location: 'Northside',
            lastContact: new Date(Date.now() - 172800000),
            needs: ['mental-health', 'housing'],
            caseWorker: 'Mike Davis'
        },
        {
            id: 'CL-2025-032',
            name: 'Michael K.',
            risk: 'low',
            location: 'Eastside',
            lastContact: new Date(Date.now() - 259200000),
            needs: ['job-training'],
            caseWorker: 'Sarah Johnson'
        }
    ];

    document.addEventListener('DOMContentLoaded', function() {
        initAdvancedCaseNotes();
        initClientSearch();
        initBulkActions();
        initDashboardCustomization();
        initShiftManagement();
        initIncidentReporting();
    });

    // Advanced Case Notes
    function initAdvancedCaseNotes() {
        const addNoteBtn = document.getElementById('add-note');
        if (addNoteBtn) {
            addNoteBtn.addEventListener('click', function() {
                showAdvancedNoteModal();
            });
        }
    }

    function showAdvancedNoteModal() {
        showModal('Add Case Note', `
            <form id="advanced-note-form">
                <div class="form-group">
                    <label for="note-client">Client:</label>
                    <select id="note-client" required>
                        <option value="">Select client...</option>
                        ${sampleClients.map(c => `<option value="${c.id}">${c.name} (${c.id})</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="note-category">Category:</label>
                    <select id="note-category" required>
                        <option value="general">General Note</option>
                        <option value="housing">Housing</option>
                        <option value="employment">Employment</option>
                        <option value="health">Health/Medical</option>
                        <option value="mental-health">Mental Health</option>
                        <option value="substance">Substance Use</option>
                        <option value="legal">Legal</option>
                        <option value="crisis">Crisis Intervention</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="note-priority">Priority:</label>
                    <select id="note-priority" required>
                        <option value="normal">Normal</option>
                        <option value="important">Important</option>
                        <option value="urgent">Urgent</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="note-content">Note Content:</label>
                    <textarea id="note-content" rows="6" required placeholder="Enter detailed case notes..."></textarea>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="note-flag">
                        Flag for supervisor review
                    </label>
                </div>
                <div class="form-group">
                    <label for="note-attachments">Attachments:</label>
                    <input type="file" id="note-attachments" multiple accept="image/*,application/pdf,.doc,.docx">
                    <small>Upload documents, photos, or voice memos</small>
                </div>
                <div class="form-group">
                    <button type="button" class="btn-secondary" onclick="startVoiceMemo()">
                        <i class="fas fa-microphone"></i> Record Voice Memo
                    </button>
                </div>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-save"></i> Save Note
                </button>
            </form>
        `);

        const form = document.getElementById('advanced-note-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                saveAdvancedNote();
            });
        }
    }

    function saveAdvancedNote() {
        const noteData = {
            clientId: document.getElementById('note-client').value,
            category: document.getElementById('note-category').value,
            priority: document.getElementById('note-priority').value,
            content: document.getElementById('note-content').value,
            flagged: document.getElementById('note-flag').checked,
            author: 'Current Staff Member',
            timestamp: new Date(),
            attachments: []
        };

        let notes = window.loadData('advancedCaseNotes') || [];
        notes.push(noteData);
        window.saveData('advancedCaseNotes', notes);

        closeModal();
        alert('Case note saved successfully!');
    }

    window.startVoiceMemo = function() {
        alert('Voice Memo Recording\n\nThis would activate the device microphone to record a voice memo that would be attached to the case note.');
    };

    // Client Search & Filters
    function initClientSearch() {
        // Add search interface to staff view
        const staffView = document.getElementById('staff-view');
        if (!staffView) return;

        const searchSection = document.createElement('div');
        searchSection.className = 'staff-search-section';
        searchSection.innerHTML = `
            <div class="search-filters">
                <h3><i class="fas fa-search"></i> Client Search & Filters</h3>
                <div class="search-controls">
                    <input type="text" id="client-search" placeholder="Search by name, ID, or case worker..." class="search-input">
                    <button class="btn-primary" onclick="StaffEnhanced.performSearch()">
                        <i class="fas fa-search"></i> Search
                    </button>
                    <button class="btn-secondary" onclick="StaffEnhanced.showAdvancedFilters()">
                        <i class="fas fa-filter"></i> Advanced Filters
                    </button>
                </div>
                <div id="search-results" class="search-results"></div>
            </div>
        `;

        // Insert after the title
        const title = staffView.querySelector('h2');
        if (title) {
            title.after(searchSection);
        }
    }

    window.StaffEnhanced = {
        performSearch: function() {
            const searchTerm = document.getElementById('client-search').value.toLowerCase();
            const results = sampleClients.filter(client => 
                client.name.toLowerCase().includes(searchTerm) ||
                client.id.toLowerCase().includes(searchTerm) ||
                client.caseWorker.toLowerCase().includes(searchTerm)
            );

            displaySearchResults(results);
        },

        showAdvancedFilters: function() {
            showModal('Advanced Client Filters', `
                <form id="advanced-filter-form">
                    <div class="form-group">
                        <label>Risk Level:</label>
                        <label><input type="checkbox" name="risk" value="low"> Low</label>
                        <label><input type="checkbox" name="risk" value="medium"> Medium</label>
                        <label><input type="checkbox" name="risk" value="high"> High</label>
                    </div>
                    <div class="form-group">
                        <label>Location:</label>
                        <select name="location" multiple>
                            <option value="downtown">Downtown</option>
                            <option value="northside">Northside</option>
                            <option value="southside">Southside</option>
                            <option value="eastside">Eastside</option>
                            <option value="westside">Westside</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Needs:</label>
                        <label><input type="checkbox" name="needs" value="housing"> Housing</label>
                        <label><input type="checkbox" name="needs" value="employment"> Employment</label>
                        <label><input type="checkbox" name="needs" value="mental-health"> Mental Health</label>
                        <label><input type="checkbox" name="needs" value="medical"> Medical</label>
                    </div>
                    <div class="form-group">
                        <label for="last-contact">Last Contact:</label>
                        <select id="last-contact">
                            <option value="">Any time</option>
                            <option value="24">Last 24 hours</option>
                            <option value="72">Last 3 days</option>
                            <option value="168">Last week</option>
                            <option value="720">Last month</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary">
                        <i class="fas fa-filter"></i> Apply Filters
                    </button>
                </form>
            `);

            document.getElementById('advanced-filter-form').addEventListener('submit', function(e) {
                e.preventDefault();
                applyAdvancedFilters();
            });
        }
    };

    function displaySearchResults(results) {
        const resultsDiv = document.getElementById('search-results');
        if (!resultsDiv) return;

        if (results.length === 0) {
            resultsDiv.innerHTML = '<p>No clients found matching your search.</p>';
            return;
        }

        resultsDiv.innerHTML = `
            <h4>Search Results (${results.length})</h4>
            <div class="client-results">
                ${results.map(client => `
                    <div class="client-card" style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <h4 style="margin: 0;">${client.name}</h4>
                                <p style="margin: 5px 0; color: var(--text-secondary);">${client.id}</p>
                                <p style="margin: 5px 0;"><strong>Case Worker:</strong> ${client.caseWorker}</p>
                                <p style="margin: 5px 0;"><strong>Location:</strong> ${client.location}</p>
                                <p style="margin: 5px 0;"><strong>Last Contact:</strong> ${window.formatDate(client.lastContact)}</p>
                            </div>
                            <span class="risk-badge risk-${client.risk}" style="padding: 4px 12px; border-radius: 12px; font-size: 12px; background: var(--${client.risk === 'high' ? 'accent' : client.risk === 'medium' ? 'warning' : 'success'}-color); color: white;">
                                ${client.risk.toUpperCase()} RISK
                            </span>
                        </div>
                        <div style="margin-top: 10px;">
                            <strong>Needs:</strong> ${client.needs.join(', ')}
                        </div>
                        <div style="margin-top: 10px; display: flex; gap: 10px;">
                            <button class="btn-primary" onclick="viewClientDetails('${client.id}')">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                            <button class="btn-secondary" onclick="addQuickNote('${client.id}')">
                                <i class="fas fa-sticky-note"></i> Quick Note
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function applyAdvancedFilters() {
        // This would filter based on selected criteria
        alert('Advanced filters applied. Results would be displayed based on selected criteria.');
        closeModal();
    }

    window.viewClientDetails = function(clientId) {
        const client = sampleClients.find(c => c.id === clientId);
        if (!client) return;

        alert(`Client Details for ${client.name}\n\nThis would show comprehensive client information including:\n- Contact history\n- Service utilization\n- Case notes\n- Appointments\n- Documents\n- Program enrollment`);
    };

    window.addQuickNote = function(clientId) {
        const client = sampleClients.find(c => c.id === clientId);
        if (!client) return;

        showModal('Quick Note', `
            <form id="quick-note-form">
                <h3>${client.name} (${client.id})</h3>
                <div class="form-group">
                    <label for="quick-note-text">Note:</label>
                    <textarea id="quick-note-text" rows="4" required placeholder="Enter quick note..."></textarea>
                </div>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-save"></i> Save Quick Note
                </button>
            </form>
        `);

        document.getElementById('quick-note-form').addEventListener('submit', function(e) {
            e.preventDefault();
            closeModal();
            alert('Quick note saved!');
        });
    };

    // Bulk Actions
    function initBulkActions() {
        const staffView = document.getElementById('staff-view');
        if (!staffView) return;

        const bulkActionsSection = document.createElement('div');
        bulkActionsSection.className = 'bulk-actions-section';
        bulkActionsSection.innerHTML = `
            <div class="bulk-actions-container" style="margin: 20px 0; padding: 20px; background: var(--background-color); border-radius: 8px;">
                <h3><i class="fas fa-tasks"></i> Bulk Actions</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                    <button class="btn-primary" onclick="StaffBulk.batchCheckins()">
                        <i class="fas fa-check-double"></i> Batch Check-ins
                    </button>
                    <button class="btn-primary" onclick="StaffBulk.massMessaging()">
                        <i class="fas fa-envelope-bulk"></i> Mass Messaging
                    </button>
                    <button class="btn-primary" onclick="StaffBulk.referralAssignment()">
                        <i class="fas fa-user-plus"></i> Assign Referrals
                    </button>
                    <button class="btn-secondary" onclick="StaffBulk.exportData()">
                        <i class="fas fa-download"></i> Export Data
                    </button>
                </div>
            </div>
        `;

        const dashboardStats = staffView.querySelector('.dashboard-stats');
        if (dashboardStats) {
            dashboardStats.after(bulkActionsSection);
        }
    }

    window.StaffBulk = {
        batchCheckins: function() {
            showModal('Batch Check-ins', `
                <p>Select multiple clients to check in at once:</p>
                <div id="batch-checkin-list" style="max-height: 300px; overflow-y: auto;">
                    ${sampleClients.map(client => `
                        <label style="display: block; padding: 10px; border-bottom: 1px solid var(--border-color);">
                            <input type="checkbox" value="${client.id}">
                            ${client.name} (${client.id})
                        </label>
                    `).join('')}
                </div>
                <div class="form-group" style="margin-top: 15px;">
                    <label for="checkin-service">Service/Location:</label>
                    <select id="checkin-service">
                        <option value="shelter">Shelter</option>
                        <option value="food">Food Service</option>
                        <option value="hygiene">Hygiene Center</option>
                        <option value="case-mgmt">Case Management</option>
                    </select>
                </div>
                <button class="btn-primary" onclick="processBatchCheckins()" style="margin-top: 15px; width: 100%;">
                    <i class="fas fa-check"></i> Process Check-ins
                </button>
            `);
        },

        massMessaging: function() {
            showModal('Mass Messaging', `
                <form id="mass-message-form">
                    <div class="form-group">
                        <label>Send to:</label>
                        <label><input type="radio" name="recipients" value="all" checked> All Clients</label>
                        <label><input type="radio" name="recipients" value="mycaseload"> My Caseload</label>
                        <label><input type="radio" name="recipients" value="custom"> Custom Selection</label>
                    </div>
                    <div class="form-group">
                        <label for="message-subject">Subject:</label>
                        <input type="text" id="message-subject" required placeholder="Message subject...">
                    </div>
                    <div class="form-group">
                        <label for="message-body">Message:</label>
                        <textarea id="message-body" rows="6" required placeholder="Enter your message..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="message-urgent">
                            Mark as urgent
                        </label>
                    </div>
                    <button type="submit" class="btn-primary">
                        <i class="fas fa-paper-plane"></i> Send Message
                    </button>
                </form>
            `);

            document.getElementById('mass-message-form').addEventListener('submit', function(e) {
                e.preventDefault();
                closeModal();
                alert('Mass message sent successfully!');
            });
        },

        referralAssignment: function() {
            showModal('Assign Referrals', `
                <p>Assign pending referrals to staff members:</p>
                <div style="max-height: 400px; overflow-y: auto;">
                    ${[1, 2, 3].map(i => `
                        <div style="border: 1px solid var(--border-color); padding: 15px; margin: 10px 0; border-radius: 5px;">
                            <h4>Referral #${i}</h4>
                            <p><strong>Client:</strong> Client Name</p>
                            <p><strong>Service:</strong> Mental Health Services</p>
                            <div class="form-group" style="margin-top: 10px;">
                                <label>Assign to:</label>
                                <select>
                                    <option>Sarah Johnson</option>
                                    <option>Mike Davis</option>
                                    <option>Amy Chen</option>
                                </select>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="btn-primary" style="margin-top: 15px; width: 100%;">
                    <i class="fas fa-check"></i> Assign Selected
                </button>
            `);
        },

        exportData: function() {
            showModal('Export Data', `
                <div class="form-group">
                    <label>Data to Export:</label>
                    <label><input type="checkbox" checked> Client Check-ins</label>
                    <label><input type="checkbox" checked> Case Notes</label>
                    <label><input type="checkbox" checked> Referrals</label>
                    <label><input type="checkbox"> Service Utilization</label>
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
            `);
        }
    };

    window.processBatchCheckins = function() {
        const selected = document.querySelectorAll('#batch-checkin-list input:checked');
        closeModal();
        alert(`Processed ${selected.length} check-ins successfully!`);
    };

    // Dashboard Customization
    function initDashboardCustomization() {
        // Add customization button to staff dashboard
        const staffView = document.getElementById('staff-view');
        if (!staffView) return;

        const customizeBtn = document.createElement('button');
        customizeBtn.className = 'btn-secondary';
        customizeBtn.innerHTML = '<i class="fas fa-cog"></i> Customize Dashboard';
        customizeBtn.onclick = showDashboardCustomization;
        customizeBtn.style.marginBottom = '20px';

        const title = staffView.querySelector('h2');
        if (title) {
            title.after(customizeBtn);
        }
    }

    function showDashboardCustomization() {
        showModal('Customize Dashboard', `
            <div class="dashboard-customization">
                <h4>Widget Visibility</h4>
                <div class="form-group">
                    <label><input type="checkbox" checked> Statistics Cards</label>
                    <label><input type="checkbox" checked> Recent Check-ins</label>
                    <label><input type="checkbox" checked> Case Notes</label>
                    <label><input type="checkbox" checked> Pending Referrals</label>
                    <label><input type="checkbox"> Calendar View</label>
                    <label><input type="checkbox"> Task List</label>
                </div>
                <h4 style="margin-top: 20px;">Personal Shortcuts</h4>
                <div class="form-group">
                    <button class="btn-secondary" style="width: 100%; margin-bottom: 10px;">
                        <i class="fas fa-plus"></i> Add Shortcut
                    </button>
                    <div style="border: 1px solid var(--border-color); padding: 10px; border-radius: 5px;">
                        <p><i class="fas fa-home"></i> Shelter Availability</p>
                        <p><i class="fas fa-users"></i> My Caseload</p>
                        <p><i class="fas fa-calendar"></i> Appointments</p>
                    </div>
                </div>
                <button class="btn-primary" style="margin-top: 20px; width: 100%;">
                    <i class="fas fa-save"></i> Save Customization
                </button>
            </div>
        `);
    }

    // Shift Management
    function initShiftManagement() {
        window.openShiftManagement = function() {
            showModal('Shift Management', `
                <div class="shift-management">
                    <div class="shift-tabs">
                        <button class="tab-btn active" data-tab="attendance">Attendance</button>
                        <button class="tab-btn" data-tab="swaps">Shift Swaps</button>
                        <button class="tab-btn" data-tab="timeoff">Time Off</button>
                    </div>
                    <div id="attendance-content" class="tab-content active">
                        <h4>Today's Attendance</h4>
                        <button class="btn-primary" style="width: 100%; margin-bottom: 15px;">
                            <i class="fas fa-clock"></i> Clock In/Out
                        </button>
                        <div style="border: 1px solid var(--border-color); padding: 15px; border-radius: 5px;">
                            <p><strong>Current Shift:</strong> 9:00 AM - 5:00 PM</p>
                            <p><strong>Clocked In:</strong> 8:55 AM</p>
                            <p><strong>Hours Today:</strong> 3.5 hours</p>
                        </div>
                    </div>
                    <div id="swaps-content" class="tab-content" style="display: none;">
                        <h4>Shift Swap Requests</h4>
                        <button class="btn-primary" style="width: 100%; margin-bottom: 15px;">
                            <i class="fas fa-exchange-alt"></i> Request Shift Swap
                        </button>
                        <p>No pending shift swap requests.</p>
                    </div>
                    <div id="timeoff-content" class="tab-content" style="display: none;">
                        <h4>Time Off Requests</h4>
                        <button class="btn-primary" style="width: 100%; margin-bottom: 15px;">
                            <i class="fas fa-calendar-plus"></i> Request Time Off
                        </button>
                        <div style="margin-top: 15px;">
                            <p><strong>Remaining PTO:</strong> 5 days</p>
                            <p><strong>Sick Days:</strong> 3 days</p>
                        </div>
                    </div>
                </div>
            `);

            document.querySelectorAll('.shift-tabs .tab-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.shift-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    document.querySelectorAll('.shift-management .tab-content').forEach(content => {
                        content.style.display = 'none';
                    });
                    
                    const tabName = this.getAttribute('data-tab');
                    const content = document.getElementById(tabName + '-content');
                    if (content) content.style.display = 'block';
                });
            });
        };
    }

    // Incident Reporting
    function initIncidentReporting() {
        window.openIncidentReporting = function() {
            showModal('Report Incident', `
                <form id="incident-form">
                    <div class="form-group">
                        <label for="incident-type">Incident Type:</label>
                        <select id="incident-type" required>
                            <option value="">Select type...</option>
                            <option value="safety">Safety Concern</option>
                            <option value="medical">Medical Emergency</option>
                            <option value="behavioral">Behavioral Issue</option>
                            <option value="property">Property Damage</option>
                            <option value="violation">Policy Violation</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="incident-severity">Severity:</label>
                        <select id="incident-severity" required>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="incident-location">Location:</label>
                        <input type="text" id="incident-location" required placeholder="Where did this occur?">
                    </div>
                    <div class="form-group">
                        <label for="incident-description">Description:</label>
                        <textarea id="incident-description" rows="5" required placeholder="Describe the incident in detail..."></textarea>
                    </div>
                    <div class="form-group">
                        <label for="incident-actions">Actions Taken:</label>
                        <textarea id="incident-actions" rows="3" placeholder="What actions were taken?"></textarea>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="incident-notify">
                            Notify supervisor immediately
                        </label>
                    </div>
                    <button type="submit" class="btn-primary">
                        <i class="fas fa-exclamation-triangle"></i> Submit Incident Report
                    </button>
                </form>
            `);

            document.getElementById('incident-form').addEventListener('submit', function(e) {
                e.preventDefault();
                const incidentData = {
                    type: document.getElementById('incident-type').value,
                    severity: document.getElementById('incident-severity').value,
                    location: document.getElementById('incident-location').value,
                    description: document.getElementById('incident-description').value,
                    actions: document.getElementById('incident-actions').value,
                    notify: document.getElementById('incident-notify').checked,
                    reporter: 'Current Staff Member',
                    timestamp: new Date()
                };

                let incidents = window.loadData('incidents') || [];
                incidents.push(incidentData);
                window.saveData('incidents', incidents);

                closeModal();
                alert('Incident report submitted successfully!');
            });
        };
    }

    // Helper function for modals (reuse from services.js)
    function showModal(title, content) {
        const existingModal = document.getElementById('dynamic-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'dynamic-modal';
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeModal()"></div>
            <div class="modal-content glass-effect">
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

    // Add styles for new staff features
    const style = document.createElement('style');
    style.textContent = `
        .staff-search-section {
            background: var(--background-color);
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .search-controls {
            display: flex;
            gap: 10px;
            margin: 15px 0;
            flex-wrap: wrap;
        }
        .search-input {
            flex: 1;
            min-width: 250px;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 5px;
            font-size: 14px;
            background: var(--card-background);
            color: var(--text-color);
        }
        .search-results {
            margin-top: 20px;
        }
        .client-results {
            margin-top: 15px;
        }
        .bulk-actions-container button {
            font-size: 14px;
        }
        .tab-btn {
            padding: 10px 20px;
            background: none;
            border: none;
            border-bottom: 3px solid transparent;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.2s;
            color: var(--text-color);
        }
        .tab-btn.active {
            color: var(--secondary-color);
            border-bottom-color: var(--secondary-color);
            font-weight: 600;
        }
        .tab-content {
            padding: 20px 0;
        }
        .shift-tabs {
            display: flex;
            gap: 10px;
            border-bottom: 2px solid var(--border-color);
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(style);

})();
