'use client';

import { useState, useEffect } from 'react';

interface QRCodeDisplayProps {
  attendeeName: string;
  registrationId: string;
  eventId: string;
  qrCodeData?: string; // QR code hash from backend
  attendeeId?: string; // Attendee ID to fetch QR code
}

export function QRCodeDisplay({ attendeeName, registrationId, eventId, qrCodeData, attendeeId }: QRCodeDisplayProps) {
  const [qrCodeImage, setQrCodeImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQRCode = async () => {
      if (!attendeeId) {
        setError('No attendee ID available');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch QR code image directly from backend
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const response = await fetch(`${API_URL}/api/qr/attendee/${attendeeId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch QR code');
        }

        const data = await response.json();
        
        // The backend returns qrCodeImage as base64 data URL
        setQrCodeImage(data.qrCodeImage);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching QR code:', err);
        setError('Failed to load QR code');
        setIsLoading(false);
      }
    };

    fetchQRCode();
  }, [attendeeId]);

  const downloadQRCode = () => {
    if (!qrCodeImage) return;

    // Convert base64 to blob and download
    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = `qr-code-${registrationId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="premium-glass rounded-3xl p-8 text-center">
      <h3 className="text-xl md:text-2xl font-light mb-6 premium-text-gradient">
        Your Check-in QR Code
      </h3>
      
      {isLoading ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-48 bg-black/50 border border-amber-500/30 rounded-2xl flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400">Loading your QR code...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-48 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center">
            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          {/* QR Code Display */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <img 
              src={qrCodeImage} 
              alt="QR Code" 
              className="w-48 h-48"
            />
          </div>
          
          {/* Registration ID */}
          <div className="bg-black/30 px-6 py-3 rounded-full border border-amber-500/30">
            <p className="text-amber-400 font-mono text-sm">{registrationId}</p>
          </div>
          
          {/* Instructions */}
          <div className="space-y-3 text-gray-300">
            <p className="font-medium">Present this QR code at the event for check-in</p>
            <p className="text-sm">
              Save this code to your phone or print it out. You can also find it in your confirmation email.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadQRCode}
              className="premium-button bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:via-amber-500 hover:to-amber-400 text-white px-6 py-3 rounded-full text-sm font-medium tracking-wide"
            >
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}