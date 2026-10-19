1. `"3" + 4 + 5`  
   Output: `"345"`  
   Explanation: JavaScript combines the values from left to right because the first value is a string.

2. `3 + 4 + "5"`  
   Output: `"75"`  
   Explanation: JavaScript adds 3 and 4 first, then combines the result with the string "5".

3. `"20" / "4"`  
   Output: `5`  
   Explanation: The division operator converts numeric strings into numbers.

4. `null ?? "none"`  
   Output: `"none"`  
   Explanation: The nullish coalescing operator returns the right-hand value when the left-hand value is null or undefined.

5. `"" || "empty"`  
   Output: `"empty"`  
   Explanation: An empty string is falsy, so the OR operator returns "empty".

6. `typeof undefined`  
   Output: `"undefined"`  
   Explanation: The typeof operator returns "undefined" for an undefined value.

7. `Boolean("0")`  
   Output: `true`  
   Explanation: A non-empty string is truthy in JavaScript.

8. `"Rwanda".slice(1, 4)`  
   Output: `"wan"`  
   Explanation: The slice method starts at index 1 and stops before index 4.

### A2. Find and Fix the Bugs

The original code has the following bugs:

1. The variable total is not initialized. It should start at zero.
2. The loop starts at index 1, skipping the first member. It should start at index 0.
3. The condition uses `i <= members.length`, which can access an invalid array index. It should use `i < members.length`.
4. The condition `members[i] = "Eric"` assigns a value instead of comparing it. It should use `members[i] === "Eric"`.
5. `total + 1` does not update the counter. It should use `total += 1`.
6. `Console.log` has incorrect capitalization. It should be `console.log`.
7. `Total` does not match the variable `total` because JavaScript is case-sensitive.

Corrected code:

```javascript
const members = ["Aline", "Eric", "Grace"];
let total = 0;

for (let i = 0; i < members.length; i++) {
  if (members[i] === "Eric") {
    total += 1;
  }
}

console.log(`Found ${total}`);
```

Expected output:

`Found 1`

### A3. Short Answers

1. What is the difference between let and const?

   `let` allows a variable to be reassigned, while `const` prevents reassignment of the variable binding. I use `const` by default and `let` when a value must change.

2. Why should a function usually return a value instead of using console.log inside it?

   Returning a value allows other parts of the program to reuse it, perform calculations, and test it. `console.log()` only displays information.

3. When do you use for...of and for...in?

   I use `for...of` to iterate over values in an array or another iterable. I use `for...in` to iterate over enumerable property keys of an object.

## Part B: Variables, Strings and Numbers

Expected results:

- Full name: Grace Uwase
- Initials: G.U.
- Masked phone: 078\*\*\*\*456
- Type before conversion: string
- Type after conversion: number
- Yearly saving: 180,000 RWF
- Yearly interest at 5%: 9,000 RWF

The monthly saving is converted from a string to a number using `Number()` before calculations are performed.

## Part C: Conditions and Loops

Expected member totals and statuses:

- Aline: 80,000 RWF — On track
- Eric: 30,000 RWF — Behind
- Grace: no contributions yet
- Jean: 60,000 RWF — On track
- Diane: 105,000 RWF — On track
- Patrick: 20,000 RWF — At risk

Group summary:

- Group total: 295,000 RWF
- Members On track: 3
- Top saver: Diane (105,000 RWF)
- Weekly addition: 73,750 RWF
- Weeks to reach 1,000,000 RWF: 10 weeks

The program uses loops to calculate totals, conditions to assign statuses, a switch statement to convert membership levels, and a nested loop to print star bars.

## Part D: Functions and Problem-Solving

The program contains these eight functions:

1. `formatRwf(amount)` formats a rounded amount with thousands separators and RWF.
2. `maskPhone(phone)` masks a valid phone number or returns "Invalid".
3. `memberTotal(contributions)` calculates the sum using a loop.
4. `getStatus(total)` returns the savings status or "Invalid" for a negative number.
5. `loanLimit(total, multiplier = 3)` calculates the loan limit, capped at 500,000 RWF.
6. `isOnTrack(total)` returns true when the total is On track.
7. `countMembers(list, test)` counts members whose totals pass a callback test.
8. `printReport(list)` prints the savings report using reusable functions.
