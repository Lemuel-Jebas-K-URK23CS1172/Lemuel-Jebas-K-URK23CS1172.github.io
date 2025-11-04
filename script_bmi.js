document.getElementById('calculate-btn').addEventListener('click', function () {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const bmiValue = document.getElementById('bmi-value');
  const bmiStatus = document.getElementById('bmi-status');
  const meme = document.getElementById('meme');

  meme.classList.remove('show');
  meme.classList.add('hidden');

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    alert('⚠️ Please enter valid positive values for height and weight.');
    return;
  }

  const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
  bmiValue.textContent = bmi;
  let status = '';
  bmiStatus.className = '';

  if (bmi < 18.5) {
    status = 'Underweight';
    bmiStatus.classList.add('underweight');
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    status = 'Normal weight';
    bmiStatus.classList.add('normal');
  } else if (bmi >= 25 && bmi <= 29.9) {
    status = 'Overweight';
    bmiStatus.classList.add('overweight');
    meme.classList.remove('hidden');
    setTimeout(() => meme.classList.add('show'), 300);
  } else {
    status = 'Obese';
    bmiStatus.classList.add('obese');
    meme.classList.remove('hidden');
    setTimeout(() => meme.classList.add('show'), 300);
  }

  bmiStatus.textContent = status;
});
