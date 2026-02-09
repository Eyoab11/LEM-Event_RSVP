// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

// API Endpoints
export const API_ENDPOINTS = {
  // Event endpoints
  getEvent: (eventId: string) => `${API_BASE_URL}/api/events/${eventId}`,
  
  // Invite endpoints
  validateInvite: (token: string) => `${API_BASE_URL}/api/invite/validate/${token}`,
  
  // RSVP endpoints
  submitRSVP: () => `${API_BASE_URL}/api/rsvp/submit`,
  getRegistration: (attendeeId: string) => `${API_BASE_URL}/api/rsvp/success/${attendeeId}`,
  cancelRSVP: (attendeeId: string) => `${API_BASE_URL}/api/rsvp/cancel/${attendeeId}`,
  
  // QR Code endpoints
  validateQR: (qrCode: string) => `${API_BASE_URL}/api/qr/validate/${qrCode}`,
  getAttendeeQR: (attendeeId: string) => `${API_BASE_URL}/api/qr/attendee/${attendeeId}`,
  
  // Calendar endpoints
  getCalendar: (attendeeId: string) => `${API_BASE_URL}/api/calendar/attendee/${attendeeId}`,
  downloadCalendar: (attendeeId: string) => `${API_BASE_URL}/api/calendar/attendee/${attendeeId}/download`,
};

// Helper function for API calls
export async function apiCall<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
