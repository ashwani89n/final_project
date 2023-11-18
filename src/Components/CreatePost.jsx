import { supabase } from "../client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './CreatePost.css';

const CreatePost = () => {
    const [post, setPost] = useState({
        title: '',
        content: '',
        imageUrl: '',
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [randomKey, setRandomKey] = useState('');

    const generateRandomKey = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const key = Array.from({ length: 16 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
        setRandomKey(key);
    };

    useEffect(() => {
        generateRandomKey();
        console.log("Updated randomKey:", randomKey);
    }, []);

    const createPost = async (event) => {
        event.preventDefault();

        generateRandomKey();
        console.log("Post before insertion:", { title: post.title, content: post.content, imageUrl: post.imageUrl, key: randomKey });

        try {
            const { data, error } = await supabase
                .from('Posts')
                .insert({ title: post.title, content: post.content, imageUrl: post.imageUrl, key: randomKey, comments:' ', upvotes_count:0 , downvotes_count:0})
                .select();

            console.log("Insertion result:", { data, error });

            if (error) {
                throw error;
            }

            setPost({
                title: '',
                content: '',
                imageUrl: '',
            });

            setUpdateSuccess(true);

            setTimeout(() => {
                setUpdateSuccess(false);
            }, 100000);
        } catch (error) {
            console.error("Error during insertion:", error);
        }
    };

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
                    <div className="idea-img"></div>
                    <div className="text1">
                        <div className="postTxt">What&apos;s on your mind TODAY?</div>
                        <div className="postSubTxt">Shape the narrative, fuel the discussion. Let your voice be the catalyst for vibrant conversations at Talkin&apos;s Panthers.</div>
                    </div>
                </div>
                <div className="createPost">
                    {updateSuccess && (
                        <div className="alert success">
                            <p>Success!! Your unique key: {randomKey}. This key is required to edit/delete the Post.</p>
                        </div>
                    )}
                    <form onSubmit={createPost}>
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
                        <input type="submit" value="Create New Post" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
