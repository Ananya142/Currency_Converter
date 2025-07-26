const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const amountInput = document.getElementById('amount');
const resultDisplay = document.getElementById('result');
const convertBtn = document.getElementById('convert');
const swapBtn = document.getElementById('swap');

const API_KEY = 'f2e40cd7645575b94a725ece';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const populateCurrencies = async () => {
  try {
    const response = await fetch(API_URL + 'USD');
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);

    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      option1.value = currency;
      option1.textContent = currency;
      fromCurrency.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = currency;
      option2.textContent = currency;
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'INR';
  } catch (error) {
    resultDisplay.textContent = '⚠️ Error loading currency list.';
  }
};

const convertCurrency = async () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDisplay.textContent = '⚠️ Please enter a valid amount.';
    return;
  }

  try {
    const response = await fetch(API_URL + from);
    const data = await response.json();
    const rate = data.conversion_rates[to];

    if (!rate) {
      resultDisplay.textContent = '⚠️ Conversion rate not available.';
      return;
    }

    const converted = (amount * rate).toFixed(2);
    resultDisplay.textContent = `✅ ${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultDisplay.textContent = '⚠️ Conversion failed. Try again.';
  }
};

const swapCurrencies = () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
};

convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);
window.addEventListener('DOMContentLoaded', populateCurrencies);
