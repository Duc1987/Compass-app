// Wait for device API libraries to load
//

// Opstarten
document.addEventListener("deviceready", deviceReady, false);

// device APIs are available
//
function deviceReady() {
   
    var options = { frequency: 10 };    //opties voor sensoren
    navigator.accelerometer.watchAcceleration(accelSuccess, accelError, options); //  Voert om de '10' seconden accelSucces uit als er acceleratie plaats vind
    navigator.compass.watchHeading(compassSuccess, compassError, options); //voert om de '10' seconden compassSuccess uit als er richtingverandering plaats vind
}

//ACCELERATION

// Skewt de afbeelding met 'acceleration.y' als waarde
function accelSuccess(acceleration) {    
    
    var yDegree = acceleration.y * 6;
    //skew vlag
    $('#country').css({
        '-webkit-transform' : 'skewY(' + yDegree + 'deg)',
        '-moz-transform' : 'skewY(' + yDegree + 'deg)',
        'transform' : 'skewY(' + yDegree + 'deg)'
    });
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