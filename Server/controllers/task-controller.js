const Task = require("../models/task");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

class TaskController {
  //CREATE Task ------------------------>>>
  static createTask(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    Task.create({
      taskName: req.body.taskName,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      userId: decode.id
    })
      .then(task => {
        res.status(200).json({
          message: "task success created",
          task
        });
      })
      .catch(err => {
        res.status(400).json({
          err
        });
      });
  }

  //DELETE Task ------------------------>>>
  static deleteTask(req, res) {
    let id = req.params.id;
    Task.deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({
          message: "task success deleted"
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  //UPDATE Task ------------------------>>>
  static updateTask(req, res) {
    let id = req.params.id;
    Task.updateOne(
      { _id: id },
      {
        $set: {
          taskName: req.body.taskName,
          dueDate: req.body.dueDate,
          priority: req.body.priority,
          status: req.body.status
        }
      }
    )
      .then(() => {
        res.status(200).json({
          message: "task success updated"
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  //UPDATE Status Task ------------------------>>>
  static updateStatusTask(req, res) {
    console.log(req.params.id);
    
    let id = req.params.id;
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    Task.updateOne(
      { _id: id },
      {
        $set: {
          status: true
        }
      }
    )
      .then(() => {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "todows666@gmail.com",
            pass: `${process.env.PASS_EMAIL}`
          }
        });

        const mailOptions = {
          from: `todows666@gmail.com`,
          to: decode.email, 
          subject: "My-Todo", 
          html:
            `your todo ${req.body.taskName} is done`
        };

        transporter.sendMail(mailOptions, function(err, info) {
          if (err)
            res.status(400).json({
              message: err.message
            });
          else
            res.status(200).json({
              message: `email has been sent! your todo is done`
            });
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  //Find All Task ------------------------>>>
  static findTask(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);


    Task.find({ userId: decode.id }).sort({createdAt: 1})
      .then(tasks => {
        res.status(200).json({
          message: "data all task",
          tasks
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  //Find One Task ------------------------>>>
  static findOneTask(req, res) {
    let id = req.params.id;

    Task.findOne({ _id: id })
      .then(task => {

        res.status(200).json({
          message: "data task",
          task
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  //Find Task  Priority------------------------>>>
  static findTaskPriority(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    Task.find({ priority: "Priority", userId: decode.id })
      .then(tasks => {

        res.status(200).json({
          message: "data all task priority",
          tasks
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  //Find Task  Done------------------------>>>
  static findTaskDone(req, res) {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    Task.find({ status: true, userId: decode.id })
      .then(tasks => {

        res.status(200).json({
          message: "data all task done",
          tasks
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }
}

module.exports = TaskController;
