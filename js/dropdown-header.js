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
