import {
  ArrowLeftCircleIcon,
  FaceFrownIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/elements/Button';
import Navbar from '../components/Navbar';

export default function BookDetail() {
  const [detailBook, setDetailBook] = useState({});
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const bookId = useParams().id;
  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  useEffect(() => {
    (async () => {
      const {
        data: {
          data: { books },
        },
      } = await axios.get('http://13.228.170.117:8000/');
      setBooks(books);
      const filterBookById = books.filter((book) => book.id === +bookId);
      document.title = `Book Detail - ${filterBookById[0].title}`;
      setDetailBook(filterBookById[0]);
    })();
  }, [bookId]);

  return (
    <div className='bg-gradient-to-l from-gray-900 to-slate-800 pb-10 min-h-screen'>
      <Navbar books={books} />
      {detailBook?.id ? (
        <div className='py-4 mt-5 bg-gray-900 rounded-lg p-10 mx-auto md:w-3/4 md:flex-row flex flex-col md:items-center md:justify-center gap-10'>
          <div className=''>
            <picture className='rounded-lg w-56 block overflow-hidden cursor-pointer'>
              <img
                className='hover:scale-125 transition duration-200 w-full'
                src={detailBook?.cover}
                alt='cover buku'
              />
            </picture>
            <div className='flex flex-row mt-3'>
              <picture className='rounded-lg w-16 cursor-pointer block overflow-hidden'>
                <img
                  className='hover:scale-125 transition duration-200'
                  src={detailBook?.cover}
                  alt='cover buku'
                />
              </picture>
              <picture className='rounded-lg w-16 cursor-pointer mx-3 block overflow-hidden'>
                <img
                  className='hover:scale-125 transition duration-200'
                  src={detailBook?.cover}
                  alt='cover buku'
                />
              </picture>
              <picture className='rounded-lg w-16 cursor-pointer block overflow-hidden'>
                <img
                  className='hover:scale-125 transition duration-200'
                  src={detailBook?.cover}
                  alt='cover buku'
                />
              </picture>
            </div>
          </div>
          <div className=''>
            <div className='flex justify-between'>
              <p className='text-white font-bold text-3xl w-80'>
                {detailBook?.title}
              </p>
              <div className='h-10 w-32'>
                <button
                  className={
                    detailBook?.is_borrowed
                      ? 'flex items-center bg-red-600 rounded-md w-full pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white  cursor-default [&>svg]:w-7 [&>svg]:h-7'
                      : 'flex items-center justify-center text-white bg-indigo-700 rounded-md w-full pt-2.5 pb-2 text-xs font-medium uppercase leading-normal cursor-default [&>svg]:w-7 [&>svg]:h-7'
                  }
                >
                  {detailBook?.is_borrowed ? (
                    <FaceFrownIcon className='mr-1' />
                  ) : (
                    <FaceSmileIcon className='mr-1' />
                  )}
                  <span>
                    {detailBook?.is_borrowed ? 'Tidak Tersedia' : 'Tersedia'}
                  </span>
                </button>
              </div>
            </div>
            <p className='text-white text-2xl'>
              {detailBook?.author} | {detailBook?.year}
            </p>
            <p className='text-white text-2xl font-bold mt-4'>
              Deskripsi buku :
            </p>
            <p className='text-white font-normal'>{detailBook?.description}</p>
            <p className='text-white font-semibold mt-4'>Detail Buku</p>
            <div className='grid gap-4 grid-cols-2'>
              <p className='text-white font-normal'>
                Jumlah Halaman : <br /> {detailBook?.page}
              </p>
              <p className='text-white font-normal'>
                Penerbit : <br />
                {detailBook?.publisher}
              </p>
              <p className='text-white font-normal'>
                Tanggal Terbit : <br /> {formatDate(detailBook?.createdAt)}
              </p>
              <p className='text-white font-normal'>
                Berat : <br />
                {detailBook?.weight}
              </p>
              <p className='text-white font-normal'>
                ISBN : <br /> {detailBook?.isbn}
              </p>
              <p className='text-white font-normal'>
                Lebar : <br />
                {detailBook?.width}
              </p>
              <p className='text-white font-normal'>
                Bahasa : <br />
                {detailBook?.language}
              </p>
              <p className='text-white font-normal'>
                Panjang : <br />
                {detailBook?.length}
              </p>
            </div>
            <div className='flex justify-end space-x-2'>
              <div className='space-y-2'>
                <Button
                  className='transform hover:scale-110 duration-300 ease-in-out'
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeftCircleIcon />
                  Kembali
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center my-12'>
          <h1 className='text-3xl font-bold text-white'>Loading...</h1>
        </div>
      )}
    </div>
  );
}
