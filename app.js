const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7777


app.listen(port, () => {
    console.log('Server/App is running at ', port);
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public/style.css'));
app.use(bodyParser.urlencoded({ extended: false }));

let tasks = [];

app.get('/', (req, res) => {
    res.render('index', {tasks} );
});

app.post('/addTask', (req, res) => {
    const newTask = req.body.task;
    tasks.push({id: Date.now(), text: newTask});
    console.log(tasks)
    res.redirect('/');
}) 

app.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    res.render('edit', {task});
});

app.post('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedText = req.body.task;
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.text = updatedText;
    }
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id !== taskId);
    res.redirect('/');
})