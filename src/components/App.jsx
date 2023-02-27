import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spinner } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
import { ToastContainer, toast } from 'react-toast';
import { FetchImages } from './fetchImages';


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

      FetchImages(this.state.search, 1)
        .then(data => {
          this.setState({
            images: data,
            loading: false,
            error: null,
            page: 1
          });
        })
        .catch(error => {
          toast.error(error.message);
          this.setState({ loading: false, error });
        });
    }
  }

  onLoadMore = () => {
    const { page, search } = this.state;

    this.setState({ loading: true });
    FetchImages(search, page + 1)
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data],
          page: prevState.page + 1,
          loading: false
        }));
      })
      .catch(error => {
        toast.error(error.message);
        this.setState({ loading: false, error });
      });
  };

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
        {images.length > 0 && <ImageGallery
          images={images}
          toggleModal={this.toggleModal}
        />}
        {!loading && images.length > 0 && images.length % 12 === 0 && <Button onClick={this.onLoadMore} />}
        {loading && <Spinner />}
        {showModal && <Modal onClose={this.toggleModal}> 
          <img src={selectedImage.largeImageURL} alt="" width='100%' /></Modal>}
        <ToastContainer position='bottom-left' delay='3000' />
      </div>
    )
  }
};

