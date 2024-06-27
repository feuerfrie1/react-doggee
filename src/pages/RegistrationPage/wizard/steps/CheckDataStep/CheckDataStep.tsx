import React from "react";

import Button from "../../../../../common/buttons/Button/Button";
import { formatDate } from "../../../../../utils/helpers/date/formatDate";

import { RegistrationWizardContainer } from "../../RegistrationWizardContainer/RegistrationWizardContainer";
import { DataCard } from "./components/DataCard/DataCard";
import { DataItem } from "./components/DataCard/DataItem/DataItem";
import { DontWorry } from "./components/DontWorry/DontWorry";
import { FormattedMessage } from "react-intl";
import translate from "../../../../../intl/translate";
import { Link } from "react-router-dom";

interface CheckDataStepProps {
  initialData: {
    fillProfileData: FillProfileData;
    addPetsData: AddPetsData;
  };
  backStep: () => void;
  chooseStep: (step: "fillProfileData" | "addPetsData") => void;
}

export const CheckDataStep: React.FC<CheckDataStepProps> = ({
  initialData,
  backStep,
  chooseStep,
}) => {
  return (
    <RegistrationWizardContainer
      activeStep={3}
      panel={{
        data: <DontWorry />,
      }}
      form={{
        title: (
          <FormattedMessage id="page.registration.step.checkDataStep.title" />
        ),
        backButton: (
          <div aria-hidden onClick={() => backStep()}>
            <FormattedMessage id="button.goNextStep" />
          </div>
        ),
        content: (
          <>
            <DataCard
              title={translate(
                "page.registration.step.checkDataStep.card.profile"
              )}
              onEdit={() => chooseStep("fillProfileData")}
            >
              <DataItem label="Name" data={initialData.fillProfileData.name} />
              <DataItem
                label="Location"
                data={initialData.fillProfileData.registrationAddress}
              />
              <DataItem
                label="Birthdate"
                data={formatDate(
                  new Date(initialData.fillProfileData.birthDate),
                  "DD MMM YYYY"
                )}
              />
            </DataCard>

            <DataCard
              title={translate(
                "page.registration.step.checkDataStep.card.pets"
              )}
              onEdit={() => chooseStep("addPetsData")}
            >
              {initialData.addPetsData.map((pet: Pet) => {
                const petYears =
                  new Date().getFullYear() -
                  new Date(pet.dogBirthday).getFullYear();
                const petBreedName = pet.breed && pet.breed.name;
                const petBirthday = !!petYears && ` ${petYears} y.o.`;
                const petWeight = pet.dogWeight && ` , ${pet.dogWeight} kg`;

                const petData = `${petBreedName}${petBirthday}${petWeight}`;

                return <DataItem label={pet.dogName} data={petData} />;
              })}
            </DataCard>
            <Link to="/main">
              <Button type="submit">
                <FormattedMessage id="button.done" />
              </Button>
            </Link>
          </>
        ),
      }}
    />
  );
};
