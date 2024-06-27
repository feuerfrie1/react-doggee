import React, { useEffect, useState } from "react";

import Input from "@common/fields/inputs/Input/Input";
import { DateInput } from "@common/fields/inputs";
import { validateIsEmpty } from "../../../../../../../utils/helpers/validations/validateIsEmpty";
import { validateMaxLength } from "../../../../../../../utils/helpers/validations/validateMaxLength";
import { useForm } from "../../../../../../../utils/helpers/hooks/form/useForm";
import { FormattedMessage } from "react-intl";
import { Select } from "@common/fields/selects";
import axios from "axios";

import styles from "../../../../../RegistrationPage.module.css";

const petFormValidateSchema = {
  dogName: (value: string) => validateIsEmpty(value),
  dogWeight: (value: string) => {
    const hasErrorisEmpty = validateIsEmpty(value);
    if (hasErrorisEmpty) return hasErrorisEmpty;
    const hasErrorMaxLength = validateMaxLength(value, 3);
    return hasErrorMaxLength;
  },
};

interface PetFromProps {
  pet: Pet;
  petErrors: {
    [id: string]: {
      [K in keyof typeof petFormValidateSchema]?: ValidationReturn;
    };
  };
  isLoading?: boolean;
  onChange: (
    field: keyof PetFormValues,
    value: PetFormValues[keyof PetFormValues]
  ) => void;
  children?: React.ReactNode;
}

export const PetForm: React.FC<PetFromProps> = ({
  pet,
  onChange,
  isLoading,
  petErrors,
}) => {
  const [breeds, setBreeds] = useState([]);

  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    resetForm,
    validateForm,
  } = useForm<PetFormValues>({
    initialValues: { ...pet, dogBirthday: new Date(pet.dogBirthday) },
    validateSchema: petFormValidateSchema,
    validateOnChange: true,
  });

  useEffect(() => {
    if (petErrors[pet.id]) validateForm();
  }, [petErrors, pet.id, values]);

  useEffect(() => {
    resetForm({ ...pet, dogBirthday: new Date(pet.dogBirthday) });
  }, [pet.id]);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await axios.get(
          "https://api.thedogapi.com/v1/breeds",
          {
            headers: {
              "x-api-key":
                "live_2lhneUeyfRXGicP9j9PDiv3LkB3Kv638uxrVTl5iXDQ90lpAWB4ur15Zila86qsM",
              "Content-Type": "application/json",
            },
          }
        );
        // @ts-ignore
        setBreeds(response.data);
      } catch (error) {
        console.log("Ошибка при получении пород");
      }
    }
    fetchBreeds();
  }, []);

  const WeightIcon = React.useCallback(
    () => <div className={styles.weight_postfix}>kg</div>,
    []
  );

  return (
    <form className={styles.container__form} onSubmit={handleSubmit}>
      <Input
        disabled={isLoading}
        value={pet.dogName}
        placeholder="Dog`s name"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const dogName = event.target.value;
          setFieldValue("dogName", dogName);
          onChange("dogName", dogName);
        }}
        {...(!!errors &&
          !!errors.dogName && {
            isError: !!errors.dogName,
            helperText: errors.dogName,
          })}
      />
      <Select
        disabled={isLoading}
        options={
          breeds?.map((breed: any) => ({
            label: breed.name,
            id: breed.id,
            value: breed,
          })) ?? []
        }
        onChange={(option: any) => {
          setFieldValue("breed", option.value);
          onChange("breed", option.value);
        }}
        value={
          values.breed
            ? {
                label: values.breed.name,
                id: values.breed.id,
                value: values.breed,
              }
            : null
        }
        components={{
          NoOptionsMessage: () => (
            <FormattedMessage id="field.select.noOption" />
          ),
        }}
        placeholder="Dog`s breed"
      />
      <DateInput
        disabled={isLoading}
        value={values.dogBirthday}
        placeholder="Dog`s birthday"
        onChange={(date) => {
          setFieldValue("dogBirthday", date);
          onChange("dogBirthday", date);
        }}
        {...(!!errors &&
          !!errors.dogBirthday && {
            isError: !!errors.dogBirthday,
            helperText: errors.dogBirthday,
          })}
      />
      <Input
        disabled={isLoading}
        availableChars={/^[0-9]+$/g}
        value={values.dogWeight}
        placeholder="Dog`s weight"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const dogWeight = event.target.value;
          setFieldValue("dogWeight", dogWeight);
          onChange("dogWeight", dogWeight);
        }}
        components={{ indicator: () => <WeightIcon /> }}
        {...(!!errors &&
          !!errors.dogWeight && {
            isError: !!errors.dogWeight,
            helperText: errors.dogWeight,
          })}
      />
    </form>
  );
};
