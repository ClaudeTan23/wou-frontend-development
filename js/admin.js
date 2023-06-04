function editModal(id, name, email, phone, course) 
{
    $(".form-add[role='edit-data']").attr("data-id", id);
    $("#name-edit").val(name);
    $("#email-edit").val(email);
    $("#phone-edit").val(phone);
    $("#courses-edit").val(course);

    $("div[role='edit-lean-block']").fadeIn();
}

function deleteModal(id)
{
    $(".form-add[role='delete-data']").attr("data-id", id);
    $("div[role='delete-lean-block']").fadeIn();
}

function loadData()
{
    $(".loader").show();
    $(".not-found").fadeOut(100);

    const tableBody = document.getElementsByTagName("tbody")[0];
    let tableData   = "";

    tableBody.innerHTML = "";

    fetch("https://sheetdb.io/api/v1/f1qno95k4qzqk")
    .then(response => response.json())
    .then(result => 
    {
        if(result.length <= 0) 
        {
            $(".loader").hide();
            return $(".not-found").fadeIn(100);
        };

        for(let i = 0; i < result.length; i++)
        {
            tableData += 
            `
                <tr>
                    <td>${result[i].name}</td>
                    <td>${result[i].email}</td>
                    <td>${result[i].phone}</td>
                    <td>${result[i].course}</td>
                    <td style="display: flex; gap: 10px; flex-wrap: wrap;">
                         <div class="action-btn" onClick="editModal(${result[i].id}, '${result[i].name}', '${result[i].email}', '${result[i].phone}', '${result[i].course}')" style="display: flex; align-items: center;">
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </div>
                        <div class="action-btn" onClick="deleteModal(${result[i].id})" style="display: flex; align-items: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                            </svg>
                        </div>
                    </td>
                </tr>
            `;
        }

        $(".loader").hide();

        tableBody.innerHTML = tableData;
    });
}


$("document").ready(() =>
{
    loadData();

    let searchTimer = undefined;

    $("div[role='add-data']").click(() => 
    {
        $("div[role='add-lean-block']").fadeIn();
    });

    $("div[role='add-data']").click(() => 
    {
        $("div[role='add-lean-block']").fadeIn();
    });


    $("div[role='add-lean-block']").click((e) =>
    {
        if(e.target.getAttribute("class") === "modal-container-add") $("div[role='add-lean-block']").fadeOut();

    });

    $("div[role='edit-lean-block']").click((e) =>
    {
        if(e.target.getAttribute("class") === "modal-container-add") $("div[role='edit-lean-block']").fadeOut();

    });

    $("div[role='delete-lean-block']").click((e) =>
    {
        if(e.target.getAttribute("class") === "modal-container-add") $("div[role='delete-lean-block']").fadeOut();

    });

    document.getElementsByTagName("form")[1].addEventListener("submit" , async (e) =>
    {
        e.preventDefault();

        const name    = $("#name-add").val().trim();
        const email   = $("#email-add").val().trim();
        const phone   = $("#phone-add").val().trim();
        const courses = $("#courses-add").val().trim();

        const emailRegExp = /[ `!@#$%^&*()?+\=\[\]{};':"\\|,.<>\/?~]/;

        if(name !== "" && email !== "" && phone !== "" && courses !== "")
        {
            if(emailRegExp.test(email))
            {
                document.getElementsByTagName("button")[1].textContent = "Adding...";
                document.getElementById("name-add").setAttribute("disabled", "true");
                document.getElementById("phone-add").setAttribute("disabled", "true");
                document.getElementById("email-add").setAttribute("disabled", "true");
                document.getElementsByTagName("button")[1].setAttribute("disabled", "true");

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
                    $(".modal-container-add").fadeOut(10);
                    $("span[role='pop-msg']").text("Leans Added");
                    $(".modal-pop").fadeIn(300);

                    document.getElementsByTagName("button")[1].textContent = "Add";
                    document.getElementById("name-add").removeAttribute("disabled");
                    document.getElementById("phone-add").removeAttribute("disabled");
                    document.getElementById("email-add").removeAttribute("disabled");
                    document.getElementById("name-add").value = "";
                    document.getElementById("phone-add").value = "";
                    document.getElementById("email-add").value = "";
                    document.getElementsByTagName("button")[1].removeAttribute("disabled");

                    loadData();

                    setTimeout(() => 
                    {
                        $(".modal-pop").fadeOut(300);
                    }, 2000);

                } else 
                {
                    alert("Bad request")
                    document.getElementsByTagName("button")[1].textContent = "Add";
                    document.getElementById("name-add").removeAttribute("disabled");
                    document.getElementById("phone-add").removeAttribute("disabled");
                    document.getElementById("email-add").removeAttribute("disabled");
                    document.getElementsByTagName("button")[1].removeAttribute("disabled");
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

    document.getElementsByTagName("form")[2].addEventListener("submit" , async (e) =>
    {
        e.preventDefault();

        const id      = $("div[role='edit-data']").attr("data-id");
        const name    = $("#name-edit").val().trim();
        const email   = $("#email-edit").val().trim();
        const phone   = $("#phone-edit").val().trim();
        const courses = $("#courses-edit").val().trim();

        const emailRegExp = /[ `!@#$%^&*()?+\=\[\]{};':"\\|,.<>\/?~]/;

        if(name !== "" && email !== "" && phone !== "" && courses !== "")
        {
            if(emailRegExp.test(email))
            {
                document.getElementsByTagName("button")[2].textContent = "Updating...";
                document.getElementById("name-edit").setAttribute("disabled", "true");
                document.getElementById("phone-edit").setAttribute("disabled", "true");
                document.getElementById("email-edit").setAttribute("disabled", "true");
                document.getElementsByTagName("button")[2].setAttribute("disabled", "true");

                const promise = await fetch(`https://sheetdb.io/api/v1/f1qno95k4qzqk/id/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                        
                    },
                    body: JSON.stringify({
                        data: [
                            { name: name, email: email, phone: phone, course: courses }
                        ]
                    })
                });

                if(promise.ok)
                {
                    $(".modal-container-add").fadeOut(10);
                    $("span[role='pop-msg']").text("Leans Updated");
                    $(".modal-pop").fadeIn(300);

                    document.getElementsByTagName("button")[2].textContent = "Edit";
                    document.getElementById("name-edit").removeAttribute("disabled");
                    document.getElementById("phone-edit").removeAttribute("disabled");
                    document.getElementById("email-edit").removeAttribute("disabled");
                    document.getElementById("name-edit").value = "";
                    document.getElementById("phone-edit").value = "";
                    document.getElementById("email-edit").value = "";
                    document.getElementsByTagName("button")[2].removeAttribute("disabled");

                    loadData();

                    setTimeout(() => 
                    {
                        $(".modal-pop").fadeOut(300);
                    }, 2000);

                } else 
                {
                    alert("Bad request")
                    document.getElementsByTagName("button")[2].textContent = "Edit";
                    document.getElementById("name-edit").removeAttribute("disabled");
                    document.getElementById("phone-edit").removeAttribute("disabled");
                    document.getElementById("email-edit").removeAttribute("disabled");
                    document.getElementsByTagName("button")[2].removeAttribute("disabled");
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

    $("button[role='delete-btn']").click(async () =>
    {
        const id = $("div[role='delete-data']").attr("data-id");
        $("button[role='delete-btn']").text("Deleting...");
        
        const promise = await fetch(`https://sheetdb.io/api/v1/f1qno95k4qzqk/id/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accpect": "application/json"
            }
        });

        if(promise.ok)
        {
            $(".modal-container-add").fadeOut(10);
            $("span[role='pop-msg']").text("Leans Deleted");
            $(".modal-pop").fadeIn(300);
            $("div[role='delete-lean-block']").fadeOut();
            $("button[role='delete-btn']").text("Delete");

            loadData();

            setTimeout(() => 
            {
                $(".modal-pop").fadeOut(300);

            }, 2000);

        } else 
        {
            alert("Bad request")
        }

    });

    document.getElementById("search-bar").addEventListener("keyup", () =>
    {
        if(searchTimer !== undefined) clearInterval(searchTimer);

        searchTimer = setTimeout(async () => 
        {
            $(".not-found").fadeOut(100);
            $(".loader").show();

            const searchVal = $("#search-bar").val().trim();
            const colName   = $("#col-name").val().trim();
            const tableBody = document.getElementsByTagName("tbody")[0];
            let tableData   = "";

            if(searchVal === "") return loadData(); 

            tableBody.innerHTML = "";

            const promise = await fetch(`https://sheetdb.io/api/v1/f1qno95k4qzqk/search?${colName}=${searchVal}`);

            if(promise.ok)
            {
                const searchData = await promise.json();

                if(searchData.length > 0)
                {
                    $(".loader").hide();

                    for(let i = 0; i < searchData.length; i++)
                    {
                        tableData += `
                                    <tr>
                                        <td>${searchData[i].name}</td>
                                        <td>${searchData[i].email}</td>
                                        <td>${searchData[i].phone}</td>
                                        <td>${searchData[i].course}</td>
                                        <td style="display: flex; gap: 10px; flex-wrap: wrap;">
                                            <div class="action-btn" onClick="editModal(${searchData[i].id}, '${searchData[i].name}', '${searchData[i].email}', '${searchData[i].phone}', '${searchData[i].course}')" style="display: flex; align-items: center;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd"
                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </div>
                                            <div class="action-btn" onClick="deleteModal(${searchData[i].id})" style="display: flex; align-items: center;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                    `;
                    }

                    tableBody.innerHTML = tableData;
                    

                } else 
                {
                    $(".loader").hide();
                    $(".not-found").fadeIn(100);
                }

            } else 
            {
                alert("Bad request");
            }

            clearInterval(searchTimer);

        }, 2000);
    });

});