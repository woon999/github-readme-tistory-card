
module.exports = async (req, res) => {
    res.send(process.env.ACCESS_TOKEN);
}