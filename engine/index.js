// // The entrypoint to peace

class wordDataProvider{
    words;
    constructor(){
        let words = [
            "Rebel",
            "Reborn",
            "Surreptuous",
            "Jackal",
            "Ferrocious",
            "Breechwork",
            "Flamingo",
            "Goosebumps",
            "Dinosaur",
            "Venomous",
            "Brewery",
            "Fasttrack",
            "Juxtapose",
            "Hulaballoo",
            "Hulahoop",
            "Aloha",
            "Finesse",
            "Foster",
            "Habakkuk",
            "Lakadaisical",
            "Jaccuzzi"
        ];
    
        this.words = words;

        return this;
    }
    
   shuffle(){
       return this.words;
   }
}

class WordTypeGame{
    isPlaying;
    words; 
    currentWord;
    score;
    level;

    wordDisplay;
    wordInput;
    timeDisplay;
    scoreDisplay;
    messageDisplay

    interval;

    constructor(){
        this.isPlaying = false;

        this.score=0;
        this.level=1;

        this.wordInput = document.getElementById('word-input');
        this.wordDisplay = document.getElementById('word-display');
        this.scoreDisplay = document.getElementById('score-display');
        this.timeDisplay = document.getElementById('time-display');
        this.messageDisplay = document.getElementById('message-display');

    
        this.words = (new wordDataProvider).shuffle();
    }

   
    init = () => {
        let word  = this.getWord();

        //show word
        this.wordDisplay.innerHTML = word; 
        this.watchInput(this.wordInput);
    }


    watchInput = (input) => {
        //submit or start when user hits space or enter
        input.addEventListener('keydown', (e)=>{
            let key = (e.key).toLowerCase();
            if(key === " " || key === "enter"){
                if(!this.isPlaying) this.startGame();
                else this.submit()
            }
        })
    }

   
    startGame = () => {
        let inputValue = this.wordInput.value;
        let currentWord = this.getCurrentWord();
        let isWordMatch = this.matchWords(inputValue, currentWord);

        if(isWordMatch){
            this.isPlaying = true;
            this.spawn();
        }

    }


    resetGame = () => {
        this.score=0;
        this.level=1;
        this.isPlaying = false;
    }
    

    submit = () => {
        let inputValue = this.wordInput.value;
        let currentWord = this.getCurrentWord();
        let isWordMatch = this.matchWords(inputValue, currentWord);

        if(isWordMatch){
           this.incrementScore();
           this.spawn();

        }
        else {
          this.wordInput.value = "";
          this.stopCountDown();
          this.resetGame();
          this.messageDisplay.innerHTML = "<h3>Game Over!!!</h3>"
        }
    }

    getWord = () => {
        // If words are empty fetch more words
        if(!this.words.length) this.words = (new wordDataProvider).shuffle();

        let word = this.words[0];
        this.words.shift();

        this.setCurrentWord(word)
        return word || null;
    }


    spawn = () => {
        let word = this.getWord();
        this.wordDisplay.innerHTML = word;
        this.wordInput.value = "";

        // Stop ongoing countdown
        this.stopCountDown();
        // Start a new countdown
        this.startCountDown(word);
    }


    startCountDown = (word) => {
       // set timer in respect to  level difficulty
       let level = this.level;
       let initialTimerLevel = 0.5;

       let timer = Math.ceil(word.length * ( initialTimerLevel / level ));

       this.interval = setInterval(()=>{
           if(!timer) {
               this.stopCountDown();
               this.submit();
            }

           // this should not be here
           this.timeDisplay.innerHTML = `<h3>Time Left: ${timer}</h3>`;

           timer--;

       }, 1000);
    }

    stopCountDown = () => {
        clearInterval(this.interval);
    }

    matchWords = (input, word, caseSensitive=false) => {
        if(!caseSensitive)
            return((input).toLowerCase() == (word).toLowerCase())
        else 
            return(input == word)
    }


    updateScore = () => {
        // this should not be here
        this.scoreDisplay.innerHTML = `Score: ${this.score}`;
        this.updateLevel();
    }

    incrementScore = (add=1) => {
        //add can work for time bonus
        this.score += add;
        this.updateScore()
    }

    updateLevel(){
       //increment level only after points is 5+
       if((this.score % 5) === 0 ) this.level = Math.floor(this.score / 5);
    }

    //setters and getters
    getCurrentWord = () => this.currentWord;
    setCurrentWord = (word) => this.currentWord = word;
    getScore = () => this.score();
    setScore = (score) => this.score = score;
    getCurrentLevel = () => this.level;

    //dedicated dom manipulators
}


let wordGame = new WordTypeGame;
wordGame.init();