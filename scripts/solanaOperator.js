(function (EXPORTS) { //ethOperator v1.0.2
  /* ETH Crypto and API Operator */
  if (!window.solanaWeb3)
    return console.error('solanaWeb3.js not found')
  const solanaOperator = EXPORTS;

var LAMPORTS_PER_SOL = solanaWeb3.LAMPORTS_PER_SOL;
var Connection = solanaWeb3.Connection;
var Keypair = solanaWeb3.Keypair;
var PublicKey = solanaWeb3.PublicKey;


// connection
var connection2 = new Connection("https://api.mainnet-beta.solana.com");
var connection1 = new Connection("https://api.devnet.solana.com");
var connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/eGlqff46aavgPpH3dZ3DbLTJAWc4JNoP");



  const isValidAddress = solanaOperator.isValidAddress = function (address){
    try {
        let pubkey = new PublicKey(address)
        let  isSolana =  PublicKey.isOnCurve(pubkey.toBuffer())
        return isSolana
    } catch (error) {
        return false
    }
} 



/*  const getBalance = ethOperator.getBalance = async (address) => {
    try {
      if (!address || !isValidAddress(address))
        return new Error('Invalid address');
      // Get the balance
      const provider = getProvider();
      const balanceWei = await provider.getBalance(address);
      const balanceEth = parseFloat(ethers.utils.formatEther(balanceWei));
      return balanceEth;
    } catch (error) {
      console.error('Error:', error.message);
      return error;
    }
  }
  const getTokenBalance = ethOperator.getTokenBalance = async (address, token, { contractAddress } = {}) => {
    try {
      // if (!window.ethereum.isConnected()) {
      //   await connectToMetaMask();
      // }
      if (!token)
        return new Error("Token not specified");
      if (!CONTRACT_ADDRESSES[token] && contractAddress)
        return new Error('Contract address of token not available')
      const usdcContract = new ethers.Contract(CONTRACT_ADDRESSES[token] || contractAddress, ERC20ABI, getProvider());
      let balance = await usdcContract.balanceOf(address);
      balance = parseFloat(ethers.utils.formatUnits(balance, 6)); // Assuming 6 decimals
      return balance;
    } catch (e) {
      console.error(e);
    }
  }

  const estimateGas = ethOperator.estimateGas = async ({ privateKey, receiver, amount }) => {
    try {
      const provider = getProvider();
      const signer = new ethers.Wallet(privateKey, provider);
      return provider.estimateGas({
        from: signer.address,
        to: receiver,
        value: ethers.utils.parseUnits(amount, "ether"),
      });
    } catch (e) {
      throw new Error(e)
    }
  }

  const sendTransaction = ethOperator.sendTransaction = async ({ privateKey, receiver, amount }) => {
    try {
      const provider = getProvider();
      const signer = new ethers.Wallet(privateKey, provider);
      const limit = await estimateGas({ privateKey, receiver, amount })
      // Creating and sending the transaction object
      return signer.sendTransaction({
        to: receiver,
        value: ethers.utils.parseUnits(amount, "ether"),
        gasLimit: limit,
        nonce: signer.getTransactionCount(),
        maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei"),
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  const sendToken = ethOperator.sendToken = async ({ token, privateKey, amount, receiver, contractAddress }) => {
    // Create a wallet using the private key
    const wallet = new ethers.Wallet(privateKey, getProvider());
    // Contract interface
    const tokenContract = new ethers.Contract(CONTRACT_ADDRESSES[token] || contractAddress, ERC20ABI, wallet);
    // Convert the amount to the smallest unit of USDC (wei)
    const amountWei = ethers.utils.parseUnits(amount.toString(), 6); // Assuming 6 decimals for USDC

    // Call the transfer function on the USDC contract
    return tokenContract.transfer(receiver, amountWei)
  }*/

})('object' === typeof module ? module.exports : window.solanaOperator = {});