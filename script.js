const target=document.querySelector(".target")

const LoadHtml = (PageName) => {
    fetch(`./${PageName}.html`)
        .then(response => response.text())
        .then(htmlPage => {
            target.innerHTML = htmlPage

        
            if(PageName==="table"){
                $(document).ready(function () {
                    $('#user-listing-table').DataTable()
                })
            }
            if(PageName==="form"){
                addFormValidation()
            }
        })
        .catch(error => {
            console.error('Error loading HTML:', error)
        })
}




const togglePasswordVisibility=()=> {
    var passwordField = document.getElementById("password")

   
    if (passwordField.type === "password") {
        passwordField.type = "text"
    } else {
        passwordField.type = "password"
    }
}


const  addFormValidation=()=> {
    $(document).ready(function () {
        $("#formValidation").validate({
            rules: {
                profileTitle: "required",
                name: {
                    required: true,
                    maxlength: 20
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
                    minlength: 15  
                },
                profileColor: {
                    required: true
                }
            },
            messages: {
                profileTitle: "Please enter your profile title",
                name: {required:"Please enter your name",
                        maxlength:"Name can not be more than 20 characters"
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
                phone: {required:"Please enter your phone number",
                        minlength:"Phone Number must have 10 digits",
                        maxlength:"Phone Number must have only 10 digit",
                        digits:"Phone number should only contain digits"
            },
                bio: {
                    required: "Please enter your bio",
                    minlength: "Your bio must be at least 15 characters long"
                },
                profileColor: "Please select a profile color"
            },
            submitHandler: function (form) {
                event.preventDefault();
                const formData = $(form).serializeArray();
                console.log('Form data:', formData);

            }
        })
        console.log('Bio validation rules:', $("#bio").rules())
        console.log('ProfileColor validation rules:', $("#profileColor").rules())


    })
    
}