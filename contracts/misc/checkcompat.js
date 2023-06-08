// 14-15: check mutually compatible addresses of hardhat
var accounts = ['f39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
'70997970C51812dc3A010C7d01b50e0d17dc79C8',
'3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
'90F79bf6EB2c4f870365E785982E1f101E93b906',
'15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
'9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
'976EA74026E726554dB657fA54763abd0C3a0aa9',
'14dC79964da2C08b23698B3D3cc7Ca32193d9955',
'23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
'a0Ee7A142d267C1f36714E4a8F75612F20a79720',
'Bcd4042DE499D14e55001CcbB24a551F3b954096',
'71bE63f3384f5fb98995898A86B02Fb2426c5788',
'FABB0ac9d68B0B445fB7357272Ff202C5651694a',
'1CBd3b2770909D4e10f157cABC84C7264073C9Ec',
'dF3e18d64BC6A983f673Ab319CCaE4f1a57C7097',
'cd3B766CCDd6AE721141F452C550Ca635964ce71',
'2546BcD3c84621e976D8185a91A922aE77ECEc30',
'bDA5747bFD65F08deb54cb465eB87D40e51B197E',
'dD2FD4581271e230360230F9337D5c0430Bf44C0',
'8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'];
for (let i = 0; i < accounts.length; i++) {
    const a = accounts[i];
    for (let j = 0; j < accounts.length; j++) {
        const b = accounts[j];
        for (let k = 0; k < 40; k++) {
            if (accounts[i].toLowerCase().charAt(k) == accounts[j].toLowerCase().charAt(k)) {
                break;
            }
            if (k == 39) {
                console.log(i, 'and', j, 'are compatible')
            }
        }
    }
}

// Result:
// 0 and 13 are compatible
// 0 and 16 are compatible
// 1 and 2 are compatible
// 1 and 8 are compatible
// 2 and 1 are compatible
// 2 and 18 are compatible
// 3 and 15 are compatible
// 3 and 18 are compatible
// 4 and 5 are compatible
// 4 and 18 are compatible
// 5 and 4 are compatible
// 5 and 14 are compatible
// 6 and 10 are compatible
// 7 and 16 are compatible
// 8 and 1 are compatible
// 8 and 9 are compatible
// 9 and 8 are compatible
// 10 and 6 are compatible
// 10 and 11 are compatible
// 10 and 15 are compatible
// 11 and 10 are compatible
// 11 and 18 are compatible
// 12 and 14 are compatible
// 13 and 0 are compatible
// 14 and 5 are compatible
// 14 and 12 are compatible
// 15 and 3 are compatible
// 15 and 10 are compatible
// 16 and 0 are compatible
// 16 and 7 are compatible
// 16 and 17 are compatible
// 17 and 16 are compatible
// 18 and 2 are compatible
// 18 and 3 are compatible
// 18 and 4 are compatible
// 18 and 11 are compatible