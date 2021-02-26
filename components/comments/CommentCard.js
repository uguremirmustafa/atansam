import { deleteCommentMutation } from '@utils/mutations';
import { useUser } from '@utils/useUser';
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

function CommentCard({ comment, email, id }) {
  const del = deleteCommentMutation();
  const commentId = comment?._id;
  return (
    <div className="bg-blue-100 mb-2 rounded relative z-index-0 overflow-hidden shadow-md">
      <div className="text-xs bg-red-200 px-2 py-1 m-none ">
        <a href={`mailto:${comment.kullanici}`} className="hover:text-white">
          {comment.kullanici}
        </a>
      </div>
      <p className="py-2 px-4 bg-red-50">{comment.yorum}</p>
      <div className="absolute top-0 right-0 p-1 text-gray-800 hover:text-white transition delay-10 duration-300 ease-in-out cursor-pointer text-xs bg-red-300 cursor-pointer">
        {email && email === comment.kullanici && (
          <div
            className="flex justify-center items-center"
            onClick={() => del.mutate({ id, commentId })}
          >
            <FaTimesCircle size="15px" style={{ marginRight: '4px' }} /> yorumu sil
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentCard;
