import "../styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import merge from "lodash.merge";
import { PropsWithChildren } from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  lightTheme,
  Theme,
  AvatarComponent,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  metaMaskWallet,
  walletConnectWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { hardhat, mainnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { Layout } from "../components/Layout";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [/*mainnet, hardhat, */ goerli],
  [
    alchemyProvider({ apiKey: "QyiSTMa1bLxzr_kdgR9ny45dhbwEHUtP" }),
    publicProvider(),
  ]
);

const { wallets } = getDefaultWallets({
  appName: "The BEEF Series by 0xfff",
  chains,
});

const appInfo = {
  appName: "The BEEF Series by 0xfff",
  // learnMoreUrl: 'https://Beef.codes'
};

const connectors = connectorsForWallets([
  // ...wallets,
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains }),
      argentWallet({ chains }),
      trustWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
  {
    groupName: "Advanced",
    wallets: [injectedWallet({ chains })],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function NoSSR({ children }: PropsWithChildren) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

const theme: Theme = merge(
  lightTheme({
    borderRadius: "none",
  }),
  {
    colors: {
      accentColor: "black",
      closeButtonBackground: "white",
      connectButtonBackground: "white",
      connectButtonInnerBackground: "white",
      modalBackground: "white",

      profileForeground: "white",

      actionButtonSecondaryBackground: "white",

      actionButtonBorder: "rgba(0, 0, 0, 0)",
      actionButtonBorderMobile: "rgba(0, 0, 0, 0)",
      generalBorder: "rgba(0, 0, 0, 0.1)",
      generalBorderDim: "rgba(0, 0, 0, 0.1)",
    },
    fonts: {
      body: "Helvetica",
    },
    radii: {
      actionButton: "0",
      connectButton: "0",
      menuButton: "0",
      modal: "0",
      modalMobile: "0",
    },
    shadows: {
      connectButton: "none",
      dialog: "none",
      profileDetailsAction: "none",
      selectedOption: "none",
      selectedWallet: "none",
      walletLogo: "none",
    },
  }
);

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <div
      style={{
        backgroundColor: "black",
        backgroundSize: "50% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        borderRadius: 999,
        height: size,
        width: size,
      }}
    >
      {/* :^) */}
    </div>
  );
};

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        appInfo={appInfo}
        chains={chains}
        theme={theme}
        showRecentTransactions={true}
        modalSize="compact"
        avatar={CustomAvatar}
      >
        <NoSSR>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NoSSR>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
