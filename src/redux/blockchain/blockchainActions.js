// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
import { fetchData } from "../data/dataActions";
import provider from '../../walletConnect';

const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST",
    };
};

const connectSuccess = (payload) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload,
    };
};

const connectFailed = (payload) => {
    return {
        type: "CONNECTION_FAILED",
        payload: payload,
    };
};

const updateAccountRequest = (payload) => {
    return {
        type: "UPDATE_ACCOUNT",
        payload: payload,
    };
};

export const connect = (walletType) => {
    return async(dispatch) => {
        dispatch(connectRequest());
        const abiResponse = await fetch("/config/abi.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const abi = await abiResponse.json();
        const configResponse = await fetch("/config/config.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const CONFIG = await configResponse.json();
        const { ethereum } = window;
        // const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        // if (metamaskIsInstalled) {
        if (walletType === 'metamask') {
            Web3EthContract.setProvider(ethereum);
            const web3 = new Web3(window.ethereum);
            try {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                const networkId = await ethereum.request({
                    method: "net_version",
                });
                if (networkId == CONFIG.NETWORK.ID) {
                    const SmartContractObj = new Web3EthContract(
                        abi,
                        CONFIG.CONTRACT_ADDRESS
                    );
                    dispatch(
                        connectSuccess({
                            account: accounts[0],
                            smartContract: SmartContractObj,
                            web3: web3,
                        })
                    );
                    // Add listeners start
                    ethereum.on("accountsChanged", (accounts) => {
                        dispatch(updateAccount(accounts[0]));
                    });
                    ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });
                } else {
                    dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
                }
            } catch (err) {
                dispatch(connectFailed("Something went wrong."));
            }
        } else {
            // dispatch(connectFailed("Install Metamask."));
            try {
                // provider must be in try, since modal closing will throw error
                await provider.enable();
                Web3EthContract.setProvider(provider);
                //  Create Web3 instance
                const web3 = new Web3(provider);

                const accounts = provider.accounts;

                const SmartContractObj = new Web3EthContract(
                    abi,
                    CONFIG.CONTRACT_ADDRESS
                );
                dispatch(
                    connectSuccess({
                        account: accounts[0],
                        smartContract: SmartContractObj,
                        web3: web3,
                    })
                );
                // Add listeners start
                // Subscribe to accounts change
                provider.on('accountsChanged', (accounts) => {
                    console.log(accounts);
                });

                // Subscribe to chainId change
                provider.on('chainChanged', (chainId) => {
                    console.log(chainId);
                });

                // Subscribe to session disconnection
                provider.on('disconnect', (code, reason) => {
                    console.log(code, reason);
                });
            } catch (err) {
                console.log(err);
                window.location.reload();
                dispatch(connectFailed("Something went wrong."));
            }
        }
    };
};

export const updateAccount = (account) => {
    return async(dispatch) => {
        dispatch(updateAccountRequest({ account: account }));
        dispatch(fetchData(account));
    };
};