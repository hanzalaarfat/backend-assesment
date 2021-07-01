const Comment = require('../Models/Comment')
const User = require('../Models/User')


exports.addcomment = async (req, res) => {


    const { comments, posted_by,todo_id } = req.body;
    

    await User.find({ _id: posted_by }).exec((err, user) => {

        if (user) {
            const comment = new Comment({
               comments,
               posted_by,
               todo_id
            });

            comment.save((error, todo) => {
                if (error) {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });

                }

                if (comment) {


                    return res.status(201).json({
                        message: "Comment added succefully"
                    });
                }

            });

        }


    })

}


exports.getcommentById = async (req, res) => {
    let id = req.params.id;

    const comment = await Comment.find({ posted_by: id }).exec((err,usr) => {
        if(usr) {
            res.status(200).json({ usr });
        }
    })

    

}

exports.updatecomment = async (req, res) => {
    let id = req.params.id;
    const { comments } =
        req.body;
    const comment = await Comment.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                comments: comments
            },
        },
        { new: true }
    )
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({ message: result });
        })
        .catch((e) => {
            console.log(e);
            res.status(400).json({ error: e });
        });
};

exports.deletecomment = async (req, res) => {
    let id = req.params.id;

    const comment = await Comment.findOneAndDelete({ _id: id });

    if (comment) {
        res.status(201).json({ message: "Comment removed" });
    } else {
        res.status(400).json({ message: "Something went wrong" });
    }


}