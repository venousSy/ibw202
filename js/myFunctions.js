let detailButtons = document.querySelectorAll('.showdetails')

for (let i = 0; i < detailButtons.length; i++) {
  detailButtons[i].onclick = function () {
    detailButtons[i].classList.toggle('active')
    detailButtons[
      i
    ].parentElement.parentElement.nextElementSibling.classList.toggle('disable')
  }
}
// stores the value of
let cart = []

let addCartButton = document.querySelectorAll('.addtocart')
for (let i = 0; i < addCartButton.length; i++) {
  addCartButton[i].onclick = function () {
    addCartButton[i].classList.toggle('active')
    let id = addCartButton[i].parentElement.parentElement.dataset.id
    let price = addCartButton[i].parentElement.parentElement.dataset.price
    let des = addCartButton[i].parentElement.parentElement.dataset.des
    const objWithIdIndex = cart.findIndex((obj) => obj.id === id)
    if (objWithIdIndex < 0) {
      cart.push({ id, des, price })
    } else {
      cart.splice(objWithIdIndex, 1)
    }
  }
}

// create Random number for capatcha
function getRandomNum() {
  return Math.floor(Math.random() * 1000000)
}

// open the sign form
let continueButton = document.querySelector('#contin')
// validation number
let validationNumberPara = document.querySelector('#validTe')
let randomNumber = 0
let sign = document.querySelector('#sign')
continueButton.onclick = function () {
  // create random numbrer
  randomNumber = getRandomNum()
  sign.classList.add('active')
  validationNumberPara.textContent = randomNumber
}

// close sign form
let close = document.querySelector('#cancel')

close.onclick = function () {
  sign.classList.remove('active')
}

// submit form btn
let submitButton = document.querySelector('#calculate')

// user data
let userName = document.querySelector('#username')
let nationalNumber = document.querySelector('#n-num')
let dateOfBirth = document.querySelector('#birth')
let phoneNumber = document.querySelector('#phony')
let email = document.querySelector('#email')
let validation = document.querySelector('#valid')
console.log(phoneNumber)

submitButton.addEventListener('click', (e) => {
  sessionStorage.clear()
  sessionStorage.setItem('theArray', JSON.stringify(cart))
  if (!checkInputFileds()) {
    e.preventDefault()
  } else {
    e.preventDefault()
    window.location.href = './cart.html'
  }
})

function checkInputFileds() {
  let nameRes = false
  let nationalNumberRes = false
  let birthRes = false
  let phoneRes = false
  let mailRes = false
  let validationRes = false

  // Check The name in arabic
  const pattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/
  if (userName.value !== '') {
    if (!pattern.test(userName.value)) {
      userName.classList.add('error')
    } else {
      userName.classList.remove('error')
      nameRes = true
    }
  }
  //   check National number
  nationalNumber.classList.remove('error')
  nationalNumberRes = true

  // check the date of birth
  const dateRe = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/
  if (dateOfBirth.value !== '') {
    if (!dateRe.test(dateOfBirth.value)) {
      dateOfBirth.classList.add('error')
    } else {
      dateOfBirth.classList.remove('error')
      birthRes = true
    }
  }

  // checking the Phone number
  const numberRe = /^09\d{8}$/
  if (phoneNumber.value !== '') {
    if (!numberRe.test(phoneNumber.value)) {
      phoneNumber.classList.add('error')
    } else {
      phoneNumber.classList.remove('error')
      phoneRes = true
    }
  }

  // checking the email
  const emailRe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (email.value !== '') {
    if (!emailRe.test(email.value)) {
      email.classList.add('error')
    } else {
      email.classList.remove('error')
      mailRes = true
    }
  }

  //   check the capatcha
  if (validation.value != randomNumber) {
    validation.classList.add('error')
  } else {
    validation.classList.remove('error')
    validationRes = true
  }

  if (nationalNumberRes && validationRes) {
    if ((phoneNumber.value != '' && phoneRes) || phoneNumber.value == '') {
      phoneRes = true
    } else {
      phoneRes = false
    }
    if ((dateOfBirth.value != '' && birthRes) || dateOfBirth.value == '') {
      birthRes = true
    } else {
      birthRes = false
    }
    if ((userName.value != '' && nameRes) || userName.value == '') {
      nameRes = true
    } else {
      nameRes = false
    }
    if ((email.value != '' && mailRes) || email.value == '') {
      mailRes = true
    } else {
      mailRes = false
    }
    if ((validation.value != '' && validationRes) || validation.value == '') {
      validationRes = true
    } else {
      validationRes = false
    }
    if (validationRes && birthRes && mailRes && nameRes && phoneRes) {
      return true
    }
  }
  // Return true Cause All Data Is Vaild
  return false
}
