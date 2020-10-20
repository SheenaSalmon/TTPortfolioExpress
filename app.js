express =require('express');
const app =express ();
const portNum=3000;

const data =require('./data.json');
const projects =data.projects;



const bodyParser=require('body-parser')
app.use('/static',express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.set('view engine', 'pug');

//route for homepage, sends the "projects" objects
app.get('/',(req,res) =>{

    res.render('index',{projects});
});


// route for the about page
app.get('/about', (req, res) =>{

    res.render('about');
    
    
});

/*The project page that dyanmically show the page base on the project id,  
sends the currently selected project based on its id  property
Uses regular expressions to math project or projects */

app.get('/project(s)?/:id',(req,res,next) => {
    const projectID = req.params.id;
    if (projectID <projects.length ) 
    {
        const currentProject = projects.find(({id})=> id === +projectID);

    
    res.render('project',{currentProject});
    }
    else{
            const err =new Error("Not Around");
            err.status=404;
            err.message="You selected an invalid Project";
            next(err);
    }
});

// creats the file not found error
app.use((req,res, next) =>
{ const err = new Error("Not Found");
    err.status=404;
    err.message="Sorry, the file you requested cannot be found :(";
    next(err);}
);

//handles the errors that are passed and then renders the error template
app.use((err, req, res, next) =>
{
    res.locals.error=err;
    res.status(err.status);
    console.log(err.message);
    res.render('error');
}
);
app.listen(portNum, () =>
{console.log(`The app is listening on ${portNum}`)});


