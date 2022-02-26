import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import '../asset/Modal.css';
import { useModal } from '../context/modalContext';

function Modal({ children }) {
  const { closeModalHandler, showModal } = useModal();
  return (
    <div className={`outer-modal ${showModal ? 'modal-show' : ''}`}>
      <div className="inner-modal">
        <button onClick={closeModalHandler} className="btn-primary">
          <MdDeleteOutline />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
