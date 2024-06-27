import React from "react";

import Button from "@common/buttons/Button/Button";
import { RegistrationWizardContainer } from "../../RegistrationWizardContainer/RegistrationWizardContainer";
import { PetForm } from "./components/PetForm/PetForm";
import { PetList } from "./components/PetList/PetList";
import { useAddYourPetsStep } from "./hooks/useAddYourPetsStep";
import { FormattedMessage } from "react-intl";

export const AddYourPetsStep: React.FC<AddYourPetsStepProps> = ({
  initialData,
  nextStep,
  backStep,
  skipStep,
}) => {
  const { state, functions } = useAddYourPetsStep({ initialData, nextStep });

  return (
    <RegistrationWizardContainer
      activeStep={2}
      panel={{
        data: (
          <PetList
            isSubmited={state.isSumbited}
            pets={state.pets}
            errors={state.petErrors}
            selectedPetId={state.selectedPetId}
            onSelect={functions.selectPet}
            onAdd={functions.addPet}
            onDelete={functions.deletePet}
          />
        ),
        footer: (
          <div role="link" tabIndex={0} aria-hidden onClick={skipStep}>
            <FormattedMessage id="page.registration.skipAndFillInLater" />
          </div>
        ),
      }}
      form={{
        title: (
          <FormattedMessage id="page.registration.step.addYourPetsStep.title" />
        ),
        backButton: (
          <div aria-hidden onClick={() => backStep(state.pets)}>
            <FormattedMessage id="button.goNextStep" />
          </div>
        ),
        content: (
          <>
            <PetForm
              onChange={functions.onChangePet}
              pet={state.pets.find((pet) => pet.id === state.selectedPetId)!}
              petErrors={state.petErrors}
            />
            <Button type="submit" onClick={functions.onSubmit}>
              <FormattedMessage id="button.next" />
            </Button>
          </>
        ),
      }}
    />
  );
};
