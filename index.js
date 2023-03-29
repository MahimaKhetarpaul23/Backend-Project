const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
  try {
  
    const arr = req.body.array;

    const { fullName, dateOfBirth, email, college_rollNo } = req.body;

    // create the user ID field
    const user_id = `${fullName}_${dateOfBirth.split('-').join('')}`;

    // initialize the output arrays
    let evenNumbers = [];
    let oddNumbers = [];
    let upperCaseLetters = [];

    // iterate over the input array and classify the elements
    arr.forEach((element) => {
      if (typeof element === 'number') {
        if (element % 2 === 0) {
          evenNumbers.push(element);
        } else {
          oddNumbers.push(element);
        }
      } else if (typeof element === 'string') {
        const letters = element.split('');
        letters.forEach((letter) => {
          if (/[a-zA-Z]/.test(letter)) {
            upperCaseLetters.push(letter.toUpperCase());
          }
        });
      }
    });

    // create the response object
    const response = {
      user_id,
      email,
      college_rollNo,
      is_success: true,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      uppercase_letters: upperCaseLetters,
    };

    // send the response
    res.status(200).json(response);
  } catch (error) {
    // handle any errors
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});


app.listen(8080, () => {
  console.log(`Server running on port`);
});