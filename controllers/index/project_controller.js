module.exports = {
    projectGetController(req, res) { // url: /project
        res.render('project/project');
    },
    projectIdGetController(req, res) { // url: /project/:id
        res.render('project/project');
    }
};