import React, { ReactNode } from "react";
import styles from "@/app/ui/home.module.css";
import { Button } from "@/app/ui/button";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <div className={styles.modalcancelbutton}>
          <button onClick={onClose}>Cancel</button>
          {/* <Button onClick={onClose}>Cancel</Button> */}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
