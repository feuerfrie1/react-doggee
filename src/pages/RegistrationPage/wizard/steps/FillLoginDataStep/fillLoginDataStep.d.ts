interface FillLoginDataStepValues {
  email: string;
  password: string;
  passwordAgain: string;
}

interface FillLoginDataStepProps {
  nextStep: () => void;
}
