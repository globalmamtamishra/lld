console.log("IPL TICKET BOOKING SYSTEM");
//Person class creating
class Person{
    constructor(category,name,age,gender){
        this._category= category;
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    get category(){
        return this._category;
    }
    set category(value){
        this._category = value;
    }
}
// inheriteting properties for VVIPs,
class VVIP extends Person{
   constructor(name,age,gender){
    super("VVIP",name,age,gender)
   }
}
// creating class for VIPs
class VIP extends Person{
    constructor(name,age,gender){
        super("VIP",name,age,gender)
    }
}
// creating class for GENRALs
class General extends Person{
    constructor(name,age,gender){
        super("General",name,age,gender)
    }
}
// creting slot
  class Slot{
    constructor(category,number){
        this.category = category;
        this.number = number;
        this._isBooked = false
    }
    get isBooked(){
        return this._isBooked;
    }
    set isBooked(value){
    this._isBooked = value;
  }

  }
  // individual floor
  class IndividualFloor{
    constructor(floorNumber,maxSpots){
        this.floorNumber=floorNumber;
        this._diffSpots = [];
        for(let i = 0;i<maxSpots;i++){
           if(i>=0&&i<=99){
            this._diffSpots.push(new Slot("VVIP",i))
           }else if(i>=100&&i<=199){
            this._diffSpots.push(new Slot("VIP",i))
           }
           else{
            this._diffSpots.push(new Slot("General",i))
           } 
        }
    }
     get diffSpots(){
        return this._diffSpots;
     }
 }
 // IPT STADIUM //BUILDING
   class Builidng{
    constructor(number){
        this._floors = [];
        this._numberOfFloor = number;

        for(let i = 0;i<number;i++){
            this._floors.push(new IndividualFloor(i,300))
        }
    }
   get numberOfFloor(){
    return this._numberOfFloor;
   }

   get floors(){
    return this._floors;
   }
   //after booking the vacant slot now the job is to deliver the ticket to buyers
    sittingPerson(person){
        let slot = this.findSlot(person.category)
        if(slot){
            this.bookSlot(slot);
            let ticket = new Ticket(slot.floorNumber,slot.slot.number)
           // console.log(ticket)
           alert("Please Get your Ticket")
           //////////
            
            let category = document.getElementById("category").value;
            let name = document.getElementById("name").value;
            let gender = document.getElementById("gender").value;
            let age = document.getElementById("age").value;
            getdetails(ticket,category,name,gender,age)
            /////////
        }
        else{
            //console.log("Slot no available")
           alert("Sorry There is no slot available Now")
            return false;
        }
    }
    // finding vacant slot for all gategories
    findSlot(category){

        for(let i = 0;i<this._numberOfFloor;i++){
            for(let slot of this._floors[i]._diffSpots){
                if(slot.category==category && !slot.isBooked){
                    return {floorNumber:i,slot:slot}
                }
            }
        }
        return false;
    } 
    // after finding the vacant slot now the job is to book the vacant slot
    bookSlot(slot){
        slot.slot.isBooked = true;
       // console.log("Slot is booked")
        return true;
    }

   }

   class Ticket{
    constructor(floorNumber,slotNumber){
        this.floorNumber = floorNumber;
        this.slotNumber = slotNumber;
        this.day = new Date()
    }
   }
   function submit(){
    let category = document.getElementById("category").value;
    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let age = document.getElementById("age").value;
    if(category ==="none"){
        alert("Please select category")
    }
    else if(category=="VVIP"){
        let vvip = new VVIP(name,age,gender,)
        passToBuilding(vvip)
        console.log("vvip")
    }
    else if(category=="VIP"){
        let vip = new VIP(name,age,gender)
        passToBuilding(vip)
    console.log("vip")
    }
    else{
        let general = new General(name,age,gender)
        passToBuilding(general)
        console.log("general")
    }
   }
   let bl1 = new Builidng(3);
   //console.log(bl1)
   function passToBuilding(v){
    bl1.sittingPerson(v)
   }
   let container = document.getElementById("container")
  function getdetails(ticket,category,name,gender,age){
    container.innerHTML= ""
    let {floorNumber,slotNumber,day} = ticket;
       let div = document.createElement("div");
       let yourTicket = document.createElement("h2");
       yourTicket.innerText="Your Ticket"
       let fN = document.createElement("p");
       fN.innerText = `Floor Number: ${floorNumber}`;
       let sN = document.createElement("p");
       sN.innerText = `Seat Number: ${slotNumber}`
       let Day = document.createElement("p");
       Day.innerText = `Date&Time: ${day}`;
       let cat = document.createElement("p");
       cat.innerText = `Category: ${category}`
       let Name = document.createElement("h3");
       Name.innerText = `Name: ${name}`
       let Gen = document.createElement("p");
       Gen.innerText = `Gender: ${gender}`
       let Age = document.createElement("p");
       Age.innerText=`Age: ${age}`
       div.append(yourTicket,fN,sN,Day,cat,Name,Gen,Age);
      container.append(div)  
  }