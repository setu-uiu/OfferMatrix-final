import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ToastNotification({ message }) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast">
        <CheckCircle2 className="toast-icon" size={20} />
        <span>{message}</span>
      </div>
    </div>
  );
}
