const target = document.querySelector(".target")

const LoadHtml = (PageName) => {
    fetch(`./${PageName}.html`)
        .then(response => response.text())
        .then(htmlPage => {
            target.innerHTML = htmlPage

            if (PageName === "table") {

                $.ajax({
                    url: 'http://localhost:3000/getAllUsers',
                    method: 'GET',
                    success: (data) => {
                        console.log('Fetched users:', data)

                        const userRows = data.users.map(user => {
                            const userDob = new Date(user.dob)
                            const formattedDob = userDob.toISOString().substring(0, 10)
                            var htmlReturn=`
                            <tr data-user-id="${user.userId}">
                            <td><img src="${user.image}" alt="${user.name}"></td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${formattedDob}</td>
                            <td>
                                <a href=${"./view.html"} class="view-user">View</a> 
                                <a href="#">Edit</a> 
                                <a href="#" class="delete-user">Delete</a>
                            </td>
                        </tr>
                            `
                            return htmlReturn
                        })



                        $('#user-listing-body').html(userRows.join(''))
                        $('#user-listing-table').DataTable();
                        $('.view-user').on('click', function (event) {
                            event.preventDefault();
                            console.log("clivke doon view")
                            const userId = $(this).closest('tr').data('user-id');
        
                            $.ajax({
                                url: `http://localhost:3000/getUserById/${userId}`, 
                                method: 'GET',
                                success: async(userData) => {
                                    console.log('Fetched user details:', userData);
                                    LoadHtml("view")
                                    target.innerHTML = await populateViewPage(userData.user[0]);
                                    LoadHtml("view")
                                },
                                error: (error) => {
                                    console.error('Error fetching user details:', error);
                                }
                            });
                        });
                        $('.delete-user').on('click', function (event) {
                            event.preventDefault();
                            console.log("clicked on delete")
                            const userId = $(this).closest('tr').data('user-id');
                            console.log(userId)
        
                            $.ajax({
                                url: `http://localhost:3000/deleteUser/${userId}`, 
                                method: 'DELETE',
                                success: (userData) => {
                                    console.log('delete user:', userId);
                                },
                                error: (error) => {
                                    console.error('Error deleting user', error);
                                }
                            });
                        });
                    },
                    error: (error) => {
                        console.error('Error fetching users:', error)
                    }
                })

                

            }
            if (PageName === "form") {
                addFormValidation()
            }

        }

        )
        .catch(error => {
            console.error('Error loading HTML:', error)
        })
}



const populateViewPage = async (userData) => {
    $('#name').text(`Name: ${userData.name}`);
    $('#email').text(`Email: ${userData.email}`);
    $('#password').text(`Password: ${userData.password}`);
    $('#dob').text(`DOB: ${userData.dob}`);
    $('#phone').text(`Phone No: ${userData.phone}`);
    $('.profile-image').attr('src', userData.image);
    $('#intro-video').attr('src', userData.introVideoUrl);
    $('#favorite-video').attr('src', userData.favoriteVideoUrl);
    $('#bio').text(`Bio: ${userData.bio}`);
};




const togglePasswordVisibility = () => {
    var passwordField = document.getElementById("password")


    if (passwordField.type === "password") {
        passwordField.type = "text"
    } else {
        passwordField.type = "password"
    }
}


const addFormValidation = () => {
    $(document).ready(function () {
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

        })


    })



    $(document).ready(function () {
        $('#formValidation').on('submit', function (event) {
            event.preventDefault()

            const formData = $("#formValidation").serializeArray()
            const values = {}
            formData.forEach(item => {
                values[item.name] = item.value
            })
            console.log("first", values)


            $.ajax({
                url: "http://localhost:3000/createUser",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "profileTitle": values.profileTitle,
                    "name": values.name,
                    "email": values.email,
                    "password": values.password,
                    "dob": values.dob,
                    "phone": values.phone,
                    "bio": values.bio,
                    "profileColor": values.profileColor,
                    "image": values.image,
                    "introVideo": values.introVideo,
                    "favouriteVideo": values.favouriteVideo
                }),
                success: (data) => {
                    console.log('Server response:', values)
                    alert('Form submitted successfully!');
                    document.getElementById("formValidation").reset();
                    
                },
                error: (error) => {
                    console.error('Error creating user:', error)
                    console.log(JSON.stringify({
                        "profileTitle": values.profileTitle,
                        "name": values.name,
                        "email": values.email,
                        "password": values.password,
                        "dob": values.dob,
                        "phone": values.phone,
                        "bio": values.bio,
                        "profileColor": values.profileColor,
                        "image": values.image,
                        "introVideo": values.introVideo,
                        "favouriteVideo": values.favouriteVideo,
                    }),)
                }
            })
        })
    })






}