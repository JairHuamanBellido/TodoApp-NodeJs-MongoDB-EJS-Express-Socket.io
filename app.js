const mongoose = require('./src/database/dbj')
const express = require('express');
const app = express();


const router = require('./src/router/routers');
const path = require('path');

const server = require('http').Server(app);
const io = require('socket.io')(server);
const Task = require('./src/model/task');


app.use(express.urlencoded({ extended: false }));

app.use('/src', express.static('src'));
app.set('views', path.join(__dirname + '/src/views'));
app.set('view engine', 'ejs');
app.use('/', router);

updateTask = async (data) => {
    const task = new Task(
        { task: data.task, complete: false }
    );
    await task.save();

    return task;
}

searchTask = async (id) => {


    let task = await Task.findById(id);
    return task;
}







mongoose.connect;

server.listen(3000, () => {
    console.log('Listen on 3000 host');
})


io.on('connection', (socket) => {
    console.log(socket.id + " ha ingresado a la sala");

    socket.on('new task', function (data) {

        updateTask(data).then((obj) => {
            io.sockets.emit('new task recevied', {
                obj: obj
            }
            );
        });
    });

    socket.on('change value', (data) => {

        searchTask(data.id).then(obj => {
            Task.updateOne({ _id: obj.id }, { complete: !obj.complete }).then(obj => {
                console.log('Value are update succesfully')
            });
            io.sockets.emit('change value', {
                complete: !obj.complete,
                id: obj._id

            });

        })

    })

    socket.on('delete task', (data) => {
        Task.deleteOne({ _id: data.id }).then(() => {
            console.log('Task delete succesfully');

        })
    })


    socket.on('search task', (data) => {

        searchTask(data.id).then(obj => {
            socket.emit('change task', { obj: obj });
        })
    })

    socket.on('change task', (data) => {
        Task.findById(data.id).then(obj => {
            Task.updateOne({ _id: obj.id }, { task: data.task }).then(task => {
                console.log('Task edit sucessfully');
            })
        })
        io.sockets.emit('modify task', { id: data.id, task: data.task });
    })

})