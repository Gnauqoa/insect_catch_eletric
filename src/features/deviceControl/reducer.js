import { createSlice } from "@reduxjs/toolkit";

const deviceControlDataSlice = createSlice({
  name: "deviceControlData",
  initialState: {
    name: "",
    battery: 50,
    brightness: 100,
    colorLED: "#ffffff",
    coordinates: {
      latitude: "0",
      longitude: "0"
    },
    timeStart:{
      hour: 0,
      min: 0
    },
    timeEnd: {
      hour: 0,
      min: 0
    },
    timeSend: {
      hour: 0,
      min: 0
    }
  },
  reducers: {
    updateDeviceControlData: (state, data) => {
      return data.payload;
    },
  },
});

export const { updateDeviceControlData } = deviceControlDataSlice.actions;
export default deviceControlDataSlice.reducer;
