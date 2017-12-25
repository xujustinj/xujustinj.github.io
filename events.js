function Project() {
    this.name;
    this.date;
    this.implements;
    this.description;
}

var normal = new Project();
normal.name = 'Hello World!';
normal.date = 'December 2017';
normal.implements = 'HTML, CSS';
normal.description = "My name is Justin Xu. This site was created to be a collection of my digital projects.";

var hexagonal_2048 = new Project();
hexagonal_2048.name = 'Hexagonal 2048';
hexagonal_2048.date = 'July 2017';
hexagonal_2048.implements = 'JavaScript';
hexagonal_2048.description = 'This game applies the rules of the popular game 2048 to a hexagonal grid, rather than a square grid. Uses primarily JavaScript and the p5 library to edit an HTML canvas element that contains the game. This is not the first time someone has made a hexagonal variant of 2048. Nonetheless, this project was constructed from scratch and without consultation of existing versions. Use the QWEASD keys to control the board.';

var water = new Project();
water.name = 'Water';
water.date = '2015 -';
water.implements = 'LMMS';
water.description = 'Starting in Grade 9, I dabbled occasionally in digital music production using LMMS, the results of which can be heard here.';

var concertino = new Project();
concertino.name = 'Concertino';
concertino.date = 'December 2016 - March 2017';
concertino.implements = 'Microsoft Excel, Visual Basic';
concertino.description = '';

function hover(project) {
    project_name.innerHTML = '<h1>' + project.name + '</h1>';
    project_date.innerHTML = '<h2>' + project.date + '</h2>';
    project_implements.innerHTML = '<h2>' + project.implements + '</h2>';
    project_description.innerHTML = '<p>' + project.description + '</p>';
}

hover(normal);
