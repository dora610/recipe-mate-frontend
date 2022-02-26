import React from 'react';
import { MdClose, MdDeleteOutline } from 'react-icons/md';
import '../asset/Modal.css';
import { useModal } from '../context/modalContext';

function Modal({ children }) {
  const { closeModalHandler, showModal } = useModal();
  return (
    <div className={`outer-modal ${showModal ? 'modal-show' : ''}`}>
      <div className="inner-modal">
        {children}
        <button onClick={closeModalHandler} className="modal-close">
          <MdClose />
        </button>
      </div>
    </div>
  );
}

export default Modal;
