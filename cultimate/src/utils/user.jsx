import validator from "validator";

export const checkValidEmail = (email) => {
  const isValidEmail = validator.isEmail(email);
  return isValidEmail;
};

export const profilePictures = [
  {
    id: 1,
    title: "Strawberry",
    imageSource: require("../../assets/Fresa.png"),
  },
  { id: 2, title: "Grape", imageSource: require("../../assets/mora.png") },
  {
    id: 3,
    title: "Tomato",
    imageSource: require("../../assets/tomate.png"),
  },
  {
    id: 4,
    title: "Cucumber",
    imageSource: require("../../assets/pepino.png"),
  },
  {
    id: 5,
    title: "Pepper",
    imageSource: require("../../assets/pimientos.png"),
  },
  { id: 6, title: "Lemon", imageSource: require("../../assets/limon.png") },
];

export const getProfilePictureSource = (id) => {
  const profilePicture = profilePictures.find((picture) => picture.id === id);
  return profilePicture.imageSource;
};