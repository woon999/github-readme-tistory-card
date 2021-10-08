const express = require('express');
const app = express();

const path = require('path');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const createBadge = require("../src/cards/blog-badge");
const renderCard = require("../src/cards/post-card");

// tistory 뱃지 가져오기
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
        const isNew = false;
        await renderCard(res, isNew, {
            ...req.query,
            ...(await getPost(name, postId)),
        });
    } catch (e) {
        res.send(e.message)
    }
})

// 새로운 게시글 카드 가져오기 (name, theme)
router.get('/api/post/new', async (req, res) => {
    try {
        const name = req.query.name;
        const postId = (await getNewPost(req.query.name));
        const isNew = true;
        await renderCard(
            res, isNew, {
            ...req.query,
            ...(await getPost(name, postId)),
        });
    } catch (e) {
        res.send(e.message)
    }
})

router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello! Tistory Reamde Stats Running!</h1>');
    res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

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
module.exports = app;
module.exports.handler = serverless(app);

