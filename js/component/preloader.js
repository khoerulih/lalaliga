const showPreloader = () => {
  document.querySelector('.preloader').style.display = "block";
  document.querySelector('#content').style.display = "none";
}

const hidePreloader = () => {
  document.querySelector('.preloader').style.display = "none";
  document.querySelector('#content').style.display = "block";
}

export default {
  showPreloader,
  hidePreloader
};