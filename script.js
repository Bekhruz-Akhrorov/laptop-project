document.addEventListener("DOMContentLoaded", () => {
    
    const title = document.querySelector(".presenting h1");

    if (title) {
        const titleText = "PRESENTING\nHP Windows 11 Omnibook X Flip";
        let letter = 0;

        title.innerHTML = "";

        const typeTitle = () => {
            if(letter >= titleText.length) return;

            title.innerHTML += titleText[letter] === "\n" ? "<br>" : titleText[letter];
            letter += 1;

            setTimeout(typeTitle, 100);
        };

        setTimeout(typeTitle, 300);
    }
});

document.querySelectorAll(".btn.solid").forEach((button, index) => {
    const originalText = button.innerHTML;

    button.addEventListener("click", () => {
        button.innerHTML = "Loading...";
        button.style.transform = "scale(0.96)";
        button.style.opacity = "0.75";

        setTimeout(() => {
            button.innerHTML = "Ready! ✔️";
            button.style.opacity = "1";
            button.style.transform = "scale(1)";
        }, 550);

        setTimeout(() => {
            button.innerHTML = originalText;

            const target = index === 0 ? "#about" : "#laptops";
            document.querySelector(target)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 1300)
    });
});

const laptops = document.querySelectorAll(".laptop-pic");

laptops.forEach((laptop) => {
  laptop.addEventListener("mousemove", (event) => {
    const box = laptop.getBoundingClientRect();

    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;

    laptop.style.transition = "transform 0.15s ease";
    laptop.style.transform = `
      perspective(900px)
      rotateY(${x * 10}deg)
      rotateX(${-y * 10}deg)
      translateY(-8px)
    `;
  });

  laptop.addEventListener("mouseleave", () => {
    laptop.style.transition = "transform 0.3s ease";
    laptop.style.transform = "";
  });
});  

const sections = document.querySelectorAll(
    ".presenting, .spec-strip, .features, .cta-banner, footer"
);

sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(35px)";
    section.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    const reveal = new IntersectionObserver(
        ([entry], observer) => {
            if (!entry.isIntersecting) return;

            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
            observer.unobserve(section);
        },
        { threshold: 0.15 }
    );

    reveal.observe(section);
});

const navLinks = document.querySelectorAll(".nav-links a");

document.querySelectorAll("section[id], footer[id]").forEach((section) => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                const active = link.getAttribute("href") === `#${section.id}`;

                link.style.color = active ? "#e82a2a" : "";
                link.style.textShadow = active
                    ? "0 0 48px rgba(232, 51, 42, 0.8)"
                    : "";
            });
        },
        { threshold: 0.45 }
    );

    observer.observe(section);
});