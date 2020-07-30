export default function (obj) {
  // dumbest validation=>  validating only if keys are not null;
  let keys = Object.keys(obj);
  let valid = true;
  for (let value of keys) {
    if (obj[value].length < 1) valid = false;
  }
  return valid;
}
