const doneZone = document.querySelector('.done').children[1]
const ingZone = document.querySelector('.ing').children[1]

function TOdone(e) {
  let li = e.parentNode
  let cloneli = li.cloneNode(1)
  cloneli.children[0].setAttribute('checked', true)
  cloneli.children[0].setAttribute('onclick', 'TOing(this)')
  doneZone.appendChild(cloneli)
  li.remove()

  pushTODO(li.children[1].textContent, doneData)
  delTODO(li.children[1].textContent, ingData)
}

function TOing(e) {
  let li = e.parentNode
  let cloneli = li.cloneNode(1)
  cloneli.children[0].removeAttribute('checked')
  cloneli.children[0].setAttribute('onclick', 'TOdone(this)')
  ingZone.appendChild(cloneli)
  e.parentNode.remove()

  pushTODO(li.children[1].textContent, ingData)
  delTODO(li.children[1].textContent, doneData)
}

function Delete(e) {
  let del_li = e.parentNode
  let del_text = del_li.children[1].textContent
  let where = del_li.parentNode == ingZone ? ingData : doneData
  delTODO(del_text, where)
  del_li.remove()
}

function delTODO(value, whereData) {
  value = value.trim()
  let modiData = whereData == ingData ? 'ingData' : 'doneData'
  whereData = localStorage[modiData].split(',')
  whereData.splice(whereData.indexOf(value), 1)
  localStorage[modiData] = whereData
}

function Add(input_value, place, checked = '') {
  input_value = input_value.trim()
  if (!input_value) return
  let newNode = document.createElement('li')
  newNode.innerHTML = `<input type="checkbox" onclick="${
    place == ingZone ? 'TOdone(this)' : 'TOing(this)'
  }" ${checked}/>
  <p>${input_value}</p>
  <div class="icon" onclick="Delete(this)">
    <?xml version="1.0" encoding="UTF-8"?>
    <svg
      width="25"
      height="25"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 12L16.2 5H31.8L33 12"
        stroke="#333"
        stroke-width="4"
        stroke-linejoin="round"
      />
      <path
        d="M6 12H42"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M37 12L35 43H13L11 12H37Z"
        fill="#333"
        stroke="#333"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19 35H29"
        stroke="#FFF"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>
  </div>`
  place.appendChild(newNode)
}

function AddByButton() {
  pushTODO(addtodo.value, ingData)
  Add(addtodo.value, ingZone)
  addtodo.value = null
}

function pushTODO(value, whereData) {
  value = value.trim()
  let modiData = whereData == ingData ? 'ingData' : 'doneData'
  whereData = localStorage[modiData].split(',')
  whereData.push(value)
  localStorage[modiData] = whereData
}

addtodo.addEventListener('keypress', e => {
  if (e.key == 'Enter') {
    AddByButton()
  }
})

let ingData = ['提醒我定闹钟', '明天带伞']
let doneData = ['今晚整理衣物']

const init = () => {
  ingData = localStorage.ingData.split(',')
  ingData = ingData.filter(v=>v.trim())
  localStorage.ingData = ingData
  ingData.map(v => {
    Add(v, ingZone)
  })
  doneData = localStorage.doneData.split(',')
  doneData = doneData.filter(v=>v&&v.trim())
  localStorage.doneData = doneData
  doneData.map(v => {
    Add(v, doneZone, 'checked')
  })
}

// 申请localStorage空间
document.addEventListener('DOMContentLoaded', () => {
  localStorage.ingData==null && localStorage.setItem('ingData', ingData)
  localStorage.doneData==null && localStorage.setItem('doneData', doneData)
  init()
  console.log(localStorage.ingData.split(','))
  console.log(localStorage.doneData.split(','))
})
