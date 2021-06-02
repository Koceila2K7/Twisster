const MessageModel = require("../models/message_model");
const message_model = new MessageModel();

const get_conversations = async (req, res) => {
    try {
        if (req.userId) {
            console.log('   message')
            let conversations = await message_model.get_conversations(req.userId);
            return res.status(200).json(conversations);
        } else {
            return res.status(401).json({ message: "merci de vous authentifier" });
        }
    } catch (error) {
        console.error(error)
        return res.status(502).json({ message: "problème serveur" })
    }
}

module.exports = {
    get_conversations
}