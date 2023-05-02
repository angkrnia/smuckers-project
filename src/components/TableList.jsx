import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useNavigate } from 'react-router-dom';
import Button from './elements/Button';
import Modal from './elements/Modal';
import TableLoading from './elements/TableLoading';

const toastrOptions = {
  position: 'top-center',
  autoClose: 3500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

export default function TableList({ data, ...props }) {
  const [showModal, setShowModal] = useState({
    isOpen: false,
    id: '',
  });
  const navigate = useNavigate();

  const handleDeleteData = async () => {
    try {
      await axios.delete(
        `http://13.228.170.117:8000/books/${showModal.id}`,
        {
          headers: {
            token: JSON.parse(localStorage.getItem('authentications')),
          },
        }
      );
      toast.success('Data Berhasil Dihapus!', toastrOptions);
      props.setFetchStatus(false);
      setShowModal({
        isOpen: false,
        id: '',
      });
    } catch (error) {
      toast.error(error.response.data.message, toastrOptions);
      setShowModal({
        isOpen: false,
        id: '',
      });
    }
  };

  const handleDescString = (str, maxLength) => {
    if (str === undefined) {
      return ' ';
    } else {
      return str.slice(0, maxLength) + '...';
    }
  };

  return (
    <div className='flex lg:items-center'>
      {showModal.isOpen && (
        <Modal isOpen={setShowModal} deleteHandler={handleDeleteData} />
      )}
      <table className='table rounded-lg shadow bg-gray-800 '>
        <thead>
          <tr className='text-xs'>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              No.
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              Action
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              Judul Buku
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              cover
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              Status
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              penulis
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              kategori
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              penerbit
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              tahun
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              rating
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              bahasa
            </th>
            <th className='p-4 font-medium uppercase border-b-2 dark:border-dark-5 whitespace-nowrap text-white'>
              description
            </th>
          </tr>
        </thead>
        <tbody>
          {data == null ? (
          <TableLoading/>
          ) : (
            data.map((item, i) => (
              <tr className='text-xs text-white' key={item.id}>
                <td className='p-4 border-b-2 dark:border-dark-5'>{i + 1}</td>
                <td className='w-40 p-4 border-b-2 dark:border-dark-5 min-w-min'>
                  <div className='flex flex-row space-x-1'>
                    <div>
                      <Button
                        className='px-5'
                        value={item.id}
                        onClick={() => {
                          navigate(`/dashboard/books-form/edit/${item.id}`);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                    <div>
                      <Button
                        color='red'
                        onClick={() => {
                          setShowModal({ isOpen: true, id: item.id });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </td>
                <td className='w-40 p-4 border-b-2 dark:border-dark-5 min-w-min'>
                  {item.title}
                </td>
                <td className='p-4 border-b-2 dark:border-dark-5'>
                  <img
                    src={
                      // cek apakah stringnya ada http atau tidak
                      !item.cover?.includes('http')
                        ? 'https://media.istockphoto.com/id/1223190360/id/vektor/buka-siluet-vektor-buku-ikon-logo-simbol-tanda-tangan-ilustrasi-hitam-putih.jpg?s=612x612&w=0&k=20&c=hlKnSXIvdC7_n7Zfmzh-XcSmXnqrE3prOfphfkhG_Os='
                        : item.cover
                    }
                    alt='img'
                    width={20}
                  />
                </td>
                <td className='p-4 border-b-2 dark:border-dark-5'>
                  {item.is_borrowed ? (
                    <div className='bg-red-700 text-center p-1 rounded-sm tracking-wider font-medium'>
                      DIPINJAM
                    </div>
                  ) : (
                    <div className='bg-indigo-700 text-center p-1 rounded-sm tracking-wider font-medium'>
                      TERSEDIA
                    </div>
                  )}
                </td>
                <td className='p-4 border-b-2 dark:border-dark-5'>
                  {item.author}
                </td>
                <td className='p-4 border-b-2 dark:border-dark-5 '>
                  {item.category}
                </td>
                <td className='p-4 border-b-2 dark:border-dark-5'>
                  {item.publisher}
                </td>
                <td className='p-4 border-b-2 dark:border-dark-5'>
                  {item.year}
                </td>
                <td className='p-4 border-b-2 dark:border-dark-5'>
                  {item.rating}
                </td>
                <td className='p-4 border-b-2 dark:border-dark-5'>
                  {item.language}
                </td>
                <td className='p-4 border-b-2 dark:border-dark-5'>
                  {handleDescString(item.description, 10)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
