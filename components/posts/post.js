import react, { useState, useEffect } from "react";
import { db } from "../../pages/firebase";
import { fire } from "../../pages/firebase";
import { getAuth } from "firebase/auth";
import {
  collectionGroup,
  orderBy,
  onSnapshot,
  collection,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
const Post = () => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [createPosts, setCreatePost] = useState({
    title: "",
    content: "",
  });

  //   const getAllUsersPost = () => {
  //     collectionGroup(db, "userPost");
  //     orderBy("createAt", "desc");
  //     onSnapshot(collectionGroup(db,"userPost"), (snapshot) => {
  //       let userPosts = [];
  //       snapshot.foreach((doc) => {
  //         userPosts.push({
  //           uid: doc.ref.parent.parent.id,
  //           upid: doc.id,
  //           data: {
  //             title: doc.data().title,
  //             content: doc.data().content,
  //           },
  //         });
  //       });
  //       setUserPosts(userPosts);
  //     });
  //   };
  useEffect(() => {
    const getAllUsersPost = () => {
      collectionGroup(db, "userPost");
      orderBy("createAt", "desc");
      onSnapshot(collectionGroup(db, "userPost"), (snapshot) => {
        let userPosts = [];
        snapshot.foreach((doc) => {
          userPosts.push({
            uid: doc.ref.parent.parent.id,
            upid: doc.id,
            data: {
              title: doc.data().title,
              content: doc.data().content,
            },
          });
        });
        setUserPosts(userPosts);
      });
    };
    return () => getAllUsersPost;
  }, []);

  const getAllUsers = () => {
    getDocs(collection(db, "users")).then((querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          name: doc.data().userName,
        });
      });
      return Promise.resolve(users);
    });
    getAllUsers.then((users) => {
      let uids = userPosts.map((usePost) => {
        return usePost.uid;
      });

      let resultUser = users.filter((user) => {
        return uids.includes(user.id);
      });

      let userPostList = [];
      userPosts.map((post) => {
        const users = resultUser.find((u) => {
          return u.id === post.uid;
        });
        userPostList.push({
          id: post.upid,
          authour: users.name,
          title: post.data.title,
          content: post.data.content,
        });
      });
      setPosts(userPostList);
    });
  };
  useEffect(() => {
    if (!userPosts.length) {
      return;
    }
    getAllUsers();
  }, [userPosts]);

  const handleCreatePost = async () => {
      await addDoc(collection(db, "post"), {
      title: createPosts.title,
      content: createPosts.content,
      createAt: new Date(),
      updateAt: new Date(),
    });
  };

  return (
    <>
      <form onSubmit={handleCreatePost}>
        <label>Title</label>
        <input
          type="text"
          required
          value={createPosts.title}
          onChange={(e) => {
            setCreatePost({ ...createPosts, title: e.target.value });
          }}
        />
        <label>Content</label>
        <textarea
          type="text"
          required
          value={createPosts.content}
          onChange={(e) => {
            setCreatePost({ ...createPosts, content: e.target.value });
          }}
        />
        <button type="submit">create</button>
      </form>
      <div className="container">
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <div>
                <h2>Title: {post.title}</h2>
                <h4>Authour: {post.authour}</h4>
                <p>{post.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Post;
