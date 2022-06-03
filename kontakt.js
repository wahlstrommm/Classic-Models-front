let contactContainer = document.getElementById('contactContainer');
let employeesListContainer = document.getElementById('employeesListContainer');
let rawCityList = [];
let rawEmployeesList = [];
const getCitys = async () => {
  try {
    await fetch('http://localhost:3000/offices')
      .then((response) => response.json())
      .then((result) => (rawCityList = result));
  } catch (error) {
    console.log('error', error);
  }
  console.log(rawCityList);
  for (let i = 0; i < rawCityList.length; i++) {
    let button = document.createElement('button');
    button.innerHTML = `
      ${rawCityList[i].city} <br>  ${rawCityList[i].addressLine1}`;
    button.id = rawCityList[i];
    button.addEventListener('click', () => {
      getEmployees(rawCityList[i].officeCode);
      employeesListContainer.innerHTML = '';
    });
    contactContainer.append(button);
  }
};
getCitys();

const getEmployees = async (city) => {
  console.log(city);
  try {
    await fetch(`http://localhost:3000/employees/${city}`)
      .then((response) => response.json())
      .then((result) => (rawEmployeesList = result));
  } catch (error) {
    console.log('error', error);
  }
  console.log(rawEmployeesList);
  rawEmployeesList.forEach((employer) => {
    let html = `<h2>employer first name: ${employer.firstName}</h2>
    <p>employer Lastname: ${employer.lastName}</p>
    <p>employer email: ${employer.email}</p>
    <p>employer Job Title: ${employer.jobTitle}</p><hr>`;
    employeesListContainer.innerHTML += html;
  });
};
