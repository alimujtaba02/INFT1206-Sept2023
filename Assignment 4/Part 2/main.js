const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images=['pic1.jpg', 'pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg'];

/* Declaring the alternative text for each image file */
const alts={
    'pic1.jpg': 'an eye',
    'pic2.jpg':'naturally marbled stone',
    'pic3.jpg':'purple flowers',
    'pic4.jpg':'heiroglyphics',
    'pic5.jpg':'a butterfly'
}

/* Looping through images */
for (let i = 0; i < images.length; i++) {
    
    //define the file name from the images array
    const filename = images[i];
    // find the file from the image folder
    const imagePath = 'images/' + filename; 
    // Get the alt text from the object
    const altText = alts[filename]; 


const newImage = document.createElement('img');
//set the attributes to the value we are at in the loop
newImage.setAttribute('src', imagePath);
newImage.setAttribute('alt', altText);

// Add click event listener to the smaller images
newImage.addEventListener('click', function() {
    // Update the displayed image src
    displayedImage.src = this.src;
    // Update the displayed image alt 
    displayedImage.alt = this.alt; 
});

thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', function() {
    //determining whether the image is currently dark or light
    const currentClass = btn.getAttribute('class');

    //to darken if it is light
    if (currentClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        //overlaying the darkness
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }
    //reverting to original 
    else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        //reverting the overlay
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'; 
    }
});