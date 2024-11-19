document.addEventListener('DOMContentLoaded', () => {
    // Тема
    const toggleModeButton = document.getElementById("toggle-mode");
    if (toggleModeButton) {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.body.classList.add(savedTheme);
        toggleModeButton.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";

        toggleModeButton.addEventListener("click", () => {
            const currentMode = document.body.classList.contains("dark") ? "dark" : "light";
            const newMode = currentMode === "dark" ? "light" : "dark";
            document.body.classList.remove(currentMode);
            document.body.classList.add(newMode);
            toggleModeButton.textContent = newMode === "dark" ? "Light Mode" : "Dark Mode";
            localStorage.setItem("theme", newMode);
        });
    }

    // Вход / Выход
    const loginButton = document.querySelector(".menu-right button:nth-child(1)");
    const logoutButton = document.querySelector(".menu-right button:nth-child(2)");
    const loginPopup = document.getElementById("login-popup");
    const closeLoginPopup = document.getElementById("close-login-popup");
    const loginForm = document.getElementById("login-form");

    if (loginButton && logoutButton) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            loginButton.style.display = "none";
            logoutButton.style.display = "inline-block";
        } else {
            loginButton.style.display = "inline-block";
            logoutButton.style.display = "none";
        }

        loginButton.addEventListener("click", () => {
            if (loginPopup) loginPopup.style.display = "flex";
        });

        if (closeLoginPopup) {
            closeLoginPopup.addEventListener("click", () => {
                loginPopup.style.display = "none";
            });
        }

        if (loginForm) {
            loginForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const firstName = document.getElementById("first-name").value.trim();
                const lastName = document.getElementById("last-name").value.trim();
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value;

                if (!validatePassword(password)) {
                    alert("Password must be at least 8 characters long and contain both letters and numbers.");
                    return;
                }

                const user = { firstName, lastName, email };
                localStorage.setItem("user", JSON.stringify(user));
                alert("Account created successfully!");
                loginPopup.style.display = "none";
                loginButton.style.display = "none";
                logoutButton.style.display = "inline-block";
            });
        }

        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("user");
            alert("You have logged out successfully.");
            location.reload();
        });
    }

    function validatePassword(password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
    }

    // Консультация
    const consultBtn = document.getElementById("consult-btn");
    const consultPopup = document.getElementById("consult-popup");
    const closeConsultPopup = document.getElementById("close-consult-popup");
    const consultForm = document.getElementById("consult-form");

    if (consultBtn && consultPopup && closeConsultPopup && consultForm) {
        // Показать попап при нажатии на кнопку
        consultBtn.addEventListener("click", () => {
            consultPopup.style.display = "flex";
        });

        // Закрыть попап
        closeConsultPopup.addEventListener("click", () => {
            consultPopup.style.display = "none";
        });

        // Обработать форму
        consultForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("consult-name").value.trim();
            const surname = document.getElementById("consult-surname").value.trim();
            const phone = document.getElementById("consult-phone").value.trim();

            // Проверка на правильность номера телефона
            if (phone.length !== 11) {
                alert("Phone number must be 11 digits.");
            } else {
                // Сохраняем информацию о консультации в LocalStorage
                const consultationData = { name, surname, phone };
                localStorage.setItem("consultation", JSON.stringify(consultationData));

                // Показываем сообщение об успешной отправке
                alert(`Consultation request submitted by ${name} ${surname}.`);

                // Закрыть попап
                consultPopup.style.display = "none";
            }
        });
    }

    // Проверка на наличие данных в LocalStorage
    const savedConsultation = JSON.parse(localStorage.getItem("consultation"));
    if (savedConsultation) {
        console.log("Last consultation request: ", savedConsultation);
    } else {
        console.log("No consultation data found.");
    }
    const apiKey = 'bf7f6644c62e5536690417cfb9ad1f69'; // Замените на ваш реальный API ключ от OpenWeather

    const getWeatherBtn = document.getElementById('get-weather-btn');
    const cityInput = document.getElementById('city');
    const weatherInfoDiv = document.getElementById('weather-info');

    // Функция для получения погоды
    function getWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Запрос с параметрами

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const temp = data.main.temp;
                    const windSpeed = data.wind.speed;

                    // Отображение погоды
                    weatherInfoDiv.innerHTML = `
                        <p>Temperature: ${temp}°C</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                    `;
                } else {
                    weatherInfoDiv.innerHTML = `<p>City not found. Please try again.</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfoDiv.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
            });
    }
    // Обработчик кнопки для получения погоды
    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    });
});
