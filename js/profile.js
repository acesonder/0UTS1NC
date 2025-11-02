// Profile Module
(function() {
    'use strict';

    const sampleProfile = {
        name: 'Client User',
        id: 'CL-2025-001',
        intakeDate: new Date(Date.now() - 86400000 * 60),
        caseWorker: 'Sarah Johnson',
        email: 'client@example.com',
        phone: '555-0199'
    };

    const sampleServiceHistory = [
        {
            id: 1,
            date: new Date(Date.now() - 86400000 * 5),
            service: 'Shelter Check-in',
            location: 'Hope Haven Shelter',
            provider: 'John Smith'
        },
        {
            id: 2,
            date: new Date(Date.now() - 86400000 * 10),
            service: 'Health Screening',
            location: 'City Health Clinic',
            provider: 'Dr. Emily Brown'
        },
        {
            id: 3,
            date: new Date(Date.now() - 86400000 * 15),
            service: 'Job Training Session',
            location: 'OutSinc Training Center',
            provider: 'Mike Davis'
        }
    ];

    const sampleDocuments = [
        {
            id: 1,
            name: 'ID Card Copy',
            type: 'Identification',
            uploadDate: new Date(Date.now() - 86400000 * 30),
            size: '1.2 MB'
        },
        {
            id: 2,
            name: 'Intake Form',
            type: 'Administrative',
            uploadDate: new Date(Date.now() - 86400000 * 60),
            size: '450 KB'
        }
    ];

    const samplePrograms = [
        {
            id: 1,
            name: 'Housing Readiness Program',
            progress: 65,
            startDate: new Date(Date.now() - 86400000 * 45),
            milestones: [
                { name: 'Orientation', completed: true },
                { name: 'Budget Planning', completed: true },
                { name: 'Job Placement', completed: false },
                { name: 'Housing Application', completed: false }
            ]
        },
        {
            id: 2,
            name: 'Job Skills Training',
            progress: 40,
            startDate: new Date(Date.now() - 86400000 * 30),
            milestones: [
                { name: 'Skills Assessment', completed: true },
                { name: 'Resume Building', completed: true },
                { name: 'Interview Prep', completed: false },
                { name: 'Job Placement', completed: false }
            ]
        }
    ];

    document.addEventListener('DOMContentLoaded', function() {
        loadProfile();
        loadServiceHistory();
        loadDocuments();
        loadProgramProgress();
        initUploadDocument();
    });

    function loadProfile() {
        let profile = window.loadData('profile');
        if (!profile) {
            profile = sampleProfile;
            window.saveData('profile', profile);
        }
        displayProfile(profile);
    }

    function displayProfile(profile) {
        const profileInfo = document.getElementById('profile-info');
        if (!profileInfo) return;

        profileInfo.innerHTML = `
            <div style="display: grid; gap: 10px;">
                <p><strong>Name:</strong> ${profile.name}</p>
                <p><strong>Client ID:</strong> ${profile.id}</p>
                <p><strong>Intake Date:</strong> ${window.formatDate(profile.intakeDate)}</p>
                <p><strong>Case Worker:</strong> ${profile.caseWorker}</p>
                <p><strong>Email:</strong> ${profile.email || 'Not provided'}</p>
                <p><strong>Phone:</strong> ${profile.phone || 'Not provided'}</p>
            </div>
            <button class="btn-secondary" style="margin-top: 15px;" onclick="editProfile()">Edit Profile</button>
        `;
    }

    window.editProfile = function() {
        alert('In a full implementation, this would open a form to edit profile information.');
    };

    function loadServiceHistory() {
        let history = window.loadData('serviceHistory');
        if (!history || history.length === 0) {
            history = sampleServiceHistory;
            window.saveData('serviceHistory', history);
        }
        displayServiceHistory(history);
    }

    function displayServiceHistory(history) {
        const historyContainer = document.getElementById('service-history');
        if (!historyContainer) return;

        if (history.length === 0) {
            historyContainer.innerHTML = '<p>No service history yet.</p>';
            return;
        }

        historyContainer.innerHTML = `
            <div style="display: grid; gap: 15px;">
                ${history.map(item => `
                    <div style="border-left: 3px solid var(--secondary-color); padding-left: 15px;">
                        <p><strong>${item.service}</strong></p>
                        <p>${window.formatDate(item.date)}</p>
                        <p><em>${item.location}</em></p>
                        <p>Provider: ${item.provider}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function loadDocuments() {
        let documents = window.loadData('documents');
        if (!documents || documents.length === 0) {
            documents = sampleDocuments;
            window.saveData('documents', documents);
        }
        displayDocuments(documents);
    }

    function displayDocuments(documents) {
        const documentsContainer = document.getElementById('documents');
        if (!documentsContainer) return;

        if (documents.length === 0) {
            documentsContainer.innerHTML = '<p>No documents uploaded yet.</p>';
            return;
        }

        documentsContainer.innerHTML = `
            <div style="display: grid; gap: 15px; margin-bottom: 15px;">
                ${documents.map(doc => `
                    <div style="border: 1px solid var(--border-color); border-radius: 5px; padding: 15px;">
                        <p><strong>${doc.name}</strong></p>
                        <p>Type: ${doc.type}</p>
                        <p>Uploaded: ${window.formatDate(doc.uploadDate)}</p>
                        <p>Size: ${doc.size}</p>
                        <button class="btn-secondary" style="margin-top: 10px;" onclick="viewDocument(${doc.id})">View</button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function initUploadDocument() {
        const uploadButton = document.getElementById('upload-document');
        if (uploadButton) {
            uploadButton.addEventListener('click', function() {
                alert('In a full implementation, this would open a file upload dialog.\n\nYou would be able to:\n- Select files to upload\n- Choose document type\n- Add description\n- Upload securely');
            });
        }
    }

    window.viewDocument = function(id) {
        alert('In a full implementation, this would display or download the document.');
    };

    function loadProgramProgress() {
        let programs = window.loadData('programs');
        if (!programs || programs.length === 0) {
            programs = samplePrograms;
            window.saveData('programs', programs);
        }
        displayProgramProgress(programs);
    }

    function displayProgramProgress(programs) {
        const progressContainer = document.getElementById('program-progress');
        if (!progressContainer) return;

        if (programs.length === 0) {
            progressContainer.innerHTML = '<p>Not enrolled in any programs yet.</p>';
            return;
        }

        progressContainer.innerHTML = programs.map(program => `
            <div style="margin-bottom: 25px; padding: 15px; border: 1px solid var(--border-color); border-radius: 5px;">
                <h4>${program.name}</h4>
                <p>Started: ${window.formatDate(program.startDate)}</p>
                <div style="background: var(--background-color); border-radius: 10px; height: 20px; margin: 10px 0; overflow: hidden;">
                    <div style="background: var(--success-color); height: 100%; width: ${program.progress}%; transition: width 0.3s;"></div>
                </div>
                <p style="text-align: right; font-weight: bold;">${program.progress}% Complete</p>
                <div style="margin-top: 15px;">
                    <h5>Milestones:</h5>
                    <ul style="list-style: none; padding: 0;">
                        ${program.milestones.map(milestone => `
                            <li style="padding: 5px 0;">
                                <span style="color: ${milestone.completed ? 'var(--success-color)' : 'var(--text-color)'};">
                                    ${milestone.completed ? '✓' : '○'} ${milestone.name}
                                </span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    // Export for use in other modules
    window.ProfileModule = {
        loadProfile,
        loadServiceHistory,
        loadDocuments,
        loadProgramProgress
    };

})();
