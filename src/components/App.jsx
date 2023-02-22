import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../services/api';
import { Modal } from './Modal/Modal';
import { InfinitySpin } from 'react-loader-spinner';
import { Button } from './Button/Button';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [inputValue, setinputValue] = useState('');
  const [currentPreview, setcurrentPreview] = useState('');

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    getImages(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    getImages(inputValue);
  }, [page]);

  const getImages = key => {
    setisLoading(true);

    fetchImages(key, page)
      .then(({ data: { hits } }) => {
        setImages([...images, ...hits]);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setisLoading(false);
      });
  };

  const getInputValue = value => {
    setinputValue(value);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = url => {
    setcurrentPreview(url);
  };

  const closeModal = () => {
    setcurrentPreview('');
  };

  return (
    <>
      <Searchbar onSubmit={getInputValue} />

      {images.length !== 0 && (
        <>
          <ImageGallery images={images} openModal={openModal} />

          {!isLoading && <Button text="Load more" clickHandler={loadMore} />}
        </>
      )}
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <InfinitySpin width="400" color="#4c2ef7" />
        </div>
      )}
      {currentPreview && (
        <Modal closeModal={closeModal} showModal={currentPreview} />
      )}
    </>
  );
};
