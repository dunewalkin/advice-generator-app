const adviceId = document.querySelector('.advice-id');
const adviceText = document.querySelector('.advice-text');
const btn = document.querySelector('.btn');

// Function to fetch advice and update the DOM
async function getAdvice() {
   try {
     const response = await fetch("https://api.adviceslip.com/advice");
     if (!response.ok) {
       throw new Error('Failed to fetch advice.');
     }
     const adviceData = await response.json();
     const { id, advice } = adviceData.slip;
 
     adviceId.textContent = id;
     adviceText.textContent = '"' + advice + '"';
   } catch (error) {
     console.error(error);
   } finally {
      loadingIndicator.style.display = 'none'; // Hide loading indicator
      btn.disabled = false; // Enable the button after the request
    }
 }
 
 // Event listener for the button click
 btn.addEventListener('click', getAdvice);

 // Initial advice fetch when the page loads
window.addEventListener('load', getAdvice);
