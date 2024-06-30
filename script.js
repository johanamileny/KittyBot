document.addEventListener('DOMContentLoaded', (event) => {
    // Selección de elementos del DOM importantes
    const healthElement = document.getElementById('health');
    const energyElement = document.getElementById('energy');
    const statusElement = document.getElementById('status');
    const healthCircle = document.getElementById('healthCircle');
    const kittyImage = document.getElementById('helloKitty');

    // Variables de sonido
    let winAudio = new Audio('./sounds/win.wav');
    let loseAudio = new Audio('./sounds/lose.wav');
    let clickAudio = new Audio('./sounds/click.wav');
    let EventoAudio = new Audio('./sounds/click.wav');

    // Objeto Tamagotchi
    let tamagotchi = {
        name: "Tama",
        health: 100,
        energy: 100,
        maxHealth: 100,
        maxEnergy: 100,
        status: "Normal",

        // Función para alimentar al Tamagotchi
        feed: function() {
            if (this.health < this.maxHealth) {
                this.health += 10;
                if (this.health > this.maxHealth) {
                    this.health = this.maxHealth;
                }
                this.updateStatus("Alimentando");
                this.updateStats();
                this.animate("feed");
                clickAudio.play(); // Reproducir sonido al alimentar
            }
        },

        // Función para jugar con el Tamagotchi
        play: function() {
            if (this.energy > 0) {
                this.energy -= 10;
                if (this.energy < 0) {
                    this.energy = 0;
                }
                this.health += 5;
                if (this.health > this.maxHealth) {
                    this.health = this.maxHealth;
                }
                this.updateStatus("Jugando");
                this.updateStats();
                this.animate("play");
                winAudio.play(); // Reproducir sonido al jugar
            } else {
                this.health -= 10;
                if (this.health < 0) {
                    this.health = 0;
                }
                this.updateStatus("Cansado");
                this.updateStats();
                loseAudio.play(); // Reproducir sonido si está cansado
            }
        },

        // Función para dormir al Tamagotchi
        sleep: function() {
            if (this.energy < this.maxEnergy) {
                this.energy += 20;
                if (this.energy > this.maxEnergy) {
                    this.energy = this.maxEnergy;
                }
                this.health += 15;
                if (this.health > this.maxHealth) {
                    this.health = this.maxHealth;
                }
                this.updateStatus("Durmiendo");
                this.updateStats();
                this.animate("sleep");
                clickAudio.play(); // Reproducir sonido al dormir
            }
        },

        // Función para enfermar al Tamagotchi
        getSick: function() {
            this.health -= 20;
            if (this.health < 0) {
                this.health = 0;
            }
            this.updateStatus("Enfermo");
            this.updateStats();
            this.animate("sick");
            loseAudio.play(); // Reproducir sonido al enfermarse
        },

        // Función para ir al baño
        goToBathroom: function() {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.updateStatus("Yendo al baño");
            this.updateStats();
            this.animate("goToBathroom");
            clickAudio.play(); // Reproducir sonido al ir al baño
        },

        // Función para ejercitarse
        exercise: function() {
            if (this.energy > 0) {
                this.energy -= 15;
                if (this.energy < 0) {
                    this.energy = 0;
                }
                this.health += 10;
                if (this.health > this.maxHealth) {
                    this.health = this.maxHealth;
                }
                this.updateStatus("Ejercitándose");
                this.updateStats();
                this.animate("exercise");
                winAudio.play(); // Reproducir sonido al ejercitarse
            } else {
                this.health -= 5;
                if (this.health < 0) {
                    this.health = 0;
                }
                this.updateStatus("Sin energía para ejercitarse");
                this.updateStats();
                loseAudio.play(); // Reproducir sonido si está sin energía para ejercitarse
            }
        },

        // Función para actualizar las estadísticas visibles del Tamagotchi
        updateStats: function() {
            healthElement.innerText = this.health;
            energyElement.innerText = this.energy;
            let healthPercentage = (this.health / this.maxHealth) * 282.6;
            healthCircle.style.strokeDashoffset = 282.6 - healthPercentage;
        },

        // Función para actualizar el estado del Tamagotchi
        updateStatus: function(newStatus) {
            this.status = newStatus;
            statusElement.innerText = this.status;
            if (newStatus !== "Normal") {
                setTimeout(() => {
                    this.status = "Normal";
                    statusElement.innerText = this.status;
                }, 2000);
            }
        },

        // Función para animar la imagen del Tamagotchi
        animate: function(action) {
            if (action === "feed") {
                kittyImage.src = "images/hello_kitty_eating.png";
            } else if (action === "play") {
                kittyImage.src = "images/hello_kitty_playing.png";
            } else if (action === "sleep") {
                kittyImage.src = "images/hello_kitty_sleeping.png";
            } else if (action === "sick") {
                kittyImage.src = "images/hello_kitty_sick.png";
            } else if (action === "goToBathroom") {
                kittyImage.src = "images/hello_kitty_bathroom.png";
            } else if (action === "exercise") {
                kittyImage.src = "images/hello_kitty_exercising.png";
            }
            setTimeout(() => {
                kittyImage.src = "images/hello_kitty.png";
            }, 2000);
        }
    };

    // Event listeners para los botones
    document.getElementById('feedButton').addEventListener('click', () => tamagotchi.feed());
    document.getElementById('playButton').addEventListener('click', () => tamagotchi.play());
    document.getElementById('sleepButton').addEventListener('click', () => tamagotchi.sleep());
    document.getElementById('sickButton').addEventListener('click', () => tamagotchi.getSick());
    document.getElementById('bathroomButton').addEventListener('click', () => tamagotchi.goToBathroom());
    document.getElementById('exerciseButton').addEventListener('click', () => tamagotchi.exercise());

    // Actualización periódica de stats (simulación de tiempo)
    setInterval(() => {
        if (tamagotchi.health > 0) {
            tamagotchi.health -= 1;
        }
        if (tamagotchi.energy > 0) {
            tamagotchi.energy -= 1;
        }
        tamagotchi.updateStats();
    }, 2000); // Actualización cada 2 segundos

    // Inicialización de stats
    tamagotchi.updateStats();
});




