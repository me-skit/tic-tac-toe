const squares = Array.from(document.querySelectorAll('.square'));
squares.forEach((element, index) => {
  element.addEventListener('click', () => alert(`Selected ${index}`));
});
