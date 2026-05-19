// Validation des formulaires pour Listorry
export const validateTask = (task) => {
  const errors = {};
  if (!task.titre) errors.titre = "Le titre est requis";
  if (!task.date_echeance) errors.date = "La date est requise";
  return errors;
};
