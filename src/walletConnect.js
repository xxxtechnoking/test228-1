import WalletConnectProvider from '@walletconnect/web3-provider';

//  Create WalletConnect Provider
export const provider = new WalletConnectProvider({
    infuraId: "f94edb01fd074eea92eb645a7798f254",
});

export default provider;