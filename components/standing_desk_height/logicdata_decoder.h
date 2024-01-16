#pragma once

#include <stdint.h>
#include "decoder.h"

namespace esphome
{
  namespace standing_desk_height
  {

    class LogicdataDecoder : public Decoder
    {
    protected:
      enum state_t
      {
        SYNC1,  // waiting for 0x01
        SYNC2,  // waiting for 0x00
        HEIGHT, // waiting for height arg
      } state_ = SYNC1;
      uint8_t buf_[2];

    public:
      LogicdataDecoder() {}
      ~LogicdataDecoder() {}

      bool put(uint8_t b);
      float decode();
    };

  }
}
