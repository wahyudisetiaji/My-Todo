let token = localStorage.getItem('token')
if(!token) {
    window.location = 'index.html'
}

function logout() {
    localStorage.clear()
    window.location= 'index.html'
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-70px";
  }
  prevScrollpos = currentScrollPos;
}

function createtask() {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/task/',
        headers: {
            token
        },
        data: {
            taskName: $("#task").val(),
            dueDate: $("#date").val(),
            priority: $("#status").val()
        }
    })
        .done(result => {
            if(result.message) {
                let data = `
                <div class="alert alert-success" role="alert" style="height:100%">
                    ${result.message} !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                `
                $('.success').append(data) 
            }
            $("#task").val(''),
            $("#date").val('')
        })
        .fail(err => {
            if(err.responseJSON.err.errors.taskName.message) {
                let data = `
                <div class="alert alert-success" role="alert" style="height:100%">
                    ${err.responseJSON.err.errors.taskName.message} !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                `
                $('.error').append(data) 
            }
            if(err.responseJSON.err.errors.dueDate.message) {
                let data = `
                <div class="alert alert-success" role="alert" style="height:100%">
                    ${err.responseJSON.err.errors.dueDate.message} !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                `
                $('.error').append(data) 
            } 
        })
}

$.ajax({
    method: 'GET',
    url: 'http://localhost:3000/task/',
    headers: {
        token
    }
})
    .done(result => {
        let data = result.tasks
        data.forEach(task => {
            function formatDate(date) {
                var monthNames = [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December"
                ];
          
                let day = date.slice(8, 10);
                let month = date.slice(6, 7);
                let year = date.slice(0, 4);
          
                if (month > 9) {
                  month = `1${month}`;
                }
          
                return day + " " + monthNames[month - 1] + " " + year;
            }
            let dueDate = formatDate(task.dueDate)
            let data = `
                <div class="card card-task" style="margin-left:auto;margin-right:auto;display:block;margin: 10px;width: 100%;text-align: center;opacity: 0.9;">
                    <div class="card-body" style="vertical-align:middle">
                        <div class="row">
                            <div class="col-md-9">
                                <p style="vertical-align: middle">${task.taskName} - <span>${dueDate} - </span><span>${task.priority}</span></p>
                            </div>
                            <div class="col-md-1">
                            <a href="#" index="${task._id}" taskName="${task.taskName}" onclick="taskdone(this)"><i class="fa fa-check-square" style="font-size:36px;color: gray"></i></a>
                            </div>
                            <div class="col-md-1">
                            <a href="#" index=${task._id} onclick="getOneTask(this)" data-toggle="modal" data-target=".modal-edit"><i class="fa fa-edit" style="font-size:36px;color: gray"></i></a>
                            </div>
                            <div class="col-md-1">
                            <a href="#" index=${task._id} onclick="deleteTask(this)"><i class="fa fa-remove" style="font-size:36px;color: gray"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            $('.row-task').append(data) 
        });
        
    })
    .fail(err => {
        console.log(err);
    })

function deleteTask(data) {
    let idTask = data.getAttribute('index')
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/task/${idTask}`,
        headers: {
            token
        }  
    })
        .done(result => {
            if(result.message) {
                let data = `
                <div class="alert alert-success" role="alert" style="height:100%">
                    ${result.message} !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true" onclick="closeModal()">&times;</span>
                  </button>
                </div>
                `
                $('.success-task').append(data) 
            }
            
        })
        .fail(err => {
            console.log(err); 
        })
}

let taskModal
function getOneTask(data) {
    let idTask = data.getAttribute('index')
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/task/task/${idTask}`,
        headers: {
            token
        }
    })
        .done(result => {
            taskModal = result.task;
            let data = `
                <form>
                    <div class="error"></div>
                    <div class="success"></div>
                    <div class="form-group">
                    <label for="exampleInputText1">Name Task</label>
                    <input type="text" class="form-control" id="taskEdit" aria-describedby="textHelp" value="${taskModal.taskName}"placeholder="Enter name task">
                    </div>
                    <div class="form-group">
                    <label for="exampleInputDate1">Due Date</label>
                    <input type="date" class="form-control" id="dateEdit" value="${taskModal.dueDate.slice(0,10)}">
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Status</label>
                        <select class="form-control" id="statusEdit">
                        <option value="Priority">Priority</option>
                        <option value="Not Priority">Not Priority</option>
                        </select>
                    </div>
                </form>
                <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="closeModal()">Close</button>
                        <button type="button" class="btn btn-secondary" index="${taskModal._id}" onclick="edittask(this)">Save</button>
                </div>
            `

            $('.taskEdit').append(data)  
        })
        .fail(err => {
            console.log(err);
            
        })
}

function edittask(data) {
    let idTask = data.getAttribute('index')
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/task/${idTask}`,
        headers: {
            token
        },
        data: {
            taskName: $("#taskEdit").val(),
            dueDate: $("#dateEdit").val(),
            priority: $("#statusEdit").val()
        }
    })
        .done(result => {
            if(result.message) {
                let data = `
                <div class="alert alert-success" role="alert" style="height:100%">
                    ${result.message} !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                `
                $('.success').append(data) 
            }
            $("#taskEdit").val(''),
            $("#dateEdit").val('')
            
        })
        .fail(err => {
            console.log(err);
            
        })
    
}

function taskdone(data) {
    let idTask = data.getAttribute('index')
    let taskName = data.getAttribute('taskName')
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/task/status/${idTask}`,
        headers: {
            token
        },
        data: {
            taskName
        }
    })
        .done(result => {
            if(result.message) {
                let data = `
                <div class="alert alert-success" role="alert" style="height:100%">
                    ${result.message} !
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true" onclick="closeModal()">&times;</span>
                  </button>
                </div>
                `
                $('.success-task').append(data) 
            }
            
        })
        .fail(err => {
            console.log(err);
            
        })
}

function priority() {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/task/priority/`,
        headers: {
            token
        }  
    })
        .done(result => {
            $('.card-task').hide()
            let data = result.tasks
            data.forEach(task => {
                function formatDate(date) {
                    var monthNames = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                    ];
            
                    let day = date.slice(8, 10);
                    let month = date.slice(6, 7);
                    let year = date.slice(0, 4);
            
                    if (month > 9) {
                    month = `1${month}`;
                    }
            
                    return day + " " + monthNames[month - 1] + " " + year;
                }
                let dueDate = formatDate(task.dueDate)
                let data = `
                    <div class="card card-task" style="margin-left:auto;margin-right:auto;display:block;margin: 10px;width: 100%;text-align: center;opacity: 0.9;">
                        <div class="card-body" style="vertical-align:middle">
                            <div class="row">
                                <div class="col-md-6">
                                    <p style="vertical-align: middle">${task.taskName} - <span>${dueDate} - </span><span>${task.priority}</span></p>
                                </div>
                                <div class="col-md-2">
                                <a href="#" index="${task._id}" taskName="${task.taskName}" onclick="taskdone(this)"><i class="fa fa-check-square" style="font-size:36px;color: gray"></i></a>
                                </div>
                                <div class="col-md-2">
                                <a href="#" index=${task._id} onclick="getOneTask(this)" data-toggle="modal" data-target=".modal-edit"><i class="fa fa-edit" style="font-size:36px;color: gray"></i></a>
                                </div>
                                <div class="col-md-2">
                                <a href="#" index=${task._id} onclick="deleteTask(this)"><i class="fa fa-remove" style="font-size:36px;color: gray"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                $('.row-task').append(data)
            })
        })
        .fail(err => {
            console.log(err);
        })
}

function done() {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/task/done/`,
        headers: {
            token
        }  
    })
        .done(result => {
            $('.card-task').hide()
            let data = result.tasks
            data.forEach(task => {
                function formatDate(date) {
                    var monthNames = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                    ];
            
                    let day = date.slice(8, 10);
                    let month = date.slice(6, 7);
                    let year = date.slice(0, 4);
            
                    if (month > 9) {
                    month = `1${month}`;
                    }
            
                    return day + " " + monthNames[month - 1] + " " + year;
                }
                let dueDate = formatDate(task.dueDate)
                let data = `
                    <div class="card card-task" style="margin-left:auto;margin-right:auto;display:block;margin: 10px;width: 100%;text-align: center;opacity: 0.9;">
                        <div class="card-body" style="vertical-align:middle">
                            <div class="row">
                                <div class="col-md-6">
                                    <p style="vertical-align: middle">${task.taskName} - <span>${dueDate} - </span><span>${task.priority}</span></p>
                                </div>
                                <div class="col-md-2">
                                <a href="#" index="${task._id}" taskName="${task.taskName}" onclick="taskdone(this)"><i class="fa fa-check-square" style="font-size:36px;color: gray"></i></a>
                                </div>
                                <div class="col-md-2">
                                <a href="#" index=${task._id} onclick="getOneTask(this)" data-toggle="modal" data-target=".modal-edit"><i class="fa fa-edit" style="font-size:36px;color: gray"></i></a>
                                </div>
                                <div class="col-md-2">
                                <a href="#" index=${task._id} onclick="deleteTask(this)"><i class="fa fa-remove" style="font-size:36px;color: gray"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                $('.row-task').append(data)
            })
        })
        .fail(err => {
            console.log(err);
        })
}

function qoutes() {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/qoutes`,
        headers: {
            token
        }  
    })
        .done(result => {
            console.log(result.quotes.quote);
            console.log(result.quotes.author);
            let data = `
                <p>"${result.quotes.quote}"</p>
                <p>~${result.quotes.author}~</p>
            `
            $('.qoutesModal').append(data)
        })
        .fail(err => {
            console.log(err);
            
        })
}

function closeModal() {
    window.location = 'dashboard.html'
}
