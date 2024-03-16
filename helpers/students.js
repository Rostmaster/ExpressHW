const table = document.getElementById('studentsTable');

table.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }

  console.dir(event.target.id);
})

alert()