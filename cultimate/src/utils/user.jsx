import validator from "validator";

export const checkValidEmail = (email) => {
  const isValidEmail = validator.isEmail(email);
  return isValidEmail;
};

export const checkNumerical = (string) => {
  const pattern = /^[0-9]*$/;
  return pattern.test(string);
};

export const profilePictures = [
  {
    id: 1,
    title: "Tomato",
    imageSource: require("../../assets/tomate.png"),
  },
  {
    id: 2,
    title: "Strawberry",
    imageSource: require("../../assets/Fresa.png"),
  },
  {
    id: 3,
    title: "Grape",
    imageSource: require("../../assets/mora.png"),
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
  {
    id: 6,
    title: "Lechuga",
    imageSource: require("../../assets/lechuga.png"),
  },
  {
    id: 7,
    title: "Cebolla",
    imageSource: require("../../assets/cebolla.png"),
  },
  {
    id: 8,
    title: "Zanahoria",
    imageSource: require("../../assets/zanahoria.png"),
  },
  {
    id: 9,
    title: "Espinaca",
    imageSource: require("../../assets/espinaca.png"),
  },
  {
    id: 10,
    title: "Calabacín",
    imageSource: require("../../assets/calabacin.png"),
  },
  {
    id: 11,
    title: "Frambuesa",
    imageSource: require("../../assets/frambuesa.png"),
  },
  {
    id: 12,
    title: "Brócoli",
    imageSource: require("../../assets/brocoli.png"),
  },
  {
    id: 13,
    title: "Limon",
    imageSource: require("../../assets/limon.png"),
  },
  {
    id: 14,
    title: "Tomate cherry",
    imageSource: require("../../assets/cherry.png"),
  },
  {
    id: 15,
    title: "Albahaca",
    imageSource: require("../../assets/albahaca.png"),
  },
  {
    id: 16,
    title: "Menta",
    imageSource: require("../../assets/menta.png"),
  },
];

export const getProfilePictureSource = (id) => {
  const profilePicture = profilePictures.find((picture) => picture.id === id);
  return profilePicture.imageSource;
};

export const getPlantPicture = (id) => {
  const profilePicture = profilePictures.find((picture) => picture.id === id);
  return profilePicture.imageSource;
};
