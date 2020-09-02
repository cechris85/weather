var weather = new XMLHttpRequest();
weather.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=Nashville&APPID=afe28461a3021cc64ba16ffe715b9e6f", false);
weather.send(null);
var res = JSON.parse(weather.response);

var dayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    
];
var monthsArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var weatherIcons = [
    {key:"clear sky", value:"https://image.flaticon.com/icons/svg/1113/1113774.svg"},
    {key:"few clouds", value:"https://image.flaticon.com/icons/svg/1113/1113775.svg"},
    {key:"scattered clouds", value:"https://image.flaticon.com/icons/svg/178/178338.svg"},
    {key:"broken clouds", value:"https://www.flaticon.com/premium-icon/icons/svg/178/178346.svg"},
    {key:"overcast clouds", value:"https://www.flaticon.com/premium-icon/icons/svg/178/178346.svg"},
    {key:"light rain", value:"https://image.flaticon.com/icons/svg/1113/1113767.svg"},
    {key:"shower rain", value:"https://image.flaticon.com/icons/svg/1113/1113769.svg"},
    {key:"moderate rain", value:"https://image.flaticon.com/icons/svg/365/365224.svg"},
    {key:"rain", value:"https://image.flaticon.com/icons/svg/1113/1113757.svg"},
    {key:"thunderstorm", value:"https://image.flaticon.com/icons/svg/1113/1113780.svg"},
    {key:"snow", value:"https://image.flaticon.com/icons/svg/1113/1113773.svg"},
    {key:"mist", value:"https://image.flaticon.com/icons/svg/1113/1113758.svg"}
]
var weatherByDate = []
var counter = 40;
var num = 1;
var name = "";

$("#city").append("Weather forecast for " + res.city.name + " for 5 days");

for (var i = 0; i < res.list.length; i++) {
    var onePeriod = res.list[i];
    var dt = new Date(onePeriod.dt*1000);
    var day = dayArr[dt.getDay()];
    var date = dt.getDate();
    var month = monthsArr[dt.getMonth()];
    var year = dt.getFullYear();
    var hours = onePeriod.dt_txt.substr(11, 5);
    var d = month + " " + date + " " + year + ",<br>" + day + " " + hours;

    var imageSrc = "";
    
    weatherIcons.forEach(icon => {
        if(icon.key == onePeriod.weather[0].description)
            imageSrc = icon.value;
    });

    var today = new Date();
    
    
    if(today.getDate() === dt.getDate()){
        if($("#current-day-block").length == 0){
            $("body").append('<div class="block-one-day" id="current-day-block"></div>');
        }
        $("#current-day-block").append('<div id="block-hours"><h6 id="date">' + d + '</h6><img id="icon" src="' + imageSrc + '"><hr><div id="temp-block">' +
            '<img id="temp-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113779.svg"><p id="temp-txt">' + Math.round((onePeriod.main.temp * 1.8) - 459.67)  + 'F</p>' +
            '</div><div id="humidity-block"><img id="humidity-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113760.svg">' + 
            '<p id="humidity-txt">' + onePeriod.main.humidity + ' %</p></div><div id="wind-block"><img id="wind-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113787.svg">' + 
            '<p id="wind-txt">' + onePeriod.wind.speed + ' m/sec</p></div></div>');
    }
    
    else{
        if(counter % 8 === 0){
            name = "block-one-day" + num;
            if($("#" + name).length == 0){
                $("body").append('<div id="' + name +'" class="block-one-day"></div>');
                num++;
            }
        }
        $("#" + name).append('<div id="block-hours"><h6 id="date">' + d + '</h6><img id="icon" src="' + imageSrc + '"><hr><div id="temp-block">' +
            '<img id="temp-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113779.svg"><p id="temp-txt">' + Math.round((onePeriod.main.temp *  1.8) - 459.67) + ' F</p>' +
            '</div><div id="humidity-block"><img id="humidity-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113760.svg">' + 
            '<p id="humidity-txt">' + onePeriod.main.humidity + ' %</p></div><div id="wind-block"><img id="wind-icon" class="small-icon" src="https://image.flaticon.com/icons/svg/1113/1113787.svg">' + 
            '<p id="wind-txt">' + onePeriod.wind.speed + ' m/sec</p></div></div>');
        counter--;
    }
}
