// Wait for device API libraries to load
//

// Opstarten
document.addEventListener("deviceready", deviceReady, false);

// device APIs are available
//
function deviceReady() {
    
    //opties voor sensoren
    var options = { frequency: 5 };   
    
    //  Voert om de '5' seconden accelSucces uit als er acceleratie plaats vind
    navigator.accelerometer.watchAcceleration(accelSuccess, accelError, options); 
    
    //voert om de '5' seconden compassSuccess uit als er richtingverandering plaats vind
    navigator.compass.watchHeading(compassSuccess, compassError, options); 
}

//ACCELERATION

// Skewt de afbeelding met 'acceleration.y' als waarde
function accelSuccess(acceleration) {    
    
    var yDegree = acceleration.y * 2;
    var xDegree = acceleration.y * 4;
    
    //skew vlag
    $('#country').css({
        '-webkit-transform' : 'skewY(' + yDegree + 'deg)',
        '-moz-transform' : 'skewY(' + yDegree + 'deg)',
        'transform' : 'skewY(' + yDegree + 'deg)'
    });
    
    
    // evenwicht luchtbel
    $('#ball').css({ 'margin-left' : xDegree + '%' });
}
function accelError() { }

//COMPASS

// Laad een andere afbeelding zien zodra de waarde van 'heading.Magneticheading'
// een bepaalde waarde bereikt die gekoppeld is aan een bepaald land
function compassSuccess(heading) {
    
    var countries = [
        { country: 'sweden', direction: 40 },
        { country: 'china', direction: 115 },
        { country: 'south-africa', direction: 160 },
        { country: 'america', direction: 250 }
    ];

// Bekijkt constant voor elk land of de 'heading.magneticHeading' gelijk of hoger is
// als 'direction'
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