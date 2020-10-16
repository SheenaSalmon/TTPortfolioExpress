express =require('express');
const app =express ();

app.use('/static',express.static('public'));
app.set('view engine', 'pug');


app.get('/',(req,res) =>{

    res.render("index");
});

app.get('/about',(req, res) =>{
    res.send("about");
});

app.get('/project',(req,res) => {
    res.send("project");
})

app.listen(3000);


