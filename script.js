//your code here
class RobotVerification {
        constructor() {
          this.imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
          this.selectedImages = [];
          this.imageData = [];
          this.init();
        }

        init() {
          this.generateImageArray();
          this.renderImages();
          this.attachEventListeners();
        }

        generateImageArray() {
          // Create array with 5 unique images
          let images = [...this.imageClasses];
          
          // Randomly select one image to duplicate
          const randomIndex = Math.floor(Math.random() * images.length);
          const duplicateImage = images[randomIndex];
          images.push(duplicateImage);
          
          // Shuffle the array
          this.imageData = this.shuffleArray(images);
        }

        shuffleArray(array) {
          const shuffled = [...array];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return shuffled;
        }

        renderImages() {
          const container = document.getElementById('image-container');
          container.innerHTML = '';
          
          this.imageData.forEach((imageClass, index) => {
            const img = document.createElement('img');
            img.className = imageClass;
            img.dataset.index = index;
            img.dataset.imageType = imageClass;
            container.appendChild(img);
          });
        }

        attachEventListeners() {
          // Image click events
          document.getElementById('image-container').addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
              this.handleImageClick(e.target);
            }
          });

          // Reset button
          document.getElementById('reset').addEventListener('click', () => {
            this.resetState();
          });

          // Verify button
          document.getElementById('verify').addEventListener('click', () => {
            this.verifySelection();
          });
        }

        handleImageClick(img) {
          const index = parseInt(img.dataset.index);
          
          // Check if image is already selected
          if (this.selectedImages.includes(index)) {
            return; // Don't allow selecting the same image twice
          }

          // Add selection
          img.classList.add('selected');
          this.selectedImages.push(index);

          // Show reset button after first click
          if (this.selectedImages.length >= 1) {
            document.getElementById('reset').style.display = 'inline-block';
          }

          // Show verify button only when exactly 2 images are selected
          if (this.selectedImages.length === 2) {
            document.getElementById('verify').style.display = 'inline-block';
          } else if (this.selectedImages.length > 2) {
            // If more than 2 images selected, hide verify button
            document.getElementById('verify').style.display = 'none';
          }
        }

        resetState() {
          // Clear selections
          this.selectedImages = [];
          
          // Remove selected class from all images
          document.querySelectorAll('img').forEach(img => {
            img.classList.remove('selected');
          });

          // Hide buttons
          document.getElementById('reset').style.display = 'none';
          document.getElementById('verify').style.display = 'none';

          // Reset message
          document.getElementById('h').textContent = 'Please click on the identical tiles to verify that you are not a robot.';
          document.getElementById('para').textContent = '';
        }

        verifySelection() {
          if (this.selectedImages.length !== 2) {
            return;
          }

          const firstImageType = this.imageData[this.selectedImages[0]];
          const secondImageType = this.imageData[this.selectedImages[1]];

          // Hide verify button
          document.getElementById('verify').style.display = 'none';

          // Check if images are identical
          if (firstImageType === secondImageType) {
            document.getElementById('para').textContent = 'You are a human. Congratulations!';
          } else {
            document.getElementById('para').textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
          }
        }
      }

      // Initialize the robot verification system
      document.addEventListener('DOMContentLoaded', () => {
        new RobotVerification();
      });