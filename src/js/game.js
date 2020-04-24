class Game {

    plateau = [];

    constructor(theme){
        this.nb_coups = 0;
        this.theme = theme;
        let k = 0;
        for (let i = 0; i<4; i++){
            for (let j = 0; j<4; j++){
                this.plateau.push(new Cases(i,j,document.getElementById("photo" + k)));
                this.plateau[k].setTheme(theme);
                this.plateau[k].setI(k);
                k++;
            }
        }
        const changementTheme = function(){
            this.adapter_puzzle(document.getElementById('themes').value);
        }.bind(this);
        document.getElementById('themes').addEventListener('change', changementTheme);
        this.message = document.getElementById('message');
        this.message.innerHTML = "<p>" +"0 coup, " + this.imageOk() + " bien placés" + "</p>";
    }

    /**
     * adapte le puzzle en fonction du thème passé en paramètre.
     * @param nom
     */
    adapter_puzzle(nom) {
        for (let i = 0; i < 17; i++) {
            let image = document.getElementById('photo' + i);
            image.src = 'img/' + nom + '/' + nom + '_' + i + '.jpg';
            image.title = nom;
            image.alt = nom + i;
            this.plateau[i].setTheme(nom);
        }
    }

    /**
     * retourne le nombre de case bien placées.
     * @returns {number}
     */
    imageOk(){
        let nb = 0;
        for (let i = 0; i< 15;i++){
            if (this.plateau[i].i === i ){
                nb++;
            }
        }
        return nb;
    }

    /**
     * retourne l'indice de la casse vide.
     * @returns {number}
     */
    case_vide(){
        let j = 0;
        while(this.plateau[j].i !== 15){
            j++;
        }
        return j;
    }

    /**
     * déplace une case en permutant la case vide avec le voisin (grâce à permuterSrc).
     * @param cases
     */
    deplacer(cases){
        let vide = this.case_vide();
        if (this.isVoisin().includes(cases)) {
                this.plateau[vide].permuterSrc(cases);
                cases.moveTo(this.plateau[vide].x, this.plateau[vide].y);
                this.nb_coups++;
                this.message.innerHTML =this.nb_coups + " coups, " + this.imageOk() + " bien placés";
                this.change_cursor();
                if (this.game_won()) {
                    this.message.innerHTML ="bravo, puzzle résolu en " + this.nb_coups + " coups.";
                    let theme = document.getElementById('themes').value;
                    this.plateau[15].img.src = "img/" + theme + "/" + theme + "_.jpg";
                    this.plateau[14].setCursor("not-allowed");
                    this.plateau[11].setCursor("not-allowed");
                }
        }
    }

    /**
     * récupère un voisin au hasard et le déplace.
     */
    melanger(){
        for (let i = 0; i<350; i++){
            let t = this.isVoisin();
            this.deplacer(t[Math.floor(Math.random() * t.length)]);
            this.reset_coups();
        }
    }

    /**
     * Trouve les voisins de la case vide et les push dans un tableau.
     **/
    isVoisin(){
        let tab = [];
        let vide = this.case_vide();
        const x = vide % 4;
        const y = (vide-vide%4)/4;

        for (let i = 0; i<16;i++) {
            if (y>0 && i===vide-4) {
                tab.push(this.plateau[i]);

            }
            if(x>0 && i===vide-1){
                tab.push(this.plateau[i]);

            }
            if(y<3 && i===vide+4){
                tab.push(this.plateau[i]);

            }
            if(x<3 && i===vide+1){
                tab.push(this.plateau[i]);

            }
        }
        return tab;
    }

    /**
     * return true si la partie est terminée, false sinon.
     * @returns {boolean}
     */
    game_won(){
        return this.imageOk() === 15;
    }

    /**
     * restaure l'attribut nombre de mots à 0.
     */
    reset_coups(){
        this.nb_coups = 0;
    }

    /**
     * Si le plateau est affiché, alors afficher la solution et faire disparaître le plateau.
     * Dans ce cas, on ne peut pas mélanger.
     * Sinon faire apparaître le plateau et disparaître la solution, on peut mélanger.
     */
    solution(){
        if(document.getElementById("jeu").style.display === "flex") {
            document.getElementById("jeu").style.display = "none";
            document.getElementById("modele").style.display = "flex";
            document.getElementById("melanger").disabled = true;
        }
        else {
            document.getElementById("jeu").style.display = "flex";
            document.getElementById("modele").style.display = "none";
            document.getElementById("melanger").disabled = false;
        }
    }

    /**
     * Place les images en "not-allowed".
     * Puis, parcourt le tableau des voisins pour les place le cursor en pointer.
     */
    change_cursor(){
        let tab = this.isVoisin();
        for (let i = 0; i < 16 ; i++) {
            this.plateau[i].setCursor("not-allowed");
        }
        for (let i = 0; i < tab.length ; i++) {
            tab[i].setCursor("pointer");
        }
    }
}