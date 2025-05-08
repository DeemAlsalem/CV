$(document).ready(function () {

    // Toggle menu/navbar
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll and load events
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scroll
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });

});

// Change tab title on visibility change
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Deem Alsalem";
        $("#favicon").attr("href", "assets/images/favicon.jpg");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favicon.jpg");
    }
});

// Fetch data from JSON
async function fetchData(type = "skills") {
    let url = `${type}.json`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Display skills
function showSkills(skills) {
    let container = document.getElementById("skillsContainer");
    if (!container) return;

    container.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>`).join('');
}

// Display certifications
function showCertifications(certifications) {
    let container = document.querySelector("#certification .box-container");
    if (!container) return;

    container.innerHTML = certifications.map(cert => `
        <div class="box tilt">
            <img draggable="false" src="${cert.image}" alt="certification" />
            </div>
        </div>`).join('');
}

// Display projects
function showProjects(projects) {
    let container = document.querySelector("#project .box-container");
    if (!container) return;

    container.innerHTML = projects.map(project => `
        <div class="box tilt">
            <img draggable="false" src="${project.image}" alt="project" />
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                    </div>
                </div>
            </div>
        </div>`).join('');
}

// Load data
fetchData().then(showSkills);
fetchData("certifications").then(showCertifications);
fetchData("projects").then(showProjects);

// Initialize VanillaTilt once
VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

// ScrollReveal setup
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

// Scroll reveal animations
srtop.reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin, .home .telegram', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });

srtop.reveal('.about .content h3, .about .content .tag, .about .content p, .about .content .box-container, .about .content .resumebtn', { delay: 200 });
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });
srtop.reveal('.education .box, .project .box, .certification .box', { interval: 200 });

// Disable developer tools (basic)
document.onkeydown = function (e) {
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) ||
        (e.ctrlKey && String.fromCharCode(e.keyCode) === 'U')
    ) {
        return false;
    }
};
