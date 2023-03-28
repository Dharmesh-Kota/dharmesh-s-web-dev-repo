// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{

    // constructor is used to initialize the instance of the class whenever a new instance is created

    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        console.log('Entered');
        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .destroy-comments', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){

                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comment-${postId}`).prepend(newComment);

                    // enabling the delete comment functionality on a newly created comment                  
                    pSelf.deleteComment($(' .destroy-comments', newComment));

                    // enabling the toggle-like functionality on newly created comment
                    new ToggleLike($(' .toggle-like-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${comment._id}">
                <p>
                    <a href="/comments/destroy/${comment._id}" class="destroy-comments">X</a>
                    ${ comment.content } <br>
                    <small>${ comment.user.fname + " " + comment.user.lname }</small>
                    <small>
                        <a href="/likes/toggle/?id=${post._id}&type=Post" class="toggle-like-button" data-likes="0">
                            0 Likes
                        </a>                           
                    </small>      
                </p>
            </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}

