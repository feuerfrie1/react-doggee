interface Breed {
  bred_for: string;
  height: {
    imperial: string;
    metric: string;
  };
  id: number;
  image: {
    height: number;
    id: string;
    url: string;
    width: number;
  };
  life_span: string;
  name: string;
  origin: string;
  reference_image_id: string;
  temperament: string;
  weight: {
    imperial: string;
    metric: string;
  };
}

interface Pet {
  id: number;
  dogName: string;
  dogWeight: string;
  breed: any;
  dogBirthday: number;
}

interface User {
  email: string;
  password: string;
  name: string;
  birthday: number;
  registrationAddress: string;
  id: string;
  pets: Pet[];
}

interface Service {
  isLogined: boolean;
}

interface FillLoginDataStepValues {
  email: string;
  password: string;
  passwordAgain: string;
}

interface FillLoginDataStepProps {
  nextStep: () => void;
}

interface FillProfileDataStepValues {
  name: string;
  registrationAddress: string;
  birthDate: Date;
}

interface FillProfileData {
  name: User["name"];
  registrationAddress: User["registrationAddress"];
  birthDate: User["birthday"];
}

interface FillProfileDataStepProps {
  initialData: FillProfileData;
  skipStep: () => void;
  nextStep: (fillProfileData: FillProfileData) => void;
}

interface AddYourPetsStepProps {
  initialData: AddPetsData;
  skipStep: () => void;
  nextStep: (addPetsData: AddPetsData) => void;
  backStep: (addPetsData: AddPetsData) => void;
}

interface PetFormValues {
  dogName: string;
  dogWeight: string;
  breed: Breed;
  dogBirthday: Date;
}

type AddPetsData = Pet[];
