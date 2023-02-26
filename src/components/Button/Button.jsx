import { Component } from "react";
import styles from './button.module.scss';
import PropTypes from 'prop-types';

export class Button extends Component {

    render() {
        const { onClick } = this.props
        
    return (
        <button className={styles.btn} type="button" onClick={onClick}>Load more</button>
    ) 
    }
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired
}