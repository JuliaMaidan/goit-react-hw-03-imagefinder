import { Component } from "react";
import { createPortal } from "react-dom";
import styles from './modal.module.scss';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root')

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose()
        }
    }

    handleClick = (e) => {
        if (e.target === e.currentTarget) {
        this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <div className={styles.backdrop} onClick={this.handleClick}>
                <div className={styles.modal}>
                    {this.props.children}
                </div>
            </div>, modalRoot
        )
    }
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
}