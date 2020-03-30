
let app = {
    person:{},
    people:[],
    KEY:[],
    gift:{},
    init: function(){
        app.getPeopleList();
        app.addListeners();
        app.createList();
        
    },

    addListeners: ()=>{
        let addPerson = document.getElementById("addPerson");
        addPerson.addEventListener('click', app.addMorePeople);

        let saveP = document.getElementById("saveP");
        saveP.addEventListener('click', app.savePerson);

        let saveG = document.getElementById("saveG");
        saveG.addEventListener('click', app.saveGift);
    },

    getPeopleList: ()=>{
        for (let i = 0; i < localStorage.length; i++) {
            let storedValue = localStorage.key(i);
            console.log(`Item at ${i}: ${storedValue}`);
            app.KEY.push(storedValue); 
        }
        console.log(app.KEY);

        app.people = [];

        for(let i = 0; i< app.KEY.length; i++){
            
            if (localStorage.getItem(app.KEY[i])){
                let arr = localStorage.getItem(app.KEY[i]);
                people= JSON.parse(arr);
                app.people.push(people);
                //app.people = JSON.parse(arr);
                console.log(app.people);
            }
        }
        
    },

    changeTitle: (message) =>{
        let title = document.querySelector(".title");
        title.textContent = message;
    }, 

    addMorePeople: ()=>{
        console.log('add people form');
        // document.getElementById("people").classList.remove('active');
        // document.getElementById("people").classList.add('hide');
        // document.getElementById("editPerson").classList.remove('hide');
        // document.getElementById("editPerson").classList.add('active');
    },

    savePerson: ()=>{
        let name = document.getElementById('name');
        let dob = document.getElementById('dob');

        console.log(name.value);
        console.log(name.value.length);
        if(name.value.length == 0){
            alert('Please enter a name!');
        }
        // console.log(dob.value);
        // console.log(dob.value.length);
        else if(dob.value.length < 10){
            alert('Please enter proper date!');
        }else {
            let personID = Date.now();
            let personName = name.value;
            console.log(dob.value);

            //var myDate="26-02-2012";
            let myDate=dob.value.split("-");
            console.log(myDate);
            let newDate=myDate[0]+"/"+myDate[1]+"/"+myDate[2];
            console.log(newDate);
            console.log(new Date(newDate).getTime());
            //alert(new Date(newDate).getTime());
            
            
              //console.log(timeConverter(new Date(newDate).getTime()));

            let persondob = new Date(newDate).getTime();
            console.log(persondob);
            let personKEY = "GIFTR" + personID;

            let person = {
                "KEY": personKEY,
                "personID": personID,
                "personName": personName,
                "persondob": persondob,
                "giftIdea":[]
            };

            app.person = person;

            app.people.push(app.person);

            console.log(app.people);
            app.createList();
            app.cleanPersonForm();
            let data = app.people;
            console.log(data.length);

            data.forEach(element => {
                KEY = element.KEY;
                localStorage.setItem(KEY, JSON.stringify(element));
            });
        }
    },

    timeConverter:(UNIX_timestamp)=>{
        var a = new Date(UNIX_timestamp);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + " " + date;
        return time;
      },

    createList:()=>{
        if(app.people.length == 0){
           console.log('empty');
        }
        else{
            let people = app.people.sort(function(a,b){
                return a.persondob-b.persondob
            });
            console.log(people);
            let div = document.getElementById('people');
            div.innerHTML = " ";
            
            let divf = document.createElement('div');

            console.log(people);
            people.forEach(person=>{
                console.log(person);
                let df = document.createElement('div');
                let pd = document.createElement('p');
                let pn = document.createElement('p');
                let btn = document.createElement('img');

                console.log(person.KEY);
                console.log(app.timeConverter(person.persondob));
                pd.textContent = app.timeConverter(person.persondob);
                pn.textContent = person.personName;
                btn.setAttribute("src", 'img/delete.png');
                btn.setAttribute('data-target', person.personID);

                df.appendChild(pd);
                df.appendChild(pn);
                df.appendChild(btn);
                divf.appendChild(df);

                df.addEventListener('click', app.addMoreGift);
                btn.addEventListener('click',app.delete);
            });

            document.getElementById('people').innerHTML = " ";
            document.getElementById('people').appendChild(divf);
        }
    },

    cleanPersonForm: ()=>{
        let name = document.getElementById("name");
        let dob = document.getElementById("dob");

        name.value = " ";
        dob.value = " ";
    },

    addMoreGift: ()=>{
        console.log("click worked");
    },

    saveGift:()=>{
        let giftTitle = document.getElementById('giftTitle');
        let storeName = document.getElementById('storeName');
        let storeUrl = document.getElementById('storeUrl');
        let priceInfo = document.getElementById('priceInfo');

        if (giftTitle.value == 0){
            alert("Please enter a gift item")
        }
        else if (priceInfo.value == 0){
            alert("Please enter the price")
        }
        else{
            let giftID = Date.now();
            let giftT = giftTitle.value;
            let giftPrice = priceInfo.value;
            let storeN = storeName.value;
            let storeU = storeUrl.value;

            let gift = {
                "GiftID": giftID,
                "title": giftT,
                "price": giftPrice,
                "location": {storeN, storeU}
            }

            app.gift = gift;
        }
    },

    giftList:()=>{
        
    },

    delete: (ev)=>{
        ev.preventDefault();
        let id = ev.currentTarget.getAttribute('data-target');

        app.people.forEach((person, index) =>{
            if (id ==person.personID){
                app.people.splice(index, 1);
            }
            localStorage.clear();
            let data = app.people;
            data.forEach(element => {
                KEY = element.KEY;
                localStorage.setItem(KEY, JSON.stringify(element));
            });
            app.createList();
        });
    }
}

document.addEventListener('DOMContentLoaded', app.init);