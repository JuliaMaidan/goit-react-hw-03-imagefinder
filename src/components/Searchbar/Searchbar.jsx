import { Component } from 'react';
import styles from "./searchbar.module.scss"
import PropTypes from 'prop-types';
import { toast } from 'react-toast';

export class Searchbar extends Component {

    state = {
        search: ''
    }
    
    handleSearchChange = (e) => {
        this.setState({ search: e.currentTarget.value.toLowerCase() })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.search.trim() === '') {
            toast.error('Please input something');
        }
        this.props.onSubmit(this.state.search)
        this.setState({ search: '' })
        
    }

    render() {
        
        return (
            <header className={styles.header}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <button className={styles.btn} type="submit">
                        <span className={styles.btnLabel}>Search</span>
                    </button>

                    <input className={styles.input}
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearchChange}
                    type="text"
                    placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}