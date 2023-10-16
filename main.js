const adviceId = document.querySelector('.advice-id');
const adviceText = document.querySelector('.advice-text');
const title = document.querySelector('.title');
const adviceContainer = document.querySelector('.container');

const btn = document.querySelector('.btn');

// Function to fetch advice and update the DOM
async function getAdvice() {
  try {
    adviceContainer.style.pointerEvents = 'none'; // Disable button during transition
    title.classList.add('hidden');
    adviceText.classList.add('hidden');

    const response = await fetch("https://api.adviceslip.com/advice");
    if (!response.ok) {
      throw Error('Failed to fetch advice.');
    }
    const adviceData = await response.json();
    const { id, advice } = adviceData.slip;

    // Delay to ensure the elements are hidden before updating content
    setTimeout(() => {
      // Update the content while still hidden
      adviceId.textContent = id;
      adviceText.textContent = '"' + advice + '"';

      // Enable the button and remove "hidden" class after the transition
      setTimeout(() => {
        title.classList.remove('hidden');
        adviceText.classList.remove('hidden');

        // Enable the button and remove the pointer-events block
        adviceContainer.style.pointerEvents = 'auto';

        // Smoothly transition the container's max-height to fit the new content
      }, 10); // This should be a very short delay

    }, 500); // This should match the transition duration in CSS (0.5s)
  } catch (error) {
    console.error(error);
  }
}

// Event listener for the button click
btn.addEventListener('click', getAdvice);

// Initial advice fetch when the page loads
window.addEventListener('load', getAdvice);
