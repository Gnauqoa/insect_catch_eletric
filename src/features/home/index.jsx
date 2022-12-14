import React, { useEffect } from "react";
import UserInfo from "./UserInfo";
import Alert1 from "./assets/alert1.png";
import Alert2 from "./assets/alert2.png";
import DeviceListDesktop from "./DeviceList/Desktop/index";
import DeviceListMobile from "./DeviceList/Mobile";
import { Typography } from "@mui/material";
import { getUserData } from "../../api/home/getUserData";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "./reducer";
import { updateDeviceData } from "../device/reducer";
import { getDatabase, onValue, ref } from "firebase/database";
import { getDeviceIdList } from "../../api/device/getDeviceIdList";

const Introduce = () => {
  const userName = useSelector((state) => state.userData.name);
  return (
    <div className="flex flex-col gap-4 w-full">
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 48,
        }}
      >
        Home
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 16,
          color: "#979CA5",
        }}
      >
        Welcome back, {userName}! Your progress is really good. Keep it up
      </Typography>

      <div className="flex xl:flex-row flex-col w-full gap-6 overflow-hidden  ">
        <img
          className="h-full w-full object-cover overflow-hidden  rounded-[32px]"
          src={Alert1}
        />
        <img
          className="h-full w-full object-cover	overflow-hidden  rounded-[32px]"
          src={Alert2}
        />
      </div>
    </div>
  );
};

const MainArea = () => {
  return (
    <div className="flex flex-col xl:p-14 xl:pr-0 p-6 w-full h-full rounded-[32px]">
      <div className="flex flex-col gap-12 w-full h-full">
        <Introduce />
        <div className="xl:flex hidden w-full">
          <DeviceListDesktop />
        </div>
        <div className="xl:hidden flex w-full">
          <DeviceListMobile />
        </div>
      </div>
    </div>
  );
};

const UserArea = () => {
  return <UserInfo />;
};

const Home = () => {
  const dispatch = useDispatch();
  const handleGetUserData = async () => {
    try {
      const response = await getUserData();
      dispatch(updateUserData(response));
    } catch (err) {}
  };

  useEffect(() => {
    handleGetUserData();
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
      dispatch(updateDeviceData(dataUpdate));
    });
  }, []);
  return (
    <div className="flex flex-row w-full h-full gap-[60px]">
      <MainArea />
      <UserArea />
    </div>
  );
};

export default Home;
