const { expect } = require("chai");

async function assertErrorMessage(
  p,
  message
) {
  return p.then(
    (value) => {
      expect.fail(`Found value or tx instead of error ${message}: ${value?.value} / ${value?.hash}`);
    },
    (reason) => {
      expect(reason.message).to.contain(message);
    }
  );
}

module.exports = {
  assertErrorMessage
}
