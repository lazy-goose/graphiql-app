export const getPasswordErrorsData = (
  passwordErrors: string[] | null,
  styles: CSSModuleClasses,
) => {
  if (passwordErrors && passwordErrors.length === 5) {
    return { className: `${styles.indicator}`, text: '' }
  }
  if (passwordErrors && passwordErrors.length === 4) {
    return { className: `${styles.indicator} ${styles.red}`, text: `Very week` }
  }
  if (passwordErrors && passwordErrors.length === 3) {
    return { className: `${styles.indicator} ${styles.orange}`, text: `Week` }
  }
  if (passwordErrors && passwordErrors.length === 2) {
    return { className: `${styles.indicator} ${styles.yellow}`, text: `So-so` }
  }
  if (passwordErrors && passwordErrors.length === 1) {
    return { className: `${styles.indicator} ${styles.salad}`, text: `Good` }
  }
  return { className: `${styles.indicator} ${styles.green}`, text: `Great!` }
}
