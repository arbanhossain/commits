let api_url = "https://spreadsheets.google.com/feeds/list/1kJqCdCJf8Du2u5EODBRjrRMe6VqY11tjcrdabUL433o/od6/public/values?alt=json";

let sheet;

const datedifference = (d1, d2) => {
    return Math.floor((d2 - d1) / (1000*60*60*24))
}

const getdateinformat = x => {
    let year, month, date;
    let str = x.toString()
    year = str.substring(0,4).toString();
    if(str[4]=="1"){
        if(str.length == 7 || str.length == 8)month = str.substring(4,6).toString;
        else month = str[4].toString()
    } else { month = str[4] }
    if (month.length == 1){
        month = "0" + month;
        date = str.substring(5, str.length);
    } else {
        date = str.substring(6, str.length);
    }
    if(date.length == 1) { date = "0" + date }
    return year + "-" + month + "-" + date;
}

fetch('https://spreadsheets.google.com/feeds/list/1kJqCdCJf8Du2u5EODBRjrRMe6VqY11tjcrdabUL433o/od6/public/values?alt=json').then(data => data.text()).then(data =>
    sheet = JSON.parse(data)
).then(sheet => {
    data = sheet.feed.entry;
    const logs = [];
    data.forEach(x => {
        let date = x["gsx$date"]["$t"];
        let log = x["gsx$log"]["$t"];
        logs.push({date: date, log: log});
    });
    console.log(logs);
    const dis = [... new Set(logs.map(x => x.date))]
    console.log(dis);
    /*dis.forEach(x => {
        let map = logs.filter(q => q.date == x)
        console.log(map.length);
        let weight;
        map.length > 5 ? weight = 5 : weight = map.length;
        document.body.innerHTML += "<span class='block' title='" + getdateinformat(x) + "' style='opacity:" + ((weight*2)/10).toString() + "'>▇</span>"
    })*/
    let dislength = dis.length;
    for(let i = 0; i< dislength; i++){
        let x = dis[i]
        if(i>0){
            let diff = datedifference(new Date(getdateinformat(dis[i-1])), new Date(getdateinformat(dis[i])));
            for(let j = 1; j < diff; j++){
                console.log("empty day")
                document.body.innerHTML += "<span class='block' title='totally unproductive :(' style='opacity:" + (0.1).toString() + "'>▇</span>";
            }
        }
        let map = logs.filter(q => q.date == x);
        console.log(map.length);
        let weight;
        map.length > 5 ? weight = 5 : weight = map.length;
        document.body.innerHTML += "<span class='block' title='" + getdateinformat(x) + "' style='opacity:" + ((weight*2)/10).toString() + "'>▇</span>";
    }
})