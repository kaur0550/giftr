
let app = {
    person:{},
    people:[],
    KEY:[],
    gift:{},
    gifts:new Array(),
    init: function(){
        app.getPeopleList();
        app.addListeners();
        app.createList();
        
    },

    addListeners: ()=>{
        let addPerson = document.getElementById("addButton");
        addPerson.addEventListener('click', app.check);

        // let addGift = document.getElementById("addButton");
        // addGift.addEventListener('click', app.addMoreGift);

        let saveP = document.getElementById("saveP");
        saveP.addEventListener('click', app.savePerson);

        let saveG = document.getElementById("saveG");
        saveG.addEventListener('click', app.saveGift);

        let cancelP = document.getElementById("cancelP");
        cancelP.addEventListener('click', app.cancelPerson);

        let cancelG = document.getElementById("cancelG");
        cancelG.addEventListener('click', app.cancelGift);
    },

    check:()=>{
        let dataAction = document.getElementById('addButton').getAttribute('data-action');

        if(dataAction == 'personForm'){
            app.addMorePeople();
        }
        else if(dataAction == 'giftForm'){
            app.addMoreGift();
        }
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
        // let dataAction = document.getElementById('addButton').getAttribute('data-action');

        // if(dataAction == 'personForm'){
    // }
            console.log('worked');
            document.getElementById('editPerson').setAttribute('data-state', "personForm");
        
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
                "giftIdea": []
            };

            app.person = person;

            app.people.push(app.person);

            console.log(app.people);
            app.createList();
            document.getElementById('editPerson').removeAttribute('data-state');
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
            document.getElementById('people').setAttribute('data-people', 'all');
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

                df.addEventListener('click', app.onePersonData);
                btn.addEventListener('click',app.delete);
            });
            // document.getElementById('addButton').setAttribute('data-action', 'personForm');
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

    cleanGiftForm:()=>{
        let giftTitle = document.getElementById('giftTitle');
        giftTitle.value = " ";

        let priceInfo = document.getElementById('priceInfo');
        priceInfo.value = " ";

        let storeName = document.getElementById('storeName');
        storeName.value = " ";

        let storeUrl = document.getElementById('storeUrl');
        storeUrl.value = " ";
    },

    onePersonData: (ev)=>{
        ev.preventDefault();
        console.log(ev.currentTarget.textContent);
        let info = ev.currentTarget.innerHTML;
        console.log(info);
        document.getElementById('onePerson').innerHTML = info;
        console.log("click worked");
        document.getElementById("people").classList.remove('active');
        document.getElementById("people").classList.add('hide');
        document.getElementById('onePerson').classList.remove('hide');
        document.getElementById('onePerson').classList.add('active');

        // document.getElementById('editGift').setAttribute('data-state', 'giftForm');
        document.getElementById('addButton').setAttribute('data-action', 'giftForm');
        let id = document.querySelector('#onePerson img').getAttribute('data-target');
        console.log(id);
        document.getElementById('people').setAttribute('data-people', id);
        app.giftList(id);
        
    },

    giftList: (id)=>{
        // const found = array1.find(element => element > 10);

        let person = app.people.find(element => element.personID == id);
        console.log(person); 
        console.log(person.giftIdea);
        console.log(app.gifts);
        //app.gifts.push(person.giftIdea);
        console.log(app.gifts);

        if(app.gifts.length == 0 && person.giftIdea == 0)
        {
            console.log("no gifts");
            let p = document.createElement('p');
            let div = document.createElement('div');
            p.textContent = " No gifts for this person. Click on Add button to add ideas.";
            div.appendChild(p);
            document.getElementById('gifts').appendChild(div);
        }
        else{
            document.getElementById('gifts').innerHTML = " ";
            let df = document.createElement('div');
            console.log(person.giftIdea);
            person.giftIdea.forEach(gift =>{
                //let df = document.createElement('div');
                let ptitle = document.createElement('p');
                let pprice = document.createElement('p');
                let pstorename = document.createElement('p');
                let pstoreurl = document.createElement('p');
                let btn = document.createElement('btn');

                ptitle.textContent = gift.title;
                pprice.textContent = gift.price;
                console.log(gift.location);
                pstorename.textContent = gift.location.storeN;
                pstoreurl.textContent = gift.location.storeU;
                btn.setAttribute("src", 'img/delete.png');

                df.appendChild(ptitle);
                df.appendChild(pprice);
                df.appendChild(pstorename);
                df.appendChild(pstoreurl);
                df.appendChild(btn);
                
            });
            document.getElementById('gifts').appendChild(df);
            console.log(app.people);
            let data = app.people;
            console.log(data.length);

            data.forEach(element => {
                KEY = element.KEY;
                localStorage.setItem(KEY, JSON.stringify(element));
            });
        }
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
            console.log(app.gift);

            let dataPeople = document.getElementById('people').getAttribute('data-people');
            
            if(dataPeople != "all")
            {
                let person = app.people.find(element => element.personID == dataPeople);
                person.giftIdea.push(app.gift);
                console.log(person);
                app.gifts.push(person.giftIdea);
            }

            app.cleanGiftForm();
            document.getElementById('editGift').removeAttribute('data-state');
            app.giftList(dataPeople);
        }
    },

    addMoreGift:()=>{
        let dataAction = document.getElementById('addButton').getAttribute('data-action');

        if(dataAction == 'giftForm'){
            console.log('giftForm');
            document.getElementById('editGift').setAttribute('data-state', "giftForm");
        }
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
    },

    cancelPerson: (ev)=>{
        ev.preventDefault();
        document.getElementById('editPerson').removeAttribute('data-state');
        app.cleanPersonForm();
    },

    cancelGift: (ev)=>{
        ev.preventDefault();
        document.getElementById('editGift').removeAttribute('data-state');
        app.cleanGiftForm();
    }
}

document.addEventListener('DOMContentLoaded', app.init);