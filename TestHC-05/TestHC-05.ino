

#define MAX_ITEMS 6
#define START_STREAM 1
char *str[MAX_ITEMS] ={
    "85.00,313.00,-19.00,-6.00,0.08,-0.02,0.03,9.81,0.17,4.16",
    "102.00,122.00,-18.00,-6.00,0.06,-0.00,0.02,9.89,0.38,3.47",
    "71.00,112.00,44.00,1.00,0.07,-0.02,0.02,9.97,-0.50,3.22",
    "75.00,147.00,22.00,38.00,0.05,0.01,0.02,9.97,-0.38,3.07",
    "85.00,313.00,-19.00,-6.00,0.08,-0.02,0.03,9.81,0.17,4.16",
    "102.00,122.00,-18.00,-6.00,0.06,-0.00,0.02,9.89,0.38,3.47"
    };
bool startTransmitting = false;  // whether start transmitting received.
//char *str[MAX_ITEMS] = {"1","2","3","4"};

void setup() {
  // initialize serial:
  Serial.begin(9600);

}

void loop() {
  for(int i =0;i<10000;i++){
    for(int j=0;j<25;j++){
      
    Serial.println(str[i%MAX_ITEMS]);
    delay(100);
    
      }
  }
}

/*
  SerialEvent occurs whenever a new data comes in the hardware serial RX. This
  routine is run between each time loop() runs, so using delay inside loop can
  delay response. Multiple bytes of data may be available.
*/
void serialEvent() {
    if (Serial.available()) {
    
    delay(4000);
    startTransmitting = true;
  }
}
