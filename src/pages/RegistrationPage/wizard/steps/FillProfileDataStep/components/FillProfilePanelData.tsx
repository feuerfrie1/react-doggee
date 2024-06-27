import React from "react";
import { FormattedMessage } from "react-intl";

import styles from "./FillProfilePanelData.module.css";

interface FillProfilePanelDataProps {
  focusedField: "name" | "registrationAddress";
}

export const FillProfilePanelData: React.FC<FillProfilePanelDataProps> = ({
  focusedField,
}) => (
  <div className={styles.text}>
    {focusedField === "name" && (
      <FormattedMessage id="page.registration.step.fillProfileData.hint.name" />
    )}
    {focusedField === "registrationAddress" && (
      <FormattedMessage id="page.registration.step.fillProfileData.hint.registrationAddressHint" />
    )}
  </div>
);
