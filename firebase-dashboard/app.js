// Firebase কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyCpVxxiCCzaAHN9AB2eo3B18YH4TILKErQ",
    authDomain: "fir-control-app-c2604.firebaseapp.com",
    databaseURL: "https://fir-control-app-c2604-default-rtdb.firebaseio.com",
    projectId: "fir-control-app-c2604",
    storageBucket: "fir-control-app-c2604.firebasestorage.app",
    messagingSenderId: "944294118127",
    appId: "1:944294118127:web:7348dd87adb5157335d11a"
};

// Firebase ইনিশিয়ালাইজ
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM এলিমেন্ট
const btnRefresh = document.getElementById('btnRefresh');
const btnSendCommand = document.getElementById('btnSendCommand');
const commandInput = document.getElementById('commandInput');
const dataList = document.getElementById('dataList');

// ডেটা রিফ্রেশ ফাংশন
function refreshData() {
    database.ref('AppData').on('value', (snapshot) => {
        dataList.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const dataItem = document.createElement('div');
            dataItem.className = 'data-item';
            dataItem.innerHTML = `
                <p><strong>মেসেজ:</strong> ${data.message}</p>
                <p><small>${new Date(data.timestamp).toLocaleString()}</small></p>
            `;
            dataList.appendChild(dataItem);
        });
    });
}

// কমান্ড পাঠানোর ফাংশন
function sendCommand() {
    const command = commandInput.value;
    if (command) {
        database.ref('Commands').push().set({
            command: command,
            timestamp: Date.now()
        });
        commandInput.value = '';
        alert('কমান্ড পাঠানো হয়েছে!');
    }
}

// ইভেন্ট লিসেনার
btnRefresh.addEventListener('click', refreshData);
btnSendCommand.addEventListener('click', sendCommand);

// প্রাথমিক লোড
refreshData();
