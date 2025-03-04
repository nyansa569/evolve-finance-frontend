import { X } from "lucide-react";
import { cn } from "@/utils/helpers";
import "./modal.css"; // Import the CSS file

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    small: "modal-small",
    medium: "modal-medium",
    large: "modal-large",
  };

  return (
    <div className="modal-overlay" >
      <div className={cn("modal-container", sizeClasses[size])}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
