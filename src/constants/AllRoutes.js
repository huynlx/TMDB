import { lazy } from "react";

// const Timeout = 0;

export const Signup = lazy(async () => {
  // await new Promise((resolve) => setTimeout(resolve, Timeout));
  return import("../pages/Signup");
});
export const Login = lazy(async () => {
  return import("../pages/Login");
});
export const People = lazy(async () => {
  return import("../pages/People");
});
export const Keyword = lazy(async () => {
  return import("../pages/Keyword");
});
export const Popular = lazy(async () => {
  return import("../pages/Popular");
});
export const Search = lazy(async () => {
  return import("../pages/Search");
});
export const Home = lazy(async () => {
  return import("../pages/Home");
});
export const Movie = lazy(async () => {
  return import("../pages/Movie");
});
export const Tv = lazy(async () => {
  return import("../pages/Tv");
});
export const Person = lazy(async () => {
  return import("../pages/Person");
});
export const Collection = lazy(async () => {
  return import("../pages/Collection");
});
export const Company = lazy(async () => {
  return import("../pages/Company");
});
export const Videos = lazy(async () => {
  return import("../pages/Videos");
});
export const Images = lazy(async () => {
  return import("../pages/Images");
});
export const PeopleTv = lazy(async () => {
  return import("../pages/PeopleTv");
});
export const Error = lazy(async () => {
  return import("../pages/Error");
});
export const Profile = lazy(async () => {
  return import("../pages/Profile");
});
export const Watch = lazy(async () => {
  return import("../pages/Watch");
});
export const Season = lazy(async () => {
  return import("../pages/Season");
});
export const SeasonList = lazy(async () => {
  return import("../pages/SeasonList");
});
