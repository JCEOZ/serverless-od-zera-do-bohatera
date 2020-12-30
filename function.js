let counter

module.exports.handler = async event => {
  
  let message
  if (counter) {
    counter++
    message = 'Warm start'
  } else {
    counter = 1
    message = 'Cold start'
  }

  console.log(counter)

  return { counter, message }
};
