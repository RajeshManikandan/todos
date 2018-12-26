const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    description: {
        type: String
    },
    subtasks: [
        {
            name: {
                type: String,
                required: true
            },
            isCompleted: {
                type: Boolean,
                default: false
            }
        }
    ],
    lastStartTime: {
        type: Date
    },
    totalWorkTime: {
        type: Object
    },
    status: {
        type: String,
        default: 'Open' //Open or Playing or Completed
    },
    completedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);

// todo{
//     name,
//     category,
//     description,
//     sub_tasks[],
//     lastStartTime,
//     totalWorkTime,
//     playing,
//     completedAt,
//     createdAt,
// }
