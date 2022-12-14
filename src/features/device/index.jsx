import { Link, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Alert1 from "./assets/alert1.png";
import PlaceIcon from "@mui/icons-material/Place";
import FourGMobiledataIcon from "@mui/icons-material/FourGMobiledata";
import SignalCellularOffIcon from "@mui/icons-material/SignalCellularOff";
import { getDatabase, onValue, ref } from "firebase/database";
import { getDeviceIdList } from "../../api/device/getDeviceIdList";

const DeviceNode = ({ id, status, name, location }) => {
  return (
    <Link href={`device/${id}`} underline="none">
      <div
        className={
          "flex flex-col w-full items-center justify-center gap-4 p-2 hover:transition-all border-[2px] border-transparent rounded-[24px] " +
          (status ? "hover:border-[#2A9F47]" : "hover:border-[#E1251B]")
        }
      >
        <div className="rounded-[30px] h-[250px] overflow-hidden">
          <img
            className="w-auto h-full  object-cover"
            src={Alert1}
            alt="camera img"
          />
        </div>
        <div className="flex flex-col gap-2 pb-2 border-b-[1px] border-[#E6E8EC]">
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
              color: "#23262F",
            }}
          >
            {name}
          </Typography>
          <div className="flex flex-row gap-1">
            <PlaceIcon sx={{ color: "#777E90" }} />
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: 14,
                color: "#777E90",
              }}
            >
              {location}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Tooltip title={status ? "Connected by 4G" : "Disconnected"}>
            <div className="select-none flex flex-row items-center justify-center gap-2">
              {status ? (
                <FourGMobiledataIcon
                  sx={{ color: status ? "#2A9F47" : "#E1251B" }}
                />
              ) : (
                <SignalCellularOffIcon
                  sx={{ color: status ? "#2A9F47" : "#E1251B" }}
                />
              )}
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: status ? "#2A9F47" : "#E1251B",
                }}
              >
                {status ? "Connected by 4G" : "Disconnected"}
              </Typography>
            </div>
          </Tooltip>
        </div>
      </div>
    </Link>
  );
};

const Introduce = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 48,
        }}
      >
        Your device
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 16,
          color: "#979CA5",
        }}
      >
        Welcome back, This is all your device.
      </Typography>
    </div>
  );
};
const MainArea = () => {
  const [deviceList, setDeviceList] = useState([]);
  useEffect(() => {
    const db = getDatabase();
    const deviceListRef = ref(db, `device`);
    return onValue(deviceListRef, async (snapshot) => {
      const deviceIDList = await getDeviceIdList();
      const dataUpdate = [];
      snapshot.forEach((childSnapshot) => {
        if (deviceIDList.includes(childSnapshot.key)) {
          dataUpdate.push(childSnapshot.val());
        }
      });
      setDeviceList(dataUpdate);
    });
  }, []);

  return (
    <div className="grid xl:grid-cols-3 grid-cols-1 gap-8 items-center justify-center">
      {deviceList.map((data, index) => (
        <DeviceNode
          id={data.id}
          name={data.name}
          desc={data.desc}
          key={"device node " + index}
          location={data.location}
          status={data.status}
        />
      ))}
    </div>
  );
};
const DevicePage = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-col xl:p-14 p-6 w-full h-full rounded-[32px] overflow-auto">
        <Introduce />
        <MainArea />
      </div>
    </div>
  );
};

export default DevicePage;
