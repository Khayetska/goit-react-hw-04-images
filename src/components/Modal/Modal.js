import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ src, alt, toClose }) => {
  useEffect(() => {
    const handleEscClick = evt => {
      if (evt.code === 'Escape') {
        // Додвти сюди useCallback
        toClose();
      }
    };
    window.addEventListener('keydown', handleEscClick);

    return () => window.removeEventListener('keydown', handleEscClick);
  }, []);

  const handleClickOnBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      toClose();
    }
  };

  const { overlay, modal, modalImg } = css;
  return (
    <div className={overlay} onClick={handleClickOnBackdrop}>
      <div className={modal}>
        <img src={src} alt={alt} className={modalImg} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  toClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
