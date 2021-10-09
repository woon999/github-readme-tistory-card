const renderCard = require("../src/cards/post-card");
const axios = require('axios');
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// 게시글 카드 가져오기 (name, postId, theme)
module.exports = async (req, res) => {
    try {
        const name = req.query.name;
        const postId = req.query.postId || (await getNewPost(req.query.name));
        const isNew = req.query.isNew;
        renderCard(res, isNew, {
            ...req.query,
            ...(await getPost(name, postId)),
        });
    } catch (e) {
        res.send(e.message)
    }
}


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
