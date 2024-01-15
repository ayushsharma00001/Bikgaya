let validatebt = (() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  function disableButton(event) {
    
    var form = document.getElementById('myForm');
    var isValid = form.checkValidity(); // Checks if the form is valid
    console.log(event);

    if (isValid) {
      // Disable the button
      document.getElementById('myButton').disabled = true;
      document.getElementById('myForm').submit();
      
      // Perform other actions (e.g., form submission, etc.)
      // Your code here...
    } else {
      event.preventDefault(); // Prevents the form from submitting
      // Handle the case when the form is not valid
      // For example, display an error message or highlight the invalid fields
      alert('Please fill in the required field.');
  
      // You might not want to disable the button in case of invalid form data
      // If you want to keep the button enabled in case of validation failure, remove the line below
      document.getElementById('myButton').disabled = false;

    }
  }
  