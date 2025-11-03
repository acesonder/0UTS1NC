# OutSinc - Homeless Outreach Services Web Application

A comprehensive web-based application designed for homeless outreach organizations to connect clients with vital resources and services.

## Features

### For Clients/Homeless Individuals

#### 🏠 Resource Locator
- Real-time shelter bed availability tracking
- Meal service locations and operating hours
- Shower and hygiene facilities
- Medical clinics accepting walk-ins
- Filter by resource type (shelter, food, hygiene, medical)
- Get directions to any resource

#### 🎯 Services Hub (NEW)
- **Self-Referral System**: Request referrals to services without waiting for case worker
- **Document Scanner**: Scan and upload documents using device camera
- **Job Board**: Browse local jobs, build resume, schedule interviews
- **Legal Aid Connector**: Find legal services, schedule consultations, upload documents
- **Health Tracker**: Log medical visits, medication reminders, health screening data
- **Education Portal**: Access GED programs, job skills training, free courses
- **Transportation Assistance**: Request bus passes, schedule rides, plan routes
- **Digital Wallet**: Store vouchers, tickets, and service access points
- **Service Feedback**: Rate and review services to help improve quality

#### 💬 Communication Hub
- Direct messaging with case workers
- Appointment scheduling and management
- Emergency hotline access (988, 911, Crisis Line)
- Support group information and schedules

#### 👤 Personal Profile/Case Management
- Track intake forms and documents
- View complete service history
- Store and manage ID/credential copies
- Monitor progress on enrolled programs
- Upload and manage documents securely

#### 🗺️ Navigation & Maps
- GPS directions to services
- Find nearby services based on location
- Distance calculations
- Operating hours display
- Offline map capability

#### 🎨 Customization & Accessibility
- **Theme Customization**: Light/Dark mode with 9 accent color options
- **Accessibility Features**: High contrast, large text, reduced motion
- **Persistent Preferences**: All settings saved across sessions

### For Staff

#### 📊 Staff Dashboard
- Real-time statistics (check-ins, active cases, bed availability)
- Client check-in tracking
- Referral management system
- Service utilization tracking

#### 🔍 Advanced Case Management (NEW)
- **Enhanced Case Notes**:
  - File attachments and voice memos
  - Priority flags (Normal, Important, Urgent, Critical)
  - Category classification
  - Supervisor review flags
- **Client Search & Filters**:
  - Quick search by name, ID, or case worker
  - Advanced filtering by risk level, location, needs
  - Last contact date filtering
- **Bulk Actions**:
  - Batch check-ins for multiple clients
  - Mass messaging to client groups
  - Referral assignment
  - Data export (CSV, Excel, PDF, JSON)

#### ⚙️ Staff Tools (NEW)
- **Dashboard Customization**: Configure widgets, set personal shortcuts
- **Shift Management**: Clock in/out, shift swaps, time-off requests
- **Incident Reporting**: Log and manage safety, medical, and behavioral incidents

### For Administrators

#### 🔧 Admin Tools

##### Data Management (NEW)
- **Import/Export**: Bulk upload/download resources, volunteers, donations via CSV/Excel
- **Backup/Restore**: Manual and automated system backups with retention policies

##### User & Access Management (NEW)
- **User Role Management**: Fine-grained permissions, custom roles (volunteer, partner org)
- **Audit Logs**: Complete tracking of all admin/staff actions for compliance
- **User Suspension**: Temporarily disable users, review flagged activity

##### Financial Management (NEW)
- **Grant & Funding Tracker**: Monitor grants, expenditures, deadlines, generate reports
- **Donation Portal**:
  - Online donation setup (Stripe, PayPal, Square)
  - Donor history and messaging
  - Fundraising campaigns with progress tracking
  - Automated tax receipts

##### Volunteer & Partner Management (NEW)
- **Volunteer Portal**:
  - Self-service onboarding workflow
  - Training materials management
  - Shift signup system
  - Background check tracking
- **Community Partner Management**:
  - Partner organization profiles
  - MOU tracking and document management
  - Contact management

##### Analytics & Communication (NEW)
- **Analytics Suite**:
  - Custom report builder
  - Data visualization
  - Export to PDF/Excel
  - Multi-source data aggregation
- **Bulk Messaging**:
  - Send announcements to filtered groups
  - Multi-channel delivery (in-app, email, SMS)
  - Scheduled messaging

##### Classic Admin Features
- Volunteer scheduling and management
- Donation tracking (monetary and in-kind)
- Reporting and analytics
- Resource database management
- Update service information

## Key Design Principles

- **Accessibility**: Simple UI designed to work on low-end phones with large, readable text
- **Offline Capability**: Progressive Web App (PWA) with service worker for offline access
- **Privacy-Focused**: Secure client information storage using browser localStorage
- **Low Bandwidth**: Minimal file sizes, optimized for slow connections
- **Multiple Access**: Works on phones, tablets, desktop browsers, and kiosks
- **Responsive Design**: Mobile-first design that adapts to all screen sizes

## Technology Stack

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern responsive design with CSS Grid, Flexbox, and 3D transforms
- **Vanilla JavaScript**: No framework dependencies for minimal size
- **Font Awesome 6.4**: Professional icon library (800+ icons)
- **Progressive Web App**: Offline-first with service workers
- **LocalStorage**: Client-side data persistence
- **Modern UI Features**:
  - 3D depth effects and animations
  - Glass morphism design
  - Dark/Light theme with 9 accent colors
  - Responsive modal system
  - Tab-based interfaces

## Installation

### For Development/Testing

1. Clone the repository:
```bash
git clone https://github.com/acesonder/0UTS1NC.git
cd 0UTS1NC
```

2. Serve the files using any static web server:

**Using Python:**
```bash
python3 -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

### For Production Deployment

Simply upload all files to any web server or hosting service. The application is entirely client-side and requires no backend setup.

**Recommended hosts:**
- GitHub Pages
- Netlify
- Vercel
- Any static web hosting service

## Project Structure

```
0UTS1NC/
├── index.html              # Main application HTML
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline functionality
├── styles/
│   ├── main.css           # Core application styles
│   ├── theme.css          # Theme customization system
│   └── 3d-elements.css    # 3D effects and animations
├── js/
│   ├── app.js             # Main app logic and navigation
│   ├── theme.js           # Theme management
│   ├── resources.js       # Resource locator functionality
│   ├── services.js        # Client-facing services (33KB)
│   ├── communication.js   # Messaging and appointments
│   ├── profile.js         # User profile and case management
│   ├── map.js             # Navigation and mapping
│   ├── staff.js           # Staff dashboard basics
│   ├── staff-enhanced.js  # Advanced staff features (34KB)
│   ├── admin.js           # Admin tools basics
│   └── admin-enhanced.js  # Advanced admin features (39KB)
├── assets/
│   ├── icon-192.png       # App icon 192x192
│   └── icon-512.png       # App icon 512x512
└── README.md              # This file
```

## Usage

### Client Access

1. **View Resources**: Click on "Resources" to see all available services
2. **Filter Services**: Use filter buttons to show only specific types (shelter, food, etc.)
3. **Get Directions**: Click "Get Directions" on any resource card
4. **Send Messages**: Navigate to "Communication" to message your case worker
5. **Check Profile**: View your service history and program progress in "My Profile"

### Staff Access

1. Set user role to 'staff' in browser console:
```javascript
localStorage.setItem('userRole', 'staff');
```
2. Reload the page
3. Access "Staff Dashboard" from the navigation menu

### Admin Access

1. Set user role to 'admin' in browser console:
```javascript
localStorage.setItem('userRole', 'admin');
```
2. Reload the page
3. Access both "Staff Dashboard" and "Admin" sections

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Offline Usage

The app automatically caches resources for offline use:
1. Visit the app while online
2. Key features remain available offline
3. An offline indicator appears when no connection is detected
4. Data syncs automatically when connection is restored

## Data Privacy

- All data is stored locally in the browser using localStorage
- No data is transmitted to external servers
- Users can clear their data by clearing browser storage
- In production, implement proper backend security

## Future Enhancements

- [ ] Backend API integration for real-time data sync
- [ ] Actual map integration (Google Maps, OpenStreetMap)
- [ ] Push notifications for appointments
- [ ] Multi-language support system
- [ ] Biometric authentication
- [ ] SMS/Email notification integration
- [ ] Integration with external service providers (HMIS, government databases)
- [ ] Mobile native apps (iOS/Android using Cordova/Capacitor)
- [ ] Advanced data analytics with machine learning
- [ ] Outreach route planner with GPS tracking
- [ ] Real-time incident/emergency dashboard
- [ ] AI-powered chatbot for FAQs and triage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please contact OutSinc at:
- Emergency: 1-800-OUTSINC
- Email: support@outsinc.org

## Acknowledgments

Built to serve homeless individuals and the organizations that support them.