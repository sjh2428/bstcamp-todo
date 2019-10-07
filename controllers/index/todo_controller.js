module.exports = {
    todoGetController(req, res) { // url: /todo
        res.render('todo/todo');
    },
    todoIdGetController(req, res) { // url: /todo/:id
        res.render('project/project');
    }
};