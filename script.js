/* script.js - JavaScript + jQuery for University Event Portal
   - Plain JS handles: BMI calculator, form progress, validation on submit
   - jQuery handles: Currency converter interactions (keyup, change, click)
*/

// Plain JS: Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const progress = document.getElementById('formProgress');
  const requiredFields = Array.from(form.querySelectorAll('[required]'));

  // Update progress based on number of filled required fields
  function updateProgress() {
    const filled = requiredFields.filter(f => {
      if (f.type === 'checkbox' || f.type === 'radio') {
        const group = form.querySelectorAll(`[name="${f.name}"]`);
        return Array.from(group).some(g => g.checked);
      }
      return f.value.trim() !== '';
    });
    const percent = Math.round((filled.length / requiredFields.length) * 100);
    progress.value = percent;
    progress.textContent = percent + '%';
  }

  // Attach input/change listeners
  requiredFields.forEach(field => {
    field.addEventListener('input', updateProgress);
    field.addEventListener('change', updateProgress);
  });

  updateProgress(); // initial

  // BMI calculator (plain JS)
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const calcBmiBtn = document.getElementById('calcBmi');
  const bmiResult = document.getElementById('bmiResult');

  calcBmiBtn.addEventListener('click', function () {
    const h = parseFloat(heightInput.value);
    const w = parseFloat(weightInput.value);
    if (!h || !w) {
      bmiResult.textContent = 'Please enter valid height and weight.';
      return;
    }
    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    let cat = '';
    if (bmi < 18.5) cat = 'Underweight';
    else if (bmi < 25) cat = 'Normal';
    else if (bmi < 30) cat = 'Overweight';
    else cat = 'Obese';
    bmiResult.textContent = `BMI: ${bmi.toFixed(2)} (${cat})`;
  });

  // Form submit: validation + restrictions
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      form.reportValidity();
      return;
    }
    // File upload check: must be image
    const photo = document.getElementById('photo');
    if (photo.files.length > 0) {
      const file = photo.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Only image uploads are allowed.');
        return;
      }
    }

    alert('Registration submitted successfully (simulated).');
    form.reset();
    updateProgress();
  });

  // Reset handler
  form.addEventListener('reset', function () {
    setTimeout(updateProgress, 50);
  });

}); // DOMContentLoaded end

// jQuery: Currency converter
$(function () {
  const rates = {
    usd: 0.012,
    eur: 0.011,
    gbp: 0.0096,
    aed: 0.044,
    aud: 0.017
  };

  function convert(amount, to) {
    if (!amount || isNaN(amount)) return '';
    const r = rates[to] || 0;
    return (amount * r).toFixed(2);
  }

  // Update result dynamically on keyup
  $('#amount').on('keyup', function () {
    const amt = parseFloat($(this).val());
    const to = $('#toCurrency').val();
    const res = convert(amt, to);
    $('#convResult').text(res ? `${res} ${to.toUpperCase()}` : '');
  });

  // Update on currency change
  $('#toCurrency').on('change', function () {
    $('#amount').trigger('keyup');
  });

  // Convert button click
  $('#convertBtn').on('click', function () {
    const amt = parseFloat($('#amount').val());
    const to = $('#toCurrency').val();
    const res = convert(amt, to);
    if (!res) {
      $('#convResult').text('Enter a valid amount to convert.');
    } else {
      $('#convResult').text(`${res} ${to.toUpperCase()}`);
    }
  });
});
