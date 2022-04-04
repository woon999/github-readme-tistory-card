const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const router = express.Router();

const renderCard = require("./src/cards/post-card");
const createBadge = require("./src/cards/blog-badge");

router.get('/test', (req, res) => {
    res.send('respond with a resource');
})

router.get('/api/badge', async (req, res) => {
    const { name, theme } = req.query;
    res.setHeader('Content-Type', 'image/svg+xml');
    try {
        res.send(await createBadge(name, theme))
    } catch (e) {
        res.send(e.message)
    }
})

// 게시글 카드 가져오기 (name, postId, theme)
router.get('/api/post', async (req, res) => {
    try {
        const name = req.query.name;
        const postId = req.query.postId || (await getNewPost(req.query.name));
        const isNew = req.query.isNew;

        res.setHeader('Content-Type', 'image/svg+xml');
        renderCard(res, isNew, {
            ...req.query,
            ...(await getPost(name, postId)),
        });
    } catch (e) {
        res.send(e.message)
    }
})

const getPost = async (blogName, postId) => {
    try {
        const { data } = await axios.get('https://www.tistory.com/apis/post/read', {
            params: {
                access_token: ACCESS_TOKEN,
                blogName,
                postId,
                output: 'json',
            },
        });
        return {
            title: data.tistory.item.title,
            comments: data.tistory.item.comments,
            tags: data.tistory.item.tags.tag,
        };
    } catch (e) {
        throw new Error(e)
    }
}

const getNewPost = async (blogName) => {
    try {
        const { data } = await axios.get('https://www.tistory.com/apis/post/list', {
            params: {
                access_token: ACCESS_TOKEN,
                blogName,
                output: 'json',
                page: 1,
            },
        });

        return data.tistory.item.posts[0].id;
    } catch (e) {
        throw new Error(e)
    }
}

app.use('/', router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listen on port... ${port}`));

module.exports = app;

