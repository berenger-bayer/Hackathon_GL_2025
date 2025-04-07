import { useEffect } from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export default function Notification({ message, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}
