import { useState, useCallback } from 'react';
import { OKXUniversalConnectUI, THEME } from '@okxconnect/ui';

const useDailyClaim = () => {
  const [walletAddress, setWalletAddress] = useState('');

  const initializeUi = useCallback(async () => {
    console.log('step01_initializeUi');
    const Ui = await OKXUniversalConnectUI.init({
      dappMetaData: {
        icon: 'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.pngpek160114_273',
        name: 'OKX Connect Demo',
      },
      actionsConfiguration: {
        returnStrategy: 'tg://resolve',
        modals: 'all',
        tmaReturnUrl: 'back',
      },
      language: 'en_US',
      uiPreferences: {
        theme: THEME.DARK,
      },
    });
    return Ui;
  }, []);

  const openWallet = useCallback(async (Ui: OKXUniversalConnectUI) => {
    console.log('step02_connectWallet');
    if (!Ui) {
      console.log('OKXUniversalConnectUI is not ready');
      return null;
    }

    const info = await Ui.openModal({
      namespaces: {
        eip155: {
          chains: ['eip155:534351'], // Scroll Testnet
          defaultChain: '534351',
        },
      },
    });
    if (info) {
      const [namespace, chainId, address] = info.namespaces['eip155'].accounts[0].split(':');
      setWalletAddress(`${address.slice(0, 6)}...`);
      return { Ui, address };
    }
    return null;
  }, []);

  const sendTransaction = useCallback(async (Ui: OKXUniversalConnectUI, address: string | null, value: number) => {
    console.log('step03_sendTransaction');

    if (!Ui) {
      console.log('OKXUniversalConnectUI is not ready');
      return null;
    }

    if (!address) {
      console.log('address is not ready');
      return null;
    }

    const data = {
      method: 'eth_sendTransaction',
      params: [
        {
          to: '0x8c2F7a450F4Cc6E9a86Ef6158E0823E08502bf6f', // Contract address
          from: address, // Connected wallet address
          gas: '0x76c0', // Gas limit
          // value: '0x', // No transfer value
          value: value.toString(16),
          data: '0x2a46f2e8', // setUserDailyInfo function selector
          gasPrice: '0x3B9ACA00', // Gas price
        },
      ],
    };

    const result = await Ui.request(data, 'eip155:534351');
    return result;
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      const Ui = await initializeUi();
      const walletData = await openWallet(Ui);
      if (walletData) {
        return walletData; // Ui와 address를 함께 반환
      }
      return null; // 지갑 연결 실패 시 null 반환
    } catch (error) {
      console.error('Error during wallet connection:', error);
      return null;
    }
  }, [initializeUi, openWallet]);

  return { walletAddress, connectWallet, sendTransaction };
};

export default useDailyClaim;
