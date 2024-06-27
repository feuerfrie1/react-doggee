import React from "react";

import { validateIsEmpty } from "../../../../../../utils/helpers/validations/validateIsEmpty";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../redux/slices/user";
import axios from "axios";

const petFormValidateSchema = {
  dogName: (value: string) => validateIsEmpty(value),
  dogWeight: (value: string) => validateIsEmpty(value),
};

const validatePet = (pet: Pet) => {
  let petErrors: {
    [K in keyof typeof petFormValidateSchema]?: ValidationReturn;
  } = {};
  Object.keys(petFormValidateSchema).forEach((field) => {
    const error = petFormValidateSchema[
      field as keyof typeof petFormValidateSchema
    ](pet[field as keyof typeof petFormValidateSchema]);
    if (!error) return;

    petErrors = {
      ...petErrors,
      [field]: error,
    };
  });
  if (!Object.keys(petErrors).length) return;
  return petErrors;
};

const validatePets = (pets: Pet[]) => {
  let errors: {
    [id: string]: {
      [K in keyof typeof petFormValidateSchema]?: ValidationReturn;
    };
  } = {};

  pets.forEach((pet) => {
    const petErrors = validatePet(pet);
    if (!petErrors) return;
    errors = { ...errors, [pet.id]: petErrors };
  });

  return errors;
};

type UseAddYourPetsStepParams = Omit<
  AddYourPetsStepProps,
  "skipStep" | "backStep"
>;

export const useAddYourPetsStep = ({
  initialData,
  nextStep,
}: UseAddYourPetsStepParams) => {
  const user: any = useSelector(selectUser);
  const id = user._id;

  const [pets, setPets] = React.useState(initialData);
  const [selectedPetId, setSelectedPetId] = React.useState(pets[0].id);
  const [petErrors, setPetErrors] = React.useState({});
  const [isSumbited, setSubmited] = React.useState(false);

  const addPet = () => {
    const id = pets[pets.length - 1].id + 1;
    setPets([
      ...pets,
      {
        id,
        dogBirthday: new Date().getTime(),
        dogName: "",
        dogWeight: "",
        breed: "",
      },
    ]);
    setSelectedPetId(id);
  };

  const selectPet = (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  const deletePet = (id: Pet["id"]) => {
    const updatedPets = [...pets.filter((pet) => pet.id !== id)];
    setSelectedPetId(updatedPets[0].id);
    setPets(updatedPets);
  };

  const onSubmit = () => {
    const petErrors = validatePets(pets);
    if (Object.keys(petErrors).length) {
      setPetErrors(validatePets(pets));
      return;
    }

    axios.post(`http://localhost:4444/users/${id}/pets`, { pets });

    nextStep(pets);
  };

  const onChangePet = (
    field: keyof PetFormValues,
    value: PetFormValues[keyof PetFormValues]
  ) => {
    setPets([
      ...pets.map((pet) => {
        if (pet.id === selectedPetId) {
          return { ...pet, [field]: value };
        }
        return pet;
      }),
    ]);
  };

  return {
    state: {
      pets,
      selectedPetId,
      petErrors,
      isSumbited,
    },
    functions: {
      addPet,
      selectPet,
      onSubmit,
      deletePet,
      onChangePet,
    },
  };
};
