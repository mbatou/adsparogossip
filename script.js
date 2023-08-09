const cube = document.getElementById('cube');
const faces = Array.from(document.querySelectorAll('.cube__face'));
let rotation = 0;
let startX = null;
let currentX = null;

cube.addEventListener('click', rotateCube);
cube.addEventListener('mousedown', startDrag);
cube.addEventListener('mousemove', drag);
cube.addEventListener('mouseup', endDrag);
cube.addEventListener('touchstart', startDrag);
cube.addEventListener('touchmove', drag);
cube.addEventListener('touchend', endDrag);

function rotateCube() {
    rotation += 90;
    cube.style.transform = `rotateY(${rotation}deg)`;
}

function startDrag(event) {
    startX = getDragX(event);
}

function drag(event) {
    if (startX === null) {
        return;
    }

    currentX = getDragX(event);
    const diffX = currentX - startX;
    const sensitivity = 1; // Adjust this value to control the drag sensitivity
    rotation += diffX * sensitivity;
    cube.style.transform = `rotateY(${rotation}deg)`;

    startX = currentX;
}

function endDrag() {
    startX = null;
}

function getDragX(event) {
    return event.clientX || event.touches[0].clientX;
}

// Infinite rotation
function autoRotate() {
    rotation += 0.5; // Adjust this value to control the rotation speed
    cube.style.transform = `rotateY(${rotation}deg)`;
    requestAnimationFrame(autoRotate);
}

autoRotate();









// script for heny 

// scrip for Fanmilk
function flipCard() {
    var card = document.querySelector('.banner-card');
    card.classList.toggle('flipped');
}

function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    var intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(intervalId); // Stop the timer

            // Switch the card to display the third card
            var card = document.querySelector('.banner-card');
            var front = card.querySelector('.front');
            var back = card.querySelector('.back');
            var thirdCard = card.querySelector('.third-card');

            card.classList.add('flipped');
            front.style.display = 'none';
            back.style.display = 'none';
            thirdCard.style.display = 'block';
        }
    }, 1000);
}


window.onload = function () {
    var twoMinutes = 1 * 30,
        display = document.querySelector('#timer');
    startTimer(twoMinutes, display);
};

interact('.bowl')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,

        listeners: {
            move: dragMoveListener,
            end: function (event) {
                var textEl = event.target.querySelector('p');

                textEl && (textEl.textContent =
                    'moved a distance of ' +
                    (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                        Math.pow(event.pageY - event.y0, 2) | 0))
                        .toFixed(2) + 'px');

                var bowlRect = event.target.getBoundingClientRect();
                var bowl = event.target;
                var scoopElements = document.getElementsByClassName('scoop', 'scoop1', 'scoop2');

                var isCollisionDetected = false;

                for (var i = 0; i < scoopElements.length; i++) {
                    var scoopRect = scoopElements[i].getBoundingClientRect();

                    if (isCollision(bowlRect, scoopRect)) {
                        scoopElements[i].style.display = 'none';
                        scoopElements[i].offsetHeight; // Force reflow to restart the animation
                        scoopElements[i].style.display = 'block';
                        isCollisionDetected = true;

                        // Switch the bowl image to the green bowl
                        bowl.classList.add('greenbowl');
                    }
                }

                if (!isCollisionDetected) {
                    bowl.classList.remove('greenbowl');
                }
            }
        }
    });

function isCollision(rect1, rect2) {
    return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top);
}

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}


// Script for Coloris

function showCardColoris() {
    var cardContainer = document.getElementById("cardContainer");
    cardContainer.classList.toggle("show");
}

function closeCardColoris() {
    var cardContainer = document.getElementById("cardContainer");
    cardContainer.classList.remove("show");
}

function previousSlide() {
    var slides = document.getElementsByClassName("slider-img");
    var activeIndex = -1;
    for (var i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains("active")) {
            activeIndex = i;
            break;
        }
    }
    if (activeIndex !== -1) {
        slides[activeIndex].classList.remove("active");
        var prevIndex = (activeIndex - 1 + slides.length) % slides.length;
        slides[prevIndex].classList.add("active");
        updateCardBackground(slides[prevIndex].alt);
    }
}

function nextSlide() {
    var slides = document.getElementsByClassName("slider-img");
    var activeIndex = -1;
    for (var i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains("active")) {
            activeIndex = i;
            break;
        }
    }
    if (activeIndex !== -1) {
        slides[activeIndex].classList.remove("active");
        var nextIndex = (activeIndex + 1) % slides.length;
        slides[nextIndex].classList.add("active");
        updateCardBackground(slides[nextIndex].alt);
    }
}

function spotImage(imageElement) {
    var cardContainer = document.getElementById("cardContainer");
    var images = {
        "Slider Image 1": "images/s.blue-salon_interior_gelatex-pro-.png",
        "Slider Image 2": "images/s.red-salon_interior_gelatex-pro-.png",
        "Slider Image 3": "images/s.green-salon_interior_gelatex-pro-.png",
        "Slider Image 4": "images/s.purple-salon_interior_gelatex-pro-.png"
    };

    var newBackgroundImage = images[imageElement.alt];
    if (newBackgroundImage) {
        cardContainer.style.transition = "opacity 5s";
        cardContainer.style.opacity = "0";
        setTimeout(function () {
            cardContainer.style.backgroundImage = "url('" + newBackgroundImage + "')";
            cardContainer.style.opacity = "1";
        }, 300);

        var slides = document.getElementsByClassName("slider-img");
        for (var i = 0; i < slides.length; i++) {
            if (slides[i] === imageElement) {
                slides[i].classList.add("active");
            } else {
                slides[i].classList.remove("active");
            }
        }
    }
}









// Script for carousel 

var carousel = document.querySelector('.carousel');
var carouselInner = document.querySelector('.carousel-inner');
var images = document.querySelectorAll('.carousel-image');

var currentImage = 0;
var isDragging = false;
var intervalId;

carousel.addEventListener('mousedown', startDragging);
carousel.addEventListener('mousemove', drag);
carousel.addEventListener('mouseup', finishDragging);
carousel.addEventListener('mouseleave', finishDragging);

carousel.addEventListener('touchstart', startDragging);
carousel.addEventListener('touchmove', drag);
carousel.addEventListener('touchend', finishDragging);

startCarouselInterval();

function startDragging(event) {
    clearInterval(intervalId);
    if (event.type === 'touchstart') {
        startX = event.touches[0].clientX;
    } else {
        startX = event.clientX;
    }

    isDragging = true;
}

function drag(event) {
    if (!isDragging) return;

    event.preventDefault();

    var x = 0;
    if (event.type === 'touchmove') {
        x = event.touches[0].clientX - startX;
    } else {
        x = event.clientX - startX;
    }

    carouselInner.style.transform = `translateX(${-currentImage * 300 + x}px)`;
}

function finishDragging(event) {
    if (!isDragging) return;

    var endX = 0;
    if (event.type === 'touchend') {
        endX = event.changedTouches[0].clientX;
    } else {
        endX = event.clientX;
    }

    var deltaX = endX - startX;

    if (deltaX > 50 && currentImage > 0) {
        currentImage--;
    } else if (deltaX < -50 && currentImage < images.length - 1) {
        currentImage++;
    }

    carouselInner.style.transform = `translateX(${-currentImage * 300}px)`;

    isDragging = false;
    startCarouselInterval();
}

function startCarouselInterval() {
    intervalId = setInterval(function () {
        currentImage = (currentImage + 1) % images.length;
        carouselInner.style.transform = `translateX(${-currentImage * 300}px)`;
    }, 3000); // Change image every 3 seconds (adjust as needed)
}
