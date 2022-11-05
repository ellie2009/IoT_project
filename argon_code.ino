// In order to see the distance from the sensor, run "particle serial monitor" in the CLI

// defines pins numbers
const int trigPin = A0;
const int echoPin = D0;
const int ledPin = D6;

//declaring a variable which is later added to the cloud so it can be retrieved with an API call
double tempC = 100;
bool isBinFull = false;

// defines variables
long duration;
int distance;
int safetyDistance = 10;


void setup() {
Particle.variable("temp", tempC); //make the variable available in the cloud. Retrieve with GET /v1/devices/{DEVICE_ID}/{VARIABLE}
Particle.variable("binFull",isBinFull); //make the variable available in the cloud. Retrieve with GET /v1/devices/{DEVICE_ID}/{VARIABLE}
Particle.function("checkBin", checkBin);
Particle.function("emptyBin", emptyBin);
// for example: curl https://api.particle.io/v1/devices/e00fce687e3eba21019a90ba/temp?access_token=547bebc507be7ae60bc3011cb11e23c407a01d97
// Response Object looks like this:
// {"cmd":"VarReturn","name":"binFull","result":true,"device":"e00fce687e3eba21019a90ba","body":{"device":"e00fce687e3eba21019a90ba","msg":{"cmd":"GetVar","name":"binFull"}},"coreInfo":{"name":"Napier21","last_heard":"2022-10-22T17:49:06.646Z","connected":true,"last_handshake_at":"2022-10-22T16:23:13.187Z","deviceID":"e00fce687e3eba21019a90ba","product_id":12}}
// To call a function via the command line run e.g.
// curl -X POST https://api.particle.io/v1/devices/e00fce687e3eba21019a90ba/checkBin?access_token=547bebc507be7ae60bc3011cb11e23c407a01d97 -d args=check
// Response Object looks like this:
// {"id":"e00fce687e3eba21019a90ba","name":"Napier21","connected":true,"return_value":1} -- the return value indicates that the function got called successfully. A -1 here means the agrument supplied is incorrect
pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
pinMode(echoPin, INPUT); // Sets the echoPin as an Input
pinMode(ledPin, OUTPUT);
Serial.begin(9600); // Starts the serial communication
}

/*
void loop() {
// Clears the trigPin
digitalWrite(trigPin, LOW);
delayMicroseconds(2);

// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);

// Reads the echoPin, returns the sound wave travel time in microseconds
duration = pulseIn(echoPin, HIGH);

// Calculating the distance
//0.034 is the speed of sound. You have to divide by 2 because the sound travels first from the Trigger pin until it hits an object and then from the object back to the Echo Pin
distance= duration*0.034/2;


if (distance >= safetyDistance){
  isBinFull = false;
}
else{
  isBinFull = true;
}
// This does something funny if the distance is less than 1cm(?) and the numbers actaully get bigger again.
// Also, I should implement a maxDistance, so that objects further away don't interfere and it only checks for objects in close proximity.

// Prints the distance on the Serial Monitor
Serial.print("Distance: ");
Serial.println(distance);
}
*/

int checkBin(String command)
{

  if(command == "check")
  {
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);

    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    
    duration = pulseIn(echoPin, HIGH);
    
    distance= duration*0.034/2;
    
    if (distance >= safetyDistance){
        isBinFull = false;
        digitalWrite(ledPin, LOW);
    }
    else{
        isBinFull = true;
        digitalWrite(ledPin, HIGH);
    }
    
    return 1;
  }
  else return -1;
}

int emptyBin(String command)
{
    if(command == "empty")
    {
        isBinFull = false;
        digitalWrite(ledPin, LOW);
        return 1;
    }
    return -1;
}