// Controller
const express = require('express');
const tracker = require('./exerciseModel');
const router = express.Router();
const room = require('./groupModel');

router
  .get("/users", (req, res) => res.send(room.users))
  .get("/player/todo", (req, res) => res.send(tracker.player.todo))
  .get("/player/done", (req, res) => res.send(tracker.player.done))
  .get("/room", (req, res) => res.send(room))

router
  
  .post("/player", (req, res) => {
    if (req.body.password == "password") {
      let player = room.users.find(x => x.fbid == req.body.fbid);
      if (!player) {
        let player = {
          name: req.body.name,
          id: room.users.length,
          todoList: tracker.defaultExercise.todo,
          doneList: tracker.defaultExercise.done,
          fbid: req.body.fbid, 
          picture: req.body.fbpicture
        };
        room.users.push(player);
      }
      res.status(201).send(player);
    } else {
      res.status(403).send("Invalid Password");
    }
  })

  .post("/finish", (req, res) => {
    let finishedWorkout = {
      text: req.body.workout.text,
      name: req.body.user.name,
      calories: req.body.workout.calories
    }
    
    let userIndex = req.body.user.id;
    room.users[userIndex].todoList.splice(req.body.i, 1);
    room.users[userIndex].doneList.push(req.body.workout);
    
    
    //console.log(room.users)
    room.workouts.push(finishedWorkout);
    res.status(201);
  })

module.exports.router = router;


/* 
.post("/user", (req, res)=> {
    let userIndex = room.users.indexOf(req.body.u);
    room.users.splice(userIndex, 1);
    console.log(room.users);
    res.status(201).send( null );
  })*/