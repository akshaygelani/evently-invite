let mainFrame = document.getElementById('main-frame');
const nameInput = document.getElementById('name');
const fileInput = document.getElementById('photo');
const downloadButton = document.getElementById('download');
const reloadButton = document.getElementById('reload');
const imageUserName = document.getElementById('userName');
const imageUserPhoto = document.getElementById('userPhoto');

const readURL = () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    mainFrame.style.display = 'flex';
    imageUserPhoto.style.backgroundImage = `url(${reader.result})`;
    updateUserName();
  };
  if (file) {
    reader.readAsDataURL(file);
    downloadButton.style.display = 'inline-flex';
    reloadButton.style.display = 'inline-flex';
  }
};

const resetValues = () => {
  fileInput.value = '';
  mainFrame.style.backgroundImage = '';
  mainFrame.style.display = 'none';
  downloadButton.style.display = 'none';
  reloadButton.style.display = 'none';
  nameInput.value = '';
};

const generateNewCard = () => {
  resetValues();
  window.location.reload();
};

const download = () => {
  mainFrame.classList.add('resetZoom');
  html2canvas(mainFrame, {
    scale: 2,
  }).then((canvas) => {
    saveAs(canvas.toDataURL(), 'સરસીયા હું આવું છું.png');
    mainFrame.classList.remove('resetZoom');
  });
};

const saveAs = (uri, filename) => {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
};

const updateUserName = () => {
  if (nameInput.value) {
    imageUserName.innerHTML = nameInput.value;
  }
};

fileInput.addEventListener('change', readURL, true);
nameInput.addEventListener('change', updateUserName, false);
