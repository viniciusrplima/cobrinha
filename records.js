

function Record(name, score) {
    this.name = name;
    this.score = score;
}

function RecordsGame(scrContext, width, height) {

    const lsRecords = "records";

    const recDatabase = "SnakeRecord";

    this.recStruct = "\
    <div class='button-set button'>\
    <h3>Records</h3>\
    <ol id='recordlist' class='reclist'>\
    </ol>\
    <br>\
    <button id='back' class='over-button'>Back</button>\
    </div>\
    ";

    this.ctx = scrContext;
    this.width = width;
    this.height = height;
    this.records = [];

    this.playingState = "Records";
    this.overscreen = null;


    this.play = function() {
        this.draw();

        return this.playingState;
    }

    this.reset = function() {
        this.playingState = "Records";

        this.loadRecords();
        this.fillRecords();
    }

    this.returnToMenu = function() {
        this.playingState = "Menu";
    }

    this.draw = function() {
        this.ctx.fillStyle = "beige";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    this.attachOverscreen = function(overscr) {
        this.overscreen = overscr;
    }

    this.fillRecords = function() {
        this.overscreen.innerHTML = this.recStruct;

        let recList = document.getElementById("recordlist");
        let btnBack = document.getElementById("back");

        btnBack.addEventListener("click", () => {
            this.returnToMenu();
        });
        recList.innerHTML = this.structList();
    }

    this.structList = function() {
        strList = "";
        for(rec of this.records)
            strList += `<li>${rec.name} : ${rec.score}</li>`;
        console.log(this.records);
        return strList;
    }

    this.getRecIndex = function(score) {
        for(let i = 0; i < this.records.length; i++) {
            if(score > this.records[i].score)
                return i;
        }
        return this.records.length;
    }

    this.insertRecord = function(record) {
        index = this.getRecIndex(record.score);
        this.records.splice(index, 0, record);
        this.saveRecords();
    }

    this.registerRecord = function(record) {
        let db = firebase.firestore();

        db.collection(recDatabase).add({
            name: record.name,
            score: record.score
        });
    }

    /* Dont work */
    this.saveRecords = function() {
        /*recString = JSON.stringify(this.records);
        localStorage.setItem(lsRecords, recString);*/
    }

    this.loadRecords = function() {
        /*strRecords = localStorage.getItem(lsRecords);
        storageRecords = JSON.parse(strRecords);
        if(storageRecords != null)
            this.records = storageRecords;*/
        
        let db = firebase.firestore();
        
        db.collection(recDatabase).get().then((snapshot) => {
            
            this.records = [];
            snapshot.forEach((doc) => {
                this.insertRecord(doc.data());
            });
            this.fillRecords();
        });
    }
}