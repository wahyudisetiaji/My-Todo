let token = localStorage.getItem('token')
if(token) {
    window.location = 'dashboard.html'
}

function login() {
    $.ajax({
        method: 'POST',
        url: 'https://server-todo.wahyudisetiaji.xyz/users/signIn',
        data: {
            email: $("#email").val(),
            password: $("#password").val()
        }
    })
        .done(result => {
            localStorage.setItem('token', result.data.token)
            window.location = 'dashboard.html'
        })
        .fail(err => {
            console.log(err);
            
            if(err.responseJSON.err) {
                let data = `
                <div class="alert alert-danger" role="alert" style="height:100%">
                    ${err.responseJSON.err} !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                `
                $('.error').append(data) 
            }
            
        })

}