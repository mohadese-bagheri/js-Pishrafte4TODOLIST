
const modal = document.getElementById("taskModal");
const modalTitle = document.getElementById("modalTitle");
const taskTitle = document.getElementById("taskTitle");
const taskTesk = document.getElementById("taskTesk");
const saveBTN = document.getElementById("saveBTN");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


const taskManager = (function () {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    return {
        add(task) {
            tasks.push(task);
            console.log(" current tasks array: ", tasks);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        },
        getAll() {
            return tasks;
        }
    };
})();

// تابع بازکردن پاپ آپ
addTaskBtn.onclick = () => {
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
       date: new Date().toLocaleString("fa-IR")
    };

    taskManager.add(newtask);
    modal.close();

};
