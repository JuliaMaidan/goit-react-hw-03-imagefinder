import React from 'react';
import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.scss';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, toggleModal }) => {
  return (
    <li className={styles.galleryItem} onClick={() => toggleModal({ largeImageURL })}>
      <img className={styles.image} src={webformatURL} alt="Img" />
    </li>)
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

