let token = localStorage.getItem('token')
if(token) {
    window.location = 'dashboard.html'
}

function register() {
        $.ajax({
            method: 'POST',
            url: 'http://35.232.204.104/users/signUp',
            data: {
                name: $("#name").val(),
                email: $("#email").val(),
                password: $("#password").val()
            }
        })
        .done(result => {
            window.location = 'index.html'
        })
        .fail(err => {
            if(err.responseJSON.message) {
                let data = `
                <div class="alert alert-danger" role="alert" style="height:100%">
                    ${err.responseJSON.message} !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                `
                $('.error').append(data) 
                
            }else if (err.responseJSON.err.errmsg){
                let data = `
                <div class="alert alert-danger" role="alert" style="height:100%">
                    email is duplicated !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                `
                $('.error').append(data) 
            } else if(err.responseJSON.err.errors.name.message){
                let data = `
                <div class="alert alert-danger" role="alert" style="height:100%">
                    ${err.responseJSON.err.errors.name.message} !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                `
                $('.error').append(data)   
            }else if (err.responseJSON.err.errors.email.message){
                let data = `
                <div class="alert alert-danger" role="alert" style="height:100%">
                    ${err.responseJSON.err.errors.email.message} !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                `
                $('.error').append(data) 
            }
        })
}