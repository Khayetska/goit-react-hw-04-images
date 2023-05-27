import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ image }) => {
  const [isOpen, setIsOPen] = useState(false);

  const { imageGalleryItem, imageGalleryItem_image } = css;
  const { webformatURL, tags, largeImageURL } = image;

  const toggleModal = () => {
    setIsOPen(!isOpen);
  };

  return (
    <>
      <li className={imageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={imageGalleryItem_image}
          onClick={toggleModal}
        />
      </li>
      {isOpen && <Modal src={largeImageURL} alt={tags} toClose={toggleModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
