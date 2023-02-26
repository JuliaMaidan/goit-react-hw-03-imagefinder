import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import styles from './imageGallery.module.scss'
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, toggleModal }) => {

    const elements = images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            key={id}
            toggleModal={() => toggleModal({ webformatURL, largeImageURL })}
        />
    ))

    return (
        <ul className={styles.gallery}>
            {elements}
        </ul>)
}

ImageGallery.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired
    }))
}