class Friendship{

    constructor(friendButton){
        console.log('Entered the friendship controller!!');
        this.friendButton = $(`#${friendButton}`);
        this.manageFriend();
    }

    manageFriend() {
        
        $(this.friendButton).click(function(e){
        
            e.preventDefault();
            let self = this;
    
            console.log('Default prevented!!');
    
            $.ajax({
                type: 'POST',
                url: $(self).attr('action')
            })
            .done(function(data){
    
                let task = data.data.task;
                if(task == 'Add'){
                    $(self.friendButton).val('Remove Friend');
                } else {
                    $(self.friendButton).val('Add Friend');
                }
    
            })
            .fail(function(err){
                console.log('Error in completing the like request');
            });
            
        });

    }
}