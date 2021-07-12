let flag = 0;
const form = document.getElementById('myform');
const button = document.getElementById('btn');
const email = document.getElementsByName('email')[0];
const password = document.getElementsByName('password')[0];
function showError(input, message) {
  const inputGroup = input.parentElement;
  inputGroup.classList.add('error');
  const small = inputGroup.querySelector('small');
  small.innerText = message;
}

function removeError(input) {
  const inputGroup = input.parentElement;
  if (inputGroup.classList.contains('error')) {
    inputGroup.classList.remove('error');
  }
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    removeError(input);
  } else {
    showError(input, 'Email is not valid');
    flag++;
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      flag++;
    } else {
      removeError(input);
    }
  });
}

function getFieldName(input) {
  if (input.getAttribute('name') === 'firstName') {
    return 'First name';
  } else if (input.getAttribute('name') === 'lastName') {
    return 'Last name';
  } else {
    return (
      input.getAttribute('name').charAt(0).toUpperCase() +
      input.getAttribute('name').slice(1)
    );
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    flag++;
  } else {
    removeError(input);
  }
}

button.addEventListener('click', (e) => {
  e.preventDefault();

  checkRequired([email, password]);
  checkLength(password, 6, 25);
  checkEmail(email);
  if (flag === 0) {
    console.log('transferring');
    form.submit();
  } else {
    flag = 0;
  }
});
