 const addFormValidation = () => {
    $("#formValidation").validate({
        rules: {
            profileTitle: "required",
            name: {
                required: true,
                maxlength: 25
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            },
            image: "required",
            dob: "required",
            phone: {
                required: true,
                minlength: 10,
                maxlength: 10,
                digits: true
            },
            bio: {
                required: true,
                minlength: 10
            },
            profileColor: {
                required: true
            }
        },
        messages: {
            profileTitle: "Please enter your profile title",
            name: {
                required: "Please enter your name",
                maxlength: "Name can not be more than 20 characters"
            },
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            password: {
                required: "Please enter a password",
                minlength: "Your password must be at least 8 characters long"
            },
            image: "Please select an image",
            dob: "Please enter your date of birth",
            phone: {
                required: "Please enter your phone number",
                minlength: "Phone Number must have 10 digits",
                maxlength: "Phone Number must have only 10 digit",
                digits: "Phone number should only contain digits"
            },
            bio: {
                required: "Please enter your bio",
                minlength: "Your bio must be at least 10 characters long"
            },
            profileColor: "Please select a profile color"
        },
        submitHandler: function (form) {
            event.preventDefault();

            const formData = $("#formValidation").serializeArray();
            const values = {};
            formData.forEach(item => {
                values[item.name] = item.value;
            });

            $.ajax({
                url: "http://localhost:3000/createUser", // Consider making this configurable
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(values),
                success: (data) => {
                    console.log('Server response:', data);
                    alert('Form submitted successfully!');
                    form.reset(); // Reset the form and clear error messages
                },
                error: (error) => {
                    console.error('Error creating user:', error);
                    alert(error)
                    console.log(JSON.stringify(values));
                }
            });
            
        }
    });
};



export default addFormValidation;
