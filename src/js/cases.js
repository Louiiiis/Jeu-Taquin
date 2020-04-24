class Cases {
   constructor(x,y,img){
       this.img = img;
       this.x = x;
       this.y = y;
   }

    /**
     * modifie la source de l'image grâce à l'attribut thème.
     */
    setSrc() {
        this.img.src = "img/" + this.theme + "/" + this.theme + "_" + this.i + ".jpg";
    }

    /**
     * modifie la source en fonction de l'attribut i auquel on passe une valeur en paramètre.
     * @param i
     */
    setI(i) {
        this.i = i;
        this.setSrc();
    }

    /**
     * modifie le thème.
     * @param theme
     */
    setTheme(theme){
       this.theme = theme;
    }

    /**
     * permute 2 images entre-elles grâce à la source.
     * @param other
     */
    permuterSrc(other) {
        let i_other = other.i;
        let i_this = this.i;
        this.setI(i_other);
        other.setI(i_this);
        this.setSrc();
        other.setSrc();
    }

    /**
     * modifie le cursor avec la valeur passée en paramètre.
     * @param c
     */
    setCursor(c) {
        this.img.style.cursor = c;
    }

    /**
     * déplace la case sur le plan abscisse-ordonées.
     * @param x
     * @param y
     */
    moveTo(x,y){
       this.x = x;
       this.y = y;

    }

}