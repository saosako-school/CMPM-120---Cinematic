class LogoScene extends Phaser.Scene{
    constructor() {
        super("logoScene");
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('baseball', 'Peach.png'); //change this to a baseball later
    }

    create() {
        let baseball = this.add.image(-100, 200, 'baseball');
        baseball.setScale(0.08);
        let text = this.add.text(160, 360, 'D   N BABES', {font: '80px Arial', color: '#ffffff'});
        text.setAlpha(0);
        let text2 = this.add.text(105, 450, 'PRODUCTIONS', {font: '80px Arial', color: '#ffffff'});
        text2.setAlpha(0);

        this.tweens.add({
            targets: text,
            delay: 3000,
            alpha: {from: 0, to: 1},
            duration: 1000

        })

        this.tweens.add({
            targets: text2,
            delay: 3000,
            alpha: {from: 0, to: 1},
            duration: 1000

        })

        this.tweens.chain({
            targets: baseball,
            tweens: [
                {
                    x: {value: {from: -200, to: 150}, duration: 1000, ease: 'Linear'},
                    y: {value: {from: 200, to: 400}, duration: 1000, ease: 'Cubic.easeIn'},
                },
                {
                    x: '+= 100',
                    rotation: '+=2.2',
                    ease: 'Circ.easeOut',
                },
            ],
        });
    }

    update(time) {
        if (time > 7000) {
            this.scene.start("startScreen");
        }
    }
}

class StartScreen extends Phaser.Scene{
    constructor() {
        super("startScreen");
    }

    preload() {
        this.load.path = 'assets/';
        this.load.image('peach', 'Peach.png');
        this.load.image('momotaroTitle', 'Momotaro title.png');
    }

    create() {
        let peach = this.add.image(550, 400, 'peach');
        peach.setScale(0.25);
        let title = this.add.image(200, 130, 'momotaroTitle');
        title.setScale(0.4);

        let menu = this.add.text(
            70, 
            235, 
            `Start

            

            Settings

            Credits`,
            {font: '35px Arial', color: '#000000'},
        );

        menu.setWordWrapWidth(200, true);

        let cont = this.add.text(
            70,
            235,
            `
            
            Continue`,
            {font: '35px Arial', color: '#7e7e7e'},
        );

        this.graphics = this.add.graphics()
        this.graphics.fillStyle(0x000000, 1)
        this.rect = this.graphics.fillRect(-100, -100, 1000, 1000);
        this.rect.setAlpha(0);

        cont.setWordWrapWidth(200, true);

        this.tweens.add({
            targets: peach,
            y: {start: -100, to: 400},
            duration: 2200,
            ease: 'Bounce.Out',

        });

        this.tweens.add({
            targets: title,
            x: {start: -200, to: 200},
            duration: 2000,
            ease: 'Sine.out',
        });

        this.tweens.add({
            targets: this.rect,
            delay: 4200,
            duration: 5000,
            alpha: 1,

        })

        
    }

    update(time) {
        if (time > 17200) {
        this.scene.start("loadingScreen");
        }
    }
}

class LoadingScreen extends Phaser.Scene{
    constructor() {
        super("loadingScreen");
    }

    preload() {
        this.load.path = "assets/";
        this.load.image("fireplace", "Firepit.png"); //firepit
        this.load.image("smoke", "Smoke.png"); //smoke
    }

    create() {
        this.graphics = this.add.graphics()
        this.graphics.fillStyle(0x000000, 1)
        this.rect = this.graphics.fillRect(-100, -100, 1000, 1000);
        this.fireplace = this.add.image(400, 300, "fireplace");
        this.fireplace.setScale(2);
        this.smoke = this.add.image(390, 100, "smoke");
        this.smoke.setScale(1);

        /*this.gradientMap = this.smoke.enableFilters().filters.internal.addGradientMap({
            ramp:[{
                colorStart: {alphaGL: 1},
                colorEnd: .transparent(), //make color object of peach that turns transparent
            }]
        })*/

        this.loading = this.add.text(
            325, 
            450,
            "Loading",
            {font: '30px Arial', color: '#ffffff'},
        );


        this.startY = 300;
        this.destinationY = 200;
        this.alphaSmokeStart = 0;
        this.alphaSmokeEnd = 1;
        this.tweens.add({
            targets: this.smoke,
            y: {
                getStart: function(target, key, value) {
                    if (this.startY == 300){
                        this.startY = 200;
                    }
                    else {
                        this.startY = 300;
                    }
                    return this.startY;
                },
                getEnd: function(target, key, value) {
                    if (this.destinationY == 200){
                        this.destinationY = 100;
                    }
                    else{
                        this.destinationY = 200;
                    }
                    return this.destinationY;
                },
            },
            alpha: {
                getStart: function(target, key, value){
                    if (this.alphaSmokeStart == 0){
                        this.alphaSmokeStart = 1;
                    }
                    else{
                        this.alphaSmokeStart = 0;
                    }
                    return this.alphaSmokeStart;
                },
                getEnd: function(target, key, value){
                    if (this.alphaSmokeEnd == 1){
                        this.alphaSmokeEnd = 0;
                    }
                    else{
                        this.alphaSmokeEnd = 1;
                    }
                    return this.alphaSmokeEnd;
                },
            },
            repeat: -1,
        })


        


        
        this.ellipsesCounter = 0;
        this.ellipsesEvent = this.time.addEvent({ delay: 1000, callback: this.ellipsesUpdate, callbackScope: this, loop: true});
        
        
    }

    

    update() {}

    ellipsesUpdate () {
        this.ellipsesCounter += 1;
        if (this.ellipsesCounter == 4){
            this.ellipsesCounter = 0;
            this.loading.setText("Loading");
        }
        else{
            this.loading.appendText(".", false);
        }
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#7A91EA',
    pixelArt: true,
    scene: [LogoScene, StartScreen, LoadingScreen],
}

let game = new Phaser.Game(config);