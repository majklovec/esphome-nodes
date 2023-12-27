#include "esphome.h"
using namespace esphome;

union Buffer
{
   long int longNumber;
   byte longBytes[4];
};


long int readLong() {
  Buffer buffer;

  buffer.longNumber = 0;
  buffer.longBytes[0] = Wire.read();
  buffer.longBytes[1] = Wire.read();
  buffer.longBytes[2] = Wire.read();
  buffer.longBytes[3] = Wire.read();

  ESP_LOGD("I2C", "The value of sensor is: %d, %d, %d, %d", buffer.longBytes[0], buffer.longBytes[1], buffer.longBytes[2], buffer.longBytes[3]);
  ESP_LOGD("I2C", "The value of sensor is: %d", buffer.longNumber);;
  return buffer.longNumber;
}

class HX711I2c : PollingComponent, public Sensor {
 public:
  HX711I2c() : PollingComponent(5000) {}
  Sensor *cell[3] = {new Sensor(), new Sensor(), new Sensor()};


  void setup() override {
     Wire.begin();    
  }
  
  void update() override {
    Wire.requestFrom(0x67, 12);

    cell[0]->publish_state(0.0+readLong());
    cell[1]->publish_state(0.0+readLong());
    cell[2]->publish_state(0.0+readLong());
  }
};