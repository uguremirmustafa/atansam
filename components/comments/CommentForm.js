import { commentOnMutation } from '@utils/mutations';
import React, { useState } from 'react';
import { FaComment, FaPaperPlane } from 'react-icons/fa';

export default function CommentForm({ id, email, okulAdi }) {
  console.log(id, email, okulAdi);

  const com = commentOnMutation();

  const [comment, setComment] = useState('');
  const changeHandler = (e) => {
    setComment(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (comment.length < 20) {
      alert('Çok kısa yazmışsın sanki, anlatsana biraz (minimum 20 karakter)');
      return;
    }
    com.mutate({ id, userEmail: email, okulAdi, comment });
    setComment('');
  };

  return (
    <div className="w-full">
      <h3 className="flex items-center p-4 font-bold w-full bg-blue-200 text-gray-800 rounded-t">
        <FaComment style={{ margin: '0 5px' }} /> Yorum yap
      </h3>
      <form onSubmit={onSubmit} className="flex flex-col justif-center w-full relative">
        <div className="h-40 mb-8 w-full">
          <textarea
            name="yorum"
            id="yorum"
            value={comment}
            onChange={changeHandler}
            rows="30"
            cols="30"
            className="h-full p-2 md:p-4 bg-blue-100 font-normal text-black outline-none rounded-bottom shadow-md text-gray-900 w-full resize-none"
            placeholder="Aslında memleketin her köşesi cennet ama düzenimiz var burada bizim..."
          />
        </div>
        <button
          type="submit"
          className="h-10 w-32 text-white bg-blue-400 font-bold rounded flex justify-center items-center shadow-md absolute bottom-0 right-4 outline-none"
        >
          Gönder <FaPaperPlane style={{ marginLeft: '10px' }} />
        </button>
      </form>
    </div>
  );
}
