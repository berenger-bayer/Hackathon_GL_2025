import { useEffect, useState } from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle, Calendar, Clock, MapPin, User, FileText, Phone, Check, X as XIcon } from "lucide-react";

type NotificationType = "success" | "error" | "warning" | "info" | "appointment";

interface MedicalAppointmentData {
  patientName?: string;
  patientId?: string;
  date?: string;
  time?: string;
  duration?: string;
  doctorName?: string;
  speciality?: string;
  location?: string;
  address?: string;
  reason?: string;
  instructions?: string;
  contactPhone?: string;
  isUrgent?: boolean;
  insuranceRequired?: boolean;
  documents?: string[];
}

interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose: () => void;
  details?: string;
  appointmentData?: MedicalAppointmentData;
  action?: {
    label: string;
    onClick: () => void;
  };
  onConfirmAppointment?: () => void;
  onCancelAppointment?: () => void;
  onRescheduleAppointment?: () => void;
}

const icons = {
  success: <CheckCircle2 className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  appointment: <Calendar className="w-5 h-5" />,
};

const colors = {
  success: "bg-emerald-100 border-emerald-400 text-emerald-700",
  error: "bg-red-100 border-red-400 text-red-700",
  warning: "bg-amber-100 border-amber-400 text-amber-700",
  info: "bg-blue-100 border-blue-400 text-blue-700",
  appointment: "bg-indigo-100 border-indigo-400 text-indigo-700",
};

export default function Notification({
  message,
  type = "info",
  duration = 5000,
  onClose,
  details,
  appointmentData,
  action,
  onConfirmAppointment,
  onCancelAppointment,
  onRescheduleAppointment,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(type === "appointment");
  const [appointmentStatus, setAppointmentStatus] = useState<"pending" | "confirmed" | "cancelled" | null>(null);

  useEffect(() => {
    // Animation d'entrée
    setIsVisible(true);
    
    if (duration && type !== "appointment") {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, type]);

  const handleClose = () => {
    // Animation de sortie
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Correspond à la durée de l'animation de sortie
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleConfirmAppointment = () => {
    setAppointmentStatus("confirmed");
    if (onConfirmAppointment) {
      onConfirmAppointment();
    }
  };

  const handleCancelAppointment = () => {
    setAppointmentStatus("cancelled");
    if (onCancelAppointment) {
      onCancelAppointment();
    }
  };

  // Détermine si le rendez-vous est urgent ou proche
  const isUrgentAppointment = appointmentData?.isUrgent || false;
  
  // Calcule si le rendez-vous est dans moins de 24h
  const isImminentAppointment = () => {
    if (appointmentData?.date) {
      const appointmentDate = new Date(`${appointmentData.date} ${appointmentData.time || '00:00'}`);
      const now = new Date();
      const hoursDifference = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      return hoursDifference <= 24;
    }
    return false;
  };

  // Définit la couleur de la notification en fonction de l'urgence
  const getAppointmentColorClass = () => {
    if (isUrgentAppointment) {
      return "bg-red-100 border-red-400 text-red-700";
    }
    if (isImminentAppointment()) {
      return "bg-amber-100 border-amber-400 text-amber-700";
    }
    return colors.appointment;
  };

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-auto mt-4 z-50 transition-all duration-300 print:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <div
        className={`border-l-4 rounded-lg shadow-lg p-4 flex flex-col ${
          type === "appointment" ? getAppointmentColorClass() : colors[type]
        }`}
        role="alert"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-0.5">{icons[type]}</div>
          <div className="flex-1">
            <p className="font-medium">
              {type === "appointment" && isUrgentAppointment 
                ? "Rendez-vous urgent" 
                : getTitle(type)}
            </p>
            <p className="text-sm mt-1">{message}</p>
            
            {details && !expanded && (
              <button 
                onClick={toggleExpand} 
                className="text-sm underline mt-1 hover:font-medium"
              >
                Voir plus
              </button>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fermer la notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Contenus étendus */}
        {expanded && details && (
          <div className="mt-3 ml-8 text-sm border-t pt-2 border-opacity-20 border-gray-500">
            <p>{details}</p>
            <button 
              onClick={toggleExpand} 
              className="text-xs underline mt-1 hover:font-medium"
            >
              Voir moins
            </button>
          </div>
        )}
        
        {/* Informations de rendez-vous médical */}
        {type === "appointment" && appointmentData && (
          <div className={`mt-3 ml-8 p-3 bg-white bg-opacity-50 rounded-md ${appointmentStatus === "cancelled" ? "opacity-60" : ""}`}>
            {/* Statut du rendez-vous */}
            {appointmentStatus && (
              <div className={`mb-2 text-sm font-medium rounded-full py-1 px-3 inline-block
                ${appointmentStatus === "confirmed" ? "bg-green-100 text-green-700" : ""}
                ${appointmentStatus === "cancelled" ? "bg-red-100 text-red-700" : ""}
              `}>
                {appointmentStatus === "confirmed" && "Rendez-vous confirmé"}
                {appointmentStatus === "cancelled" && "Rendez-vous annulé"}
              </div>
            )}

            {/* Informations patient */}
            {appointmentData.patientName && (
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                <p className="text-sm font-medium">{appointmentData.patientName}</p>
                {appointmentData.patientId && (
                  <span className="text-xs text-gray-500">ID: {appointmentData.patientId}</span>
                )}
              </div>
            )}

            {/* Date et heure */}
            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{appointmentData.date || "Date non spécifiée"}</span>
              </div>
              
              {appointmentData.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {appointmentData.time}
                    {appointmentData.duration && ` (${appointmentData.duration})`}
                  </span>
                </div>
              )}
            </div>

            {/* Docteur et spécialité */}
            {appointmentData.doctorName && (
              <div className="flex items-start gap-2 mb-2">
                <User className="w-4 h-4" />
                <div>
                  <span className="text-sm font-medium">Dr. {appointmentData.doctorName}</span>
                  {appointmentData.speciality && (
                    <span className="text-xs block text-gray-600">{appointmentData.speciality}</span>
                  )}
                </div>
              </div>
            )}
            
            {/* Lieu */}
            {(appointmentData.location || appointmentData.address) && (
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                <div>
                  {appointmentData.location && (
                    <span className="text-sm">{appointmentData.location}</span>
                  )}
                  {appointmentData.address && (
                    <span className="text-xs block text-gray-600">{appointmentData.address}</span>
                  )}
                </div>
              </div>
            )}
            
            {/* Motif */}
            {appointmentData.reason && (
              <div className="flex items-start gap-2 mb-2">
                <FileText className="w-4 h-4" />
                <p className="text-sm">
                  <span className="font-medium">Motif:</span> {appointmentData.reason}
                </p>
              </div>
            )}
            
            {/* Instructions */}
            {appointmentData.instructions && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                <p className="font-medium">Instructions:</p>
                <p>{appointmentData.instructions}</p>
              </div>
            )}
            
            {/* Documents nécessaires */}
            {appointmentData.documents && appointmentData.documents.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Documents à apporter:</p>
                <ul className="text-xs list-disc pl-5 mt-1">
                  {appointmentData.documents.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact */}
            {appointmentData.contactPhone && (
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Phone className="w-4 h-4" />
                <a href={`tel:${appointmentData.contactPhone}`} className="underline text-blue-600">
                  {appointmentData.contactPhone}
                </a>
              </div>
            )}
            
            {/* Assurance */}
            {appointmentData.insuranceRequired && (
              <div className="mt-2 text-xs text-red-600">
                N'oubliez pas d'apporter votre carte d'assurance maladie
              </div>
            )}
          </div>
        )}
        
        {/* Actions du rendez-vous */}
        {type === "appointment" && !appointmentStatus && (
          <div className="mt-3 ml-8 flex flex-wrap gap-2">
            {onConfirmAppointment && (
              <button
                onClick={handleConfirmAppointment}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md shadow-sm hover:shadow-md transition-shadow flex items-center gap-1"
              >
                <Check className="w-4 h-4" /> Confirmer
              </button>
            )}
            {onRescheduleAppointment && (
              <button
                onClick={onRescheduleAppointment}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md shadow-sm hover:shadow-md transition-shadow flex items-center gap-1"
              >
                <Calendar className="w-4 h-4" /> Reprogrammer
              </button>
            )}
            {onCancelAppointment && (
              <button
                onClick={handleCancelAppointment}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md shadow-sm hover:shadow-md transition-shadow flex items-center gap-1"
              >
                <XIcon className="w-4 h-4" /> Annuler
              </button>
            )}
          </div>
        )}
        
        {/* Bouton d'action */}
        {action && (
          <div className="mt-3 ml-8">
            <button
              onClick={action.onClick}
              className="px-3 py-1 text-sm bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function getTitle(type: NotificationType): string {
  const titles = {
    success: "Succès",
    error: "Erreur",
    warning: "Avertissement",
    info: "Information",
    appointment: "Rappel de rendez-vous",
  };
  return titles[type];
}