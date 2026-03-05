import './EmergencyModal.css';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contacts = [
  { icon: '👩', name: 'Mamá Rosa', role: 'Familiar directo' },
  { icon: '🏥', name: 'Hospital Materno', role: '2.3 km · Abierto 24h' },
  { icon: '🚑', name: 'SAMU Ambulancia', role: 'Línea de emergencia' },
];

export default function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  const handleConfirm = () => {
    alert('🚨 Alerta de emergencia enviada. Tu ubicación ha sido compartida con tu red de confianza.');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal-overlay${isOpen ? ' show' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="modal">
        <div className="modal-header">
          <h2>🚨 EMERGENCIA ACTIVADA</h2>
          <p>Se enviará tu ubicación a contactos de emergencia</p>
        </div>
        <div className="modal-body">
          <div className="modal-sub">
            Se alertará a tu red de confianza y al hospital más cercano.
            ¿Confirmas la emergencia?
          </div>
          <div className="contact-items">
            {contacts.map((c) => (
              <div className="contact-item" key={c.name}>
                <div className="contact-icon">{c.icon}</div>
                <div className="contact-info">
                  <div className="contact-name">{c.name}</div>
                  <div className="contact-role">{c.role}</div>
                </div>
                <div className="contact-badge">✓ Activo</div>
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <button className="btn-modal-panic" onClick={handleConfirm}>
              🚨 CONFIRMAR EMERGENCIA
            </button>
            <button className="btn-modal-sms">
              📱 Enviar SMS sin internet
            </button>
            <button className="btn-modal-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
