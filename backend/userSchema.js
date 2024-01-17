const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        title:String,
        description:String
    }
)

module.exports = mongoose.model("Todolist",userSchema);