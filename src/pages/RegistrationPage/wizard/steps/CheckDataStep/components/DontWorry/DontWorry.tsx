import { FormattedMessage } from "react-intl";

import styles from "./DontWorry.module.css";

export const DontWorry = () => (
  <div className={styles.text}>
    <FormattedMessage id="page.registration.step.checkDataStep.hint.dontWorry" />
  </div>
);
