import { useState, createContext, useContext } from 'react';

const ModalContext = createContext();

function useModal() {
  const { showModal, setShowModal } = useContext(ModalContext);

  const openModalhandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return { closeModalHandler, openModalhandler, showModal };
}

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  let value = { showModal, setShowModal };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export { useModal, ModalProvider };
