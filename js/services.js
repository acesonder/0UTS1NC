// Services Module - Handles all client-facing service features
(function() {
    'use strict';

    // Self-Referral System
    window.openSelfReferral = function() {
        showModal('Self-Referral Request', `
            <form id="self-referral-form">
                <div class="form-group">
                    <label for="referral-service">Service Type:</label>
                    <select id="referral-service" required>
                        <option value="">Select a service...</option>
                        <option value="mental-health">Mental Health Services</option>
                        <option value="substance-abuse">Substance Abuse Treatment</option>
                        <option value="job-training">Job Training Program</option>
                        <option value="housing">Housing Assistance</option>
                        <option value="legal">Legal Aid</option>
                        <option value="healthcare">Healthcare Services</option>
                        <option value="education">Education Programs</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="referral-reason">Reason for Referral:</label>
                    <textarea id="referral-reason" rows="4" required placeholder="Please describe why you need this service..."></textarea>
                </div>
                <div class="form-group">
                    <label for="referral-urgency">Urgency Level:</label>
                    <select id="referral-urgency" required>
                        <option value="low">Low - Can wait a week or more</option>
                        <option value="medium">Medium - Needed within a week</option>
                        <option value="high">High - Needed within 48 hours</option>
                        <option value="emergency">Emergency - Immediate need</option>
                    </select>
                </div>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-paper-plane"></i> Submit Referral Request
                </button>
            </form>
        `);

        const form = document.getElementById('self-referral-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate form elements exist
                const serviceEl = document.getElementById('referral-service');
                const reasonEl = document.getElementById('referral-reason');
                const urgencyEl = document.getElementById('referral-urgency');
                
                if (!serviceEl || !reasonEl || !urgencyEl) {
                    alert('Form error: Required fields are missing.');
                    return;
                }
                
                const referralData = {
                    service: serviceEl.value,
                    reason: reasonEl.value,
                    urgency: urgencyEl.value,
                    date: new Date(),
                    status: 'Pending'
                };
                
                // Save to localStorage
                let referrals = window.loadData('userReferrals') || [];
                referrals.push(referralData);
                window.saveData('userReferrals', referrals);
                
                closeModal();
                alert('Referral request submitted successfully! A case worker will review your request within 24-48 hours.');
            });
        }
    };

    // Document Scanner
    window.openDocumentScanner = function() {
        showModal('Document Scanner', `
            <div class="document-scanner">
                <p>Use your device camera to scan and upload documents</p>
                <div class="scanner-options">
                    <input type="file" id="camera-input" accept="image/*" capture="environment" style="display: none;">
                    <input type="file" id="file-input" accept="image/*,application/pdf" multiple style="display: none;">
                    
                    <button class="btn-primary" onclick="document.getElementById('camera-input').click()">
                        <i class="fas fa-camera"></i> Take Photo
                    </button>
                    <button class="btn-secondary" onclick="document.getElementById('file-input').click()">
                        <i class="fas fa-upload"></i> Upload from Device
                    </button>
                </div>
                <div id="scanned-docs" class="scanned-docs" style="margin-top: 20px;"></div>
            </div>
        `);

        const cameraInput = document.getElementById('camera-input');
        const fileInput = document.getElementById('file-input');
        
        [cameraInput, fileInput].forEach(input => {
            input.addEventListener('change', function(e) {
                const files = e.target.files;
                if (files.length > 0) {
                    Array.from(files).forEach(file => {
                        saveDocument(file);
                    });
                    alert(`${files.length} document(s) uploaded successfully!`);
                }
            });
        });
    };

    function saveDocument(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let documents = window.loadData('userDocuments') || [];
            documents.push({
                name: file.name,
                type: file.type,
                size: file.size,
                uploadDate: new Date(),
                data: e.target.result
            });
            window.saveData('userDocuments', documents);
        };
        reader.readAsDataURL(file);
    }

    // Job Board
    window.openJobBoard = function() {
        const sampleJobs = [
            { title: 'Warehouse Associate', company: 'ABC Logistics', location: 'Downtown', pay: '$15/hr', type: 'Full-time' },
            { title: 'Restaurant Server', company: 'Main Street Café', location: 'Central District', pay: '$12/hr + tips', type: 'Part-time' },
            { title: 'Retail Sales', company: 'City Mart', location: 'Northside', pay: '$13.50/hr', type: 'Full-time' },
            { title: 'Custodian', company: 'School District', location: 'Various', pay: '$14/hr', type: 'Full-time' },
            { title: 'Delivery Driver', company: 'Quick Delivery', location: 'Citywide', pay: '$16/hr', type: 'Full-time' }
        ];

        showModal('Job Board', `
            <div class="job-board">
                <div style="margin-bottom: 20px;">
                    <button class="btn-secondary" onclick="openResumeBuilder()">
                        <i class="fas fa-file-alt"></i> Build/Edit Resume
                    </button>
                </div>
                <div class="jobs-list">
                    ${sampleJobs.map(job => `
                        <div class="job-card" style="border: 1px solid var(--border-color); padding: 15px; margin-bottom: 10px; border-radius: 5px;">
                            <h4 style="margin: 0 0 10px 0;">${job.title}</h4>
                            <p><strong>${job.company}</strong> - ${job.location}</p>
                            <p><i class="fas fa-dollar-sign"></i> ${job.pay} | <i class="fas fa-clock"></i> ${job.type}</p>
                            <button class="btn-primary" style="margin-top: 10px;">
                                <i class="fas fa-paper-plane"></i> Apply Now
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `);
    };

    window.openResumeBuilder = function() {
        alert('Resume Builder\n\nThis feature would provide:\n- Step-by-step resume creation\n- Professional templates\n- Skills assessment\n- Download as PDF\n- Email to employers');
    };

    // Legal Aid Connector
    window.openLegalAid = function() {
        showModal('Legal Aid Services', `
            <div class="legal-aid">
                <div class="legal-services">
                    <div class="service-item">
                        <h4><i class="fas fa-gavel"></i> Free Legal Consultation</h4>
                        <p>Get free legal advice for housing, employment, and family matters</p>
                        <button class="btn-primary">Schedule Consultation</button>
                    </div>
                    <div class="service-item" style="margin-top: 15px;">
                        <h4><i class="fas fa-file-contract"></i> Document Assistance</h4>
                        <p>Help with legal documents, applications, and forms</p>
                        <button class="btn-primary">Get Help</button>
                    </div>
                    <div class="service-item" style="margin-top: 15px;">
                        <h4><i class="fas fa-balance-scale"></i> Court Support</h4>
                        <p>Representation and support for court appearances</p>
                        <button class="btn-primary">Request Support</button>
                    </div>
                </div>
                <div style="margin-top: 20px; padding: 15px; background: var(--background-color); border-radius: 5px;">
                    <h4>Emergency Legal Hotline</h4>
                    <p style="font-size: 24px; font-weight: bold;">1-800-LEGAL-AID</p>
                    <p>Available 24/7 for urgent legal matters</p>
                </div>
            </div>
        `);
    };

    // Health Tracker
    window.openHealthTracker = function() {
        showModal('Health Tracker', `
            <div class="health-tracker">
                <div class="health-tabs">
                    <button class="tab-btn active" data-tab="appointments">Medical Visits</button>
                    <button class="tab-btn" data-tab="medications">Medications</button>
                    <button class="tab-btn" data-tab="screenings">Screenings</button>
                </div>
                <div id="appointments-content" class="tab-content active">
                    <button class="btn-primary" style="margin-bottom: 15px;">
                        <i class="fas fa-plus"></i> Log Medical Visit
                    </button>
                    <div id="visits-list">
                        <p>No medical visits logged yet.</p>
                    </div>
                </div>
                <div id="medications-content" class="tab-content" style="display: none;">
                    <button class="btn-primary" style="margin-bottom: 15px;">
                        <i class="fas fa-pills"></i> Add Medication
                    </button>
                    <p>Set medication reminders and track your prescriptions</p>
                </div>
                <div id="screenings-content" class="tab-content" style="display: none;">
                    <button class="btn-primary" style="margin-bottom: 15px;">
                        <i class="fas fa-heartbeat"></i> Log Screening
                    </button>
                    <p>Track blood pressure, blood sugar, and other health metrics</p>
                </div>
            </div>
        `);

        document.querySelectorAll('.health-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.health-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                document.querySelectorAll('.health-tracker .tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                const tabName = this.getAttribute('data-tab');
                const content = document.getElementById(tabName + '-content');
                if (content) content.style.display = 'block';
            });
        });
    };

    // Education Portal
    window.openEducationPortal = function() {
        showModal('Education Portal', `
            <div class="education-portal">
                <h3>Free Educational Resources</h3>
                <div class="education-categories">
                    <div class="edu-card">
                        <i class="fas fa-graduation-cap fa-2x" style="color: var(--secondary-color);"></i>
                        <h4>GED Preparation</h4>
                        <p>Free GED prep courses and testing information</p>
                        <button class="btn-primary">Enroll Now</button>
                    </div>
                    <div class="edu-card" style="margin-top: 15px;">
                        <i class="fas fa-laptop-code fa-2x" style="color: var(--secondary-color);"></i>
                        <h4>Job Skills Training</h4>
                        <p>Computer skills, resume writing, interview prep</p>
                        <button class="btn-primary">View Courses</button>
                    </div>
                    <div class="edu-card" style="margin-top: 15px;">
                        <i class="fas fa-tools fa-2x" style="color: var(--secondary-color);"></i>
                        <h4>Trade Skills</h4>
                        <p>Construction, HVAC, electrical, plumbing basics</p>
                        <button class="btn-primary">Learn More</button>
                    </div>
                    <div class="edu-card" style="margin-top: 15px;">
                        <i class="fas fa-language fa-2x" style="color: var(--secondary-color);"></i>
                        <h4>English Classes</h4>
                        <p>ESL and literacy programs</p>
                        <button class="btn-primary">Join Class</button>
                    </div>
                </div>
            </div>
        `);
    };

    // Transportation Assistance
    window.openTransportation = function() {
        showModal('Transportation Assistance', `
            <div class="transportation">
                <div class="transport-options">
                    <div class="transport-card">
                        <i class="fas fa-bus fa-3x" style="color: var(--secondary-color);"></i>
                        <h4>Bus Pass Request</h4>
                        <p>Request free or reduced fare bus passes</p>
                        <button class="btn-primary">Request Pass</button>
                    </div>
                    <div class="transport-card" style="margin-top: 15px;">
                        <i class="fas fa-car fa-3x" style="color: var(--secondary-color);"></i>
                        <h4>Ride Scheduling</h4>
                        <p>Schedule rides to appointments and services</p>
                        <button class="btn-primary">Schedule Ride</button>
                    </div>
                    <div class="transport-card" style="margin-top: 15px;">
                        <i class="fas fa-route fa-3x" style="color: var(--secondary-color);"></i>
                        <h4>Route Planning</h4>
                        <p>Plan your public transit routes</p>
                        <button class="btn-primary">Plan Route</button>
                    </div>
                </div>
            </div>
        `);
    };

    // Digital Wallet
    window.openDigitalWallet = function() {
        const walletItems = window.loadData('digitalWallet') || [];
        
        showModal('Digital Wallet', `
            <div class="digital-wallet">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h3>Your Balance: <span style="color: var(--success-color);">$0.00</span></h3>
                    <p>Points: <strong>0</strong></p>
                </div>
                <div class="wallet-items">
                    ${walletItems.length > 0 ? walletItems.map(item => `
                        <div class="wallet-item">
                            <h4>${item.name}</h4>
                            <p>${item.description}</p>
                            <p><small>Expires: ${item.expiry}</small></p>
                        </div>
                    `).join('') : '<p>No vouchers or tickets yet.</p>'}
                </div>
                <button class="btn-primary" style="margin-top: 15px; width: 100%;">
                    <i class="fas fa-qrcode"></i> Scan QR Code
                </button>
            </div>
        `);
    };

    // Service Feedback
    window.openServiceFeedback = function() {
        showModal('Rate Services', `
            <form id="feedback-form">
                <div class="form-group">
                    <label for="feedback-service">Service to Rate:</label>
                    <select id="feedback-service" required>
                        <option value="">Select a service...</option>
                        <option value="shelter">Shelter Services</option>
                        <option value="food">Food Services</option>
                        <option value="medical">Medical Services</option>
                        <option value="hygiene">Hygiene Services</option>
                        <option value="case-management">Case Management</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Rating:</label>
                    <div class="star-rating" style="font-size: 32px; color: #FFD700;">
                        <span class="star" data-rating="1">☆</span>
                        <span class="star" data-rating="2">☆</span>
                        <span class="star" data-rating="3">☆</span>
                        <span class="star" data-rating="4">☆</span>
                        <span class="star" data-rating="5">☆</span>
                    </div>
                    <input type="hidden" id="rating-value" required>
                </div>
                <div class="form-group">
                    <label for="feedback-comments">Comments:</label>
                    <textarea id="feedback-comments" rows="4" placeholder="Share your experience..."></textarea>
                </div>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-paper-plane"></i> Submit Feedback
                </button>
            </form>
        `);

        // Star rating interaction
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                document.getElementById('rating-value').value = rating;
                
                stars.forEach((s, idx) => {
                    s.textContent = idx < rating ? '★' : '☆';
                });
            });
        });

        document.getElementById('feedback-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const feedback = {
                service: document.getElementById('feedback-service').value,
                rating: document.getElementById('rating-value').value,
                comments: document.getElementById('feedback-comments').value,
                date: new Date()
            };
            
            let feedbacks = window.loadData('serviceFeedback') || [];
            feedbacks.push(feedback);
            window.saveData('serviceFeedback', feedbacks);
            
            closeModal();
            alert('Thank you for your feedback! Your input helps us improve our services.');
        });
    };

    // Modal Helper Functions
    function showModal(title, content) {
        // Remove existing modal if any
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

    // Form group styling
    const style = document.createElement('style');
    style.textContent = `
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--text-color);
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 5px;
            font-size: 14px;
            font-family: inherit;
            background: var(--card-background);
            color: var(--text-color);
        }
        .form-group textarea {
            resize: vertical;
        }
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            display: none;
        }
        .modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        .modal-content {
            position: relative;
            background: var(--card-background);
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: modalSlideIn 0.3s ease;
        }
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
        }
        .modal-header h2 {
            margin: 0;
            font-size: 24px;
            color: var(--primary-color);
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--text-color);
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
        }
        .modal-close:hover {
            background: var(--background-color);
            transform: rotate(90deg);
        }
        .modal-body {
            padding: 20px;
        }
        .edu-card, .transport-card, .service-item {
            padding: 15px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: var(--background-color);
        }
        .edu-card h4, .transport-card h4, .service-item h4 {
            margin: 10px 0;
            color: var(--primary-color);
        }
        .star {
            cursor: pointer;
            transition: all 0.2s;
        }
        .star:hover {
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(style);

})();
