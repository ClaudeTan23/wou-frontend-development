let page = window.location.href.split("/");
page = page[page.length - 1].split(".");
page = page[0];

if(page === "admin")
{
    $("document").ready((e) => 
    {
        let dropDownTarget = false;

        $(".main-body").click((e) => 
        {
            if(!dropDownTarget) $(".dropdown-block").fadeOut(300);

            dropDownTarget = false;
        });

        $(".link").click((e) => 
        {
            if(e.target.textContent.toUpperCase().trim() === "COURSES") $(".dropdown-block").fadeToggle();

            dropDownTarget = true;
        });

        $(".courses-title[course='dotnet']").click((e) =>
        {
            dropDownTarget = true;

            $(".courses-content[content='dotnet']").slideToggle(300);
        });

        $(".courses-title[course='java']").click((e) =>
        {
            dropDownTarget = true;

            $(".courses-content[content='java']").slideToggle(300);
        });

        $(".dropdown-block").click(() =>
        {
            dropDownTarget = true;

        });

        $(".register-btn").click(() =>
        {
            $(".modal-container").fadeIn(300);
        });


        $(".modal-container").click((e) =>
        {
            if(e.target.getAttribute("class") === "modal-container") $(".modal-container").fadeOut(300);
        });

        document.getElementsByTagName("form")[0].addEventListener("submit", async (e) =>
        {
            e.preventDefault();
            
            let name = $("#name").val().trim();
            let email = $("#email").val().trim();
            let phone = $("#phone").val().trim();
            let courses = $("#courses").val().trim();

            let emailRegExp = /[ `!@#$%^&*()?+\=\[\]{};':"\\|,.<>\/?~]/;

            if(name !== "" && email !== "" && phone !== "" && courses !== "")
            {
                if(emailRegExp.test(email))
                {
                    document.getElementsByTagName("button")[0].textContent = "Submiting";
                    document.getElementById("name").setAttribute("disabled", "true");
                    document.getElementById("phone").setAttribute("disabled", "true");
                    document.getElementById("email").setAttribute("disabled", "true");
                    document.getElementsByTagName("button")[0].setAttribute("disabled", "true");

                    const promise = await fetch("https://sheetdb.io/api/v1/f1qno95k4qzqk", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            data: [
                                { id: "INCREMENT", name: name, email: email, phone: phone, course: courses }
                            ]
                        })
                    });

                    if(promise.ok)
                    {
                        window.location.replace("./thank-you.html");

                    } else 
                    {
                        alert("Bad request")
                        document.getElementsByTagName("button")[0].textContent = "Submit";
                        document.getElementById("name").removeAttribute("disabled");
                        document.getElementById("phone").removeAttribute("disabled");
                        document.getElementById("email").removeAttribute("disabled");
                        document.getElementsByTagName("button")[0].removeAttribute("disabled");
                    }

                } else 
                {
                    $(".modal-warning").fadeIn(300);
                    $("span[role='warning']").text("Invalid Email");

                    setTimeout(() => 
                    {
                        $(".modal-warning").fadeOut(300);

                    }, 2000);
                    
                }

            } else 
            {
                $(".modal-warning").fadeIn(300);
                $("span[role='warning']").text("Please fill out all the requirement");

                setTimeout(() => 
                {
                    $(".modal-warning").fadeOut(300);

                }, 2000);

            }
            
        });

    });

} else 
{
    $("document").ready((e) => 
    {
        let dropDownTarget = false;

        $(".main-body").click((e) => 
        {
            if(!dropDownTarget) $(".dropdown-block").fadeOut(300);

            dropDownTarget = false;
        });

        $(".link").click((e) => 
        {
            if(e.target.textContent.toUpperCase().trim() === "COURSES") $(".dropdown-block").fadeToggle();

            dropDownTarget = true;
        });

        $(".courses-title[course='dotnet']").click((e) =>
        {
            dropDownTarget = true;

            $(".courses-content[content='dotnet']").slideToggle(300);
        });

        $(".courses-title[course='java']").click((e) =>
        {
            dropDownTarget = true;

            $(".courses-content[content='java']").slideToggle(300);
        });

        $(".dropdown-block").click(() =>
        {
            dropDownTarget = true;

        });

        $(".register-btn").click(() =>
        {
            $(".modal-container").fadeIn(300);
        });


        $(".modal-container").click((e) =>
        {
            if(e.target.getAttribute("class") === "modal-container") $(".modal-container").fadeOut(300);
        });

    });

}


