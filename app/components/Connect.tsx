import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Connect = () => {
  return (
    <ConnectButton
      accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'avatar'
      }}
      chainStatus="name"
      showBalance={{
        smallScreen: false,
        largeScreen: false,
      }}
    />
  )
}
