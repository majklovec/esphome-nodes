#include "logicdata_decoder.h"

namespace esphome
{
  namespace standing_desk_height
  {

    // Implementation based off of: https://github.com/rmcgibbo/Jarvis
    // Which, despite the name, works for Uplift desks too
    bool LogicdataDecoder::put(uint8_t b)
    {
      switch (state_)
      {
      case SYNC1:
        if (b == 0x01)
        {
          state_ = SYNC2;
          return false;
        }
        else
        {
          state_ = SYNC1;
          return false;
        }
      case SYNC2:
        if (b == 0x00)
        {
          state_ = HEIGHT;
          return false;
        }
        else
        {
          state_ = SYNC1;
          return false;
        }
      case HEIGHT:
        buf_[0] = b;
        state_ = SYNC1;
        return true;
      default:
        return false;
      }
      return false;
    }

    float LogicdataDecoder::decode()
    {
      return buf_[0];
    }

  }
}