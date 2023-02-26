import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spinner } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
import { ToastContainer, toast } from 'react-toast';


export class App extends Component {

  state = {
    search: '',
    images: [],
    loading: false,
    page: 1,
    showModal: false,
    selectedImage: null,
    error: null
  }

  handleFormSubmit = (search) => {
    this.setState({ search })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.setState({ loading: true })

      const KEY = '33056563-cc044f40a294fc1629405232d'
      const q = this.state.search
      fetch(`https://pixabay.com/api/?q=${q}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => response.json())
          .then(data => {
          if (data.hits.length === 0) {
            toast.error("We don't have any matches.")
          }
          this.setState({ images: data.hits, loading: false, error: null })
        })
        .catch(error => {
          toast.error("Something went wrong. Please try again later.")
          this.setState({ loading: false, error })
        })
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({page: prevState.page + 1, loading: true}), () => {
      const { page } = this.state
      fetch(`https://pixabay.com/api/?q=${this.state.search}&page=${page}&key=33056563-cc044f40a294fc1629405232d&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => response.json())
          .then(data => this.setState(prevState => ({images: [...prevState.images, ...data.hits], loading: false})))
    })
  }

  toggleModal = (selectedImage) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedImage,
    }))
  }

  render() {
    const { images, loading, showModal, selectedImage } = this.state
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={images}
          toggleModal={this.toggleModal}
        />
        {!loading && images.length > 0 && images.length % 12 === 0 && <Button onClick={this.onLoadMore} />}
        {loading && <Spinner />}
        {showModal && <Modal onClose={this.toggleModal}> 
          <img src={selectedImage.largeImageURL} alt="" width='100%' /></Modal>}
        <ToastContainer position='bottom-left' delay='3000' />
      </div>
    )
  }
};

