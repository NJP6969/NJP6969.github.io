document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
});


document.addEventListener("DOMContentLoaded", function () {
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animated');

        animatedElements.forEach(function (element) {
            if (isInViewport(element)) {
                element.classList.add('show');
            }
        });
    }

    handleScrollAnimations();

    window.addEventListener('scroll', function () {
        handleScrollAnimations();
    });
});
