import React from 'react';
import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.scss';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, toggleModal }) => {
  return (
    <li className={styles.galleryItem} key={id} onClick={() => toggleModal({ webformatURL, largeImageURL })}>
      <img className={styles.image} src={webformatURL} alt="Img" />
    </li>)
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

