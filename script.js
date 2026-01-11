let opefeature = () => {
    let nav = document.querySelector('nav');
    let allelem = document.querySelectorAll('.elem');
    let fullelempage = document.querySelectorAll('.fullelem');
    let allfullelempagebackbtn = document.querySelectorAll('.fullelem .back');
    let dashboard = document.querySelector('.allelem');

    allelem.forEach((elem) => {
        elem.addEventListener('click', () => {
            dashboard.style.display = 'none';
            fullelempage[elem.id].style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    allfullelempagebackbtn.forEach((back) => {
        back.addEventListener('click', () => {
            fullelempage[back.id].style.display = 'none';
            dashboard.style.display = 'block';
            document.body.style.overflow = 'auto';

        });
    });
};
opefeature();
function goalsFeature() {
  const goalInput = document.querySelector('#goal-input');
  const addGoalBtn = document.querySelector('#add-goal-btn');
  const goalsListBox = document.querySelector('#goals-list');

  if (!goalInput || !addGoalBtn || !goalsListBox) return;

  let goals = JSON.parse(localStorage.getItem('goals')) || [];

  function renderGoals() {
    if (goals.length === 0) {
      goalsListBox.innerHTML = `
        <p class="empty-goals">
          No goals yet  <br />
          Add your first goal
        </p>
      `;
      return;
    }

    let html = '';

    goals.forEach((g, idx) => {
      html += `
        <div class="goal-item">
          <p class="${g.done ? 'done' : ''}">
            ${g.text}
          </p>

          <div class="goal-btns">
            <button class="done-btn" data-id="${idx}">
              ${g.done ? 'Undo' : 'Done'}
            </button>
            <button class="del-btn" data-id="${idx}">
              Delete
            </button>
          </div>
        </div>
      `;
    });

    goalsListBox.innerHTML = html;
    localStorage.setItem('goals', JSON.stringify(goals));

    document.querySelectorAll('.done-btn').forEach(btn => {
      btn.onclick = () => {
        const i = btn.dataset.id;
        goals[i].done = !goals[i].done;
        renderGoals();
      };
    });

    document.querySelectorAll('.del-btn').forEach(btn => {
      btn.onclick = () => {
        const i = btn.dataset.id;
        goals.splice(i, 1);
        renderGoals();
      };
    });
  }

  addGoalBtn.onclick = () => {
    const text = goalInput.value.trim();
    if (!text) return;

    goals.push({ text, done: false });
    goalInput.value = '';
    renderGoals();
  };

  goalInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addGoalBtn.click();
  });

  renderGoals();
}
goalsFeature();
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
    let alltasks = document.querySelector('.alltask');
    let sum = ``;

    currenttask.forEach((e, idx) => {
        const impBadge = e.imp ? `<span class="imp">Imp</span>` : '';

        sum += `
            <div class="task">
                <h5>${e.task}</h5>
                <div class="task-actions">
                    ${impBadge}
                    <button id="${idx}">Mark As Completed</button>
                </div>
            </div>
        `;
    });

    alltasks.innerHTML = sum;
    localStorage.setItem('currenttask', JSON.stringify(currenttask));


    let completetaskbtn = document.querySelectorAll('.task button');
    completetaskbtn.forEach((btn) => {
        btn.addEventListener('click', function () {
            currenttask.splice(btn.id, 1);
            TodoTask();
        });
    });
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
let dailyplanner = () => {
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
dailyplanner()

let motivationalquote = () => {

    let motivationquotes = document.querySelector('.motivation-2 h1')
    let motivationauthor = document.querySelector('.motivation-3 h3')

    let quotes = async () => {
        try {
            let response = await fetch(
                "https://dummyjson.com/quotes/random?tag=motivational",

            );


            let data = await response.json();

            motivationquotes.innerHTML = data.quote
            motivationauthor.innerHTML = "- " + data.author


        } catch (error) {
            console.error("Error fetching quotes:", error);
        }
    };

    quotes();

}
let PomoDomo = () => {
    let startbtn = document.querySelector('.start-btn')
    let resetbtn = document.querySelector('.reset-btn')
    let pausebtn = document.querySelector('.Pause-btn')
    let heading = document.querySelector('.pomo-heading')
    let isworksession = true;
    motivationalquote()
    let maininterval = null;
    let totalsecond = 25 * 60;
    let timer = document.querySelector('.timeh')
    let Updatetimer = () => {
        let minutes = Math.floor(totalsecond / 60)
        let seconds = totalsecond % 60;
        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }
    function starttimer() {
        clearInterval(maininterval)
        if (isworksession) {
            maininterval = setInterval(() => {
                if (totalsecond > 0) {
                    totalsecond--;
                    Updatetimer()
                }
                else {
                    isworksession = false;
                    clearInterval(maininterval)
                    timer.innerHTML = '05:00'
                    heading.innerHTML = "Rest Time 🤩"
                    totalsecond = 25 * 60;
                }

            }, 1000);
        }
        else {
            maininterval = setInterval(() => {
                if (totalsecond > 0) {
                    totalsecond--;
                    Updatetimer()
                }
                else {
                    isworksession = true;
                    clearInterval(maininterval)
                    timer.innerHTML = '25:00';
                    heading.innerHTML = "Focus Time ⏱️"

                    totalsecond = 5 * 60

                }

            }, 1000);
        }

    }
    function pausetimer() {
        clearInterval(maininterval)

    }
    function resettimer() {
        clearInterval(maininterval)
        maininterval = null
        heading.innerHTML = "Focus Time ⏱️"
        totalsecond = 25 * 60
        Updatetimer()

    }
    startbtn.addEventListener('click', starttimer)
    pausebtn.addEventListener('click', pausetimer)
    resetbtn.addEventListener('click', resettimer)
}
PomoDomo()
let header = () => {

    let API_KEY = '751765e0045f4357b15105848252412';
    let city = 'kamptee'
    let time = document.querySelector('.header-time')
    let header = document.querySelector('header')
    let cityyy = document.querySelector('.left h2')
    let temp = document.querySelector('.right h2')
    let kaisa = document.querySelector('.right h3')
    let humadity = document.querySelector('.right .humadity')
    let waqt = document.querySelector('.left h3')
    let wind = document.querySelector('.right .wind')


    let FetchTemp = async () => {
        let raw = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city},IN`)
        const real = await raw.json()
        console.log(real);
        let floortemp = Math.floor(real.current.temp_c)
        temp.innerHTML = `${floortemp}°C`

        if (floortemp > 35) {
            kaisa.innerHTML = `Very Hot 🔥`
        }
        else if (floortemp >= 28 && floortemp < 35) {
            kaisa.innerHTML = "Sunny ☀️";
        }
        else if (floortemp >= 20 && floortemp < 28) {
            kaisa.innerHTML = "Pleasant 🌤️";
        }
        else if (floortemp >= 10 && floortemp < 20) {
            kaisa.innerHTML = "Cool 🌥️";
        }
        else {
            kaisa.innerHTML = "Cold ❄️";
        }
        humadity.innerHTML = `Humadity : ${real.current.humidity}%`
        let windfloor = Math.floor(real.current.wind_kph)
        wind.innerHTML = ` Wind : ${windfloor}km/h `
        cityyy.innerHTML = `${real.location.name} ${real.location.region}`

    }



    FetchTemp()
    const totaldaysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]; const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    let getdaytime = () => {
        let date = new Date()
        let daysOfWeek = totaldaysOfWeek[date.getDay()]
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        let tarikh = date.getDate()
        let month = months[date.getMonth()]
        let year = date.getFullYear()

        if (hours > 12) {
            time.innerHTML = ` ${daysOfWeek} ${String(hours).padStart('2', '0') - 12}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}PM`
        }
        else {
            time.innerHTML = `${daysOfWeek} ${hours}:${minutes}:${seconds}  AM`

        }
        waqt.innerHTML = `${tarikh} ${month} ${year}`

    }



    setInterval(() => {
        getdaytime()

    }, 1000);


}
header()
function ThemeBtnnn() {


    const themeBtn = document.querySelector('#themeBtn');

    const themes = ['cream', 'dark', 'forest'];
    let currentThemeIndex = 0;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.remove('dark', 'forest');
        if (savedTheme !== 'cream') {
            document.body.classList.add(savedTheme);
        }
        currentThemeIndex = themes.indexOf(savedTheme);
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.remove('dark', 'forest');

        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];

        if (newTheme !== 'cream') {
            document.body.classList.add(newTheme);
        }

        localStorage.setItem('theme', newTheme);
    });
}
ThemeBtnnn()