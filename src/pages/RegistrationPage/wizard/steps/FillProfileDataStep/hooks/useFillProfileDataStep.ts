import { validateIsEmpty } from "../../../../../../utils/helpers/validations/validateIsEmpty";
import { useForm } from "../../../../../../utils/helpers/hooks/form/useForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../../redux/slices/user";
import axios from "axios";

const fillProfileDataStepValidateSchema = {
  name: (value: string) => validateIsEmpty(value),
  registrationAddress: (value: string) => validateIsEmpty(value),
};

type UseFillProfileDataStepParams = Omit<FillProfileDataStepProps, "skipStep">;

export const useFillProfileDataStep = ({
  initialData,
  nextStep,
}: UseFillProfileDataStepParams) => {
  const user = useSelector(selectUser);
  // @ts-ignore
  const id = user._id;
  const { values, errors, setFieldValue, handleSubmit } =
    useForm<FillProfileDataStepValues>({
      initialValues: {
        ...initialData,
        birthDate: new Date(initialData.birthDate),
      },
      validateSchema: fillProfileDataStepValidateSchema,
      validateOnChange: false,
      onSubmit: async (values) => {
        await axios.patch(`http://localhost:4444/users/${id}`, values);
        nextStep({ ...values, birthDate: values.birthDate.getTime() });
      },
    });

  return {
    state: {
      values,
      errors,
    },
    functions: {
      setFieldValue,
      handleSubmit,
    },
  };
};
