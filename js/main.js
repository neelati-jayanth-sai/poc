
document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.left ul').addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const pageName = event.target.dataset.page;
            if (pageName) {
                LoadHtml(pageName);
            }
        }
    });
});

const target = document.querySelector(".target");

 const LoadHtml = (PageName) => {
    fetch(`./${PageName}.html`)
        .then(response => response.text())
        .then(htmlPage => {
            target.innerHTML = htmlPage;

            if (PageName === "table") { 
                import('./table.js').then((module) => {
                    module.initializeTable();
                });
            } if (PageName === "form") {

                import('./formValidation.js').then((module) => {
                    module.addFormValidation();
                })
            }
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
        });
};
