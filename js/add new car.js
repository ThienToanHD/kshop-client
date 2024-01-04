const BASE_URL = "http://localhost:8080"

const formLicensePlate = document.getElementById("license-plate");
const formRapairDate = document.getElementById("reparir-date");
const formCustomerName = document.getElementById("customer-name");
const formCatalog = document.getElementById("catalog");
const formCarMaker = document.getElementById("car-maker");
const form = document.getElementById("car-create-form");

form.addEventListener("submit", async function(e){
    e.preventDefault();
    await create();
    this.reset();
});

// async : Bất đồng bộ tức là code chạy song song
// await : Đồng bộ tức là code chạy tuần tự từ trên xuống dưới
async function create(){
    const response = await fetch(`${BASE_URL}/api/v1/cars`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            licensePlate: formLicensePlate.value,
            repairDate: formRapairDate.value,
            customerName: formCustomerName.value,
            catalogs: formCatalog.value,
            carMaker: formCarMaker.value
        })
    });
    const body = await response.json();
    console.log(body);
}

