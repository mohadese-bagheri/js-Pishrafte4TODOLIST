
const modal = document.getElementById("taskModal");
const modalTitle = document.getElementById("modalTitle");
const taskTitle = document.getElementById("taskTitle");
const taskTesk = document.getElementById("taskTesk");
const saveBTN = document.getElementById("saveBTN");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


const taskManager = (function () {
    // مدیریت مقادیر فضای ذخیره سازی
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    function save() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // تعریف توابع برای کار با آرایه
    return {
        get: () => tasks,
        add: (task) => { tasks.push(task); save(); },
        remove: (index) => { tasks.splice(index, 1); save(); },
        update: (index , task) =>{ tasks[index]=task; save();},
        complete: (index,bool) => { 
            tasks[index].complete = bool ? bool : 0; save();
        }
    };
})();

// متغیر برای ویرایش تسک
let editIndex = null;


// تابع بازکردن پاپ آپ
addTaskBtn.onclick = () => {
    editIndex=null;
    modalTitle.innerText = "سلاااام ";
    taskTitle.value = "";
    taskTesk.value = "";
    modal.showModal();
}

saveBTN.onclick = (e) => {
    e.preventDefault();


    if (!taskTitle.value.trim() || !taskTesk.value.trim()) {
        alert("لطفا عنوان و توضیحات را وارد کنید");
        return;
    }
    const newtask = {
        title: taskTitle.value.trim(),
        text: taskTesk.value.trim(),
        date: new Date().toLocaleString("fa-IR"),
        complete : 0
    };
    if (editIndex !== null) taskManager.update(editIndex,newtask);
    else taskManager.add(newtask);
        
    
    modal.close();
    render();
};

// تابع ویرایش تسک
window.editTask = (i) => {
    editIndex= i;
    const t = taskManager.get()[i];
    modalTitle.textContent = "ویرایش تسک";
    taskTitle.value = t.title;
    taskTesk.value = t.text;
    modal.showModal();
};


// تابع حذف تسک
const deleteTask = (i) => {
    taskManager.remove(i);
    render();
}

// تابع وضعیت کامل بودن تسک 
const completeTask=( i , bool) =>{
    console.log(i);
    taskManager.complete(i , bool);
    render();

}
render();

function render() {
    taskList.innerHTML = "";
    taskManager.get().forEach((task, i) => {

        const li = document.createElement("li");

        // اگر تسک کامل شده بود کلاس اضافه شود
        li.className=task.complete === 1 ? "completed" : task.complete 
        === 2 ? "not_completed" : "" ;


        li.innerHTML = `
        <div class="task_header">
            <span class="task_title">${task.title}</span>
                <div class="task_actions"> 
                    <button class="yellow fs-2x shadow" title="ویرایش" onclick="editTask(${i})">&#9998; </button>
                    <button class="red fs-2x shadow" title="حذف" onclick="deleteTask(${i})">&#x1F5D1; </button>
                    <button class="green fs-2x shadow" title="تکمیل" onclick="completeTask(${i},1)">&#x2611; </button>
                    <button class="orange fs-2x shadow" title="عدم تکمیل" onclick="completeTask(${i},2)">&#10006; </button>

                </div>
        </div>
        <div>${task.text}</div>
        <div class="task-date">${task.date}</div>
        `;
        taskList.appendChild(li);
    });
}
