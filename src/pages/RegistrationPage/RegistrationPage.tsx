import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddYourPetsStep } from "./wizard/steps/AddYourPetsStep/AddYourPetsStep";
import { CheckDataStep } from "./wizard/steps/CheckDataStep/CheckDataStep";
import { FillLoginDataStep } from "./wizard/steps/FillLoginDataStep/FillLoginDataStep";
import { FillProfileDataStep } from "./wizard/steps/FillProfileDataStep/FillProfileDataStep";

export interface RegistrationFormValues {
  email: string;
  password: string;
  passwordAgain: string;
  name?: string;
  address?: string;
}

const defaultAddPetsData = [
  {
    id: 1,
    dogName: "",
    dogWeight: "",
    breed: null,
    dogBirthday: new Date().getTime(),
  },
];

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = React.useState<{
    fillProfileData: FillProfileData;
    addPetsData: AddPetsData;
  }>({
    fillProfileData: {
      name: "",
      registrationAddress: "",
      birthDate: new Date().getTime(),
    },
    // @ts-ignore
    addPetsData: defaultAddPetsData,
  });

  const skipStep = React.useCallback(() => {
    navigate("/main");
  }, []);

  const [step, setStep] = useState<
    "fillLoginData" | "fillProfileData" | "addPetsData" | "checkData"
  >("fillLoginData");
  return (
    <>
      {step === "fillLoginData" && (
        <FillLoginDataStep nextStep={() => setStep("fillProfileData")} />
      )}
      {step === "fillProfileData" && (
        <FillProfileDataStep
          initialData={registrationData.fillProfileData}
          skipStep={skipStep}
          nextStep={(fillProfileData: any) => {
            setRegistrationData({ ...registrationData, fillProfileData });
            setStep("addPetsData");
          }}
        />
      )}
      {step === "addPetsData" && (
        <AddYourPetsStep
          initialData={registrationData.addPetsData}
          skipStep={skipStep}
          nextStep={(addPetsData: AddPetsData) => {
            setRegistrationData({ ...registrationData, addPetsData });
            setStep("checkData");
          }}
          backStep={(addPetsData: AddPetsData) => {
            setRegistrationData({ ...registrationData, addPetsData });
            setStep("fillProfileData");
          }}
        />
      )}
      {step === "checkData" && (
        <CheckDataStep
          initialData={registrationData}
          chooseStep={(step: "fillProfileData" | "addPetsData") =>
            setStep(step)
          }
          backStep={() => {
            if (!registrationData.addPetsData.length) {
              setRegistrationData({
                ...registrationData,
                addPetsData: defaultAddPetsData,
              });
            }
            setStep("addPetsData");
          }}
        />
      )}
    </>
  );
};

export default RegistrationPage;
