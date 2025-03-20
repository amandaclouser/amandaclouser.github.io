function copyEmail(event) {
  event.preventDefault();
  const email = "clouser.amanda@gmail.com";
  
  // Create a temporary input element
  const tempInput = document.createElement("input");
  tempInput.value = email;
  document.body.appendChild(tempInput);
  
  // Select and copy the text
  tempInput.select();
  document.execCommand("copy");
  
  // Remove the temporary element
  document.body.removeChild(tempInput);
  
  // Visual feedback
  const card = event.currentTarget;
  const tooltip = card.querySelector(".click-to-tooltip");
  tooltip.textContent = "Copied!";
  
  // Reset tooltip after 2 seconds
  setTimeout(() => {
      tooltip.textContent = "Click to copy";
  }, 2000);
}