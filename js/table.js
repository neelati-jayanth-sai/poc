import { populateViewPage,populateEditPage } from './view.js'
import { saveChanges,togglePasswordVisibility,addEditFormValidation} from './imp.js'
const target = document.querySelector(".target")
export const initializeTable = () => {
    $.ajax({
        url: 'http://localhost:3000/getAllUsers',
        method: 'GET',
        success: (data) => {
            console.log('Fetched users:', data)

            const userRows = data.users.map(user => {
                const userDob = new Date(user.dob)
                const formattedDob = userDob.toISOString().substring(0, 10)
                var htmlReturn = `
                    <tr data-user-id="${user.userId}">
                        <td><img src="${user.image}" alt="${user.name}"></td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${formattedDob}</td>
                        <td>
                            <a href="/${user.userId}" class="view-user" data-user-id="${user.userId}">View</a>
                            <a href="/${user.userId}"  class="edit-user" data-user-id ="${user.userId}">Edit</a> 
                            <a href="#" class="delete-user">Delete</a>
                        </td>
                    </tr>
                `
                return htmlReturn
            })

            $('#user-listing-body').html(userRows.join(''))
            $('#user-listing-table').DataTable()

            // Add click event for "View" link
            $('.view-user').on('click', async function (event) {
                event.preventDefault()
                const userId = $(this).data('user-id')
                const htmlTemplate = await populateViewPage(userId)
                target.innerHTML =  htmlTemplate
                history.pushState(null, null, `#/view/${userId}`)
                $('#togglePasswordVisibility').on('click',function () {
                    console.log("show/hide")
                    togglePasswordVisibility()
                })
            })
            $('.edit-user').on('click', async function (event) {
                console.log("onClick edit user")
                event.preventDefault()
                const userId = $(this).data('user-id')
                const htmlTemplate = await populateEditPage(userId)
                target.innerHTML =  htmlTemplate
                history.pushState(null, null, `#/edit/${userId}`)
                addEditFormValidation()

                $('#togglePasswordVisibility').on('click',function () {
                    console.log("show/hide")
                    togglePasswordVisibility()
                })
            
                $('#saveChanges').on('click',function () {
                    console.log('CLICK ON SUBMIT')
                    saveChanges(userId)
                })
            })

           


            $('.delete-user').on('click', function (event) {
                event.preventDefault()
                console.log("clicked on delete")
                const userId = $(this).closest('tr').data('user-id')
                console.log(userId)

                $.ajax({
                    url: `http://localhost:3000/deleteUser/${userId}`,
                    method: 'DELETE',
                    success: (userData) => {
                        console.log('delete user:', userId)
                        alert("User deleted successfully")
                        location.reload()
                    },
                    error: (error) => {
                        console.error('Error deleting user', error)
                    }

                })
            })
        },
        error: (error) => {
            console.error('Error fetching users:', error)
        }
    })
}
// $(document).ready(function () {
//     // Toggle password visibility
    
// })
