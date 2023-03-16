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
                    $('#posts-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    // console.log(data);
                    new PostComments(data.data.post._id);

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
        let postContainer = $('#posts-container>ul>li');
        for(let post of postContainer){
            deletePost($(' .delete-post-button', post));
            let postId = post.id.split('-')[1];
            new PostComments(postId);
        }
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