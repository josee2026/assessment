"use strict";

console.log("3" + 4 + 5);
console.log(3 + 4 + "5");
console.log("20" / "4");
console.log(null ?? "none");
console.log("" || "empty");
console.log(typeof undefined);
console.log(Boolean("0"));
console.log("Rwanda".slice(1, 4));

const memberNames = ["Aline", "Eric", "Grace"];
let totalEric = 0;

for (let i = 0; i < memberNames.length; i++) {
  if (memberNames[i] === "Eric") {
    totalEric += 1;
  }
}

console.log(`Found ${totalEric}`);

const rawName = " uwase GRACE ";
const phone = "0788123456";
const monthlySaving = "15000";

const nameParts = rawName.trim().toLowerCase().split(" ");

const firstName = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1);

const lastName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);

console.log(`Full name: ${firstName} ${lastName}`);
console.log(`Initials: ${firstName[0]}.${lastName[0]}.`);
console.log(`Masked phone: ${phone.slice(0, 3)}****${phone.slice(-3)}`);

console.log(`Before conversion: ${typeof monthlySaving}`);

const monthlySavingNumber = Number(monthlySaving);

console.log(`After conversion: ${typeof monthlySavingNumber}`);

const yearlySaving = monthlySavingNumber * 12;
const yearlyInterest = yearlySaving * 0.05;

console.log(`Yearly saving: ${yearlySaving.toLocaleString("en-US")} RWF`);
console.log(`Yearly interest: ${yearlyInterest.toLocaleString("en-US")} RWF`);

const members = [
  { name: "Aline", level: "G", contributions: [20000, 20000, 15000, 25000] },
  { name: "Eric", level: "S", contributions: [10000, 5000, 10000, 5000] },
  { name: "Grace", level: "B", contributions: [] },
  { name: "Jean", level: "S", contributions: [15000, 15000, 15000, 15000] },
  { name: "Diane", level: "G", contributions: [30000, 25000, 20000, 30000] },
  { name: "Patrick", level: "B", contributions: [5000, 10000, 5000, 0] },
];

function formatRwf(amount) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    return "Invalid";
  }

  return `${Math.round(amount).toLocaleString("en-US")} RWF`;
}

function maskPhone(phoneNumber) {
  if (
    typeof phoneNumber !== "string" ||
    phoneNumber.length !== 10 ||
    !phoneNumber.startsWith("07")
  ) {
    return "Invalid";
  }

  return `${phoneNumber.slice(0, 3)}****${phoneNumber.slice(-3)}`;
}

function memberTotal(contributions) {
  if (!Array.isArray(contributions)) {
    return 0;
  }

  let total = 0;

  for (let i = 0; i < contributions.length; i++) {
    const amount = contributions[i];

    if (typeof amount !== "number" || !Number.isFinite(amount)) {
      return 0;
    }

    total += amount;
  }

  return total;
}

function getStatus(total) {
  if (typeof total !== "number" || !Number.isFinite(total) || total < 0) {
    return "Invalid";
  }

  if (total >= 60000) {
    return "On track";
  } else if (total >= 30000) {
    return "Behind";
  } else {
    return "At risk";
  }
}

function loanLimit(total, multiplier = 3) {
  if (
    typeof total !== "number" ||
    !Number.isFinite(total) ||
    total < 0 ||
    typeof multiplier !== "number" ||
    !Number.isFinite(multiplier) ||
    multiplier < 0
  ) {
    return 0;
  }

  return Math.min(total * multiplier, 500000);
}

const isOnTrack = (total) => getStatus(total) === "On track";

function countMembers(list, test) {
  if (!Array.isArray(list) || typeof test !== "function") {
    return 0;
  }

  let count = 0;

  for (let i = 0; i < list.length; i++) {
    if (!list[i] || !Array.isArray(list[i].contributions)) {
      continue;
    }

    const total = memberTotal(list[i].contributions);

    if (test(total)) {
      count++;
    }
  }

  return count;
}

function printReport(list) {
  if (!Array.isArray(list)) {
    return 0;
  }

  let groupTotal = 0;
  let onTrackCount = 0;
  let topSaver = null;
  let topTotal = -1;

  console.log("===== IKIMINA SAVINGS REPORT =====");

  for (let i = 0; i < list.length; i++) {
    const member = list[i];

    if (!member || !Array.isArray(member.contributions)) {
      continue;
    }

    if (member.contributions.length === 0) {
      console.log(`${member.name}: no contributions yet.`);
      continue;
    }

    const total = memberTotal(member.contributions);
    groupTotal += total;

    const status = getStatus(total);

    if (status === "On track") {
      onTrackCount++;
    }

    let levelName;

    switch (member.level) {
      case "G":
        levelName = "Gold";
        break;
      case "S":
        levelName = "Silver";
        break;
      case "B":
        levelName = "Bronze";
        break;
      default:
        levelName = "Unknown";
    }

    console.log(
      `${member.name} (${levelName}): ${formatRwf(total)}, ${status}`,
    );

    let bar = "";

    for (let star = 0; star < Math.floor(total / 10000); star++) {
      bar += "*";
    }

    console.log(bar);

    if (total > topTotal) {
      topTotal = total;
      topSaver = member;
    }
  }

  console.log(`Group total: ${formatRwf(groupTotal)}`);
  console.log(`Members On track: ${onTrackCount}`);

  if (topSaver !== null) {
    console.log(`Top saver: ${topSaver.name} (${formatRwf(topTotal)})`);
  } else {
    console.log("Top saver: None");
  }

  const goal = 1000000;
  const weeklyAddition = groupTotal / 4;
  let currentAmount = groupTotal;
  let weeks = 0;

  if (weeklyAddition > 0) {
    while (currentAmount < goal) {
      currentAmount += weeklyAddition;
      weeks++;
    }
  }

  console.log(`Weekly addition: ${formatRwf(weeklyAddition)}`);
  console.log(`Weeks to reach goal: ${weeks}`);

  return groupTotal;
}

printReport(members);

function check(actual, expected) {
  console.log(
    actual === expected ? "pass" : `FAIL: got ${actual}, expected ${expected}`,
  );
}

check(formatRwf(15000), "15,000 RWF");
check(formatRwf(0), "0 RWF");
check(formatRwf("hello"), "Invalid");

check(maskPhone("0788123456"), "078****456");
check(maskPhone("0700000000"), "070****000");
check(maskPhone("12345"), "Invalid");

check(memberTotal([5000, 5000]), 10000);
check(memberTotal([]), 0);
check(memberTotal("invalid"), 0);

check(getStatus(60000), "On track");
check(getStatus(30000), "Behind");
check(getStatus(-5), "Invalid");

check(loanLimit(80000), 240000);
check(loanLimit(240000), 500000);
check(loanLimit(-5), 0);

check(isOnTrack(60000), true);
check(isOnTrack(59999), false);
check(isOnTrack(-5), false);

check(countMembers(members, isOnTrack), 3);
check(countMembers([], isOnTrack), 0);
check(countMembers(null, isOnTrack), 0);

check(printReport([members[0]]), 80000);
check(printReport([]), 0);
check(printReport(null), 0);
