
const connectBtn = document.getElementById("connectBtn");
const incBtn = document.getElementById("incBtn");
const decBtn = document.getElementById("decBtn");
const setDataBtn = document.getElementById("setDataBtn");
const dataDisplay = document.getElementById("dataDisplay");
dataDisplay.innerHTML = "0";
let web3; // Declare a variable for the web3 instance
let contract; // Declare a variable for the contract instance

//contract url for reference
//https://github.com/kals-slak/Dapp-demo/blob/main/sample.sol

connectBtn.addEventListener("click", async () => {
  if (window.ethereum) { // Check for Metamask
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      
      connectBtn.disabled = true;
      setDataBtn.disabled = false;
      incBtn.disabled = false;
      decBtn.disabled = false;
      

      // Create a contract instance using the ABI and contract address
      const contractAddress = "0x61f50d191D70854f613B329988d86cA44b771b26"; // Replace with the actual address
      const ABI = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "dec",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "inc",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_count",
              "type": "uint256"
            }
          ],
          "name": "setCount",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]; //add your contract abi
      contract = new web3.eth.Contract(ABI, contractAddress);
      connectBtn.textContent = "Connected";
      console.log("Successfully connected");
    } catch (error) {
      console.error(error);
      connectBtn.textContent = "Error Connected";
      alert("Error connecting to Metamask!");
    }
  } else {
    alert("Please install Metamask!");
  }
});
async function getData(){
    try{
        const data = await contract.methods.getCount().call();
        dataDisplay.textContent = data;
    }catch(error){
        alert("Error in getting the data");
        console.log(error);
    }
} 
setDataBtn.addEventListener("click", async () => {
    
    try {
    const dataToSet = document.getElementById("datatoSetIP").value;
    const transaction = await contract.methods.setCount(dataToSet).send({
      from: window.ethereum.selectedAddress,
    });
    console.log(JSON.stringify(transaction));
    console.log("Transaction hash:", transaction.transactionHash);
    getData();
    alert("Greeting successfully set!");
    
  } catch (error) {
    console.error(error);
    alert("Error setting greeting!");
  }
});

incBtn.addEventListener("click", async () => {
    alert("incin");
    try{
        await contract.methods.inc().send({
            from: window.ethereum.selectedAddress,
        });
        getData();
    }catch(error){
        console.log(error);
        alert("Error in incrementing");
    }

});

decBtn.addEventListener("click", async () => {
    alert("incin");
    try{
        await contract.methods.dec().send({
            from: window.ethereum.selectedAddress,
        });
        getData();
    }catch(error){
        console.log(error);
        alert("Error in decrementing");
    }
});

