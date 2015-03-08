// Wait for device API libraries to load
//

// Opstarten
document.addEventListener("deviceready", deviceReady, false);

// device APIs are available
//
function deviceReady() {
   
    var options = { frequency: 10 };    
    navigator.accelerometer.watchAcceleration(accelSuccess, accelError, options); 
    navigator.compass.watchHeading(compassSuccess, compassError, options);
}

//ACCELERATION
function accelSuccess(acceleration) {
    var yDegree = acceleration.y * 6;
    $('#country').css({
        '-webkit-transform' : 'skewY(' + yDegree + 'deg)',
        '-moz-transform' : 'skewY(' + yDegree + 'deg)',
        'transform' : 'skewY(' + yDegree + 'deg)'
    });
}
function accelError() { }

//COMPASS
function compassSuccess(heading) {

 
    var countries = [
        { country: 'sweden', direction: 40 },
        { country: 'china', direction: 115 },
        { country: 'south-africa', direction: 160 },
        { country: 'america', direction: 250 }
    ];
   
    for (var i = 0; i < countries.length; i++) {
        if(heading.magneticHeading >= countries[i].direction) {
            $('#country').attr('src', 'img/' + countries[i].country + '.GIF');
        }
    };
    
    $('#compass').css({
        '-webkit-transform' : 'rotate(-' + heading.magneticHeading + 'deg)',
        '-moz-transform' : 'rotate(-' + heading.magneticHeading + 'deg)',
        'transform' : 'rotate(-' + heading.magneticHeading + 'deg)'
    });

}
function compassError() { }