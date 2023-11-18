import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { supabase } from "../client";
import './Card.css';
import './ViewPost.css';
import './CreatePost.css';

const calculateTimeSincePost = (createdAt) => {
  const now = new Date();
  const postTime = new Date(createdAt);
  const timeDifference = Math.abs(now - postTime);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 24) {
    return `Posted ${Math.floor(hours / 24)} days ago`;
  } else if (hours > 0) {
    return `Posted ${hours} hrs ago`;
  } else if (minutes > 0) {
    return `Posted ${minutes} min ago`;
  } else {
    return `Posted ${seconds} sec ago`;
  }
};

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
      title: '',
      content: '',
      imageUrl: '',
      comments: [],
      created_at: '',
      upvotes_count: 0,
      downvotes_count: 0,
    });
    const [newComment, setNewComment] = useState('');
    const [hasDownvoted, setHasDownvoted] = useState(false);
    const [secretKey, setSecretKey] = useState('');
    const [authorizationError, setAuthorizationError] = useState(false);
    const cardLink = `/edit/${id}`;
  
    const fetchPostData = async () => {
      try {
        const { data, error } = await supabase.from('Posts').select().eq('id', id);
  
        if (error) {
          console.error('Error fetching post data:', error);
        } else if (data && data.length > 0) {
          const postData = data[0];
  
          setPost({
            title: postData.title,
            content: postData.content,
            imageUrl: postData.imageUrl,
            comments: postData.comments || [],
            created_at: postData.created_at,
            upvotes_count: postData.upvotes_count,
            downvotes_count: postData.downvotes_count,
          });
          console.log(postData.comments);
          setSecretKey(data[0].key);
          console.log(secretKey);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
  
    useEffect(() => {
      fetchPostData();
    }, [id]);
  
    const handleDeleteComment = async (commentId) => {
      event.preventDefault();

      const enteredKey = prompt('Enter the secret key:');
      console.log(commentId);
      if(enteredKey===secretKey){
      try {
        const { error } = await supabase
        .from('Posts')
        .update({
            comments: post.comments
            .map((comment) => JSON.parse(comment))
            .filter((comment) => comment.id !== commentId)
            .map((comment) => JSON.stringify(comment)),
        })
        .eq('id', id);
  
        if (error) {
          console.error('Error deleting comment:', error);
        } else {
          fetchPostData();
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }else{
      setAuthorizationError(true);
        setTimeout(() => {
          setAuthorizationError(false);
        }, 5000);
    }
    };
  
    const handleVote = async (type) => {
      try {
        if (type === 'downvote' && hasDownvoted) {
          return;
        }
  
        const { error } = await supabase
          .from('Posts')
          .update({
            [`${type === 'upvote' ? 'upvotes' : 'downvotes'}_count`]: post[
              `${type === 'upvote' ? 'upvotes' : 'downvotes'}_count`
            ] + 1,
          })
          .eq('id', id);
  
        if (error) {
          console.error(`Error ${type}-voting:`, error);
        } else {
          if (type === 'downvote') {
            setHasDownvoted(true);
          }

          fetchPostData();
        }
      } catch (error) {
        console.error(`Error ${type}-voting:`, error);
      }
    };
  
    const handleCommentSubmit = async (event) => {
      event.preventDefault();
  
      if (newComment.trim() === '') {
        return;
      }
  
      try {
        const newCommentData = { content: newComment, id: new Date().toISOString() };
  
        const { error } = await supabase
          .from('Posts')
          .update({
            comments: [...post.comments, JSON.stringify(newCommentData)],
          })
          .eq('id', id);
  
        if (error) {
          console.error('Error adding comment:', error);
        } else {
          setPost((prevPost) => ({
            ...prevPost,
            comments: [...prevPost.comments, JSON.stringify(newCommentData)],
          }));
  
          setNewComment('');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
  
    return (
      <>
        <div className="header-contain">
          <Link to="/">
            <div className="home-icon"></div>
          </Link>
          <h1 className="logo1">Talkin&apos; Panthers</h1>
          <div >
        <Link to="/dashboard"><button className="dashboard-button">Dashboard</button></Link>
        </div>
        </div>
        {authorizationError && (
                    <div className="alert1 error1">
                        OOps! You are not authorized to update.
                    </div>
                    )}
        <div className="Card-layout">
          <div className="postInfo1">
            <div className="inlineTextLbl1">{post.title}</div>
            <div className="time">{calculateTimeSincePost(post.created_at)}</div>
            <div >
            <Link to={cardLink}><button className="img2">Edit/Delete</button></Link>
            </div>
          </div>
          <div className="contView">{post.content}</div>
          <div className="imageUrl11" style={{ backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : 'none' }}></div>
          <div>
            <span role="img" className="upvotes1" onClick={() => handleVote('upvote')}>
              👍 {post.upvotes_count}
            </span>
            {' | '}
            <span role="img" className="upvotes1" onClick={() => handleVote('downvote')}>
              👎 {post.downvotes_count}
            </span>
            
          </div>
          
            
          <div className="comments-section">
            {post.comments.length > 0 ? (
              <>
                {post.comments.map((comment, index) => {
                  try {
                    const parsedComment = JSON.parse(comment);
                    return (
                      <div className="rws" key={index}>
                        <div className="cmt-cntent">{parsedComment.content}</div>
                        <div className="img1" onClick={() => handleDeleteComment(parsedComment.id)}></div>
                      </div>
                    );
                  } catch (parseError) {
                    console.error('Error parsing comment:', parseError);
                    return null;
                  }
                })}
              </>
            ) : (
              <></>
            )}
            <form onSubmit={handleCommentSubmit}>
              <input type="text" className="no-comments" placeholder="Share your opinion.." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            </form>
          </div>
        </div>
      </>
    );
  };
  
  export default ViewPost;
  