const BASE_URL = "http://localhost:8080"

const formId = document.getElementById("id")
//const formId = document.getElementById("id");
const formLicensePlate = document.getElementById("license-plate");
const formRapairDate = document.getElementById("reparir-date");
const formName = document.getElementById("name");
const formPrice = document.getElementById("price")
const formStatusDamaged = document.getElementById("status-damaged");
const formRepairStatus = document.getElementById("repair-status");
const form = document.getElementById("accessory-form");
const tbody = document.getElementById("accessories");
const loading = document.getElementById("loading");

form.addEventListener("submit", async function(e){
    e.preventDefault();
    await createOrUpdate();
    findAll();
    this.reset();
    //Reset lại cái form: Tức là chưa điền gì
});

findAll();

async function findAll(){
    showLoading();
    const response = await fetch(`${BASE_URL}/api/v1/accessories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const body = await response.json();
    console.log(body);

    showAllAccessories(body.content);
    hideLoading();
}

async function showAllAccessories(accessories){
    tbody.innerHTML="";
    for (const accessory of accessories){
        const row = tbody.insertRow();

        const id = document.createTextNode(accessory.id);
        row.insertCell().appendChild(id);

        // Cách 1:
        const licensePlate = document.createTextNode(accessory.licensePlate);
        row.insertCell().appendChild(licensePlate);
        //Cách 2:
        const repairDate = accessory.repairDate;
        row.insertCell().innerText = repairDate;

        const name = accessory.name;
        row.insertCell().innerText = name;

        row.insertCell().innerText = accessory.price

        row.insertCell().innerText = accessory.statusDamaged;

        row.insertCell().innerText = accessory.repairStatus;

        const btnEdit = document.createElement("button");
        btnEdit.innerText = "🖊️";
        btnEdit.addEventListener("click", function(){
            // formId.value = car.id;
            formId.value = accessory.id;
            formLicensePlate.value = accessory.licensePlate;
            formRapairDate.value = accessory.repairDate;
            formName.value = accessory.name;
            formPrice.value = accessory.price;
            formStatusDamaged.value = accessory.statusDamaged;
            formRepairStatus.value = accessory.repairStatus;
        });

        const btnDelete = document.createElement("button");
        btnDelete.innerText = "❌";
        btnDelete.addEventListener("click", async function(){
            const confirmed = confirm("Do you want to delete this accessory?");
            if (confirmed) {
                showLoading();
                await deleteById(accessory.id);
                tbody.removeChild(row);
                hideLoading();
            }
        });
        row.insertCell().append(btnEdit, btnDelete);
        //append: Thêm 2 cái vào 1 lúc thì dùng append
        //appendChild: Thêm 1 cái
    }
}

async function createOrUpdate(){
    const id = formId.value;
    const url = id ? `${BASE_URL}/api/v1/accessories/${id}` : `${BASE_URL}/api/v1/accessories`
    // có id thì sẽ đường dẫn update không thì create
    const method = id ? "PUT" : "POST"
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: formId.value,
            licensePlate: formLicensePlate.value,
            repairDate: formRapairDate.value,
            name: formName.value,
            price: formPrice.value,
            statusDamaged: formStatusDamaged.value,
            repairStatus: formRepairStatus.value
        })
    });
    const body = await response.json();
    console.log(body);
}

async function deleteById(id){
    const response = await fetch(`${BASE_URL}/api/v1/accessories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    //const body = await response.json();
    //console.log(body);
}

function showLoading(){
    loading.style.display = "flex";
}

function hideLoading(){
    setTimeout(function(){
        loading.style.display = "none";
    }, Math.random() * 2000);
}