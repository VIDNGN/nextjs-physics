import React, { ReactNode } from "react";
import styles from "@/app/ui/home.module.css";
import Button from "@/app/ui/button";
import {ModalProps} from "@/app/lib/definitions";

// type ModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
// };
import {XMarkIcon} from "@heroicons/react/20/solid";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <div className={styles.modalcancelbutton}>
          <button onClick={onClose}> <XMarkIcon className="w-6" /></button>
          {/* <Button onClick={onClose}>Cancel</Button> */}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
