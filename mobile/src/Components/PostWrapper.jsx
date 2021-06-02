import React from "react";
import Post from "./Post";
const PostWrapper = (itme,
    likeCallBack,
    commenteCallBack,
    deletedCallback,
    userAvatarCliqued
) =>
    ({ item }) =>
    (<Post item={item}
        likeCallBack={likeCallBack}
        itme={itme}
        userAvatarCliqued={userAvatarCliqued}
        commenteCallBack={commenteCallBack}
        deletedCallback={deletedCallback} />)

export default PostWrapper