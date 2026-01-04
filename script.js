let opefeature = () => {
    let allelem = document.querySelectorAll('.elem')
    let fullelempage = document.querySelectorAll('.fullelem')
    let allfullelempagebackbtn = document.querySelectorAll('.fullelem .back')

    allelem.forEach((elem) => {
        elem.addEventListener('click', function () {
            fullelempage[elem.id].style.display = 'block'
        })
    })
    allfullelempagebackbtn.forEach((back) => {
        back.addEventListener('click', function () {
            fullelempage[back.id].style.display = 'none'

        })
    })
}
opefeature();
function todolist() {

    let form = document.querySelector('.addtask form')
    let taskinput = document.querySelector('.addtask form #task')
    let tasktextarea = document.querySelector('.addtask form textarea')
    let taskcheckbox = document.querySelector('.addtask form #check')



    let currenttask = []
    if (localStorage.getItem('currenttask')) {
        currenttask = JSON.parse(localStorage.getItem('currenttask'))
    }
    else {
        console.log('sorrry bhai list is empty ');

    }
    function TodoTask() {
        let alltasks = document.querySelector('.alltask')
        let sum = ``;

        currenttask.forEach((e, idx) => {
            sum += `
      <div class="task">
        <h5>
          ${e.task}
 <span class = "${e.imp}">Imp</span>   
 </h5>
        <button id=${idx}>Mark As Completed</button>
      </div>
    `;
        })

        alltasks.innerHTML = sum;
        localStorage.setItem('currenttask', JSON.stringify(currenttask));
        let completetaskbtn = document.querySelectorAll('.task button')
        completetaskbtn.forEach((btn) => {
            btn.addEventListener('click', function () {
                currenttask.splice(btn.id, 1)
                TodoTask()
            })
        })
    }

    TodoTask();


    form.addEventListener('submit', (elem) => {
        elem.preventDefault()
        currenttask.push(
            {
                task: taskinput.value,
                disc: tasktextarea.value,
                imp: taskcheckbox.checked
            })
        taskinput.value = '';
        tasktextarea.value = '';
        taskcheckbox.checked = false;
        TodoTask()
    })

}
todolist()

let dailyplanner = ()=> {
    let dayplandata = JSON.parse(localStorage.getItem('dayplandata')) || {}
let dayplanner = document.querySelector('.day-planner')
let hour = Array.from({ length: 18 }, (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`)
let wholedaysum = ''
hour.forEach((elem, idx) => {
    let saveddata = dayplandata[idx] || ''

    wholedaysum = wholedaysum + `
    <div class="day-planner-time">
    <p>${elem}</p>
    <input id = ${idx} type="text" name="" placeholder='....' value = '${saveddata}'>
    </div>`
})

dayplanner.innerHTML = wholedaysum;
let dayplannerinput = document.querySelectorAll('.day-planner input');

dayplannerinput.forEach((elem) => {
    elem.addEventListener('input', () => {
        dayplandata[elem.id] = elem.value;
        localStorage.setItem('dayplandata', JSON.stringify(dayplandata))



    });
});
}
dailyplanner ()