import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Rich text editor
import 'react-quill/dist/quill.snow.css'; // Quill styles
import "./CommentSystem.css"; // Add your own CSS file

function CommentSystem() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, orderBy('timestamp', 'desc'), limit(commentsPerPage));
      const snapshot = await getDocs(q);

      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(commentsData);
    };

    fetchData();
  }, [currentPage]);

  const handleCommentChange = (value) => {
    setNewComment(value);
  };

  const handleSubmitComment = async () => {
    try {
      if (user && newComment.trim() !== '') {
        await addDoc(collection(db, 'comments'), {
          content: newComment,
          author: user.displayName,
          authorId: user.uid,
          timestamp: new Date(),
          likes: 0,
        });
        setNewComment('');
      } else {
        console.error('User not logged in or no comment provided.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLikeComment = async (commentId) => {
    try {
      const commentRef = doc(db, 'comments', commentId);
      const commentSnapshot = await getDocs(commentRef);
      const existingLikes = commentSnapshot.docs[0].data().likes || 0;

      await updateDoc(commentRef, { likes: existingLikes + 1 });
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div className='comment-system'>
      {/* Display user information if logged in */}
      {user && (
        <div>
          <p>Welcome, {user.displayName}</p>
          <Logout />
        </div>
      )}
      {!user && (
        <div>
          <p>Please log in to comment</p>
          <Login />
        </div>
      )}
      {/* Comment Input Section */}
      {user && (
        <div className='comment-input'>
          <ReactQuill
            theme='snow'
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write your comment..."
          />
          <button onClick={handleSubmitComment} disabled={newComment.trim() === ''}>
            Post Comment
          </button>
        </div>
      )}
      {/* Comments Display Section */}
      <div className='comments-list'>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className='comment'>
              <div className='comment-author'>
                <img src={comment.author.photoURL} alt={comment.author.displayName} />
                <span>{comment.author.displayName}</span>
              </div>
              <div className='comment-content'>
                <p>{comment.content}</p>
              </div>
              <div className='comment-actions'>
                <button onClick={() => handleLikeComment(comment.id)}>
                  Like ({comment.likes})
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      {/* Pagination */}
      <div className='pagination'>
        {/* Add pagination logic here */}
      </div>
    </div>
  );
}

export default CommentSystem;
