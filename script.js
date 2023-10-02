document.addEventListener('DOMContentLoaded', function () {
    const breedSelector = $('#breedSelector');
    const dogGallery = document.getElementById('dogGallery');
    
    // Initialize Select2 on breed selector
    breedSelector.select2();
    
    // Populate breed selector
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(data => {
        const breeds = data.message;
        for (const breed in breeds) {
          const option = new Option(breed, breed, false, false);
          breedSelector.append(option).trigger('change');
        }
      });
  
    // Event listener for breed selection
    breedSelector.on('change', function () {
      const selectedBreeds = $(this).val();
      dogGallery.innerHTML = ''; // Clear existing images
      
      if (selectedBreeds) {
        selectedBreeds.forEach(breed => {
          // Fetch images for each selected breed
          fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`) // You can change the number of images as needed
            .then(response => response.json())
            .then(data => {
              data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                dogGallery.appendChild(img);
              });
            });
        });
      }
    });
  });
  