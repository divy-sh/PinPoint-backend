import * as dao from "./dao.js";
import * as userDao from "../Users/dao.js"
export default function PostRoutes(app) {
    const createPost = async (req, res) => {
        const post = await dao.createPost(req.body);
        res.json(post);
    };
    const deletePost = async (req, res) => {
        const status = await dao.deletePost(req.params.postId);
        res.json(status);

    };
    const findAllPosts = async (req, res) => {
        const posts = await dao.findAllPosts();
        const postsWithUsers = await Promise.all(
            posts.map(async (post) => {
                const postUser = await userDao.findUserById(post.userid);
                return { ...post, user: postUser };
            })
        );
        res.json(posts);
    };
    const findPostByUser = async (req, res) => {
        const posts = await dao.findPostsByUser(req.params.userid);
        res.json(posts)
    }
    const updatePost = async (req, res) => {
        const { postId } = req.params;
        const status = await dao.updatePost(postId, req.body);
        res.json(status);
    };
    app.post("/api/posts", createPost);
    app.get("/api/posts/trending", findAllPosts);
    app.get("/api/posts/:userid", findPostByUser);
    app.put("/api/posts/:postId", updatePost);
    app.delete("/api/posts/:postId", deletePost);
}
