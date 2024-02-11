import {
  IoHomeOutline,
  IoCompassOutline,
  IoPeopleOutline,
  IoBookmarkOutline,
  IoAddCircleOutline,
} from "react-icons/io5";

export const sidebarLinks = [
  {
    icon: IoHomeOutline,
    route: "/",
    label: "Home",
  },
  {
    icon: IoCompassOutline,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: IoPeopleOutline,
    route: "/all-users",
    label: "People",
  },
  {
    icon: IoBookmarkOutline,
    route: "/saved",
    label: "Saved",
  },
  {
    icon: IoAddCircleOutline,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    icon: IoHomeOutline,
    route: "/",
    label: "Home",
  },
  {
    icon: IoCompassOutline,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: IoBookmarkOutline,
    route: "/saved",
    label: "Saved",
  },
  {
    icon: IoAddCircleOutline,
    route: "/create-post",
    label: "Create",
  },
];
