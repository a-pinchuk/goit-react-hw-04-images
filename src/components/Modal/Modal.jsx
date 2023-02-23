import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, showModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeEscModal);
    return () => {
      window.removeEventListener('keydown', closeEscModal);
    };
  });

  const closeEscModal = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div>
      <Overlay onClick={handleBackDropClick}>
        <ModalWindow>
          <img src={showModal} alt="" />
        </ModalWindow>
      </Overlay>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.string.isRequired,
};
