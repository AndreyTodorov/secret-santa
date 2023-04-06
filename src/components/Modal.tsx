interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal = ({ children, isOpen }: ModalProps) => {
  const className = `modal ${
    isOpen ? "modal-open" : ""
  } modal-bottom sm:modal-middle`;

  return (
    <div className={className}>
      <div className="modal-box">{children}</div>
    </div>
  );
};

export default Modal;
