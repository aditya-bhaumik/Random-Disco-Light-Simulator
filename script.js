function run() {

    function getRandomColor() {

        // range of Math.random(): [0,1)
        // Generating random integers for [a, b]: parseInt(a + Math.random()*(b+1-a))
        let val1 = parseInt(0 + Math.random() * (255 + 1 - 0));
        let val2 = parseInt(0 + Math.random() * (255 + 1 - 0));
        let val3 = parseInt(0 + Math.random() * (255 + 1 - 0));
        return `rgb(${val1}, ${val2}, ${val3})`;

    }

    let random_color = `${getRandomColor()}`;

    let n = document.getElementById("color").value
    let set_time = document.getElementById("time").value
    let unit = document.getElementById("unit").value
    let view = document.getElementById("view").value

    if (Number(n) < 0) {
        document.getElementById("error").innerHTML = "<strong>Please enter a positive integer in 'Number of Colors'!</strong>"
        document.getElementById("error").style.color = "red"
    }

    else if (Number.isInteger(Number(n)) == false || n == "") {
        if (n == "") {

            document.getElementById("error").innerHTML = "<strong>Please enter 'Number of Colors'!</strong>"
            document.getElementById("error").style.color = "red"
        }
        else if (Number.isInteger(n) == false) {
            document.getElementById("error").innerHTML = "<strong>Please enter a positive integer in 'Number of Colors'!</strong>"
            document.getElementById("error").style.color = "red"
        }

    }

    else if (unit == "unit") {
        document.getElementById("error").innerHTML = "<strong>Please select 'Unit'!</strong>"
        document.getElementById("error").style.color = "red"
    }

    else if (view == "select") {
        document.getElementById("error").innerHTML = "<strong>Please select 'View'!</strong>"
        document.getElementById("error").style.color = "red"
    }

    else {
        alert("Double click on the screen to reload!")

        document.body.children[0].style.display = 'none';

        document.body.style.cursor = "pointer";

        document.body.addEventListener("dblclick", () => {
            let cnf1 = confirm("Are you sure you want to reload?");
            if (cnf1) {
                window.location.reload();
            }
        })
    }

    if (unit != "unit") {

        if (unit == "seconds") {
            set_time *= 1000;
        }

        function number(n) {
            let ch = `${getRandomColor()}, `;
            if (n == parseInt(n)) {
                while (n >= 2) {
                    ch += `${getRandomColor()}, `;
                    n = n - 1;
                }
                return ch;
            }
        }

        setInterval(() => {
            random_color = `${getRandomColor()}`;
        }, `${set_time}`);

        if (n == 1 && view != "select") {
            document.body.style.backgroundColor = `${getRandomColor()}`
            setInterval(() => {
                document.body.style.backgroundColor = `${getRandomColor()}`
            }, `${set_time}`);
        }

        else if (n > 1) {

            if (view == "conic") {

                document.body.style.background = `conic-gradient(${random_color}, ${number(n - 1)} ${random_color})`;
                setInterval(() => {
                    document.body.style.background = `conic-gradient(${random_color}, ${number(n - 1)} ${random_color})`;
                }, `${set_time}`);

            }
            else if (view == "linear") {

                document.body.style.background = `linear-gradient(${number(n - 1)} ${random_color})`;
                setInterval(() => {
                    document.body.style.background = `linear-gradient(${number(n - 1)} ${random_color})`;
                }, `${set_time}`);

            }
            else if (view == "radial") {

                document.body.style.background = `radial-gradient(${number(n - 1)} ${random_color})`;
                setInterval(() => {
                    document.body.style.background = `radial-gradient(${number(n - 1)} ${random_color})`;
                }, `${set_time}`);

            }
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .then(() => {
                    fullscreenBtn.textContent = 'Exit Fullscreen';
                })
                .catch(err => {
                    console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
                });
        } else {
            document.exitFullscreen()
                .then(() => {
                    fullscreenBtn.textContent = 'Fullscreen';
                })
                .catch(err => {
                    console.error(`Error attempting to disable fullscreen mode: ${err.message} (${err.name})`);
                });
        }
    });

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            fullscreenBtn.textContent = 'Fullscreen';
        }
    });
});
