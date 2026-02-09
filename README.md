# Event RSVP Frontend

A modern, responsive Next.js application for event registration and RSVP management. This is the public-facing interface where attendees can register for events using invitation tokens.

## Features

- **Invitation Validation**: Secure token-based event access
- **RSVP Form**: User-friendly registration with plus-one support
- **Real-time Capacity**: Live event capacity status
- **QR Code Display**: Unique QR codes for event check-in
- **Calendar Integration**: Download .ics calendar files
- **Email Confirmation**: Automated confirmation emails
- **Mobile Responsive**: Optimized for all devices
- **Event Details**: Beautiful event information display
- **Partner Logos**: Showcase event partners and sponsors

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom React components
- **API Integration**: REST API client
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend-event-rsvp)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LEM-Event_RSVP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   # Backend API URL
   NEXT_PUBLIC_API_URL=http://localhost:3002
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
LEM-Event_RSVP/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   └── rsvp/
│       ├── page.tsx                # RSVP form page
│       └── success/
│           └── [attendeeId]/
│               └── page.tsx        # Success page with QR code
├── components/
│   ├── AttendeeForm.tsx            # Attendee registration form
│   ├── CapacityStatus.tsx          # Event capacity display
│   ├── ConfirmationStep.tsx        # Registration confirmation
│   ├── ErrorBoundary.tsx           # Error handling
│   ├── EventDetails.tsx            # Event information display
│   ├── LoadingSpinner.tsx          # Loading states
│   ├── MobileNavigation.tsx        # Mobile navigation
│   ├── PartnerLogoGrid.tsx         # Partner logos
│   ├── QRCodeDisplay.tsx           # QR code display
│   ├── ResponsiveLayout.tsx        # Responsive wrapper
│   └── RSVPForm.tsx                # Main RSVP form
├── lib/
│   └── api.ts                      # API client and endpoints
├── public/
│   └── [images]                    # Static assets
└── [config files]                  # Next.js, TypeScript, etc.
```

## Key Components

### RSVP Flow

1. **Landing Page** (`app/page.tsx`)
   - Event overview
   - Partner logos
   - Call-to-action

2. **RSVP Form** (`app/rsvp/page.tsx`)
   - Token validation
   - Attendee information
   - Plus-one support
   - Capacity checking

3. **Success Page** (`app/rsvp/success/[attendeeId]/page.tsx`)
   - Registration confirmation
   - QR code display
   - Calendar download
   - Event details

### API Integration

The application communicates with the backend API through the `lib/api.ts` client:

```typescript
// Validate invitation token
const invite = await apiCall(API_ENDPOINTS.validateInvite(token));

// Submit RSVP
const response = await apiCall(API_ENDPOINTS.submitRSVP(), {
  method: 'POST',
  body: JSON.stringify(rsvpData)
});

// Get registration details
const registration = await apiCall(API_ENDPOINTS.getRegistration(attendeeId));
```

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL | `https://api.yourdomain.com` |

## Development

### Running Locally

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Customization

#### Update Event Branding

1. Replace logos in `public/` directory
2. Update colors in `app/globals.css`
3. Modify event details in components

#### Customize Forms

Edit `components/RSVPForm.tsx` and `components/AttendeeForm.tsx` to add/remove fields.

## Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configure environment variables**
   - Add `NEXT_PUBLIC_API_URL` in Vercel dashboard
   - Set to your production backend URL

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use Next.js plugin
- **AWS Amplify**: Connect repository
- **DigitalOcean App Platform**: Deploy from GitHub
- **Self-hosted**: Build and run with Node.js

### Build Configuration

```bash
# Build the application
npm run build

# The output will be in .next/ directory
# Start production server
npm run start
```

## Features in Detail

### Invitation System

- Secure token-based access
- Token validation before form display
- Expiration checking
- Event capacity verification

### RSVP Form

- Real-time validation
- Plus-one support
- Company information
- Email verification
- Capacity status display

### Success Page

- Registration confirmation
- Unique QR code for check-in
- Calendar file download (.ics)
- Event details summary
- Email confirmation notice

### Mobile Responsive

- Optimized for all screen sizes
- Touch-friendly interface
- Mobile navigation
- Responsive images

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/invite/validate/:token` | GET | Validate invitation token |
| `/api/rsvp/submit` | POST | Submit RSVP registration |
| `/api/rsvp/success/:attendeeId` | GET | Get registration details |
| `/api/qr/attendee/:attendeeId` | GET | Get QR code |
| `/api/calendar/attendee/:attendeeId/download` | GET | Download calendar file |

## Troubleshooting

### Common Issues

**"Cannot connect to backend"**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Ensure backend is running
- Check CORS settings in backend

**"Invalid token"**
- Token may be expired
- Token may have been used
- Check token format

**"Event at capacity"**
- Event has reached maximum attendees
- User will be added to waitlist

**Environment variables not loading**
- Restart dev server after changing `.env`
- Ensure variable starts with `NEXT_PUBLIC_`
- Check for typos in variable names

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Server-side rendering (SSR)
- Optimized images
- Code splitting
- Fast page loads
- Minimal JavaScript bundle

## Security

- Token-based authentication
- Input validation
- XSS protection
- CSRF protection (via backend)
- Secure API communication

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- **Backend API**: Event RSVP Backend (backend-event-rsvp)
- **Admin Dashboard**: RSVP Admin Dashboard (rsvp-admin)

## Support

For issues or questions, please open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
