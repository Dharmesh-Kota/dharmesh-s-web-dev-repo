class PostComments{constructor(e){this.postId=e,this.postContainer=$(`#post-${e}`),this.newCommentForm=$(`#post-${e}-comments-form`),console.log("Entered"),this.createComment(e);let t=this;$(" .destroy-comments",this.postContainer).each((function(){t.deleteComment($(this))}))}createComment(e){let t=this;this.newCommentForm.submit((function(o){o.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(o){let n=t.newCommentDom(o.data.comment);$(`#post-comment-${e}`).prepend(n),t.deleteComment($(" .destroy-comments",n)),new ToggleLike($(" .toggle-like-button",n)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}newCommentDom(e){return $(`<li id="comment-${e._id}">\n                <p>\n                    <a href="/comments/destroy/${e._id}" class="destroy-comments">X</a>\n                    ${e.content} <br>\n                    <small>${e.user.fname+" "+e.user.lname}</small>\n                    <small>\n                        <a href="/likes/toggle/?id=${post._id}&type=Post" class="toggle-like-button" data-likes="0">\n                            0 Likes\n                        </a>                           \n                    </small>      \n                </p>\n            </li>`)}deleteComment(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#comment-${e.data.comment_id}`).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}}