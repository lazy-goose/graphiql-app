export const getPasswordErrorsData = (
  passwordErrors: string[] | null,
  styles: CSSModuleClasses,
) => {
  if (passwordErrors && passwordErrors.length === 5) {
    return { className: `${styles.indicator}`, text: '' }
  }
  if (passwordErrors && passwordErrors.length === 4) {
    return {
      className: `${styles.indicator} ${styles.password_very_weak}`,
      text: `Very weak`,
    }
  }
  if (passwordErrors && passwordErrors.length === 3) {
    return {
      className: `${styles.indicator} ${styles.password_weak}`,
      text: `Weak`,
    }
  }
  if (passwordErrors && passwordErrors.length === 2) {
    return {
      className: `${styles.indicator} ${styles.password_normal}`,
      text: `So-so`,
    }
  }
  if (passwordErrors && passwordErrors.length === 1) {
    return {
      className: `${styles.indicator} ${styles.password_good}`,
      text: `Good`,
    }
  }
  return {
    className: `${styles.indicator} ${styles.password_strong}`,
    text: `Great!`,
  }
}
