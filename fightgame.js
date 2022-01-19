window.onload = function() {
    document.getElementById("container").style.display = 'none';
}

function startButton() {
    document.getElementById("header").style.display = "none";
    document.getElementById("container").style.display = "inline-block";
  }

class Room {
    constructor(roomName, description){
        this._roomName = roomName;
        this._description = description;
        this._linkedRooms = {};
        this._character = "";
    }
get roomName(){
    return this._roomName;
}
get description(){
    return this._description;
}
get character() {
    return this._character
  }
set roomName(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._roomName = value;
  }
set description(value) {
    if (value.length < 4) {
      alert("description is too short.");
      return;
    }
    this._description = value;
  }
set character(value) {
    this._character = value;
  }

describe() {
    return "The " + this._roomName + " is " + this._description;
}
linkedRooms(direction, roomToLink){
    this._linkedRooms[direction] = roomToLink;
}

 //a method to produce friendly description of linked rooms
getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = []
    for (const [direction, room] of entries) {
      let text = " The " + room._roomName + " is to the " + direction;
      details.push(text);
    }
    return details;
}

move(direction){
    if(direction in this._linkedRooms){
        return this._linkedRooms[direction];
    }else{
        //alert("you cann't go that way")
        console.log("you cann't go that way")
        return this;
    }
    }
}
const Hall = new Room("Hall","gorgeous");
const Kitchen = new Room("kitchen", "morden");
const Livingroom = new Room("livingroom","huge");
const Bedroom = new Room("Bedroom","cossy");

Hall.linkedRooms("south",Livingroom);
Hall.linkedRooms("east", Bedroom);
Hall.linkedRooms("west", Kitchen);
Kitchen.linkedRooms("east", Hall);
Kitchen.linkedRooms("south", Livingroom);
Livingroom.linkedRooms("west",Kitchen);
Livingroom.linkedRooms("east",Bedroom);
Livingroom.linkedRooms("north",Hall);

class Item {
    constructor(name) {
      this._name = name,
        this._description = ""
    }
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }
    set description(value) {
      if (value.length < 4) {
        alert("Decription is too short.");
        return;
      }
      this._name = value;
    }
    get name() {
      return this._name;
    }
    get description() {
      return this._description;
    }
    describe() {
        return "The " + this._name + " is " + this._description;
      }
    }

class Character{
    constructor(itemName){
        this._itemName = itemName
        this._age = ""
        this._gender = ""
        this._conversation = ""//为什么放这里？
    }
    get itemName(){
        return this._itemName;
    }
    get age(){
        return this._age;
    }
    get gender(){
        return this._gender;
        }
    get conversation() {
        return this._conversation;
        }
    set conversation(value) {
      if (value.length < 4) {
       alert("conversation is too short.");
       return;
      }
      this._conversation = value;
      }
    set age(value){
        if(value < 5){
            console.log("you are too little");
            return;
        }
        this._age = value;
    }
    set itemName(value) {
      this._itemName = value;
    }
    set gender(value) {
      this._gender = value;
    }
    describe() {
        return  "You have met " +this._itemName+", "+this._itemName + " is a " + this._gender +", "+this._age+" years old."
    }
    converse(){
        return this._itemName + " says " + "'" + this._conversation + "'.";
    }
}

class Enemy extends Character {
    constructor(itemName) {
      super(itemName);
      this._weakness = "";
    }

    set weakness(value) {
      if (value.length < 4) {
        alert("Decription is too short.");
        return;
      }
      this._weakness = value;
    }
 //a method to determine the reult of fighting an enemy
  fight(item) {
    if (item = this_weakness) {
      return true;
    } else {
      return false;
    }
  }
}


const Daisy = new Character("Daisy", "10", "girl");
const Nayomi = new Character("Nayomi", "10", "girl")


//add characters
const Adam = new Enemy("Adam");
Adam.age = 16;
Adam.gender = "boy";
Adam.conversation = "Welcom to the kitchen, find a pot";
Adam.weakness = "cheese";
const Stephen = new Enemy("Stephen")
Stephen.age = 16;
Stephen.gender = "boy";
Stephen.conversation = "Let's play a puzzle";
Stephen.weakness = "chilli";


// add characters to rooms
Kitchen.character = Adam;
Livingroom.character = Stephen;

  //Subroutine to display information about the current room
 function displayRoomInfo(room) {
    let occupantMsg = ""
    if (room.character === "") {
      occupantMsg = ""
    } else {
      occupantMsg = room.character.describe() + ". " + room.character.converse()
    }

    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
    occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
  }

  //Subroutine to complete inital game set up then handle commands from the user
  function startGame() {
    //set and display start room
    currentRoom = Hall
    displayRoomInfo(currentRoom);
    //handle commands
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        command = document.getElementById("usertext").value;
        const directions = ["north", "south", "east", "west"]
        if (directions.includes(command.toLowerCase())) {
          currentRoom = currentRoom.move(command)
          displayRoomInfo(currentRoom);
        } else {
          document.getElementById("usertext").value = ""
          alert("that is not a valid command please try again")
        }
      }
    });
  }

