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
    imageSource: require("../../assets/fresa.png"),
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
  {
    id: 17,
    title: "Rabano",
    imageSource: require("../../assets/rabano.png"),
  },
];
export const pasoPlanta = [
  {
    id: 1,
    title: "Tomato",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 2,
    title: "Strawberry",
    paso1: require("../../assets/huerto/Fresas_Fase1.png"), 
    paso2: require("../../assets/huerto/Fresas_Fase2.png"), 
    paso3: require("../../assets/huerto/Fresas_Fase3.png"), 
    paso4: require("../../assets/huerto/Fresas_Fase4.png"), 
    paso5: require("../../assets/huerto/Fresas_Fase5.png"),
  },
  {
    id: 3,
    title: "Grape",
    paso1: require("../../assets/huerto/Moras_Fase1.png"), 
    paso2: require("../../assets/huerto/Moras_Fase2.png"), 
    paso3: require("../../assets/huerto/Moras_Fase3.png"), 
    paso4: require("../../assets/huerto/Moras_Fase4.png"), 
    paso5: require("../../assets/huerto/Moras_Fase5.png"),
  },
  {
    id: 4,
    title: "Cucumber",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 5,
    title: "Pepper",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 6,
    title: "Lechuga",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 7,
    title: "Cebolla",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 8,
    title: "Zanahoria",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 9,
    title: "Espinaca",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 10,
    title: "Calabacín",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 11,
    title: "Frambuesa",
    paso1: require("../../assets/huerto/Frambuesas_Fase1.png"), 
    paso2: require("../../assets/huerto/Frambuesas_Fase2.png"), 
    paso3: require("../../assets/huerto/Frambuesas_Fase3.png"), 
    paso4: require("../../assets/huerto/Frambuesas_Fase4.png"), 
    paso5: require("../../assets/huerto/Frambuesas_Fase5.png"),
  },
  {
    id: 12,
    title: "Brócoli",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 13,
    title: "Limon",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 14,
    title: "Tomate cherry",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 15,
    title: "Albahaca",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 16,
    title: "Menta",
    paso1: require("../../assets/huerto/Tomate_Fase1.png"), 
    paso2: require("../../assets/huerto/Tomate_Fase2.png"), 
    paso3: require("../../assets/huerto/Tomate_Fase3.png"), 
    paso4: require("../../assets/huerto/Tomate_Fase4.png"), 
    paso5: require("../../assets/huerto/Tomate_Fase5.png"),
  },
  {
    id: 16,
    title: "Rabano",
    paso1: require("../../assets/huerto/Rabano_Fase1.png"), 
    paso2: require("../../assets/huerto/Rabano_Fase2.png"), 
    paso3: require("../../assets/huerto/Rabano_Fase3.png"), 
    paso4: require("../../assets/huerto/Rabano_Fase4.png"), 
    paso5: require("../../assets/huerto/Rabano_Fase5.png"),
  },
];

export const avatarPictures = [
  {
    id: 1,
    title: "Man1",
    imageSource: require("../../assets/avatars/man1.png"),
  },
  {
    id: 2,
    title: "Man2",
    imageSource: require("../../assets/avatars/man2.png"),
  },
  {
    id: 3,
    title: "Man3",
    imageSource: require("../../assets/avatars/man3.png"),
  },
  {
    id: 4,
    title: "Man4",
    imageSource: require("../../assets/avatars/man4.png"),
  },
  {
    id: 5,
    title: "Man5",
    imageSource: require("../../assets/avatars/man5.png"),
  },
  {
    id: 6,
    title: "Man6",
    imageSource: require("../../assets/avatars/man6.png"),
  },
  {
    id: 7,
    title: "Woman1",
    imageSource: require("../../assets/avatars/woman1.png"),
  },
  {
    id: 8,
    title: "Woman2",
    imageSource: require("../../assets/avatars/woman2.png"),
  },
  {
    id: 9,
    title: "Woman3",
    imageSource: require("../../assets/avatars/woman3.png"),
  },
  {
    id: 10,
    title: "Woman4",
    imageSource: require("../../assets/avatars/woman4.png"),
  },
  {
    id: 11,
    title: "Woman5",
    imageSource: require("../../assets/avatars/woman5.png"),
  },
];

export const getProfilePictureSource = (id) => {
  const profilePicture = profilePictures.find((picture) => picture.id === id);
  return profilePicture.imageSource;
};

export const getAvatarPictureSource = (id) => {
  const avatarPicture = avatarPictures.find((picture) => picture.id === id);
  return avatarPicture.imageSource;
};

export const getPlantPicture = (id) => {
  const profilePicture = profilePictures.find((picture) => picture.id === id);
  return profilePicture.imageSource;
};
export const getPlantPaso = (id, paso) => {
  var resultPicture ;
  if(paso == 1){
     const profilePicture = pasoPlanta.find((picture) => picture.id === id);
     resultPicture = profilePicture.paso1;
  }else if(paso == 2){
      const profilePicture = pasoPlanta.find((picture) => picture.id === id);
      resultPicture = profilePicture.paso2;

  }else if(paso == 3){
    const profilePicture = pasoPlanta.find((picture) => picture.id === id);
    resultPicture = profilePicture.paso3;

  }else if(paso == 4){
    const profilePicture = pasoPlanta.find((picture) => picture.id === id);
    resultPicture = profilePicture.paso4;

  }else{
    const profilePicture = pasoPlanta.find((picture) => picture.id === id);
    resultPicture = profilePicture.paso5;
  }
  
  return resultPicture;
};
