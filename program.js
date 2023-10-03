const LOOKUP = {
  PENNY: 1,
  NICKEL: 5,
  DIME: 10,
  QUARTER: 25,
  ONE: 100,
  FIVE: 500,
  TEN: 1000,
  TWENTY: 2000,
  "ONE HUNDRED": 10000
}

function checkCashRegister(price, cash, cid) {

  const changeDue = cash - price;
  let changeDueCents = changeDue * 100;
  console.log(changeDueCents);

  const cashAvailable = cid.reduce((accumulator, billType) => {
    return accumulator + billType[1] * 100;
    }, 0);
  //console.log(cashAvailable);

  if(cashAvailable === changeDueCents) {
    return {status: "CLOSED", change: cid};
  }

  const change = cid.reverse().map(([name, amount]) => {
    let total = 0;
    const nameValue = LOOKUP[name];
    let amountCents = amount * 100;
    while(nameValue <= changeDueCents && amountCents > 0) {
      total += nameValue;
      changeDueCents -= nameValue;
      amountCents -= nameValue;
      console.log(amountCents);
    }
    return [name, total / 100];
  }).filter(([, amount]) => amount > 0);
  console.log(change);

  const changeTotal = change.reduce((accumulator, [, amount]) => {
    return accumulator + amount;
  }, 0.00)

  console.log(changeTotal);

  if(changeTotal < changeDue) {
    return{status: "INSUFFICIENT_FUNDS", change: []};
  };

  return {status: "OPEN", change: change};
}

console.log(checkCashRegister(19.5, 
                  20, 
                  [
                    ["PENNY", 1.01], 
                    ["NICKEL", 2.05], 
                    ["DIME", 3.1], 
                    ["QUARTER", 4.25], 
                    ["ONE", 90], 
                    ["FIVE", 55], 
                    ["TEN", 20], 
                    ["TWENTY", 60], 
                    ["ONE HUNDRED", 100]
                  ]));
