export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth() + 1]; // ajout de '+1'

// La méthode date.getMonth() retourne le mois de l'année (de 0 à 11, où janvier est 0 et décembre est 11)

// En ajoutant 1 au résultat de getMonth(), on obtient un index correspondant aux clés de MONTHS (de 1 à 12)

// La fonction utilise cet index pour récupérer le nom du mois correspondant depuis l'objet MONTHS
