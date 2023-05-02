import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Navbar from '../components/Navbar';
import Category from '../components/elements/Category';
import BookListContainer from '../components/elements/BookListContainer';
import { useLocation, useNavigate } from 'react-router-dom';

const toastrOptions = {
  position: 'top-center',
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export default function BookList() {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [books, setBooks] = useState([]);
  const [isReset, setIsReset] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('search');

  useEffect(() => {
    document.title = 'All Books';

    (async () => {
      const {
        data: {
          data: { books },
        },
      } = await axios.get('http://13.228.170.117:8000/');

      if (keyword) {
        const filteredBooks = books.filter((book) =>
          book.title.toLowerCase().includes(keyword.toLowerCase())
        );

        console.log(filteredBooks);

        if (filteredBooks.length === 0) {
          setFilteredBooks(null);
        } else {
          setFilteredBooks(filteredBooks);
        }

      }

      setBooks(books);
    })();
  }, [isReset]);

  function filterBooksHandler(e) {
    e.preventDefault();
    setFilteredBooks([]);

    const bookYearStart = e.target[5].value;
    const bookYearEnd = e.target[6].value;
    const checkedBoxes = Array.from(e.target).filter((input) => input.checked);
    const checkedValues = checkedBoxes.map((input) => input.value);

    const filteredBooks = books.filter(
      (book) =>
        checkedValues.includes(book.category) ||
        (book.year >= bookYearStart && book.year <= bookYearEnd)
    );

    if (filteredBooks.length === 0) {
      toast.error('Buku yang Anda cari tidak ditemukan', toastrOptions);
    }

    setFilteredBooks(filteredBooks);
  }

  return (
    <div className='bg-gradient-to-l from-gray-900 to-slate-800 text-white min-h-screen pb-10'>
      <Navbar books={books} />
      <div className='container px-2 md:px-0 md:flex mx-auto md:space-x-5'>
        <div className='pt-2 md:pt-[60px] flex flex-col'>
          <h2 className='uppercase font-bold text-lg'>FILTER</h2>
          <div className='w-full md:w-72 mt-3 rounded-lg bg-gray-900 shadow-[0_2px_4px_3px_#FAF2F240]'>
            <div className='flex flex-col justify-center items-start px-8 py-7'>
              <div
                className='flex items-center justify-between w-full mb-1 cursor-pointer'
                onClick={() => setIsOpenFilter(!isOpenFilter)}
              >
                <p className='font-bold text-lg -ml-3'>Kategori</p>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={18}
                  height={18}
                  fill='currentColor'
                  className='bi bi-chevron-up ml-16'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'
                  />
                </svg>
              </div>
              <div className={isOpenFilter ? 'hidden' : ''}>
                <form onSubmit={filterBooksHandler}>
                  <div className='space-y-1'>
                    <Category name='Teknologi' />
                    <Category name='Novel' />
                    <Category name='Majalah' />
                    <Category name='Komik' />
                    <Category name='Pendidikan' />
                  </div>
                  <div className='my-1'>
                    <p className='font-bold text-lg -ml-3'>Tahun Terbit</p>
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <input
                      type='number'
                      placeholder='Dari'
                      className='w-24 py-1 px-3 bg-slate-600 focus:outline-none focus:outline-slate-500'
                    />
                    &nbsp;-&nbsp;
                    <input
                      type='number'
                      placeholder='Sampai'
                      className='w-24 py-1 px-3 bg-slate-600 focus:outline-none focus:outline-slate-500'
                    />
                  </div>
                  <div className='flex gap-4 md:justify-between w-full mt-4'>
                    <button
                      type='submit'
                      className='py-1 px-5 w-24 rounded-lg text-white font-bold hover:bg-[#414654]  border-2 border-white focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out'
                    >
                      Simpan
                    </button>
                    <button
                      type='reset'
                      className='py-1 w-24 px-5 font-bold rounded-lg border-2 focus:outline-none border-white hover:bg-[#414654] transform transition hover:scale-105 duration-300 ease-in-out '
                      onClick={() => {
                        setFilteredBooks([]);
                        setIsReset(!isReset);
                        navigate('/books', { replace: true });
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <BookListContainer
            filteredBooks={filteredBooks}
            data={books}
            setBooks={setBooks}
            pageSize='8'
          />
        </div>
      </div>
    </div>
  );
}
