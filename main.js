const watch = document.querySelector("#watch");
let milliseconds = 0;
let timer;

let data = []


const logBtn = document.querySelector('#log')
const tbody = document.querySelector("#tbody")
const datePicker = document.querySelector('#datepicker')
const nameInput = document.querySelector('#name')
const descriptionInput = document.querySelector(`#description`)
const resetBtn = document.querySelector(`#reset`)

const startWatch = () => {
    watch.classList.remove(`paused`)
    clearInterval(timer);
    timer = setInterval(() => {
        milliseconds += 10;
        let dateTimer = new Date(milliseconds);
        watch.innerHTML =
            ("0" + dateTimer.getUTCHours()).slice(-2) + `:` +
            ("0" + dateTimer.getUTCMinutes()).slice(-2) + `:` +
            ("0" + dateTimer.getUTCSeconds()).slice(-2) + `:` +
            ("0" + dateTimer.getUTCMilliseconds()).slice(-3, -1);
    }, 10);
};

const pauseWatch = () => {
    watch.classList.add(`paused`);
    clearInterval(timer);
};
const resetWatch = () => {
    watch.classList.remove(`pause`);
    clearInterval(timer);
    milliseconds = 0;
    watch.innerHTML = "00:00:00:00";
};
document.addEventListener(`click`, (e) => {
    const element = e.target;
    if (element.id === `start`) startWatch();
    if (element.id === `pause`) pauseWatch();
    if (element.id === `reset`) resetWatch();

});
var callme = (function () {
    var start = true;
    return function (me) {
        if (start) {
            me.value = "Pause";
            startWatch();
        } else {
            me.value = "Start";
            pauseWatch();
        }
        start = !start;
    };
}());
logBtn.addEventListener('click', () => {
    const item = {
        startTime: datePicker.value,
        name: nameInput.value,
        timeSpend: watch.innerHTML,
        description: descriptionInput.value,

    }
    data.push(item)
    render()
})

function render() {
    const body = data.map((item, index) => {
        return `<tr id="row_${index}">
            <th scope="row">${index}</th>
            <td>${item.startTime}</td>
            <td id="name">${item.name}</td>
            <td>${item.timeSpend}</td>
            <td id="description">${item.description}</td>
            <td>
                <button id="edit" value="${index}">edit</button>
                <button id="save" value="${index}" class="visually-hidden" >save</button>
            </td>
            <td><button id="delete" value="${index}">delete</button></td>
        </tr>`
    })
    tbody.innerHTML = body.join('\n')
    const deleteBtns = document.querySelectorAll(`#delete`)
    const editBtns = document.querySelectorAll(`#edit`)
    const saveBtns = document.querySelectorAll(`#save`)
    deleteBtns.forEach((button) => {
        button.addEventListener('click', (event) => {
            deleteDataItem(event.currentTarget.value)
        })
    })

    editBtns.forEach((button) => {
        button.addEventListener('click', (event) => {
            editDataItem(event.currentTarget.value)
        })
    })

    saveBtns.forEach((button) => {
        button.addEventListener('click', (event) => {
            saveDataItem(event.currentTarget.value)
        })
    })

}

function deleteDataItem(index) {
    data.splice(index, 1)
    render()
}

function editDataItem(index) {
    const row = document.querySelector(`#row_${index}`)

    const section = row.querySelector("#name")
    const value = section.innerHTML

    section.innerHTML = `<input type="text" id="#name_field_input_${index}" placeholder="name" value="${value}"/>`
    const saveBtn = row.querySelector(`#save`)
    const editBtn = row.querySelector(`#edit`)


    saveBtn.classList.remove("visually-hidden")
    editBtn.classList.add("visually-hidden")

    const section_2 = row.querySelector("#description")
    const value_2 = section_2.innerHTML
    section_2.innerHTML=`<input type="text" id="#decription_field_input_${index}" placeholder="decription" value="${value_2}"/>`

}

function saveDataItem(index) {
    const row = document.querySelector(`#row_${index}`)

    const section = row.querySelector("#name")

    section.innerHTML = section.querySelector(`input`).value

    const saveBtn = row.querySelector(`#save`)
    const editBtn = row.querySelector(`#edit`)

    saveBtn.classList.add("visually-hidden")
    editBtn.classList.remove("visually-hidden")

    const section_2 = row.querySelector("#description")

    section_2.innerHTML = section_2.querySelector(`input`).value
}

