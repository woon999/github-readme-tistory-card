const createBadge = require("../src/cards/blog-badge");

module.exports = async (req, res) => {
    const { name, theme } = req.query;
    res.setHeader('Content-Type', 'image/svg+xml');
    try {
        res.send(await createBadge(name, theme))
    } catch (e) {
        res.send(e.message)
    }
}