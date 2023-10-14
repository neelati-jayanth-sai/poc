
export const populateViewPage = (userId) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:3000/getUserById/${userId}`,
            method: 'GET',
            success: (userData) => {
                const user = userData.user[0]
                const userDob = new Date(user.dob)
                const formattedDob = userDob.toISOString().substring(0, 10)

                console.log('Fetched user details:', user)

                const htmlTemplate = `
                    <div>
                        <p>Name: ${user.name}</p>
                        <p>Email: ${user.email}</p>
                        <p>Password: 
                            <input type="password" id="password" value="${user.password}" readonly>
                            <button id="togglePasswordVisibility">Show/Hide</button>
                        </p>
                        <p>DOB: ${formattedDob}</p>
                        <p>Phone No: ${user.phone}</p>
                        <img class="profile-image" src="${user.image}" alt="${user.name}"><br>
                        <iframe id="intro-video" src="${user.introVideo}" allowfullscreen></iframe><br><br>
                        <iframe id="favorite-video" src="${user.favouriteVideo}" allowfullscreen></iframe><br><br>
                        <p>Bio: ${user.bio}</p>
                    </div>
                `

                resolve(htmlTemplate)

            },
            error: (error) => {
                console.error('Error fetching user details:', error)
                reject(error)
            }
        })
    })
}





export const populateEditPage = (userId) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:3000/getUserById/${userId}`,
            method: 'GET',
            success: (userData) => {
                const user = userData.user[0]

                console.log('Fetched user details:', user)
                const userDob = new Date(user.dob)
                const formattedDob = userDob.toISOString().substring(0, 10)

                const htmlTemplate = `
                    <body>
                        <form id="editForm">
                        <label for="profileTitle">Profile Title:</label>
                        <input type="text" name="profileTitle" value="${user.profileTitle}"><br>
                        
                        <label for="name">Name:</label>
                        <input type="text" name="name" value="${user.name}"><br>

                        <label for="email">Email:</label>
                        <input type="text" name="email" value="${user.email}"><br>

                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" value="${user.password}">
                        <button type="button" id ="togglePasswordVisibility">Show/Hide</button><br>

                        <label for="dob">DOB:</label>
                        <input type="text" name="dob" value="${formattedDob}"><br>

                        <label for="phone">Phone No:</label>
                        <input type="text" name="phone" value="${user.phone}"><br>

                        <label for="image">Image:</label>
                        <input type="text" name="image" value="${user.image}"><br><br>

                        <label for="introVideo">Intro Video:</label>
                        <input type="text" name="introVideo" value="${user.introVideo}"><br><br>

                        <label for="favouriteVideo">Favourite Video:</label>
                        <input type="text" name="favouriteVideo" value="${user.favouriteVideo}"><br><br>

                        <label for="bio">Bio:</label>
                        <textarea name="bio">${user.bio}</textarea><br>

                        <label for="profileColor">Profile Color:</label>
                        <input type="color" name="profileColor" value="${user.profileColor}"><br><br>

                        <button type="button" id="saveChanges">Save Changes</button>
                    </form>
                    
                    </body>
                `

                resolve(htmlTemplate)

            },
            error: (error) => {
                console.error('Error fetching user details:', error)
                reject(error)
            }
        })
    })
}

