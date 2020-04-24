let g1 = new Game('nombres');

//Déplacement d'une case
for (let i=0; i <16; i++) {
    document.getElementById("photo" + i).addEventListener("click", function (e) {
        g1.deplacer(g1.plateau.find(element => element.img === e.target));
    });
}

//mélanger les cases
document.getElementById("melanger").addEventListener("click", function (){
    g1.melanger();
});

//afficher la solution
document.getElementById("solution").addEventListener("click", function(){
    g1.solution();
});

