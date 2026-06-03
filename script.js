document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------
       1. CUSTOM CURSOR
    ------------------------------------------------------ */
    const cursor = document.querySelector('.custom-cursor');
    const hoverElements = document.querySelectorAll('a, button, .magnetic, .magnetic-btn');

    // Cập nhật vị trí con trỏ chuột
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Thêm hiệu ứng phình to khi hover vào các thẻ có thể tương tác
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });


    /* ----------------------------------------------------
       2. MAGNETIC EFFECT (Nút bấm & Hình ảnh hút nam châm)
    ------------------------------------------------------ */
    const magnetics = document.querySelectorAll('.magnetic, .magnetic-btn');
    
    magnetics.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const position = el.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // Lấy độ mạnh của lực hút từ data attribute, mặc định là 10
            const strength = el.getAttribute('data-strength') || 10;
            
            el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
        });

        // Reset vị trí khi chuột rời đi
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
        });
    });


    /* ----------------------------------------------------
       3. MOUSE PARALLAX EFFECT (Avatar & Nền chuyển động theo chuột)
    ------------------------------------------------------ */
    const parallaxContainer = document.querySelector('.parallax-container');
    const parallaxElements = document.querySelectorAll('.bg-shape, .parallax-element');

    if (parallaxContainer) {
        parallaxContainer.addEventListener('mousemove', (e) => {
            // Tính toán vị trí chuột so với trung tâm màn hình (từ -1 đến 1)
            const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

            parallaxElements.forEach((el) => {
                // Lấy hệ số chiều sâu (depth)
                const depth = parseFloat(el.getAttribute('data-depth')) || 0.1;
                
                // Di chuyển phần tử tỷ lệ thuận với vị trí chuột và độ sâu
                const moveX = x * depth * 50; 
                const moveY = y * depth * 50;
                
                // Nếu là avatar, giữ lại góc xoay ban đầu -3deg
                if(el.classList.contains('avatar-wrapper')) {
                    el.style.transform = `translate(${moveX}px, ${moveY}px) rotate(-3deg)`;
                } else {
                    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
        });

        // Reset vị trí
        parallaxContainer.addEventListener('mouseleave', () => {
            parallaxElements.forEach((el) => {
                if(el.classList.contains('avatar-wrapper')) {
                    el.style.transform = `translate(0px, 0px) rotate(-3deg)`;
                } else {
                    el.style.transform = `translate(0px, 0px)`;
                }
            });
        });
    }


    /* ----------------------------------------------------
       4. SCROLL REVEAL (Animation khi cuộn chuột)
    ------------------------------------------------------ */
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); // Khởi tạo lần đầu


    /* ----------------------------------------------------
       5. SMOOTH SCROLLING TỪ NAVBAR
    ------------------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, 
                    behavior: 'smooth'
                });
            }
        });
    });
});
