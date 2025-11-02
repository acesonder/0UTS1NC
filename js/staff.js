// Staff Dashboard Module
(function() {
    'use strict';

    const sampleStats = {
        checkinsCount: 23,
        activeCases: 67,
        availableBeds: 42,
        pendingReferrals: 8
    };

    const sampleCheckins = [
        {
            id: 1,
            clientName: 'John D.',
            time: new Date(Date.now() - 3600000),
            service: 'Hope Haven Shelter',
            notes: 'Regular check-in'
        },
        {
            id: 2,
            clientName: 'Sarah M.',
            time: new Date(Date.now() - 7200000),
            service: 'Community Kitchen',
            notes: 'Meal service'
        },
        {
            id: 3,
            clientName: 'Michael K.',
            time: new Date(Date.now() - 10800000),
            service: 'Fresh Start Hygiene Center',
            notes: 'Shower and laundry'
        }
    ];

    const sampleNotes = [
        {
            id: 1,
            clientId: 'CL-2025-001',
            clientName: 'John D.',
            author: 'Sarah Johnson',
            timestamp: new Date(Date.now() - 86400000),
            content: 'Client showed improvement in job search efforts. Attended two interviews this week.'
        },
        {
            id: 2,
            clientId: 'CL-2025-015',
            clientName: 'Sarah M.',
            author: 'Mike Davis',
            timestamp: new Date(Date.now() - 172800000),
            content: 'Connected client with housing assistance program. Follow-up scheduled for next week.'
        }
    ];

    const sampleReferrals = [
        {
            id: 1,
            clientName: 'Michael K.',
            service: 'Mental Health Services',
            status: 'Pending',
            dateRequested: new Date(Date.now() - 86400000 * 2),
            priority: 'High'
        },
        {
            id: 2,
            clientName: 'Emily R.',
            service: 'Job Training Program',
            status: 'In Progress',
            dateRequested: new Date(Date.now() - 86400000 * 5),
            priority: 'Medium'
        }
    ];

    document.addEventListener('DOMContentLoaded', function() {
        loadDashboardStats();
        loadClientCheckins();
        loadStaffNotes();
        loadReferrals();
        initAddNote();
    });

    function loadDashboardStats() {
        let stats = window.loadData('dashboardStats');
        if (!stats) {
            stats = sampleStats;
            window.saveData('dashboardStats', stats);
        }
        displayDashboardStats(stats);
    }

    function displayDashboardStats(stats) {
        const elements = {
            'checkins-count': stats.checkinsCount,
            'active-cases': stats.activeCases,
            'available-beds': stats.availableBeds,
            'pending-referrals': stats.pendingReferrals
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    function loadClientCheckins() {
        let checkins = window.loadData('clientCheckins');
        if (!checkins || checkins.length === 0) {
            checkins = sampleCheckins;
            window.saveData('clientCheckins', checkins);
        }
        displayClientCheckins(checkins);
    }

    function displayClientCheckins(checkins) {
        const checkinsContainer = document.getElementById('client-checkins');
        if (!checkinsContainer) return;

        if (checkins.length === 0) {
            checkinsContainer.innerHTML = '<p>No check-ins today.</p>';
            return;
        }

        checkinsContainer.innerHTML = `
            <div style="display: grid; gap: 15px;">
                ${checkins.map(checkin => `
                    <div style="border-left: 3px solid var(--secondary-color); padding-left: 15px;">
                        <p><strong>${checkin.clientName}</strong></p>
                        <p>${window.formatDate(checkin.time)}</p>
                        <p>${checkin.service}</p>
                        ${checkin.notes ? `<p><em>${checkin.notes}</em></p>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    function loadStaffNotes() {
        let notes = window.loadData('staffNotes');
        if (!notes || notes.length === 0) {
            notes = sampleNotes;
            window.saveData('staffNotes', notes);
        }
        displayStaffNotes(notes);
    }

    function displayStaffNotes(notes) {
        const notesContainer = document.getElementById('staff-notes');
        if (!notesContainer) return;

        if (notes.length === 0) {
            notesContainer.innerHTML = '<p>No notes yet.</p>';
            return;
        }

        notesContainer.innerHTML = `
            <div style="display: grid; gap: 15px; margin-bottom: 15px;">
                ${notes.map(note => `
                    <div style="background: var(--background-color); padding: 15px; border-radius: 5px;">
                        <p><strong>${note.clientName}</strong> (${note.clientId})</p>
                        <p style="font-size: 14px; margin: 10px 0;">${note.content}</p>
                        <p style="font-size: 12px; color: #666;">
                            By ${note.author} on ${window.formatDate(note.timestamp)}
                        </p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function initAddNote() {
        const addNoteBtn = document.getElementById('add-note');
        if (addNoteBtn) {
            addNoteBtn.addEventListener('click', function() {
                alert('In a full implementation, this would open a form to add a new case note.\n\nYou would be able to:\n- Select client\n- Enter note content\n- Set priority/category\n- Attach files');
            });
        }
    }

    function loadReferrals() {
        let referrals = window.loadData('referrals');
        if (!referrals || referrals.length === 0) {
            referrals = sampleReferrals;
            window.saveData('referrals', referrals);
        }
        displayReferrals(referrals);
    }

    function displayReferrals(referrals) {
        const referralsContainer = document.getElementById('referrals');
        if (!referralsContainer) return;

        if (referrals.length === 0) {
            referralsContainer.innerHTML = '<p>No pending referrals.</p>';
            return;
        }

        const priorityColors = {
            'High': 'var(--accent-color)',
            'Medium': 'var(--warning-color)',
            'Low': 'var(--success-color)'
        };

        referralsContainer.innerHTML = `
            <div style="display: grid; gap: 15px;">
                ${referrals.map(referral => `
                    <div style="border: 1px solid var(--border-color); border-radius: 5px; padding: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <p><strong>${referral.clientName}</strong></p>
                                <p>${referral.service}</p>
                                <p style="font-size: 14px;">Requested: ${window.formatDate(referral.dateRequested)}</p>
                            </div>
                            <span style="background: ${priorityColors[referral.priority]}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                                ${referral.priority}
                            </span>
                        </div>
                        <p style="margin-top: 10px;"><strong>Status:</strong> ${referral.status}</p>
                        <button class="btn-primary" style="margin-top: 10px;" onclick="updateReferral(${referral.id})">
                            Update Status
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    window.updateReferral = function(id) {
        alert('In a full implementation, this would allow you to update the referral status.');
    };

    // Export for use in other modules
    window.StaffModule = {
        loadDashboardStats,
        loadClientCheckins,
        loadStaffNotes,
        loadReferrals
    };

})();
