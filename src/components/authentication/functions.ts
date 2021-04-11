export const ckeckValidity = (e: any, type: string) => {
  if (type === 'password') {
    if (e.target.value.length >= 6) {
      e.target.classList.add('valid');
      e.target.classList.remove('invalid');
    }
    if (e.target.value.length < 6) {
      e.target.classList.remove('valid');
      e.target.classList.add('invalid');
    }
  }
  if (type === 'email') {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(e.target.value).toLowerCase())) {
      e.target.classList.add('valid');
      e.target.classList.remove('invalid');
    } else {
      e.target.classList.remove('valid');
      e.target.classList.add('invalid');
    }
  }
};

export const labelAnimation = (e: any) => {
  const label = e.target.closest('.form__fields__field').querySelector('label');
  label.classList.add('active');
};