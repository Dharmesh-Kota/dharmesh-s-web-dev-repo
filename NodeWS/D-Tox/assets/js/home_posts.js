{
    // console.log('loaded');
    let createPost = function(){
        let newPostForm = $('#new-post');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url : '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // enableing the toggle-like functionality on newly created post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    $('#posts-container>ul').prepend(newPost);

                    // Calling the delete post function on newly created Post
                    deletePost($(' .delete-post-button', newPost));
                    // console.log(data);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(err){
                    console.log(err.responseText);
                }
            })
        });

    }

    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        </small>       
                
                        ${post.content} 
                        <br>
                        <small>
                        ${ post.user.fname} ${ post.user.lname } <br>
                            ${ post.user.email }
                        </small>

                        <small>
                                <a href="/likes/toggle/?id=${post._id}&type=Post" class="toggle-like-button" data-likes="0">
                                    0 Likes
                                </a>                           
                        </small>
                        
                        <div id="comment-container">
                            <form action="/comments/create" method="post">
                                <input type="text" name="content" placeholder="Add a comment..." required>
                                <input type="hidden" name="post" value="${ post._id }">
                                <button type="submit">Add Comment</button>
                            </form>
                            <div id="post-comments-list">

                                <ul id="post-comment-${post._id}">
                                    
                                </ul>
                                
                            </div>    
                            
                        </div>                        
                    </p>                            
                </li>`);
    }

    // method to delete post

    let deletePost =function(deleteLink){   
        
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    // Posts traversal for access to remove all the posts
    let traverse = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

    createPost();
    traverse();
}



// function(){
//     $('#posts-container>ul>li').each(function(){
//         let self = $(this);
//         let deleteButton = $(' .delete-post-button', self);
//         deletePost(deleteButton);

//         // get the post's id by splitting the id attribute
//         let postId = self.prop('id').split("-")[1]
//         new PostComments(postId);
//     });
// }