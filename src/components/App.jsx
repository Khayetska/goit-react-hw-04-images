import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearchImg } from '../api/api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allPages, setAllPages] = useState(0);

  useEffect(() => {
    if (search === '') {
      return;
    }
    async function fetch() {
      try {
        setLoading(true);
        const { hits, totalHits } = await getSearchImg(search, page);

        if (hits.length === 0) {
          toast.error('Sorry there no image with this title');
          return;
        }

        const filtredHits = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );

        if (page === 1) {
          setImages(filtredHits);
          setAllPages(Math.ceil(totalHits / 12));
          toast.info(`We have found ${totalHits} images`);
        }

        if (page > 1) {
          setImages(prevState => [...prevState, ...filtredHits]);
        }
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [page, search]);

  const handleSubmit = imgSearch => {
    setSearch(imgSearch.trim());
    setImages([]);
    setPage(1);
  };

  const handleLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  const isVisible = images.length >= 12 && page !== allPages;

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {error && toast.error(error)}
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {isVisible && <Button onClick={handleLoadMoreClick} />}
      <ToastContainer autoClose={2000} pauseOnHover={false} />
    </>
  );
};
