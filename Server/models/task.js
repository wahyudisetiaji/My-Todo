const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var taskSchema = new Schema({
    taskName: {
        type: String,
        required: [true, 'name task is required']
    },
    dueDate: {
        type: Date,
        required: [true, 'due date is required']
    },
    priority: {
        type: String,  
    },
    status: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

var Task = mongoose.model('Task', taskSchema)

module.exports = Task