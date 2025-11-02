// Communication Module
(function() {
    'use strict';

    const sampleMessages = [
        {
            id: 1,
            from: 'Case Worker Sarah',
            text: 'Hi! Just checking in. How are things going?',
            timestamp: new Date(Date.now() - 3600000),
            sent: false
        },
        {
            id: 2,
            from: 'You',
            text: 'Things are better. I found a place at Hope Haven.',
            timestamp: new Date(Date.now() - 1800000),
            sent: true
        },
        {
            id: 3,
            from: 'Case Worker Sarah',
            text: 'That\'s great news! Let\'s schedule a follow-up next week.',
            timestamp: new Date(Date.now() - 900000),
            sent: false
        }
    ];

    const sampleAppointments = [
        {
            id: 1,
            title: 'Case Manager Meeting',
            date: new Date(Date.now() + 86400000 * 2),
            location: 'OutSinc Main Office',
            notes: 'Bring updated documents'
        },
        {
            id: 2,
            title: 'Health Screening',
            date: new Date(Date.now() + 86400000 * 5),
            location: 'City Health Clinic',
            notes: 'Fasting required'
        }
    ];

    const sampleSupportGroups = [
        {
            id: 1,
            name: 'Recovery Support Group',
            schedule: 'Mondays & Thursdays, 6:00 PM',
            location: 'Community Center Room 101',
            contact: 'facilitator@outsinc.org'
        },
        {
            id: 2,
            name: 'Job Skills Workshop',
            schedule: 'Wednesdays, 2:00 PM',
            location: 'OutSinc Training Center',
            contact: 'jobs@outsinc.org'
        },
        {
            id: 3,
            name: 'Mental Health Support',
            schedule: 'Tuesdays, 5:00 PM',
            location: 'Hope Haven - Meeting Room',
            contact: 'support@outsinc.org'
        }
    ];

    document.addEventListener('DOMContentLoaded', function() {
        loadMessages();
        loadAppointments();
        loadSupportGroups();
        initMessageInput();
        initScheduleAppointment();
    });

    function loadMessages() {
        let messages = window.loadData('messages');
        if (!messages || messages.length === 0) {
            messages = sampleMessages;
            window.saveData('messages', messages);
        }
        displayMessages(messages);
    }

    function displayMessages(messages) {
        const messagesList = document.getElementById('messages-list');
        if (!messagesList) return;

        if (messages.length === 0) {
            messagesList.innerHTML = '<p>No messages yet.</p>';
            return;
        }

        messagesList.innerHTML = messages.map(msg => `
            <div class="message ${msg.sent ? 'sent' : 'received'}">
                ${!msg.sent ? `<strong>${msg.from}</strong><br>` : ''}
                ${msg.text}
                <br><small>${window.formatDate(msg.timestamp)}</small>
            </div>
        `).join('');

        // Scroll to bottom
        messagesList.scrollTop = messagesList.scrollHeight;
    }

    function initMessageInput() {
        const sendButton = document.getElementById('send-message');
        const messageInput = document.getElementById('message-text');

        if (sendButton && messageInput) {
            sendButton.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    function sendMessage() {
        const messageInput = document.getElementById('message-text');
        const text = messageInput.value.trim();

        if (!text) return;

        let messages = window.loadData('messages') || [];
        const newMessage = {
            id: messages.length + 1,
            from: 'You',
            text: text,
            timestamp: new Date(),
            sent: true
        };

        messages.push(newMessage);
        window.saveData('messages', messages);
        displayMessages(messages);

        messageInput.value = '';

        // Simulate response after 2 seconds
        setTimeout(() => {
            const responseMessage = {
                id: messages.length + 1,
                from: 'Case Worker Sarah',
                text: 'Thanks for your message! I\'ll get back to you soon.',
                timestamp: new Date(),
                sent: false
            };
            messages = window.loadData('messages') || [];
            messages.push(responseMessage);
            window.saveData('messages', messages);
            displayMessages(messages);
        }, 2000);
    }

    function loadAppointments() {
        let appointments = window.loadData('appointments');
        if (!appointments || appointments.length === 0) {
            appointments = sampleAppointments;
            window.saveData('appointments', appointments);
        }
        displayAppointments(appointments);
    }

    function displayAppointments(appointments) {
        const appointmentsList = document.getElementById('appointments-list');
        if (!appointmentsList) return;

        if (appointments.length === 0) {
            appointmentsList.innerHTML = '<p>No upcoming appointments.</p>';
            return;
        }

        appointmentsList.innerHTML = appointments.map(apt => `
            <div class="resource-card">
                <h3>${apt.title}</h3>
                <p><strong>Date:</strong> ${window.formatDate(apt.date)}</p>
                <p><strong>Location:</strong> ${apt.location}</p>
                ${apt.notes ? `<p><em>${apt.notes}</em></p>` : ''}
                <button class="btn-secondary" onclick="cancelAppointment(${apt.id})">Cancel</button>
            </div>
        `).join('');
    }

    function initScheduleAppointment() {
        const scheduleButton = document.getElementById('schedule-appointment');
        if (scheduleButton) {
            scheduleButton.addEventListener('click', function() {
                alert('In a full implementation, this would open a scheduling interface.\n\nYou would be able to:\n- Select appointment type\n- Choose date and time\n- Select location\n- Add notes');
            });
        }
    }

    window.cancelAppointment = function(id) {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            let appointments = window.loadData('appointments') || [];
            appointments = appointments.filter(apt => apt.id !== id);
            window.saveData('appointments', appointments);
            displayAppointments(appointments);
        }
    };

    function loadSupportGroups() {
        let groups = window.loadData('supportGroups');
        if (!groups || groups.length === 0) {
            groups = sampleSupportGroups;
            window.saveData('supportGroups', groups);
        }
        displaySupportGroups(groups);
    }

    function displaySupportGroups(groups) {
        const groupsList = document.getElementById('support-groups');
        if (!groupsList) return;

        if (groups.length === 0) {
            groupsList.innerHTML = '<p>No support groups available.</p>';
            return;
        }

        groupsList.innerHTML = groups.map(group => `
            <div class="resource-card">
                <h3>${group.name}</h3>
                <p><strong>Schedule:</strong> ${group.schedule}</p>
                <p><strong>Location:</strong> ${group.location}</p>
                <p><strong>Contact:</strong> ${group.contact}</p>
                <button class="btn-primary">Join Group</button>
            </div>
        `).join('');
    }

    // Export for use in other modules
    window.CommunicationModule = {
        loadMessages,
        sendMessage,
        loadAppointments
    };

})();
