#include "Arduino.h"
#include "TimerOne.h"

const int pin_row[8] = {2,3,9,8,7,6,5,4};
const int pin_col[8] = {10,11,12,13,A0,A1,A2,A3};

//               x  y
bool framebuffer[8][8];

uint8_t refresh_row = 0;

void drive_row(){
  digitalWrite(pin_row[refresh_row], HIGH);

  refresh_row++;
  if(refresh_row == 8) refresh_row = 0;

  for(int i=0;i<8;i++) digitalWrite(pin_col[i],framebuffer[i][refresh_row]);

  digitalWrite(pin_row[refresh_row], LOW);
}

void setup(){
  for(int i=0;i<8;i++){
    pinMode(pin_row[i],OUTPUT);
    pinMode(pin_col[i],OUTPUT);
    digitalWrite(pin_row[i],HIGH);

    for(int j=0;j<8;j++){
      framebuffer[i][j] = false;
    }
  }
  
  Serial.begin(115200);

  Timer1.initialize(1250);
  Timer1.attachInterrupt(drive_row);
}

void loop(){
  if(Serial.available()>8){
    if(Serial.read() == 0x55){
      for(int i=0;i<8;i++){
        uint8_t tmp = Serial.read();
        for (int j=0;j<8;j++) framebuffer[j][i] = (tmp & (1<<j)) != 0;
      }
      
      Serial.write(0x55);
    }
    else{
      //Invalid data, flush serial buffer
      Serial.write(0xFF);
      while(Serial.available()) Serial.read();
    }
  }
}