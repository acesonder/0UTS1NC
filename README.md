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

### For Staff

#### 📊 Staff Dashboard
- Real-time statistics (check-ins, active cases, bed availability)
- Client check-in tracking
- Case notes and client history
- Referral management system
- Service utilization tracking

### For Administrators

#### ⚙️ Admin Tools
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
- **CSS3**: Modern responsive design with CSS Grid and Flexbox
- **Vanilla JavaScript**: No framework dependencies for minimal size
- **Progressive Web App**: Offline-first with service workers
- **LocalStorage**: Client-side data persistence

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
│   └── main.css           # All application styles
├── js/
│   ├── app.js             # Main app logic and navigation
│   ├── resources.js       # Resource locator functionality
│   ├── communication.js   # Messaging and appointments
│   ├── profile.js         # User profile and case management
│   ├── map.js             # Navigation and mapping
│   ├── staff.js           # Staff dashboard
│   └── admin.js           # Admin tools
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

- [ ] Backend API integration for real-time data
- [ ] Actual map integration (Google Maps, OpenStreetMap)
- [ ] Push notifications for appointments
- [ ] Multi-language support
- [ ] Biometric authentication
- [ ] Photo upload for documents
- [ ] SMS/Email notifications
- [ ] Integration with external service providers
- [ ] Advanced reporting and analytics
- [ ] Mobile native apps (iOS/Android)

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