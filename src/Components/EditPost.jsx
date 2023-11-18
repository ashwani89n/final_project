import { supabase } from "../client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './CreatePost.css';
import { useParams } from 'react-router-dom';

const EditPost = () => {
    const {id} = useParams();
    const [post, setPost] = useState({
        title: '',
        content: '',
        imageUrl: '',
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [secretKey, setSecretKey] = useState('');
    const [authorizationError, setAuthorizationError] = useState(false);


    useEffect(() => {
        async function fetchEmployeeData() {
          const { data, error } = await supabase.from('Posts').select().eq('id', id);
    
          
          if (error) {
            console.error('Error fetching post data:', error);
          } else if (data && data.length > 0) {
            const postData = data[0];
            setPost({
              title: postData.title,
              content: postData.content,
              imageUrl: postData.imageUrl,
            });

            setSecretKey(data[0].key);
          }
        }

        fetchEmployeeData();
    }, [id]);

    const updatePost = async (event) => {
        event.preventDefault();
      
        
        const enteredKey = prompt('Enter the secret key:');
        if (enteredKey === secretKey) {
            console.log("matched!");
        await supabase
        .from('Posts')
        .update({ title: post.title, content: post.content, imageUrl: post.imageUrl})
        .eq('id', id);
  
        setPost({
            title: '',
            content: '',
            imageUrl: '',
        });
      setUpdateSuccess(true);
  
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 100000);

      window.location = "/dashboard";
    } else {
        setAuthorizationError(true);
        setTimeout(() => {
          setAuthorizationError(false);
        }, 5000);
      }
  
    }
    const deletePost = async (event) => {
      event.preventDefault();
        
      const enteredKey = prompt('Enter the secret key:');

      if (enteredKey === secretKey) {
      await supabase
        .from('Posts')
        .delete()
        .eq('id', id); 

        setPost({
            title: '',
            content: '',
            imageUrl: '',
        });
  
        setDeleteSuccess(true);
  
      setTimeout(() => {
        setDeleteSuccess(false); 
      }, 100000);
    } else {
        setAuthorizationError(true);
        setTimeout(() => {
          setAuthorizationError(false);
        }, 5000);
      }
  
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };

    return (
        <div>
            <div className="header-contain">
                <Link to="/"><div className="home-icon"></div></Link>
                <h1 className="logo1">Talkin&apos; Panthers</h1>
                <div >
        <Link to="/dashboard"><button className="dashboard-button">Dashboard</button></Link>
        </div>
            </div>
            <div className="row">
                <div className="post">
                <div className="idea-img1"></div>
                    <div className="text">
                        <div className="postTxt">Wish to fine-tune your thoughts?</div>
                        <div className="postSubTxt">Tailor your thoughts to achieve a sharper and more precise expression of your ideas. </div>
                    </div>
                </div>
                <div className="createPost">
                {authorizationError && (
                    <div className="alert error">
                        OOps! You are not authorized to update.
                    </div>
                    )}
                {updateSuccess && (
                    <div className="alert success">
                        Post Enhanced!
                    </div>
                    )}
                    {deleteSuccess && (
                    <div className="alert success">
                        Post Deleted!
                    </div>
                    )}
                        <form onSubmit={updatePost}>
                        <table align="center">
                            <tbody>
                                <tr>
                                    <td align="left"><input type="text" className="titlePost" id="title" name="title" placeholder="Add a title..." value={post.title} onChange={handleInputChange} required /></td>
                                </tr>
                                <tr>
                                    <td align="left"><textarea rows={8} cols={100} id="content" name="content" placeholder="Add a description..." required maxLength={1000} value={post.content} onChange={handleInputChange} /></td>
                                </tr>
                                <tr>
                                    <td align="left"><input type="text" className="imageUrl" id="imageUrl" name="imageUrl" value={post.imageUrl} placeholder="ImageUrl(Optional)" onChange={handleInputChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <br></br>
                        <input type="submit" value="Update Post" />
                        <button className="deleteButton" onClick={deletePost}>Delete</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
