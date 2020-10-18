express =require('express');
const app =express ();
const portNum=3000;

const data =require('./data.json');
const projects =data.projects;
const project1=projects[1];


const bodyParser=require('body-parser')
app.use('/static',express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.set('view engine', 'pug');


app.get('/',(req,res) =>{

    res.render('index',{projects});
});

app.get('/about', (req, res) =>{

    res.render('about');
    
    
});

app.get('/project/:id',(req,res) => {
    const projectID = req.params.id;
    const currentProject = projects.find(({id})=> id === +projectID);
    
    res.render('project',{currentProject});
});


app.use((req,res, next) =>
{ const err = new Error("Not Found");
    err.status=404;
    err.message="Sorry, the file you requested cannot be found :(";
    next(err);}
);

app.use((err, req, res, next) =>
{
    res.locals.error=err;
    res.status(err.status);
    res.render('error');
}
);
app.listen(portNum, () =>
{console.log(`The app is listening on ${portNum}`)});


