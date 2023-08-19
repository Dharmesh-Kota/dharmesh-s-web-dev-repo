{
    let up_vote_likes = function(){

        up_vote.click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: up_vote.attr('href'),
                success: function(data){
                    let likes = parseInt(up_vote.attr('data-likes'));
                    console.log(likes);
                    if(data.data.like_exists == false){
                        likes += 1;
                    }

                    up_vote.attr('data-likes', likes);
                    down_vote.attr('data-likes', likes);
                    counter.html(`${likes} Likes`);
                }
            })
        })
    }

    let down_vote_likes = function(){
        down_vote.click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: down_vote.attr('href'),
                success: function(data){
                    let likes = parseInt(down_vote.attr('data-likes'));
                    console.log(likes);
                    if(data.data.like_exists == true){
                        likes -= 1;
                    }
                    up_vote.attr('data-likes', likes);
                    down_vote.attr('data-likes', likes);
                    counter.html(`${likes} Likes`);
                }
            })
        })
    }

    let up_vote = $('#up_vote');
    let down_vote = $('#down_vote');
    let counter = $('#counter')

    up_vote_likes();
    down_vote_likes();
}